import Link from "next/link";

export function MainHeader() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="text-sm font-semibold tracking-tight">LOGO</div>

        <div className="inline-flex items-center rounded-full border border-neutral-700 bg-neutral-900/60 text-xs uppercase tracking-wide">
          <Link
            href="/"
            className="rounded-full bg-[#0b1f3f] px-4 py-1.5 text-[#c8ccd1]"
          >
            сегодня
          </Link>
          <Link
            href="/tomorrow"
            className="px-4 py-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-50"
          >
            завтра
          </Link>
          <Link
            href="/week"
            className="px-4 py-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-50"
          >
            неделя
          </Link>
          <Link
            href="/month"
            className="px-4 py-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-50"
          >
            месяц
          </Link>
        </div>
      </div>
    </header>
  );
}
