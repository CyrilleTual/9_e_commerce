import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "e commerce web site ",
  description: "my little web site ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
