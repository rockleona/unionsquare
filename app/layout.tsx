import type { Metadata } from "next";
import NextLink from "next/link";
import localFont from "next/font/local";
import "./globals.css";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session"
import { Button } from "@headlessui/react";
import { destroySession } from "@/app/lib/session";
import { redirect } from "next/navigation";

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

const logoutAction = async () => {
  destroySession();
  redirect('/login');
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie_store = await cookies()
  const session_cookie = cookie_store.get('session')
  const session = await decrypt(session_cookie?.value)

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
          {session &&
            <div className="flex space-x-5 items-center">
              <span>{session.username as string}</span>
              <Button onClick={}>Logout</Button>
            </div>
          }
        </div>
        {children}
      </body>
    </html>
  );
}
