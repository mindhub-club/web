import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Brain, Code, Palette, Scale, Rocket, Users, Globe, Sparkles } from "lucide-react";
import { useI18n } from "../i18n/I18nProvider";

type SuggestionStat = {
  label: string;
  votes: number;
  pending?: boolean;
};

function toDisplayLabel(raw: string): string {
  const cleaned = raw.trim().replace(/\s+/g, " ");
  return cleaned.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function EventTypesSection() {
  const { t } = useI18n();

  const [idea, setIdea] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [stats, setStats] = useState<SuggestionStat[]>([
    { label: "Cybersecurity", votes: 9 },
    { label: "Product Marketing", votes: 7 },
    { label: "Leadership & Management", votes: 6 },
    { label: "Public Speaking & Storytelling", votes: 5 },
    { label: "Sustainability & Impact", votes: 4 },
    { label: "Copywriting & Content", votes: 2 }
  ]);
  const [pendingIdea, setPendingIdea] = useState<string | null>(null);
  const [similarOptions, setSimilarOptions] = useState<SuggestionStat[]>([]);
  const [lastVoted, setLastVoted] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const raw = idea.trim();
    if (!raw) return;

    setStatus("submitting");
    const normalized = raw.toLowerCase();
    const display = toDisplayLabel(raw);

    // Find similar existing (non-pending) options
    const existing = stats.filter((s) => !s.pending);
    const similar = existing.filter((opt) => {
      const label = opt.label.toLowerCase();
      return label.includes(normalized) || normalized.includes(label);
    });

    if (similar.length === 0) {
      // No similar options found: treat as brand new suggestion and go straight to results
      setStats((prev) => {
        const idx = prev.findIndex(
          (opt) => opt.label.toLowerCase() === normalized
        );
        if (idx === -1) {
          return [...prev, { label: display, votes: 1, pending: true }];
        }
        const next = [...prev];
        next[idx] = { ...next[idx], votes: next[idx].votes + 1 };
        return next;
      });
      setLastVoted(display);
      setHasSubmitted(true);
      setIdea("");
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2500);
      return;
    }

    // Similar options exist: ask the user to choose how to classify their suggestion
    setPendingIdea(display);
    setSimilarOptions(similar.slice(0, 3));
    setIdea("");
    setStatus("idle");
  }

  function finalizeWithExisting(optionLabel: string) {
    const normalized = optionLabel.toLowerCase();
    setStats((prev) => {
      const next = [...prev];
      const idx = next.findIndex(
        (opt) => opt.label.toLowerCase() === normalized
      );
      if (idx === -1) {
        next.push({ label: optionLabel, votes: 1 });
      } else {
        next[idx] = { ...next[idx], votes: next[idx].votes + 1 };
      }
      return next;
    });
    setLastVoted(optionLabel);
    setHasSubmitted(true);
    setPendingIdea(null);
    setSimilarOptions([]);
  }

  function finalizeWithNew() {
    if (!pendingIdea) return;
    const value = toDisplayLabel(pendingIdea);
    const normalized = value.toLowerCase();
    setStats((prev) => {
      const next = [...prev];
      const idx = next.findIndex(
        (opt) => opt.label.toLowerCase() === normalized
      );
      if (idx === -1) {
        next.push({ label: value, votes: 1, pending: true });
      } else {
        next[idx] = { ...next[idx], votes: next[idx].votes + 1 };
      }
      return next;
    });
    setLastVoted(value);
    setHasSubmitted(true);
    setPendingIdea(null);
    setSimilarOptions([]);
  }

  const clubs = [
    {
      icon: Rocket,
      titleKey: 'clubs.entrepreneurs.title',
      email: "entrepreneurs@mindhub.club",
      descriptionKey: 'clubs.entrepreneurs.description',
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: Code,
      titleKey: 'clubs.engineering.title',
      email: "engineering@mindhub.club", 
      descriptionKey: 'clubs.engineering.description',
      color: "text-green-600", 
      bgColor: "bg-green-50"
    },
    {
      icon: Palette,
      titleKey: 'clubs.design.title',
      email: "design@mindhub.club",
      descriptionKey: 'clubs.design.description',
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Scale,
      titleKey: 'clubs.law.title',
      email: "law@mindhub.club",
      descriptionKey: 'clubs.law.description',
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      icon: Users,
      titleKey: 'clubs.product.title',
      email: "product@mindhub.club",
      descriptionKey: 'clubs.product.description',
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: Brain,
      titleKey: 'clubs.ai.title',
      email: "ai@mindhub.club",
      descriptionKey: 'clubs.ai.description',
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Globe,
      titleKey: 'clubs.marketing.title',
      email: "marketing@mindhub.club",
      descriptionKey: 'clubs.marketing.description',
      color: "text-teal-600",
      bgColor: "bg-teal-50"
    },
    {
      icon: Sparkles,
      titleKey: 'events.suggest',
      email: "growth@mindhub.club",
      descriptionKey: 'events.notFound',
      color: "text-fuchsia-600",
      bgColor: "bg-fuchsia-50"
    }
  ];

  return (
    <section id="clubs" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl">{t('events.title')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('events.blurb')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clubs.map((club, index) => {
            const isSuggestCard = club.titleKey === 'events.suggest';
            return (
              <Card
                key={index}
                className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  isSuggestCard ? "border-dashed border-fuchsia-300" : ""
                }`}
              >
                <CardContent className="p-6 flex flex-col flex-auto gap-6">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 ${club.bgColor} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <club.icon className={`w-6 h-6 ${club.color}`} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg">
                      {t(club.titleKey as string)}
                    </h3>

                    {!isSuggestCard && (
                      <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                        <span className="text-sm font-mono text-muted-foreground">
                          {club.email}
                        </span>
                      </div>
                    )}

                    {isSuggestCard ? (
                      hasSubmitted && stats.length > 0 ? (
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {t('events.form.success')}
                          </p>
                          <div className="space-y-1 pt-1 border-t border-border/40">
                            <p className="text-xs font-medium text-muted-foreground">
                              {t('events.form.resultsTitle')}
                            </p>
                            <ul className="space-y-1">
                              {stats.map((option) => (
                                <li
                                  key={option.label}
                                  className={`flex items-center justify-between text-xs rounded px-2 py-1 ${
                                    lastVoted &&
                                    option.label.toLowerCase() === lastVoted.toLowerCase()
                                      ? "bg-fuchsia-100 text-fuchsia-900"
                                      : "bg-muted/60 text-muted-foreground"
                                  }`}
                                >
                                  <span className="truncate">{option.label}</span>
                                  <span className="ml-2 shrink-0">
                                    {option.votes} {t('events.form.votesSuffix')}
                                    {option.pending && " • pending"}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {lastVoted &&
                            stats.some(
                              (s) =>
                                s.pending &&
                                s.label.toLowerCase() === lastVoted.toLowerCase(),
                            ) && (
                              <p className="text-[11px] text-muted-foreground">
                                {t('events.form.pendingNote')}
                              </p>
                            )}
                        </div>
                      ) : pendingIdea && similarOptions.length > 0 ? (
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {t('events.form.similarIntro').replace('{topic}', pendingIdea)}
                          </p>
                          <div className="space-y-2">
                            {similarOptions.map((option) => (
                              <Button
                                key={option.label}
                                type="button"
                                variant="outline"
                                className="w-full justify-between text-xs"
                                onClick={() => finalizeWithExisting(option.label)}
                              >
                                <span className="truncate">{option.label}</span>
                                <span className="ml-2 text-muted-foreground">
                                  {t('events.form.fitsHere')}
                                </span>
                              </Button>
                            ))}
                          </div>
                          <div className="pt-2 border-t border-border/40 space-y-2">
                            <p className="text-xs text-muted-foreground">
                              {t('events.form.keepOriginalLabel').replace('{topic}', pendingIdea)}
                            </p>
                            <Button
                              type="button"
                              className="w-full"
                              onClick={finalizeWithNew}
                            >
                              {t('events.form.keepOriginalCta')}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <form
                          onSubmit={handleSubmit}
                          className="space-y-3"
                        >
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {t(club.descriptionKey as string)}
                          </p>
                          <Input
                            value={idea}
                            onChange={(e) => {
                              setIdea(e.target.value);
                            }}
                            placeholder={t('events.form.placeholder')}
                            aria-label={t('events.suggest')}
                          />
                          <Button
                            type="submit"
                            disabled={!idea.trim() || status === "submitting"}
                            className="w-full"
                          >
                            {status === "submitting"
                              ? t('events.form.submitting')
                              : t('events.form.submit')}
                          </Button>
                          {status === "error" && (
                            <p className="text-xs text-destructive">
                              {t('events.form.error')}
                            </p>
                          )}
                        </form>
                      )
                    ) : (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t(club.descriptionKey as string)}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
