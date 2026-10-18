import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/portfolio";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Harsh Akar — Cybersecurity · Building · Exploring",
    template: "%s — Harsh Akar",
  },
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    type: "website",
    url: site.url,
    title: "Harsh Akar — Cybersecurity · Building · Exploring",
    description: site.description,
    siteName: "Harsh Akar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Akar — Cybersecurity · Building · Exploring",
    description: site.description,
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('ha-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Harsh Akar",
              jobTitle: "Cybersecurity Practitioner",
              description: site.description,
              url: site.url,
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
