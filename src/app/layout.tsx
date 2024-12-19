import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner"; // Import the toast provider

import "./globals.css";

// Import Poppins Font
const poppins = Poppins({
  variable: "--font-poppins", // CSS variable for font
  subsets: ["latin"], // Font subsets to use
  weight: ["300", "400", "500", "600", "700"], // Font weight variations
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
      <body className={`${poppins.variable} antialiased`}>
        <Toaster position="bottom-right" richColors/>
        {children}
      </body>
    </html>
  );
}
  