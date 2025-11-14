import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type PortfolioWork = Tables<"portfolio_works">;

export const usePortfolioWorks = (featured?: boolean) => {
  return useQuery({
    queryKey: ["portfolio-works", featured],
    queryFn: async () => {
      let query = supabase
        .from("portfolio_works")
        .select("*")
        .order("display_order", { ascending: true });

      if (featured !== undefined) {
        query = query.eq("is_featured", featured);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as PortfolioWork[];
    },
  });
};

export const usePortfolioWorksByCategory = (category?: string) => {
  return useQuery({
    queryKey: ["portfolio-works", "category", category],
    queryFn: async () => {
      let query = supabase
        .from("portfolio_works")
        .select("*")
        .order("display_order", { ascending: true });

      if (category && category !== "All") {
        query = query.eq("category", category);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as PortfolioWork[];
    },
  });
};

// Helper function to get Supabase storage URL
export const getStorageUrl = (path: string) => {
  if (path.startsWith("http")) return path; // External URL
  const { data } = supabase.storage.from("portfolio-images").getPublicUrl(path);
  return data.publicUrl;
};
