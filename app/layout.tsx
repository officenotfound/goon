import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Go On PR",
  description: "Private communications for artists, institutions, and collectors.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
