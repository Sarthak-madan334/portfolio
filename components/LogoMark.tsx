export function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`relative grid shrink-0 place-items-center overflow-hidden rounded-[12px] border border-black/[0.08] bg-white shadow-[0_8px_20px_rgba(0,0,0,.08)] ${compact ? "h-10 w-10" : "h-12 w-12"}`}>
      <svg viewBox="0 0 40 40" className="relative h-7 w-7" aria-hidden="true">
        <path d="M27 10.5H17c-3.5 0-6 2.1-6 5 0 2.7 1.9 4.2 5.4 4.8l5.2.9c3.4.6 5.1 2.1 5.1 4.7 0 3.2-2.8 5.4-7.1 5.4H10" fill="none" stroke="#1d1d1f" strokeWidth="4" strokeLinecap="round" />
        <path d="M31 10.5v20" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <span className="absolute right-[5px] top-[5px] h-1.5 w-1.5 rounded-full bg-[#34c759]" />
    </span>
  );
}
