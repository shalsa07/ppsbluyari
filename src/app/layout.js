import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExperienceContextProvider from "@/libs/contextProviders/experienceContext";
import WhatsAppComponent from "@/components/WhatsAppComponent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PPSBluyari",
  description: "property developers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ExperienceContextProvider>
          <Navbar/>
          <Footer/>
          {children}
          <WhatsAppComponent/>
        </ExperienceContextProvider>
      </body>
    </html>
  );
}
