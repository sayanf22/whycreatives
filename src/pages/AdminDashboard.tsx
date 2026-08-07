import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowDown,
  ArrowUp,
  Copy,
  ExternalLink,
  Film,
  Image as ImageIcon,
  LayoutGrid,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Star,
  Trash2,
  Upload,
} from "lucide-react";
import { usePortfolioWorks, type PortfolioWork } from "@/hooks/use-portfolio-works";

/* Single source of truth for categories. The picker chips and the form's select
   previously had different lists, so choosing a suggested category set a value
   the select could not display and the field silently rendered blank. */
const CATEGORIES = [
  "Video Editing",
  "Motion Design",
  "Web Design",
  "App Development",
  "Branding",
  "Logo Design",
  "Social Media",
  "UGC & Collabs",
  "Ad Campaign",
  "SEO",
] as const;

type FilterKey = "all" | "featured" | "image" | "video";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "featured", label: "Featured" },
  { key: "image", label: "Images" },
  { key: "video", label: "Videos" },
];

const emptyForm = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
  isFeatured: false,
  mediaType: "image",
  websiteUrl: "",
};

/**
 * Pulls a human-readable message off an unknown throw value.
 *
 * Supabase rejects with plain `PostgrestError` objects rather than `Error`
 * instances, so an `instanceof` check alone would drop the useful message.
 */
const errorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "object" && error !== null && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string" && message) return message;
  }
  return fallback;
};

/** Detects video sources from a pasted URL. */
const looksLikeVideo = (url: string) =>
  url.includes("youtube.com") ||
  url.includes("youtu.be") ||
  url.includes("vimeo.com") ||
  /\.(mp4|webm|ogg|mov|m4v)($|\?)/i.test(url);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [reordering, setReordering] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState(emptyForm);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [editing, setEditing] = useState<PortfolioWork | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "",
    websiteUrl: "",
  });

  const { data: portfolioItems, isLoading: itemsLoading, refetch } =
    usePortfolioWorks();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) navigate("/admin-login");
      else setCheckingAuth(false);
    };
    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/admin-login");
      else setCheckingAuth(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Release the object URL when the preview changes or the page unmounts.
  useEffect(() => {
    return () => {
      if (imagePreview.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const stats = useMemo(() => {
    const items = portfolioItems ?? [];
    return {
      total: items.length,
      featured: items.filter((i) => i.is_featured).length,
      videos: items.filter((i) => i.media_type === "video").length,
      images: items.filter((i) => i.media_type !== "video").length,
    };
  }, [portfolioItems]);

  const visible = useMemo(() => {
    const items = portfolioItems ?? [];
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (filter === "featured" && !item.is_featured) return false;
      if (filter === "video" && item.media_type !== "video") return false;
      if (filter === "image" && item.media_type === "video") return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [portfolioItems, query, filter]);

  /* Reordering rewrites positions by index, so it is only offered on the
     unfiltered list — against a filtered view the indices would not match the
     stored order and items would jump unpredictably. */
  const canReorder = filter === "all" && query.trim() === "";

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center">
          <div className="relative mx-auto mb-4 h-14 w-14">
            <div className="absolute inset-0 rounded-full border-4 border-foreground/15" />
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-foreground" />
          </div>
          <p className="animate-pulse text-muted-foreground">
            Checking credentials...
          </p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Delete this portfolio item? This cannot be undone.")) return;

    try {
      const { error: dbError } = await supabase
        .from("portfolio_works")
        .delete()
        .eq("id", id);
      if (dbError) throw dbError;

      if (imageUrl.includes("supabase.co/storage")) {
        const pathMatch = imageUrl.match(/portfolio\/(.+)$/);
        if (pathMatch) {
          await supabase.storage
            .from("portfolio-images")
            .remove([`portfolio/${pathMatch[1]}`]);
        }
      }

      toast({ title: "Deleted", description: "Portfolio item removed." });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: errorMessage(error, "Failed to delete item."),
        variant: "destructive",
      });
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("portfolio_works")
        .update({ is_featured: !currentStatus })
        .eq("id", id);
      if (error) throw error;

      toast({
        title: "Updated",
        description: !currentStatus
          ? "Item is now featured."
          : "Item removed from featured.",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: errorMessage(error, "Failed to update item."),
        variant: "destructive",
      });
    }
  };

  /**
   * Moves an item one slot and renumbers `display_order` sequentially.
   *
   * A plain swap is not enough: new rows are all inserted with the same default
   * order, so swapping two identical values changes nothing. Renumbering makes
   * the order well defined from then on. Only rows whose position actually
   * changed are written.
   */
  const moveItem = async (index: number, direction: -1 | 1) => {
    if (!portfolioItems) return;
    const target = index + direction;
    if (target < 0 || target >= portfolioItems.length) return;

    const next = [...portfolioItems];
    [next[index], next[target]] = [next[target], next[index]];

    const changed = next
      .map((item, i) => ({ id: item.id, display_order: i }))
      .filter(({ id, display_order }) => {
        const original = portfolioItems.find((p) => p.id === id);
        return original?.display_order !== display_order;
      });

    setReordering(true);
    try {
      const results = await Promise.all(
        changed.map(({ id, display_order }) =>
          supabase
            .from("portfolio_works")
            .update({ display_order })
            .eq("id", id),
        ),
      );
      const failed = results.find((r) => r.error);
      if (failed?.error) throw failed.error;
      await refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: errorMessage(error, "Failed to reorder items."),
        variant: "destructive",
      });
    } finally {
      setReordering(false);
    }
  };

  const openEditor = (item: PortfolioWork) => {
    setEditing(item);
    setEditForm({
      title: item.title,
      description: item.description,
      category: item.category,
      websiteUrl: item.website_url ?? "",
    });
  };

  const saveEdit = async () => {
    if (!editing) return;
    if (!editForm.title.trim() || !editForm.category.trim()) {
      toast({
        title: "Missing details",
        description: "Title and category are required.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("portfolio_works")
        .update({
          title: editForm.title.trim(),
          description: editForm.description.trim(),
          category: editForm.category,
          website_url: editForm.websiteUrl.trim() || null,
        })
        .eq("id", editing.id);
      if (error) throw error;

      toast({ title: "Saved", description: "Portfolio item updated." });
      setEditing(null);
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: errorMessage(error, "Failed to save changes."),
        variant: "destructive",
      });
    }
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "Copied", description: "Media URL copied to clipboard." });
    } catch {
      toast({
        title: "Could not copy",
        description: "Clipboard is unavailable in this browser.",
        variant: "destructive",
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setFormData((prev) => ({
      ...prev,
      mediaType: file.type.startsWith("video/") ? "video" : "image",
    }));
    setImagePreview(URL.createObjectURL(file));
  };

  const compressImage = (file: File, quality = 0.8): Promise<Blob> =>
    new Promise((resolve) => {
      if (!file.type.startsWith("image/")) return resolve(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) return resolve(file);

          const maxDim = 1600;
          let { width, height } = img;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => resolve(blob || file), "image/webp", quality);
        };
        img.onerror = () => resolve(file);
        img.src = event.target?.result as string;
      };
      reader.onerror = () => resolve(file);
      reader.readAsDataURL(file);
    });

  const uploadMedia = async (file: File): Promise<string> => {
    let uploadFile: Blob | File = file;
    let fileExt = file.name.split(".").pop();

    if (file.type.startsWith("image/")) {
      try {
        uploadFile = await compressImage(file, 0.7);
        fileExt = "webp";
      } catch {
        /* fall back to the original file */
      }
    }

    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `portfolio/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("portfolio-images")
      .upload(filePath, uploadFile, {
        contentType: file.type.startsWith("image/") ? "image/webp" : file.type,
        cacheControl: "31536000",
      });
    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("portfolio-images")
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setUploading(true);

    try {
      let imageUrl = formData.imageUrl;
      if (imageFile) imageUrl = await uploadMedia(imageFile);
      if (!imageUrl) throw new Error("Please provide an image or video file.");

      const finalMediaType =
        !imageFile && imageUrl
          ? looksLikeVideo(imageUrl)
            ? "video"
            : "image"
          : formData.mediaType;

      const { error } = await supabase.from("portfolio_works").insert([
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          image_url: imageUrl,
          media_type: finalMediaType,
          is_featured: formData.isFeatured,
          website_url: formData.websiteUrl || null,
          display_order: portfolioItems?.length ?? 999,
        },
      ]);
      if (error) throw error;

      toast({ title: "Added", description: "Portfolio item created." });
      setFormData(emptyForm);
      setImageFile(null);
      setImagePreview("");
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: errorMessage(error, "Failed to add portfolio item."),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const statCards = [
    { label: "Total", value: stats.total, Icon: LayoutGrid },
    { label: "Featured", value: stats.featured, Icon: Star },
    { label: "Images", value: stats.images, Icon: ImageIcon },
    { label: "Videos", value: stats.videos, Icon: Film },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/*
        The marketing footer used to render here. On an admin tool it added a
        full "start a project" pitch plus a giant wordmark below every screen,
        which on a phone meant scrolling past the whole thing to reach anything.
      */}
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-6 sm:pt-28">
        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              WhyCreatives
            </p>
            {/* Was text-7xl, which filled an entire phone screen on its own. */}
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => refetch()}
              variant="outline"
              size="sm"
              aria-label="Refresh"
            >
              <RefreshCw className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>

        {/* ── STATS ──────────────────────────────────────────────── */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {statCards.map(({ label, value, Icon }) => (
            <Card key={label} className="p-4">
              <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                <Icon className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {label}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{value}</p>
            </Card>
          ))}
        </div>

        {/* Tabs keep the phone layout short: the library and the upload form are
            no longer stacked into one very long scroll. */}
        <Tabs defaultValue="library" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2 sm:w-auto sm:inline-flex">
            <TabsTrigger value="library">
              Library
              <span className="ml-1.5 text-muted-foreground">{stats.total}</span>
            </TabsTrigger>
            <TabsTrigger value="add">Add new</TabsTrigger>
          </TabsList>

          {/* ── LIBRARY ─────────────────────────────────────────── */}
          <TabsContent value="library" className="mt-0">
            <Card className="p-4 sm:p-6">
              <div className="mb-4 flex flex-col gap-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by title or category"
                    className="pl-9"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {FILTERS.map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFilter(key)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                        filter === key
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {itemsLoading ? (
                <div className="space-y-3">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex gap-4 rounded-xl border border-border p-3"
                    >
                      <div className="h-16 w-16 shrink-0 animate-pulse rounded-lg bg-foreground/10" />
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-4 w-1/2 animate-pulse rounded bg-foreground/10" />
                        <div className="h-3 w-1/4 animate-pulse rounded bg-foreground/10" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : visible.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">
                    {stats.total === 0
                      ? "No portfolio items yet. Add your first one."
                      : "Nothing matches this search."}
                  </p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {visible.map((item) => {
                    const orderIndex =
                      portfolioItems?.findIndex((p) => p.id === item.id) ?? -1;
                    const isVideo = item.media_type === "video";

                    return (
                      <li
                        key={item.id}
                        className="rounded-xl border border-border p-3 transition-colors hover:border-foreground/30"
                      >
                        <div className="flex gap-3 sm:gap-4">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-20 sm:w-20">
                            <img
                              src={item.image_url}
                              alt={item.title}
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                            {isVideo && (
                              <span className="absolute inset-0 flex items-center justify-center bg-black/45">
                                <Film className="h-5 w-5 text-white" />
                              </span>
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate font-semibold text-foreground">
                              {item.title}
                            </p>
                            <p className="truncate text-sm text-muted-foreground">
                              {item.category}
                            </p>
                            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                              {item.is_featured && (
                                <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground">
                                  Featured
                                </span>
                              )}
                              <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                {isVideo ? "Video" : "Image"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Icon-only actions in one scroll-free row: the old
                            full-width stacked buttons made each phone row
                            roughly three times taller than its content. */}
                        <div className="mt-3 flex items-center gap-1.5 border-t border-border pt-3">
                          <Button
                            onClick={() => toggleFeatured(item.id, !!item.is_featured)}
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9"
                            title={item.is_featured ? "Unfeature" : "Feature"}
                            aria-label={item.is_featured ? "Unfeature" : "Feature"}
                          >
                            <Star
                              className={`h-4 w-4 ${item.is_featured ? "text-yellow-500" : ""}`}
                              fill={item.is_featured ? "currentColor" : "none"}
                            />
                          </Button>
                          <Button
                            onClick={() => openEditor(item)}
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9"
                            title="Edit"
                            aria-label="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => copyUrl(item.website_url || item.image_url)}
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9"
                            title="Copy URL"
                            aria-label="Copy URL"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() =>
                              window.open(
                                item.website_url || item.image_url,
                                "_blank",
                                "noopener",
                              )
                            }
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9"
                            title="Open"
                            aria-label="Open"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>

                          {canReorder && (
                            <>
                              <Button
                                onClick={() => moveItem(orderIndex, -1)}
                                disabled={reordering || orderIndex <= 0}
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9"
                                title="Move up"
                                aria-label="Move up"
                              >
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                              <Button
                                onClick={() => moveItem(orderIndex, 1)}
                                disabled={
                                  reordering ||
                                  orderIndex < 0 ||
                                  orderIndex >=
                                    (portfolioItems?.length ?? 0) - 1
                                }
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9"
                                title="Move down"
                                aria-label="Move down"
                              >
                                <ArrowDown className="h-4 w-4" />
                              </Button>
                            </>
                          )}

                          <Button
                            onClick={() => handleDelete(item.id, item.image_url)}
                            variant="ghost"
                            size="icon"
                            className="ml-auto h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            title="Delete"
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}

              {!canReorder && !itemsLoading && visible.length > 0 && (
                <p className="mt-4 text-xs text-muted-foreground">
                  Clear the search and filter to reorder items.
                </p>
              )}
            </Card>
          </TabsContent>

          {/* ── ADD NEW ─────────────────────────────────────────── */}
          <TabsContent value="add" className="mt-0">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="p-4 sm:p-6 lg:col-span-2">
                <div className="mb-6 flex items-center gap-2.5">
                  <Plus className="h-5 w-5 text-foreground" />
                  <h2 className="text-lg font-bold text-foreground">
                    Add portfolio item
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="title"
                      className="mb-2 block text-sm font-semibold text-foreground"
                    >
                      Title *
                    </label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Project title"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-semibold text-foreground"
                    >
                      Description *
                    </label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Project description"
                      className="min-h-[96px]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="category"
                        className="mb-2 block text-sm font-semibold text-foreground"
                      >
                        Category *
                      </label>
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      >
                        <option value="" disabled>
                          Select category
                        </option>
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="websiteUrl"
                        className="mb-2 block text-sm font-semibold text-foreground"
                      >
                        Website URL
                      </label>
                      <Input
                        id="websiteUrl"
                        type="url"
                        value={formData.websiteUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, websiteUrl: e.target.value })
                        }
                        placeholder="https://example.com (optional)"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="mb-2 block text-sm font-semibold text-foreground">
                      Media *
                    </span>
                    <label className="block cursor-pointer">
                      <div className="rounded-xl border-2 border-dashed border-border p-6 text-center transition-colors hover:border-foreground/40">
                        <Upload className="mx-auto mb-2 h-7 w-7 text-muted-foreground" />
                        <p className="text-sm text-foreground">
                          Click to upload image or video
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          PNG, JPG, WEBP, MP4, WEBM. Images are compressed to
                          WebP automatically.
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>

                    {imagePreview && (
                      <div className="relative mt-3">
                        {formData.mediaType === "video" ? (
                          <video
                            src={imagePreview}
                            controls
                            className="h-44 w-full rounded-xl border border-border object-cover"
                          />
                        ) : (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-44 w-full rounded-xl border border-border object-cover"
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview("");
                          }}
                          className="absolute right-2 top-2 rounded-full bg-destructive p-2 text-destructive-foreground"
                          aria-label="Remove media"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}

                    <div className="my-3 text-center text-xs uppercase tracking-wider text-muted-foreground">
                      or
                    </div>

                    <Input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => {
                        const url = e.target.value;
                        setFormData({
                          ...formData,
                          imageUrl: url,
                          mediaType: looksLikeVideo(url) ? "video" : "image",
                        });
                      }}
                      placeholder="Paste a media URL (YouTube, Vimeo or direct mp4)"
                    />
                  </div>

                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) =>
                        setFormData({ ...formData, isFeatured: e.target.checked })
                      }
                      className="mt-0.5 h-5 w-5 rounded border-input"
                    />
                    <span className="text-sm font-semibold text-foreground">
                      Mark as featured
                      <span className="block text-xs font-normal text-muted-foreground">
                        Featured items appear on the homepage.
                      </span>
                    </span>
                  </label>

                  <Button
                    type="submit"
                    disabled={loading || uploading}
                    className="h-11 w-full font-bold"
                  >
                    {uploading
                      ? "Compressing & uploading..."
                      : loading
                        ? "Adding..."
                        : "Add portfolio item"}
                  </Button>
                </form>
              </Card>

              <div className="space-y-6">
                <Card className="p-4 sm:p-6">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">
                    Quick category
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, category: cat }))}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                          formData.category === cat
                            ? "border-foreground bg-foreground text-background"
                            : "border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </Card>

                <Card className="p-4 sm:p-6">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">
                    Shortcuts
                  </h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => window.open("/portfolio-gallery", "_blank")}
                    >
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Portfolio gallery
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => window.open("/our-work", "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Our work page
                    </Button>
                  </div>
                </Card>

                <Card className="p-4 sm:p-6">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">
                    Media guidelines
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {[
                      "Aim for a 16:9 or 4:3 aspect ratio.",
                      "YouTube and Vimeo links embed automatically.",
                      "Images are converted to WebP and capped at 1600px.",
                      "Use descriptive titles — they are indexed for SEO.",
                    ].map((tip) => (
                      <li key={tip} className="flex gap-2">
                        <span className="text-foreground">&bull;</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* ── EDIT DIALOG ──────────────────────────────────────────── */}
      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit item</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="edit-title"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Title *
              </label>
              <Input
                id="edit-title"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="edit-description"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Description
              </label>
              <Textarea
                id="edit-description"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                className="min-h-[88px]"
              />
            </div>

            <div>
              <label
                htmlFor="edit-category"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Category *
              </label>
              <select
                id="edit-category"
                value={editForm.category}
                onChange={(e) =>
                  setEditForm({ ...editForm, category: e.target.value })
                }
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {/* Keeps any legacy value selectable so saving cannot silently
                    change a category that predates this list. */}
                {!CATEGORIES.includes(editForm.category as never) &&
                  editForm.category && (
                    <option value={editForm.category}>
                      {editForm.category}
                    </option>
                  )}
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="edit-url"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Website URL
              </label>
              <Input
                id="edit-url"
                type="url"
                value={editForm.websiteUrl}
                onChange={(e) =>
                  setEditForm({ ...editForm, websiteUrl: e.target.value })
                }
                placeholder="https://example.com"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button onClick={saveEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
