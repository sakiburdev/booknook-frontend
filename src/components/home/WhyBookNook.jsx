"use client";
import { motion } from "framer-motion";
import { BookHeart, BookPlus, Library, MousePointerClick } from "lucide-react";

const features = [
  {
    icon: MousePointerClick,
    title: "Easy book borrowing",
    description:
      "Reserve any available copy in one click and pick your own return date — no queues, no paperwork.",
  },
  {
    icon: Library,
    title: "Wide book collection",
    description:
      "From programming and history to fantasy and biographies — a growing shelf for every kind of reader.",
  },
  {
    icon: BookPlus,
    title: "Simple library management",
    description:
      "Add, update, and remove your own books at any time. Copies update automatically as people borrow.",
  },
  {
    icon: BookHeart,
    title: "Convenient reading experience",
    description:
      "Your borrows, your books, and your return dates live together in a clear dashboard you will love.",
  },
];

const WhyBookNook = () => {
  return (
    <section className="border-y bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <p className="text-sm font-medium text-primary">Why readers stay</p>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">
            Why Choose BookNook?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
            A small library designed to feel effortless — borrowing, managing,
            and reading all in one flow.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeInOut",
                }}
                viewport={{ once: true }}
                className="rounded-2xl border bg-background p-6 transition-shadow hover:shadow-lg hover:shadow-primary/10  "
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                  <FeatureIcon className="size-5 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">{feature.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyBookNook;
