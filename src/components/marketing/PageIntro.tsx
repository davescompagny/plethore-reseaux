import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-black/20 py-16 text-white sm:py-20"
      style={{
        background:
          "linear-gradient(110deg, rgba(21,63,53,.93), rgba(12,13,12,.86)), radial-gradient(circle at 80% 20%, rgba(155,107,53,.32), transparent 32%)",
      }}
    >
      <div className="mx-auto max-w-[1160px] px-5">
        <span className="mb-4 inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.11em] text-[#cde4da] before:h-0.5 before:w-8 before:bg-bronze">
          {eyebrow}
        </span>
        <h1 className="mb-4 max-w-2xl text-[clamp(2rem,4.5vw,3.4rem)] font-extrabold tracking-tight">{title}</h1>
        {description ? <p className="max-w-xl text-lg text-white/78">{description}</p> : null}
        {children}
      </div>
    </section>
  );
}
