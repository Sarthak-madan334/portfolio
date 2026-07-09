import { ArrowUpRight, Code2, Compass, Layers3 } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const principles = [
  { icon: Compass, title: "Curiosity", text: "Understand the system before reaching for the solution.", color: "bg-[#e8f0fe] text-[#1967d2]" },
  { icon: Layers3, title: "Product sense", text: "Code should make the experience simpler—not just technically impressive.", color: "bg-[#fce8e6] text-[#c5221f]" },
  { icon: Code2, title: "Shipping", text: "Take the idea all the way from component to responsive deployment.", color: "bg-[#e6f4ea] text-[#137333]" },
];

export function About() {
  return (
    <section id="about" className="section-pad relative bg-white">
      <div className="site-shell">
        <SectionHeading number="01" eyebrow="About" title="Still learning. Already shipping." description="I’m a first-year Computer Science student at SRM University, developing strong foundations while shipping full-stack products in public." />
        <Reveal className="mt-12 rounded-[36px] bg-[#1d1d1f] p-8 sm:p-12 lg:p-16">
          <p className="max-w-5xl text-3xl font-medium leading-[1.22] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
            I like the moment when a <span className="text-[#5ac8fa]">complicated problem</span> becomes a product that feels <span className="text-[#a7f3d0]">effortless to use.</span>
          </p>
          <div className="mt-10 flex flex-col gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-end sm:justify-between"><p className="max-w-2xl text-sm leading-7 text-white/55 sm:text-base">Right now I’m sharpening DSA and systems fundamentals while exploring how modern web engineering and useful AI can create genuinely better experiences.</p><a href="#contact" className="focus-ring inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1d1d1f] transition hover:bg-[#e8f0fe]">Start a conversation <ArrowUpRight size={15} /></a></div>
        </Reveal>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {principles.map(({ icon: Icon, title, text, color }, i) => <Reveal key={title} delay={i * .07} className="group rounded-[28px] border border-black/[0.06] bg-[#f5f5f7] p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,.08)]"><span className={`grid h-12 w-12 place-items-center rounded-2xl ${color}`}><Icon size={20} /></span><h3 className="mt-14 text-xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">{title}</h3><p className="mt-3 text-sm leading-6 text-[#6e6e73]">{text}</p></Reveal>)}
        </div>
      </div>
    </section>
  );
}
