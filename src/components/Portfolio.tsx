"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookText, Brain, Code2, ExternalLink, Github, Linkedin, Mail, Search } from "lucide-react";

// -------------------------
// 🔧 Quick Start Instructions
// 1) Replace the data in `portfolioItems` below with your own.
// 2) Update the links in the `Header` component (GitHub, LinkedIn, Email, Resume).
// 3) Export this page into your framework (e.g., Next.js app) or keep as a single-page site.
// 4) Optional: Convert poems to Markdown or keep them as strings.
// -------------------------
type PortfolioItem = {
  id: string;
  category: "Data Science" | "Poetry" | "Projects" | string;
  title: string;
  summary?: string;
  tags?: string[];
  links?: { demo?: string; repo?: string; paper?: string };
  details?: string;
  poem?: string;
};

const portfolioItems:PortfolioItem[] = [
  // 🧠 Data Science
  {
    id: "ds-ecg",
    category: "Data Science",
    title: "ECG Signal Classification",
    summary:
      "Capstone project comparing k-NN and deep CNNs for ECG-based heart disease detection.",
    tags: ["PyTorch", "KNN", "CNN", "ECG", "Healthcare AI"],
    links: {
      demo: "#",
      repo: "#",
      paper: "#",
    },
    details:
      "Implemented baseline k-NN and advanced CNN models; evaluated on accuracy, F1, and AUC with robust cross-validation and ablation studies.",
  },
  {
    id: "ds-recsys",
    category: "Data Science",
    title: "Movie Recommender (Pixie-inspired)",
    summary:
      "Graph-walk recommendations with item-item signals and cold-start handling.",
    tags: ["Recsys", "Random Walk", "Graph", "Python"],
    links: { demo: "#", repo: "#" },
    details:
      "Designed random-walk personalization leveraging user-item bipartite graphs; shipped evaluation harness with MAP@K and NDCG@K.",
  },

  // ✍️ Poetry
  {
    id: "poem-1",
    category: "Poetry",
    title: "Static Electricity",
    summary: "A short poem about small sparks that move big things.",
    tags: ["Poem", "Free Verse"],
    poem:
      `We call them little—\nthese quicksilver murmurs,\nlike lint clinging to a dark sweater.\nBut touch the doorknob,\nand the room remembers you—\nlight leaping from fingertip\ninto every metal thing.`,
  },
  {
    id: "poem-2",
    category: "Poetry",
    title: "Northbound",
    summary: "Finding a compass where maps fall silent.",
    tags: ["Poem", "Journey"],
    poem:
      `When the road forgets its name,\nI count the mileposts in birdsong.\nSome horizons are questions\nonly footsteps can answer.`,
  },

  // 🛠️ Other / Projects
  {
    id: "proj-website",
    category: "Projects",
    title: "Art Collective Platform",
    summary:
      "Multi-artist portfolio + donations + collaboration tools with curated marketplace.",
    tags: ["Next.js", "Postgres", "Stripe", "Collab"],
    links: { demo: "#", repo: "#" },
    details:
      "Built role-based access, artist dashboards, and community discussion modules; integrated donation flows and analytics.",
  },
];

const categories = [
  { key: "All", label: "All" },
  { key: "Data Science", label: "Data Science", icon: Brain },
  { key: "Poetry", label: "Poetry", icon: BookText },
  { key: "Projects", label: "Projects", icon: Code2 },
];

function Header() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Akanimoh Umoren</h1>
          <p className="text-muted-foreground mt-1 max-w-prose">
            Data Scientist & Poet. I build intelligent systems and write about the spaces between signals.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" className="rounded-2xl">
            <a href="https://github.com/oneofthejosephs" target = "blank" aria-label="GitHub">
              <Github className="h-4 w-4 mr-2" /> GitHub
            </a>
          </Button>
          <Button asChild variant="outline" className="rounded-2xl">
            <a href="https://www.linkedin.com/in/akanimoh-umoren-243095206/" target = "blank" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
            </a>
          </Button>
          <Button asChild className="rounded-2xl">
            <a href="mailto:joseph.umoren.12@gmail.com" target = "blank" aria-label="Email">
              <Mail className="h-4 w-4 mr-2" /> Contact
            </a>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button asChild variant="secondary" className="rounded-2xl">
          <a href="https://docs.google.com/document/d/1VAdotd3MygnOa4_7pvRS0vsd6M8cP7m_DKlYLYLSSdA/export?format=pdf" aria-label="Resume PDF">Download Résumé</a>
        </Button>
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Focus:</span> ML systems, recsys, and humane AI experiences.
        </div>
      </div>
    </div>
  );
}

function useFiltered(items:PortfolioItem[], query:string, activeCategory:string) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const inCategory = activeCategory === "All" || item.category === activeCategory;
      const hay = [item.title, item.summary, item.details, (item.tags || []).join(" ")]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const hit = q.length === 0 || hay.includes(q);
      return inCategory && hit;
    });
  }, [items, query, activeCategory]);
}

function ItemCard({ item, onOpenPoem }: {item: PortfolioItem;onOpenPoem: (item: PortfolioItem) => void;}) {
  const isPoem = item.category === "Poetry" && item.poem;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
        <CardContent className="p-5 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold leading-tight">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.summary}</p>
            </div>
            <div className="shrink-0 text-xs text-muted-foreground">{item.category}</div>
          </div>

          <div className="flex flex-wrap gap-2">
            {(item.tags || []).map((t) => (
              <Badge key={t} variant="secondary" className="rounded-xl">
                {t}
              </Badge>
            ))}
          </div>

          {isPoem ? (
            <div className="flex gap-2">
              <Button className="rounded-2xl" onClick={() => onOpenPoem(item)}>
                Read Poem
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {item?.links?.demo && (
                <Button asChild className="rounded-2xl">
                  <a href={item.links.demo} target="_blank" rel="noreferrer">
                    Live <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              )}
              {item?.links?.repo && (
                <Button asChild variant="outline" className="rounded-2xl">
                  <a href={item.links.repo} target="_blank" rel="noreferrer">
                    Code <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              )}
              {item?.links?.paper && (
                <Button asChild variant="secondary" className="rounded-2xl">
                  <a href={item.links.paper} target="_blank" rel="noreferrer">
                    Paper <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

const Portfolio: React.FC = () => {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [poemOpen, setPoemOpen] = useState(false);
  const [poemItem, setPoemItem] = useState<PortfolioItem | null>(null);

  const filtered = useFiltered(portfolioItems, query, active);

  function openPoem(item: PortfolioItem) {
    setPoemItem(item);
    setPoemOpen(true);
  }

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-10">
      <Header />

      <div className="mt-8">
        <Tabs value={active} onValueChange={setActive}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <TabsList className="rounded-2xl">
              {categories.map((c) => (
                <TabsTrigger key={c.key} value={c.key} className="rounded-2xl">
                  <span className="flex items-center gap-2">
                    {c.icon ? <c.icon className="h-4 w-4" /> : null}
                    {c.label}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search titles, tags, details..."
                className="pl-9 rounded-2xl"
              />
            </div>
          </div>

          {categories.map((c) => (
            <TabsContent key={c.key} value={c.key} className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.length === 0 ? (
                  <div className="col-span-full text-sm text-muted-foreground">
                    No matches yet. Try another term or category.
                  </div>
                ) : (
                  filtered.map((item) => (
                    <ItemCard key={item.id} item={item} onOpenPoem={openPoem} />
                  ))
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <footer className="mt-14 border-t pt-6 text-sm text-muted-foreground flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          © {new Date().getFullYear()} Akanimoh Umoren — All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-2"><Brain className="h-4 w-4" /> Data Science</span>
          <span className="inline-flex items-center gap-2"><BookText className="h-4 w-4" /> Poetry</span>
          <span className="inline-flex items-center gap-2"><Code2 className="h-4 w-4" /> Projects</span>
        </div>
      </footer>

      <Dialog open={poemOpen} onOpenChange={setPoemOpen}>
        <DialogContent className="max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle>{poemItem?.title}</DialogTitle>
            <DialogDescription>{poemItem?.summary}</DialogDescription>
          </DialogHeader>
          <pre className="whitespace-pre-wrap leading-relaxed text-base">{poemItem?.poem}</pre>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Portfolio;