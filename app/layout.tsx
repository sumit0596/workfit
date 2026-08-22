import type { Metadata, Viewport } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import Loader from "@/components/loader/loader";
import RouteManager from "@/components/ui/RouteManager";
import { ToastProvider } from "@/components/ui/ToastContext";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
        <ToastProvider>
          <Loader>
            {children}
          </Loader>
        </ToastProvider>
      </body>
    </html>
  );
}