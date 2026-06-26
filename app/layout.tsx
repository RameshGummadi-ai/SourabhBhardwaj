import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Sourabh Bhardwaj | Assistant Professor, Data Analyst & AI Researcher",
  description: "Academic Portfolio and Blog of Sourabh Bhardwaj. Assistant Professor, Data Analyst, and AI Researcher. GATE & NET Qualified. Dedicated to transforming data into insights and education into innovation.",
  keywords: [
    "Sourabh Bhardwaj", "Assistant Professor", "Data Analyst", "AI Researcher", 
    "GATE Qualified", "NET Qualified", "Machine Learning", "Deep Learning", "Data Structures", 
    "Mathematics Honours", "MCA Bundelkhand University", "Delhi University"
  ],
  authors: [{ name: "Sourabh Bhardwaj" }],
  openGraph: {
    title: "Sourabh Bhardwaj | Assistant Professor & Data Analyst",
    description: "Academic Portfolio and Blog of Sourabh Bhardwaj. Assistant Professor, Data Analyst, and AI Researcher.",
    type: "website",
    locale: "en_US",
    siteName: "Sourabh Bhardwaj Portfolio"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#0b0f19" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans bg-[#f8fafc] dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen flex flex-col transition-colors duration-200 relative`}>
        {/* Background glow effects */}
        <div className="absolute top-0 left-0 right-0 h-[600px] overflow-hidden pointer-events-none -z-10 opacity-30 dark:opacity-20">
          <div className="absolute -top-40 left-1/4 w-[400px] h-[400px] rounded-full bg-primary-500 blur-[100px]" />
          <div className="absolute -top-60 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-500 blur-[120px]" />
        </div>
        
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        
        {/* AI Chatbot Widget */}
        <AIChatbot />
      </body>
    </html>
  );
}
