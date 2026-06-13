import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, Image as ImageIcon, Trash2, Plus, LogOut, RefreshCw, Star, Play } from "lucide-react";
import { usePortfolioWorks } from "@/hooks/use-portfolio-works";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if user is authenticated with Supabase
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin-login");
      } else {
        setCheckingAuth(false);
      }
    };
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/admin-login");
      } else {
        setCheckingAuth(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  const { data: portfolioItems, isLoading: itemsLoading, refetch } = usePortfolioWorks();

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this portfolio item?")) {
      return;
    }

    try {
      // Delete from database
      const { error: dbError } = await supabase
        .from("portfolio_works")
        .delete()
        .eq("id", id);

      if (dbError) throw dbError;

      // Try to delete from storage if it's a storage URL
      if (imageUrl.includes("supabase.co/storage")) {
        const pathMatch = imageUrl.match(/portfolio\/(.+)$/);
        if (pathMatch) {
          await supabase.storage
            .from("portfolio-images")
            .remove([`portfolio/${pathMatch[1]}`]);
        }
      }

      toast({
        title: "Success!",
        description: "Portfolio item deleted successfully.",
      });

      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete item.",
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
        title: "Success",
        description: `Item updated to ${!currentStatus ? "Featured" : "Regular"}.`,
      });
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update item.",
        variant: "destructive",
      });
    }
  };

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    tags: "",
    isFeatured: false,
    mediaType: "image",
  });

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white animate-spin"></div>
          </div>
          <p className="text-muted-foreground animate-pulse">Checking credentials...</p>
        </div>
      </div>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const isVideoFile = file.type.startsWith("video/");
      setFormData((prev) => ({
        ...prev,
        mediaType: isVideoFile ? "video" : "image",
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `portfolio/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("portfolio-images")
      .upload(filePath, file);

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

      // Upload image/video if file is selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      if (!imageUrl) {
        throw new Error("Please provide an image or video");
      }

      const { error } = await supabase.from("portfolio_works").insert([
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          image_url: imageUrl,
          media_type: formData.mediaType,
          is_featured: formData.isFeatured,
          display_order: 999,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Portfolio item added successfully.",
      });

      setFormData({
        title: "",
        description: "",
        category: "",
        imageUrl: "",
        tags: "",
        isFeatured: false,
        mediaType: "image",
      });
      setImageFile(null);
      setImagePreview("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add portfolio item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-16 animate-fade-in-up">
            <div className="flex justify-end mb-4">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-4 sm:mb-6">
              Admin Dashboard
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Manage portfolio items and uploads
            </p>
          </div>

          {/* Portfolio Items List */}
          <Card className="p-4 sm:p-8 border-2 border-white/20 bg-background mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <ImageIcon className="w-6 h-6 text-white" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">Portfolio Items</h2>
              </div>
              <Button
                onClick={() => refetch()}
                variant="outline"
                size="sm"
                className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>

            {itemsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                <p className="text-muted-foreground mt-2">Loading items...</p>
              </div>
            ) : portfolioItems && portfolioItems.length > 0 ? (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {portfolioItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="relative w-full sm:w-20 h-48 sm:h-20 flex-shrink-0">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                      {item.media_type === "video" && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-md">
                          <Play className="w-6 h-6 text-white" fill="white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-lg sm:text-base truncate">{item.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {item.category}
                      </p>
                      {item.is_featured && (
                        <span className="inline-block mt-1 text-xs bg-white/20 text-white px-2 py-0.5 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 justify-end w-full sm:w-auto">
                      <Button
                        onClick={() => toggleFeatured(item.id, !!item.is_featured)}
                        variant="outline"
                        size="sm"
                        className={`w-full sm:w-auto border-white/20 hover:bg-white/10 ${
                          item.is_featured ? "text-yellow-400 border-yellow-400/50 hover:text-yellow-500" : "text-white"
                        }`}
                      >
                        <Star className="w-4 h-4 mr-2" fill={item.is_featured ? "currentColor" : "none"} />
                        <span>{item.is_featured ? "Featured" : "Feature"}</span>
                      </Button>
                      <Button
                        onClick={() => handleDelete(item.id, item.image_url)}
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto border-red-500/50 text-red-500 hover:bg-red-500/10 hover:border-red-500"
                      >
                        <Trash2 className="w-4 h-4 mr-2 sm:mr-0" />
                        <span className="sm:hidden">Delete Item</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No portfolio items yet</p>
              </div>
            )}
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Form */}
            <Card className="p-4 sm:p-8 border-2 border-white/20 bg-background">
              <div className="flex items-center gap-3 mb-6">
                <Plus className="w-6 h-6 text-white" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">Add Portfolio Item</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Title *
                  </label>
                  <Input
                    type="text"
                    placeholder="Project title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="bg-background border-white/20 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Description *
                  </label>
                  <Textarea
                    placeholder="Project description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="bg-background border-white/20 text-white min-h-[100px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Category *
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., Video Editing, Web Design"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="bg-background border-white/20 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Media Type *
                    </label>
                    <select
                      value={formData.mediaType}
                      onChange={(e) =>
                        setFormData({ ...formData, mediaType: e.target.value })
                      }
                      className="w-full bg-background border border-white/20 text-white rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Upload Media (Image or Video) *
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <label className="flex-1 cursor-pointer">
                        <div className="border-2 border-dashed border-white/20 rounded-lg p-6 hover:border-white/40 transition-colors text-center">
                          <Upload className="w-8 h-8 text-white mx-auto mb-2" />
                          <p className="text-sm text-white mb-1">
                            Click to upload image or video
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG, WEBP, MP4, WEBM formats
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*,video/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    
                    {imagePreview && (
                      <div className="relative">
                        {formData.mediaType === "video" ? (
                          <video
                            src={imagePreview}
                            controls
                            className="w-full h-48 object-cover rounded-lg border border-white/20"
                          />
                        ) : (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg border border-white/20"
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview("");
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    <div className="text-center text-xs text-muted-foreground">
                      OR
                    </div>

                    <Input
                      type="url"
                      placeholder="Or paste media URL (e.g. YouTube or direct mp4)"
                      value={formData.imageUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, imageUrl: e.target.value })
                      }
                      className="bg-background border-white/20 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Tags (comma-separated)
                  </label>
                  <Input
                    type="text"
                    placeholder="design, branding, modern"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    className="bg-background border-white/20 text-white"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      setFormData({ ...formData, isFeatured: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-white/20 bg-background text-white focus:ring-white mt-1"
                  />
                  <label htmlFor="featured" className="text-white font-semibold cursor-pointer text-sm sm:text-base">
                    Mark as Featured (will appear on homepage)
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={loading || uploading}
                  className="w-full bg-white text-black hover:bg-neutral-200 font-bold h-12"
                >
                  {uploading ? "Uploading..." : loading ? "Adding..." : "Add Portfolio Item"}
                </Button>
              </form>
            </Card>

            {/* Quick Actions & Info */}
            <div className="space-y-6">
              <Card className="p-4 sm:p-8 border-2 border-white/20 bg-background">
                <div className="flex items-center gap-3 mb-6">
                  <ImageIcon className="w-6 h-6 text-white" />
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Quick Actions</h2>
                </div>

                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10"
                    onClick={() => window.open("/portfolio-gallery", "_blank")}
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    View Portfolio Gallery
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10"
                    onClick={() => window.open("/our-work", "_blank")}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    View Our Work Page
                  </Button>
                </div>
              </Card>

              <Card className="p-4 sm:p-8 border-2 border-white/20 bg-background">
                <h3 className="text-xl font-bold text-white mb-4">
                  Media Guidelines
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">•</span>
                    <span>Use high-quality images and video formats (mp4, webm)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">•</span>
                    <span>Recommended aspect ratio: 16:9 or 4:3</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">•</span>
                    <span>YouTube and Vimeo URLs are fully supported and will embed automatically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">•</span>
                    <span>Supports direct high-quality file size uploads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">•</span>
                    <span>Use descriptive titles and tags for search engine optimization (SEO)</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-4 sm:p-8 border-2 border-white/20 bg-background">
                <h3 className="text-xl font-bold text-white mb-4">
                  Category Suggestions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Video Editing",
                    "Web Design",
                    "Social Media",
                    "Branding",
                    "Motion Graphics",
                    "Ad Campaign",
                    "Logo Design",
                    "UI/UX",
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded border border-white/20 transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
