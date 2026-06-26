import { ArrowUp } from "lucide-react";
import { links } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-[#07080a] py-14 text-white sm:py-20">
      <div className="site-shell">
        <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">
              Thanks for visiting.
            </h2>
            <p className="mt-6 max-w-md text-lg font-medium leading-8 text-white/35 sm:text-xl">
              I&apos;m always open to discussing new opportunities, thoughtful ideas, and interesting problems worth solving.
            </p>
          </div>

          <ul className="space-y-4 text-lg font-medium text-white/45 sm:text-xl">
            <li className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Open to internships · 2026
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-white/20" />
              Next.js &amp; Tailwind CSS
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-white/20" />
              Building useful software
            </li>
          </ul>
        </div>

        <div className="mt-16 border-t border-white/10 pt-10">
          <div className="flex flex-col gap-8 text-base font-medium text-white/25 sm:flex-row sm:items-center sm:justify-between sm:text-lg">
            <p>© 2026 Sarthak Madan</p>
            <div className="flex flex-wrap items-center gap-x-9 gap-y-4">
              <a className="transition hover:text-white/70" href={links.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="transition hover:text-white/70" href={links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="transition hover:text-white/70" href={links.email}>
                Email
              </a>
            </div>
            <a className="inline-flex items-center gap-3 transition hover:text-white/70" href="#home">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/55">
                <ArrowUp size={18} />
              </span>
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
