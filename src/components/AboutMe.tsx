"use client";

export default function AboutMe() {
  return (
    <section id="about" className="mt-16 grid gap-8 md:grid-cols-[auto,1fr] md:items-center">
      {/* Photo */}
      <div className="flex justify-center md:justify-start">
        <img
          src="/me.jpg" 
          alt="Akanimoh Umoren"
          className="h-40 w-40 md:h-48 md:w-48 rounded-full object-cover border shadow-sm"
        />
      </div>

      {/* Text */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">About Me</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          I am a computer science professional and student who focuses on data science,
          software engineering and design, and project management. I work across modeling,
          analysis, managing, and engineering to ship reliable, human-centered data products.
          I also have a great appreciation for arts of all kinds especially music and literature.
          I enjoy writing and reading poetry.
        </p>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Currently based in North Carolina pursuing my Masters degree in Computer Science with a
          concentraion in Data Science; open to collaboration on ML, recommender systems,
          and data storytelling projects.
          Also feel free to reach out to me to talk about music or poetry! =D
        </p>
      </div>
    </section>
  );
}
