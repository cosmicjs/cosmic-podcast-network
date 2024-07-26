import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/TopNav";
import { SideBar } from "@/components/SideBar";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/cosmic/utils";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cosmic Podcast Network",
  description: "A podcast network example website built with the Cosmic CMS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-white dark:bg-black dark:text-gray-400 text-gray-900",
          inter.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TopNav />
          <SideBar />
          <div className="md:ml-[80px] mt-[70px]">{children}</div>
          <TailwindIndicator />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
