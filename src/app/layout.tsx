import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

// Import Poppins Font
const poppins = Poppins({
  variable: "--font-poppins", // CSS variable untuk font
  subsets: ["latin"], // Subset font yang ingin digunakan
  weight: ["300", "400", "500", "600", "700"], // Variasi font weight yang diperlukan
});

export const metadata: Metadata = {
  title: "DoNation",
  description: "Landing page donation platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}