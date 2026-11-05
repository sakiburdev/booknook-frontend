"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote } from "lucide-react";

const CommunitySection = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl border bg-[radial-gradient(100%_140%_at_0%_0%,var(--color-primary)_0%,transparent_55%)] p-[3px] before:absolute before:inset-0 before:pointer-events-none before:bg-[radial-gradient(100%_140%_at_100%_100%,var(--color-primary)_0%,transparent_55%)] before:content-[''] "
      >
        <div className="rounded-[calc(1.5rem-1px)] bg-background px-6 py-14 text-center md:px-16">
          <Quote className="mx-auto size-8 text-primary/60" />

          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold leading-snug md:text-4xl">
            &ldquo;A book borrowed today is a friend made for life.&rdquo;
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Thousands of readers keep their shelves alive on BookNook. Explore
            the collection, add your own favorites, and become part of a
            community that shares what it loves to read.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" render={<Link href="/books" />}>
              Start exploring <ArrowRight className="size-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              render={<Link href="/register" />}
            >
              Join for free
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CommunitySection;
