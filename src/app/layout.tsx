import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";
import LogoutButton from "./LogoutButton";

export const metadata: Metadata = {
  title: "Financialist App",
  description: "A simple app for The Financialist assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <header className="bg-blue-600 text-white py-4 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Financialist</h1>
            <nav>{token && <LogoutButton />}</nav>
          </div>
        </header>
        <main className="min-h-screen py-8">{children}</main>
      </body>
    </html>
  );
}
