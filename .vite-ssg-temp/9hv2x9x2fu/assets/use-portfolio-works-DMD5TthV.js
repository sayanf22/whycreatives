import { useQuery } from "@tanstack/react-query";
import { s as supabase } from "../main.mjs";
const usePortfolioWorks = (featured) => {
  return useQuery({
    queryKey: ["portfolio-works", featured],
    queryFn: async () => {
      let query = supabase.from("portfolio_works").select("*").order("display_order", { ascending: true });
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });
};
const usePortfolioWorksByCategory = (category) => {
  return useQuery({
    queryKey: ["portfolio-works", "category", category],
    queryFn: async () => {
      let query = supabase.from("portfolio_works").select("*").order("display_order", { ascending: true });
      if (category && category !== "All") {
        query = query.eq("category", category);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });
};
const getStorageUrl = (path) => {
  if (path.startsWith("http")) return path;
  const { data } = supabase.storage.from("portfolio-images").getPublicUrl(path);
  return data.publicUrl;
};
export {
  usePortfolioWorksByCategory as a,
  getStorageUrl as g,
  usePortfolioWorks as u
};
