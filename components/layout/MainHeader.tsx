// components/layout/MainHeader.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "сегодня" },
  { href: "/tomorrow", label: "завтра" },
  { href: "/week", label: "неделя" },
];

export function MainHeader() {
  const pathname = usePathname();

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">ATMOSPHERE+</div>

        <nav className="header-tabs">
          {TABS.map((tab) => {
            const isActive =
              pathname === tab.href ||
              (tab.href !== "/" && pathname.startsWith(tab.href));

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={
                  "header-tab" + (isActive ? " header-tab--active" : "")
                }
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
