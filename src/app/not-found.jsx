import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, BookX, ChevronsLeft } from "lucide-react";

// Custom 404 page
export default function NotFound() {
  return (
    <div className="relative mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-24 text-center">
      {/* Loose glow */}
      <div className="pointer-events-none absolute top-8 size-64 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative">
        <p className="bg-gradient-to-br from-primary to-primary/40 bg-clip-text text-[8rem] font-bold leading-none text-transparent md:text-[10rem]">
          404
        </p>
        <BookX className="mx-auto -mt-6 size-14 text-primary/50" />
      </div>

      <h1 className="mt-6 text-2xl font-bold md:text-3xl">
        This page has gone missing from the shelf
      </h1>

      <p className="mt-3 max-w-md text-muted-foreground">
        The page you are looking for was borrowed and never returned — or it
        never existed. Let&apos;s get you back to the books.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" render={<Link href="/" />}>
        <ChevronsLeft /> Back to Home
        </Button>

        <Button size="lg" variant="outline" render={<Link href="/books" />}>
         <BookOpen className="size-4" /> Explore Books
        </Button>
      </div>
    </div>
  );
}
