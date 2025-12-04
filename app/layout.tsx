import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Погода в Омске",
  description: "Прогноз погоды в Омске",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <div className="container">
          <Header />
          <main className="weather-container">{children}</main>
        </div>
      </body>
    </html>
  );
}
