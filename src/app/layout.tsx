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
      <body className="flex flex-col items-center justify-center w-full h-screen bg-slate-800">
        {children}
      </body>
    </html>
  );
}
