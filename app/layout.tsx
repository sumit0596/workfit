import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import Loader from "@/components/loader/loader";
import RouteManager from "@/components/ui/RouteManager";
// 1. Import your new Loader component


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ActiveX Gym", 
  description: "Track your fitness journey",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const headersList = await headers();
  const rawPath = headersList.get("x-url") || ""; 
  const activePath = rawPath.replace(/^\/+/, ""); 
  const routeClass = activePath === "/" ? "homePage" : activePath;
  
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`min-h-full flex flex-col`}>
        {/* 2. Wrap your children with the Loader context */}
        <RouteManager />
        <Loader>
          {children}
        </Loader>
      </body>
    </html>
  );
}