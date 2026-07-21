import Link from "next/link";
import { HERO } from "@/lib/site-content";
import { PortalPreview } from "./PortalPreview";

export function Hero() {
  return (
    <section
      className="border-b border-black/20 py-16 text-white sm:py-24"
      style={{
        background:
          "linear-gradient(110deg, rgba(21,63,53,.93), rgba(12,13,12,.86)), radial-gradient(circle at 80% 20%, rgba(155,107,53,.38), transparent 32%)",
      }}
    >
      <div className="mx-auto grid max-w-[1160px] items-center gap-10 px-5 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
        <div className="min-w-0">
          <span className="mb-4 inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.11em] text-[#cde4da] before:h-0.5 before:w-8 before:bg-bronze">
            {HERO.eyebrow}
          </span>
          <h1 className="mb-5 max-w-xl text-[clamp(2.3rem,5.5vw,4.4rem)] leading-[1.05] font-extrabold tracking-tight">
            {HERO.title}
          </h1>
          <p className="mb-7 max-w-lg text-lg text-white/80">{HERO.description}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={HERO.ctaPrimary.href}
              className="focus-ring inline-flex min-h-12 items-center justify-center rounded-lg bg-bronze px-5 font-extrabold text-white hover:bg-bronze-strong"
            >
              {HERO.ctaPrimary.label}
            </Link>
            <Link
              href={HERO.ctaSecondary.href}
              className="focus-ring inline-flex min-h-12 items-center justify-center rounded-lg bg-white px-5 font-extrabold text-black hover:bg-bronze-soft"
            >
              {HERO.ctaSecondary.label}
            </Link>
          </div>
        </div>
        <PortalPreview />
      </div>
    </section>
  );
}
