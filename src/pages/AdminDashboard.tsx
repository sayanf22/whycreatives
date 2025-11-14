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
import { Upload, Image as ImageIcon, Trash2, Plus, LogOut, RefreshCw } from "lucide-react";
import { usePortfolioWorks } from "@/hooks/use-portfolio-works";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated with Supabase
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin-login");
      }
    };
    checkAuth();

    // Listen for auth changes
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
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
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

      // Upload image if file is selected
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

      <main className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
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
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Admin Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage portfolio items and uploads
            </p>
          </div>

          {/* Portfolio Items List */}
          <Card className="p-8 border-2 border-white/20 bg-background mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <ImageIcon className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-bold text-white">Portfolio Items</h2>
              </div>
              <Button
                onClick={() => refetch()}
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10"
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
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {portfolioItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold truncate">{item.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {item.category}
                      </p>
                      {item.is_featured && (
                        <span className="inline-block mt-1 text-xs bg-white/20 text-white px-2 py-0.5 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <Button
                      onClick={() => handleDelete(item.id, item.image_url)}
                      variant="outline"
                      size="sm"
                      className="border-red-500/50 text-red-500 hover:bg-red-500/10 hover:border-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
            <Card className="p-8 border-2 border-white/20 bg-background">
              <div className="flex items-center gap-3 mb-6">
                <Plus className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-bold text-white">Add Portfolio Item</h2>
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
                    Upload Image *
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <label className="flex-1 cursor-pointer">
                        <div className="border-2 border-dashed border-white/20 rounded-lg p-6 hover:border-white/40 transition-colors text-center">
                          <Upload className="w-8 h-8 text-white mx-auto mb-2" />
                          <p className="text-sm text-white mb-1">
                            Click to upload image
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG, WEBP up to 5MB
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    
                    {imagePreview && (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border border-white/20"
                        />
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
                      placeholder="Or paste image URL"
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

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      setFormData({ ...formData, isFeatured: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-white/20 bg-background text-white focus:ring-white"
                  />
                  <label htmlFor="featured" className="text-white font-semibold cursor-pointer">
                    Mark as Featured (will appear on homepage)
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={loading || uploading}
                  className="w-full bg-white text-black hover:bg-neutral-200 font-bold"
                >
                  {uploading ? "Uploading..." : loading ? "Adding..." : "Add Portfolio Item"}
                </Button>
              </form>
            </Card>

            {/* Quick Actions & Info */}
            <div className="space-y-6">
              <Card className="p-8 border-2 border-white/20 bg-background">
                <div className="flex items-center gap-3 mb-6">
                  <ImageIcon className="w-6 h-6 text-white" />
                  <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
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

              <Card className="p-8 border-2 border-white/20 bg-background">
                <h3 className="text-xl font-bold text-white mb-4">
                  Image Guidelines
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">•</span>
                    <span>Use high-quality images (min 1200x800px)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">•</span>
                    <span>Recommended aspect ratio: 16:9 or 4:3</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">•</span>
                    <span>Use Unsplash for stock images</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">•</span>
                    <span>Keep file sizes under 2MB for faster loading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-1">•</span>
                    <span>Use descriptive titles and tags for better organization</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8 border-2 border-white/20 bg-background">
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
