import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { poems } from "@/content/poetry";

export function generateStaticParams() {
  return poems.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const poem = poems.find((p) => p.slug === slug);
  if (!poem) return { title: "Poem not found" };
  return {
    title: poem.title,
    description: poem.summary ?? poem.body.slice(0, 140),
  };
}

export default async function PoemPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const poem = poems.find((p) => p.slug === slug);
  if (!poem) return notFound();

  return (
    <main className="mx-auto max-w-3xl p-6 md:p-10">
      <nav className="mb-6 text-sm text-muted-foreground flex gap-2">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href="/poetry" className="hover:underline">Poetry</Link>
        <span>/</span>
        <span className="text-foreground">{poem.title}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{poem.title}</h1>
      {poem.summary ? <p className="text-muted-foreground mt-2">{poem.summary}</p> : null}

      <article className="mt-8">
        <pre className="whitespace-pre-wrap leading-relaxed text-lg">{poem.body}</pre>
      </article>
    </main>
  );
}


