import type { Metadata } from "next";
import NextLink from "next/link";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "UnionSquare",
  description: "An example of a Next.js app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-full h-20 px-5 py-3 flex flex-row place-content-between">
          <div className="flex flex-row space-x-5 items-center">
            <h1 className="text-lg font-bold">UnionSquare</h1>
            <NextLink href="/">Dashboard</NextLink>
            <NextLink href="/performance">Performance Review</NextLink>
            <NextLink href="/employees">Employees</NextLink>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
