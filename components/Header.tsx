"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const getActiveClass = (path: string) => {
    if (path === "/" && pathname === "/") return "active";
    if (path !== "/" && pathname?.startsWith(path)) return "active";
    return "";
  };

  return (
    <header>
      <nav className="nav-menu">
        <Link href="/" className="logo">
          LOGO
        </Link>
        <div className="nav-links">
          <Link href="/" className={`nav-item ${getActiveClass("/")}`}>
            сегодня
          </Link>
          <Link
            href="/tomorrow"
            className={`nav-item ${getActiveClass("/tomorrow")}`}
          >
            завтра
          </Link>
          <Link href="/week" className={`nav-item ${getActiveClass("/week")}`}>
            неделя
          </Link>
          
        </div>
      </nav>
    </header>
  );
}
