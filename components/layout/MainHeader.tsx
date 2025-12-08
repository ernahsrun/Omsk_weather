// components/layout/MainHeader.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainHeader() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">ATMOSPHERE+ </div>

        <div className="header-tabs">
          <Link
            href="/"
            className={
              "header-tab" + (isActive("/") ? " header-tab--active" : "")
            }
          >
            сегодня
          </Link>
          <Link
            href="/tomorrow"
            className={
              "header-tab" +
              (isActive("/tomorrow") ? " header-tab--active" : "")
            }
          >
            завтра
          </Link>
          <Link
            href="/week"
            className={
              "header-tab" + (isActive("/week") ? " header-tab--active" : "")
            }
          >
            неделя
          </Link>
        </div>
      </div>
    </header>
  );
}
