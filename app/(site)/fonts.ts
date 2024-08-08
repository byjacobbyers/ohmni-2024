import { Inknut_Antiqua, Inter } from "next/font/google";

export const inknut = Inknut_Antiqua({
  subsets: ['latin'],
  weight: '600',
  display: 'swap',
  variable: "--font-inknut",  
})

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-inter",
})