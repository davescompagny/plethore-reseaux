import { Eyebrow } from "@/components/ui/Tag";
import { AccordionItem } from "@/components/ui/Accordion";
import { FAQ_ITEMS } from "@/lib/site-content";

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-20 border-y border-line bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-[760px] px-5">
        <div className="mb-9 text-center">
          <Eyebrow>
            <span className="mx-auto">Questions fréquentes</span>
          </Eyebrow>
          <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold tracking-tight">
            Ce que l&apos;on nous demande le plus souvent.
          </h2>
        </div>
        <div className="grid gap-2.5">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem key={item.question} question={item.question} answer={item.answer} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
