"use client";

type SkillCategory = {
  title: string;
  items: string[];
};

const SKILLS: SkillCategory[] = [
  {
    title: "Languages",
    items: ["Python", "SQL", "TypeScript/JavaScript", "Java"],
  },
  {
    title: "ML / Data",
    items: ["PyTorch", "scikit-learn", "Pandas", "NumPy", "Jupyter"],
  },
  {
    title: "Data Ops",
    items: ["DBT (basics)", "Airflow (basics)", "PostgreSQL", "BigQuery"],
  },
  {
    title: "Web / Infra",
    items: ["Next.js", "Vercel", "Docker (basics)", "Git/GitHub"],
  },
  {
    title: "Recsys / Signals",
    items: ["Graph walks", "Embedding search", "Ranking metrics (MAP@K, NDCG)"],
  },
  {
    title: "Project Management",
    items: ["Asana", "Agile Methodologies", "Scrum Methodologies"]
  },
  {
    title: "Strengths",
    items:["Critical thinking", "Statistics", "Communication", "Adaptability"]
  }
];

export default function SkillsGrid() {
  return (
    <section id="skills" className="mt-16">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Skills</h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((block) => (
          <div
            key={block.title}
            className="rounded-2xl border p-5 bg-card text-card-foreground shadow-sm"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {block.title}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {block.items.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center rounded-xl border px-2.5 py-1 text-xs text-foreground/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
