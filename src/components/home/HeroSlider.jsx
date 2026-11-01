"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";
import {
  BookHeart,
  BookPlus,
  CalendarClock,
  Library,
  Search,
  Sparkles,
  Users,
} from "lucide-react";

// slide
const slides = [
  {
    id: "discover",
    tag: "Your Digital Shelf",
    heading: "A Library That Fits in Your Pocket",
    description:
      "Browse a curated collection, borrow instantly, and keep every book you love organized in one cozy place.",
    cta: "Explore the library",
    href: "/books",
    image: "/slider/slide-1.avif",
    align: "left",
    accent: "bg-indigo-400/20 text-indigo-100 border-indigo-300/30",
    icon: Library,
  },
  {
    id: "borrow",
    tag: "Easy Borrowing",
    heading: "Borrow in One Click, Read for Days",
    description:
      "Pick a return date, reserve a copy, and track every borrowed book from your personal dashboard.",
    cta: "See how borrowing works",
    href: "/books",
    image: "/slider/slide-2.avif",
    align: "right",
    accent: "bg-amber-400/20 text-amber-100 border-amber-300/30",
    icon: Sparkles,
  },
  {
    id: "join",
    tag: "Community",
    heading: "Grow With an Active Reading Community",
    description:
      "Share shelf space with readers everywhere. Add your own books to the shelf and let others discover them.",
    cta: "Become a member",
    href: "/register",
    image: "/slider/slide-3.avif",
    align: "center",
    accent: "bg-emerald-400/20 text-emerald-100 border-emerald-300/30",
    icon: BookHeart,
  },
  {
    id: "share",
    tag: "Share Your Books",
    heading: "Got Books Collecting Dust? Lend Them Out",
    description:
      "List your own books in minutes and let fellow readers borrow them. Your shelf, your rules.",
    cta: "Add a book",
    href: "/add-book",
    image: "/slider/slide-4.avif",
    align: "left",
    accent: "bg-rose-400/20 text-rose-100 border-rose-300/30",
    icon: BookPlus,
  },
  {
    id: "search",
    tag: "Find Faster",
    heading: "Find Your Next Favorite Story Instantly",
    description:
      "Search by title, author, or category and jump straight to the book you have been looking for.",
    cta: "Search books",
    href: "/books",
    image: "/slider/slide-5.avif",
    align: "right",
    accent: "bg-sky-400/20 text-sky-100 border-sky-300/30",
    icon: Search,
  },
  {
    id: "track",
    tag: "Stay on Track",
    heading: "Never Miss a Return Date Again",
    description:
      "Keep an eye on everything you have borrowed and when it is due, all from one simple page.",
    cta: "My borrows",
    href: "/my-borrows",
    image: "/slider/slide-6.avif",
    align: "center",
    accent: "bg-orange-400/20 text-orange-100 border-orange-300/30",
    icon: CalendarClock,
  },
  {
    id: "readers",
    tag: "Read Together",
    heading: "Because Every Book Is Better Shared",
    description:
      "Join thousands of readers swapping stories, discovering hidden gems, and building a love for reading.",
    cta: "Join BookNook",
    href: "/register",
    image: "/slider/slide-7.avif",
    align: "left",
    accent: "bg-fuchsia-400/20 text-fuchsia-100 border-fuchsia-300/30",
    icon: Users,
  },
];

const alignClasses = {
  left: "items-start text-left",
  right: "items-end text-right",
  center: "items-center text-center",
};

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-8 pt-10 md:pt-16">
      <div className="relative">

        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
          className="!overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/10 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:bg-white/60 [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet-active]:!w-8 [&_.swiper-pagination-bullet-active]:!rounded-full [&_.swiper-pagination-bullet-active]:!bg-white [&_.swiper-pagination]:!bottom-5"
        >
          {slides.map((slide, index) => {
            const SlideIcon = slide.icon;

            return (
              <SwiperSlide key={slide.id}>
                <div className="relative flex min-h-[460px] items-center overflow-hidden bg-neutral-900 md:min-h-[580px]">
                  {/* Background image */}
                  <Image
                    src={slide.image}
                    alt={slide.heading}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
                  <div
                    className={`absolute inset-0 ${
                      slide.align === "right"
                        ? "bg-gradient-to-l"
                        : slide.align === "left"
                        ? "bg-gradient-to-r"
                        : "bg-black/20"
                    } from-black/70 via-black/20 to-transparent`}
                  />

                  {/* Content */}
                  <div
                    className={`relative z-10 flex w-full flex-col gap-5 px-6 py-20 md:px-14 ${alignClasses[slide.align]}`}
                  >
                    {/* Tag chip */}
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-md ${slide.accent}`}
                    >
                      <SlideIcon className="size-4" />
                      {slide.tag}
                    </span>

                    <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white drop-shadow-lg md:text-6xl">
                      {slide.heading}
                    </h1>

                    <p className="max-w-xl text-base text-white/80 md:text-lg">
                      {slide.description}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <Button size="lg" render={<Link href={slide.href} />}>
                        {slide.cta}
                      </Button>

                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
                        render={<Link href="/books" />}
                      >
                        Browse books
                      </Button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
