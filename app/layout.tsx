import type { ReactNode } from "react";
import "./globals.css";
import { MainHeader } from "@/components/layout/MainHeader";

export const metadata = {
  title: "Погода",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="layout-root">
        <div className="layout-shell">
          <MainHeader />
          <main className="layout-main">
            <div className="layout-container">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
