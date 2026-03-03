import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { s as supabase, u as useToast, N as Navigation, B as Button, C as Card, a as Footer } from "../main.mjs";
import { I as Input } from "./input-6XZgwDxx.js";
import { T as Textarea } from "./textarea-6Ttc-Vmm.js";
import { LogOut, Image, RefreshCw, Trash2, Plus, Upload } from "lucide-react";
import { u as usePortfolioWorks } from "./use-portfolio-works-DMD5TthV.js";
import "vite-react-ssg";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "@radix-ui/react-slot";
import "framer-motion";
import "react-helmet";
import "@supabase/supabase-js";
import "react-markdown";
import "remark-gfm";
const AdminDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin-login");
      }
    };
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/admin-login");
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };
  const { data: portfolioItems, isLoading: itemsLoading, refetch } = usePortfolioWorks();
  const handleDelete = async (id, imageUrl) => {
    if (!confirm("Are you sure you want to delete this portfolio item?")) {
      return;
    }
    try {
      const { error: dbError } = await supabase.from("portfolio_works").delete().eq("id", id);
      if (dbError) throw dbError;
      if (imageUrl.includes("supabase.co/storage")) {
        const pathMatch = imageUrl.match(/portfolio\/(.+)$/);
        if (pathMatch) {
          await supabase.storage.from("portfolio-images").remove([`portfolio/${pathMatch[1]}`]);
        }
      }
      toast({
        title: "Success!",
        description: "Portfolio item deleted successfully."
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete item.",
        variant: "destructive"
      });
    }
  };
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    tags: "",
    isFeatured: false
  });
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const uploadImage = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `portfolio/${fileName}`;
    const { error: uploadError } = await supabase.storage.from("portfolio-images").upload(filePath, file);
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from("portfolio-images").getPublicUrl(filePath);
    return data.publicUrl;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploading(true);
    try {
      let imageUrl = formData.imageUrl;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      if (!imageUrl) {
        throw new Error("Please provide an image");
      }
      const { error } = await supabase.from("portfolio_works").insert([
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          image_url: imageUrl,
          is_featured: formData.isFeatured,
          display_order: 999
        }
      ]);
      if (error) throw error;
      toast({
        title: "Success!",
        description: "Portfolio item added successfully."
      });
      setFormData({
        title: "",
        description: "",
        category: "",
        imageUrl: "",
        tags: "",
        isFeatured: false
      });
      setImageFile(null);
      setImagePreview("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to add portfolio item. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsx("main", { className: "pt-32 pb-24 px-6", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16 animate-fade-in-up", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-end mb-4", children: /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: handleLogout,
            variant: "outline",
            className: "border-white/20 text-white hover:bg-white/10",
            children: [
              /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4 mr-2" }),
              "Logout"
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-7xl font-black text-white mb-6", children: "Admin Dashboard" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground", children: "Manage portfolio items and uploads" })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "p-8 border-2 border-white/20 bg-background mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Image, { className: "w-6 h-6 text-white" }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: "Portfolio Items" })
          ] }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              onClick: () => refetch(),
              variant: "outline",
              size: "sm",
              className: "border-white/20 text-white hover:bg-white/10",
              children: [
                /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4 mr-2" }),
                "Refresh"
              ]
            }
          )
        ] }),
        itemsLoading ? /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-2", children: "Loading items..." })
        ] }) : portfolioItems && portfolioItems.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-4 max-h-96 overflow-y-auto", children: portfolioItems.map((item) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors",
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: item.image_url,
                  alt: item.title,
                  className: "w-20 h-20 object-cover rounded"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-white font-semibold truncate", children: item.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground truncate", children: item.category }),
                item.is_featured && /* @__PURE__ */ jsx("span", { className: "inline-block mt-1 text-xs bg-white/20 text-white px-2 py-0.5 rounded", children: "Featured" })
              ] }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: () => handleDelete(item.id, item.image_url),
                  variant: "outline",
                  size: "sm",
                  className: "border-red-500/50 text-red-500 hover:bg-red-500/10 hover:border-red-500",
                  children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                }
              )
            ]
          },
          item.id
        )) }) : /* @__PURE__ */ jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "No portfolio items yet" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs(Card, { className: "p-8 border-2 border-white/20 bg-background", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-6 h-6 text-white" }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: "Add Portfolio Item" })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-white font-semibold mb-2", children: "Title *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  type: "text",
                  placeholder: "Project title",
                  value: formData.title,
                  onChange: (e) => setFormData({ ...formData, title: e.target.value }),
                  className: "bg-background border-white/20 text-white",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-white font-semibold mb-2", children: "Description *" }),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  placeholder: "Project description",
                  value: formData.description,
                  onChange: (e) => setFormData({ ...formData, description: e.target.value }),
                  className: "bg-background border-white/20 text-white min-h-[100px]",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-white font-semibold mb-2", children: "Category *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  type: "text",
                  placeholder: "e.g., Video Editing, Web Design",
                  value: formData.category,
                  onChange: (e) => setFormData({ ...formData, category: e.target.value }),
                  className: "bg-background border-white/20 text-white",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-white font-semibold mb-2", children: "Upload Image *" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxs("label", { className: "flex-1 cursor-pointer", children: [
                  /* @__PURE__ */ jsxs("div", { className: "border-2 border-dashed border-white/20 rounded-lg p-6 hover:border-white/40 transition-colors text-center", children: [
                    /* @__PURE__ */ jsx(Upload, { className: "w-8 h-8 text-white mx-auto mb-2" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-white mb-1", children: "Click to upload image" }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "PNG, JPG, WEBP up to 5MB" })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "file",
                      accept: "image/*",
                      onChange: handleImageChange,
                      className: "hidden"
                    }
                  )
                ] }) }),
                imagePreview && /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: imagePreview,
                      alt: "Preview",
                      className: "w-full h-48 object-cover rounded-lg border border-white/20"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setImageFile(null);
                        setImagePreview("");
                      },
                      className: "absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-center text-xs text-muted-foreground", children: "OR" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "url",
                    placeholder: "Or paste image URL",
                    value: formData.imageUrl,
                    onChange: (e) => setFormData({ ...formData, imageUrl: e.target.value }),
                    className: "bg-background border-white/20 text-white"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block text-white font-semibold mb-2", children: "Tags (comma-separated)" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  type: "text",
                  placeholder: "design, branding, modern",
                  value: formData.tags,
                  onChange: (e) => setFormData({ ...formData, tags: e.target.value }),
                  className: "bg-background border-white/20 text-white"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  id: "featured",
                  checked: formData.isFeatured,
                  onChange: (e) => setFormData({ ...formData, isFeatured: e.target.checked }),
                  className: "w-5 h-5 rounded border-white/20 bg-background text-white focus:ring-white"
                }
              ),
              /* @__PURE__ */ jsx("label", { htmlFor: "featured", className: "text-white font-semibold cursor-pointer", children: "Mark as Featured (will appear on homepage)" })
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "submit",
                disabled: loading || uploading,
                className: "w-full bg-white text-black hover:bg-neutral-200 font-bold",
                children: uploading ? "Uploading..." : loading ? "Adding..." : "Add Portfolio Item"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs(Card, { className: "p-8 border-2 border-white/20 bg-background", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
              /* @__PURE__ */ jsx(Image, { className: "w-6 h-6 text-white" }),
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: "Quick Actions" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "outline",
                  className: "w-full justify-start border-white/20 text-white hover:bg-white/10",
                  onClick: () => window.open("/portfolio-gallery", "_blank"),
                  children: [
                    /* @__PURE__ */ jsx(Image, { className: "w-4 h-4 mr-2" }),
                    "View Portfolio Gallery"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "outline",
                  className: "w-full justify-start border-white/20 text-white hover:bg-white/10",
                  onClick: () => window.open("/our-work", "_blank"),
                  children: [
                    /* @__PURE__ */ jsx(Upload, { className: "w-4 h-4 mr-2" }),
                    "View Our Work Page"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "p-8 border-2 border-white/20 bg-background", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4", children: "Image Guidelines" }),
            /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-white mt-1", children: "•" }),
                /* @__PURE__ */ jsx("span", { children: "Use high-quality images (min 1200x800px)" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-white mt-1", children: "•" }),
                /* @__PURE__ */ jsx("span", { children: "Recommended aspect ratio: 16:9 or 4:3" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-white mt-1", children: "•" }),
                /* @__PURE__ */ jsx("span", { children: "Use Unsplash for stock images" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-white mt-1", children: "•" }),
                /* @__PURE__ */ jsx("span", { children: "Keep file sizes under 2MB for faster loading" })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-white mt-1", children: "•" }),
                /* @__PURE__ */ jsx("span", { children: "Use descriptive titles and tags for better organization" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "p-8 border-2 border-white/20 bg-background", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-4", children: "Category Suggestions" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: [
              "Video Editing",
              "Web Design",
              "Social Media",
              "Branding",
              "Motion Graphics",
              "Ad Campaign",
              "Logo Design",
              "UI/UX"
            ].map((cat) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setFormData({ ...formData, category: cat }),
                className: "px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded border border-white/20 transition-colors",
                children: cat
              },
              cat
            )) })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  AdminDashboard as default
};
