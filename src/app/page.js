import CommunitySection from "@/components/home/CommunitySection";
import HeroSlider from "@/components/home/HeroSlider";
import { Suspense } from "react";

// Hero slider loading fallback
function HeroFallback() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-8 pt-10 md:pt-16">
      <div className="flex min-h-[460px] items-center justify-center rounded-3xl border bg-muted md:min-h-[580px]">
        <span className="size-10 animate-spin rounded-full border-2 border-muted-foreground border-t-primary" />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Suspense fallback={<HeroFallback />}>
        <HeroSlider />
      </Suspense>

      <CommunitySection />

    </main>
  );
}
