"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/poetry", label: "Poetry" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          Akanimoh Umoren
        </Link>

        <nav className="flex items-center gap-2">
          {links.map((l) => {
            const active =
              pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Button
                key={l.href}
                asChild
                variant={active ? "default" : "ghost"}
                className="rounded-2xl"
              >
                <Link href={l.href}>{l.label}</Link>
              </Button>
            );
          })}
          {/*Theme toggle button */}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
