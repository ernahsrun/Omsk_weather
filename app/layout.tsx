import type { ReactNode } from "react";
import "./globals.css";
import { MainHeader } from "@/components/layout/MainHeader";

export const metadata = {
  title: "Погода",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen">
        <div className="flex min-h-screen flex-col">
          <MainHeader />
          <main className="flex-1">
            <div className="mx-auto max-w-5xl px-6 py-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
