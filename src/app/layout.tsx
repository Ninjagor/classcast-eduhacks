import "@/styles/globals.css";

import { Inter } from "next/font/google";

import DefaultNavbar from "@/components/common/Navbar/DefaultNavbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "ClassCast",
  description: "ClassCast - Educate Hacks '24",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <DefaultNavbar />
        {children}
      </body>
    </html>
  );
}