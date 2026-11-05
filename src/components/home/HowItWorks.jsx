"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookPlus, LibraryBig, Undo2 } from "lucide-react";

// হোমপেজে "কীভাবে কাজ করে" ধাপগুলো — Real link সহ
const steps = [
  {
    icon: LibraryBig,
    step: "Step 1",
    title: "Browse the shelf",
    description:
      "Search, filter, and sort the whole collection to find the book you have been looking for.",
    cta: "Explore books",
    href: "/books",
  },
  {
    icon: BookPlus,
    step: "Step 2",
    title: "Borrow or share",
    description:
      "Reserve an available copy with your own return date — or add your own books for others to enjoy.",
    cta: "Add a book",
    href: "/add-book",
  },
  {
    icon: Undo2,
    step: "Step 3",
    title: "Track & return",
    description:
      "See everything you have borrowed in one dashboard and return it to free a copy for the next reader.",
    cta: "My borrows",
    href: "/my-borrows",
  },
];

const HowItWorks = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10 text-center">
        <p className="text-sm font-medium text-primary">Simple by design</p>
        <h2 className="mt-1 text-3xl font-bold md:text-4xl">
          How BookNook Works
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
          Three easy steps between you and your next great read.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {steps.map((item, index) => {
          const StepIcon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: "easeInOut",
              }}
              viewport={{ once: true }}
              className="flex flex-col rounded-2xl border bg-background p-6 transition-shadow hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <StepIcon className="size-5 text-primary" />
                </div>

                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {item.step}
                </span>
              </div>

              <h3 className="mt-4 font-semibold">{item.title}</h3>

              <p className="mt-1.5 text-sm text-muted-foreground">
                {item.description}
              </p>

              <Button
                variant="outline"
                size="sm"
                className="mt-5 w-fit"
                render={<Link href={item.href} />}
              >
                {item.cta}
                <ArrowRight className="size-4" />
              </Button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
