import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useSiteContent } from "@/hooks/use-site-content";
import { usePortfolioWorks } from "@/hooks/use-portfolio-works";

/** Long copy gets a textarea; short labels get a single-line input. */
const isLongForm = (key: string) => key.endsWith(".intro");

/**
 * One place to edit every piece of copy the site renders from the database:
 * the page headings and intros, then a row per project for its title and
 * one-line description.
 *
 * Everything is edited locally and written on save, so a half-typed sentence is
 * never pushed to the live site keystroke by keystroke.
 */
export const ContentEditor = () => {
  const { toast } = useToast();
  const { rows, isLoading: copyLoading, refetch: refetchCopy } = useSiteContent();
  const {
    data: projects,
    isLoading: projectsLoading,
    refetch: refetchProjects,
  } = usePortfolioWorks();

  const [copyDraft, setCopyDraft] = useState<Record<string, string>>({});
  const [projectDraft, setProjectDraft] = useState<
    Record<string, { title: string; short_description: string }>
  >({});
  const [savingCopy, setSavingCopy] = useState(false);
  const [savingProjects, setSavingProjects] = useState(false);

  // Seed the drafts once the queries land, and re-seed after a save.
  useEffect(() => {
    if (!rows.length) return;
    setCopyDraft(Object.fromEntries(rows.map((r) => [r.key, r.value])));
  }, [rows]);

  useEffect(() => {
    if (!projects?.length) return;
    setProjectDraft(
      Object.fromEntries(
        projects.map((p) => [
          p.id,
          { title: p.title, short_description: p.short_description ?? "" },
        ]),
      ),
    );
  }, [projects]);

  const groups = rows.reduce<Record<string, typeof rows>>((acc, row) => {
    (acc[row.group_name] ??= []).push(row);
    return acc;
  }, {});

  const saveCopy = async () => {
    setSavingCopy(true);
    try {
      const changed = rows.filter((r) => (copyDraft[r.key] ?? r.value) !== r.value);
      if (!changed.length) {
        toast({ title: "Nothing to save", description: "No copy was changed." });
        return;
      }

      const results = await Promise.all(
        changed.map((r) =>
          supabase
            .from("site_content")
            .update({ value: copyDraft[r.key] ?? "", updated_at: new Date().toISOString() })
            .eq("key", r.key),
        ),
      );
      const failed = results.find((res) => res.error);
      if (failed?.error) throw failed.error;

      toast({
        title: "Copy saved",
        description: `${changed.length} field(s) updated on the live site.`,
      });
      await refetchCopy();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save page copy.",
        variant: "destructive",
      });
    } finally {
      setSavingCopy(false);
    }
  };

  const saveProjects = async () => {
    setSavingProjects(true);
    try {
      const changed = (projects ?? []).filter((p) => {
        const draft = projectDraft[p.id];
        if (!draft) return false;
        return (
          draft.title !== p.title ||
          draft.short_description !== (p.short_description ?? "")
        );
      });

      if (!changed.length) {
        toast({ title: "Nothing to save", description: "No project text was changed." });
        return;
      }

      const results = await Promise.all(
        changed.map((p) =>
          supabase
            .from("portfolio_works")
            .update({
              title: projectDraft[p.id].title.trim(),
              short_description:
                projectDraft[p.id].short_description.trim() || null,
            })
            .eq("id", p.id),
        ),
      );
      const failed = results.find((res) => res.error);
      if (failed?.error) throw failed.error;

      toast({
        title: "Projects saved",
        description: `${changed.length} project(s) updated.`,
      });
      await refetchProjects();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save project text.",
        variant: "destructive",
      });
    } finally {
      setSavingProjects(false);
    }
  };

  if (copyLoading || projectsLoading) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading content…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── PAGE COPY ─────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-foreground">Page copy</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Headings and intros on the Work and Gallery pages. Leave a field
              empty to fall back to the built-in wording.
            </p>
          </div>
          <Button onClick={saveCopy} disabled={savingCopy} className="font-bold">
            {savingCopy ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save copy
          </Button>
        </div>

        <div className="space-y-6">
          {Object.entries(groups).map(([group, groupRows]) => (
            <div key={group}>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                {group}
              </p>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {groupRows.map((row) => (
                  <div
                    key={row.key}
                    className={isLongForm(row.key) ? "lg:col-span-2" : undefined}
                  >
                    <label
                      htmlFor={`copy-${row.key}`}
                      className="mb-1.5 block text-sm font-semibold text-foreground"
                    >
                      {row.label || row.key}
                    </label>
                    {isLongForm(row.key) ? (
                      <Textarea
                        id={`copy-${row.key}`}
                        value={copyDraft[row.key] ?? ""}
                        onChange={(e) =>
                          setCopyDraft((d) => ({ ...d, [row.key]: e.target.value }))
                        }
                        className="min-h-[84px]"
                      />
                    ) : (
                      <Input
                        id={`copy-${row.key}`}
                        value={copyDraft[row.key] ?? ""}
                        onChange={(e) =>
                          setCopyDraft((d) => ({ ...d, [row.key]: e.target.value }))
                        }
                      />
                    )}
                    <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                      {row.key}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECT TEXT ──────────────────────────────────────────── */}
      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-foreground">Project text</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Every project on one screen. The short description is the line
              under each card in the gallery.
            </p>
          </div>
          <Button
            onClick={saveProjects}
            disabled={savingProjects}
            className="font-bold"
          >
            {savingProjects ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save projects
          </Button>
        </div>

        <div className="space-y-3">
          {(projects ?? []).map((project, i) => (
            <div
              key={project.id}
              className="grid grid-cols-1 items-start gap-3 rounded-xl border border-border bg-background p-3 sm:grid-cols-12 sm:p-4"
            >
              <span className="font-mono text-xs text-muted-foreground sm:col-span-1 sm:pt-3">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="sm:col-span-4">
                <label
                  htmlFor={`project-title-${project.id}`}
                  className="mb-1.5 block text-xs font-semibold text-muted-foreground"
                >
                  Title
                </label>
                <Input
                  id={`project-title-${project.id}`}
                  value={projectDraft[project.id]?.title ?? ""}
                  onChange={(e) =>
                    setProjectDraft((d) => ({
                      ...d,
                      [project.id]: { ...d[project.id], title: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="sm:col-span-7">
                <label
                  htmlFor={`project-short-${project.id}`}
                  className="mb-1.5 block text-xs font-semibold text-muted-foreground"
                >
                  Short description
                </label>
                <Input
                  id={`project-short-${project.id}`}
                  value={projectDraft[project.id]?.short_description ?? ""}
                  onChange={(e) =>
                    setProjectDraft((d) => ({
                      ...d,
                      [project.id]: {
                        ...d[project.id],
                        short_description: e.target.value,
                      },
                    }))
                  }
                  placeholder="One line shown under the card"
                  maxLength={120}
                />
              </div>
            </div>
          ))}

          {!projects?.length && (
            <p className="text-sm text-muted-foreground">No projects yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};
