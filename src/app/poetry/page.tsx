import Link from "next/link";
import { poems } from "@/content/poetry";

export default function PoetryIndexPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Poetry</h1>
      <p className="text-muted-foreground mt-2">
        Selected poems. Click a title to read full screen.
      </p>

      <ul className="mt-8 space-y-6">
        {poems.map((p) => (
          <li key={p.slug} className="group">
            <Link href={`/poetry/${p.slug}`} className="text-lg font-semibold underline-offset-4 group-hover:underline">
              {p.title}
            </Link>
            {p.summary ? (
              <p className="text-sm text-muted-foreground mt-1">{p.summary}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
  );
}