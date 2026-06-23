type Props = { number: string; eyebrow: string; title: string; description?: string };

export function SectionHeading({ number, eyebrow, title, description }: Props) {
  return (
    <div className="mb-12 grid gap-5 md:grid-cols-[1fr_0.8fr] md:items-end">
      <div>
        <p className="mb-5 flex items-center gap-3 text-sm font-medium tracking-[-0.01em] text-[#77777d]"><span className="grid h-7 min-w-7 place-items-center rounded-full bg-[#ececf0] px-2 text-[10px] font-bold text-[#55555b]">{number}</span><span>{eyebrow}</span></p>
        <h2 className="max-w-3xl text-3xl font-semibold leading-[1.04] tracking-[-0.05em] text-[#1d1d1f] sm:text-5xl">{title}</h2>
      </div>
      {description && <p className="max-w-xl text-sm leading-7 text-muted md:justify-self-end md:text-base">{description}</p>}
    </div>
  );
}
