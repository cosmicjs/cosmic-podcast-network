import { Inter } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/TopNav";
import { SideBar } from "@/components/SideBar";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/cosmic/utils";
import { Footer } from "@/components/Footer";
import { cosmic } from "@/cosmic/client";
import { AuthProvider } from "@/cosmic/blocks/user-management/AuthContext";

export const revalidate = 60;
export const experimental_ppr = true;

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  const { object: globalSettings } = await cosmic.objects
    .findOne({
      type: "settings",
      slut: "settings",
    })
    .props(
      `{
      metadata {
        site_title
        description
      }
    }`
    )
    .depth(1);
  return {
    title: globalSettings.metadata.site_title,
    description: globalSettings.metadata.description,
    openGraph: {
      images: [
        "https://imgix.cosmicjs.com/daec0820-4dd1-11ef-b1ea-f56c65dfade9-podcast-network-screenshot-3.png?w=2000&auto=forat,compression",
      ],
    },
  };
}

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
        data-cosmic-bucket="podcast-network-production"
      >
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TopNav />
            <SideBar />
            <div className="md:ml-[80px] mt-[70px]">{children}</div>
            <TailwindIndicator />
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
