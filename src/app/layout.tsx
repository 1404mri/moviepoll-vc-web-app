import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Movie Night Ranked Poll",
  description: "Rank movies with friends and resolve the results with Ranked Pairs."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
