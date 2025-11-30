// app/layout.tsx
import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Погода",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <div className="app-root">
          <header className="app-header">
            <div className="logo">LOGO</div>

            <nav className="main-nav">
              {/* Use real <Link> from next/link in real project */}
              <a href="/today">сегодня</a>
              <a href="/tomorrow">завтра</a>
              <a href="/week">неделя</a>
              <a href="/month">месяц</a>
              
            
            </nav>
          </header>

          <main className="app-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
