import type { Metadata } from "next";
import { inter, inknut } from "./fonts";
import { cn } from "@/lib/utils"
import "./globals.css";
import Template from "./template"

export const metadata: Metadata = {
  title: "Ohmni Web Technologies",
  description: "A web development company that specializes in building custom web applications for business and marketing teams.",
  openGraph: {
    images: ['https://cdn.sanity.io/images/wq2mbvrt/production/e9827ee6bccd36318a9e09b113024f281b234966-1026x514.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-inter", inter.variable, "font-inknut", inknut.variable)}>
      <body className="min-h-screen antialiased">
        <Template>
          {children}
        </Template>
      </body>
    </html>
  );
}
