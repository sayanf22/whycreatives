import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SiteContentRow = {
  key: string;
  value: string;
  label: string;
  group_name: string;
  sort_order: number;
};

/**
 * Editable page copy, keyed by string.
 *
 * Every caller passes its own fallback, so the page still renders its intended
 * words if the row is missing, the table is empty or the request fails. Copy
 * living in the database must never be able to blank out the site.
 */
export const useSiteContent = () => {
  const query = useQuery({
    queryKey: ["site-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("key, value, label, group_name, sort_order")
        .order("group_name", { ascending: true })
        .order("sort_order", { ascending: true });

      if (error) throw error;
      return (data ?? []) as SiteContentRow[];
    },
    // Copy changes rarely; don't re-fetch it on every mount.
    staleTime: 1000 * 60 * 5,
  });

  const map = new Map((query.data ?? []).map((row) => [row.key, row.value]));

  /** Returns the stored copy for `key`, or `fallback` when it is missing/blank. */
  const text = (key: string, fallback: string) => {
    const value = map.get(key);
    return value && value.trim() ? value : fallback;
  };

  return { ...query, rows: query.data ?? [], text };
};
