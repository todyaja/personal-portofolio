import type { Metadata, Viewport } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import Navigation from "@/components/Navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://todyprasetya.dev";

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel-heading",
  display: "swap",
});

const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel-body",
  display: "swap",
});

const ogImage = "/assets/branding/tody_logo_bg_removed.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tody Prasetya | Backend Engineer",
    template: "%s | Tody Prasetya",
  },
  description:
    "Pixel-art portfolio of Tody Prasetya — Backend/Full Stack Engineer specializing in Go, JavaScript, Java, TypeScript, PostgreSQL, SQL Server",
  keywords: [
    "Backend Engineer",
    "Full Stack Developer",
    "Go",
    "JavaScript",
    "Java",
    "TypeScript",
    "PostgreSQL",
    "Portfolio",
  ],
  authors: [{ name: "Tody Prasetya", url: SITE_URL }],
  creator: "Tody Prasetya",
  publisher: "Tody Prasetya",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tody Prasetya | Backend Engineer",
    description:
      "Pixel-art portfolio — Backend/Full Stack Engineer specializing in Go, JavaScript, Java, TypeScript, PostgreSQL",
    type: "website",
    locale: "en_US",
    siteName: "Tody Prasetya Portfolio",
    url: SITE_URL,
    images: [
      {
        url: ogImage,
        width: 512,
        height: 512,
        alt: "Tody Prasetya — Backend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tody Prasetya | Backend Engineer",
    description:
      "Pixel-art portfolio — Backend/Full Stack Engineer specializing in Go, JavaScript, Java, TypeScript, PostgreSQL",
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1a2e",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tody Prasetya",
  jobTitle: "Backend Engineer",
  email: "mailto:todyprasetya@gmail.com",
  url: SITE_URL,
  image: `${SITE_URL}${ogImage}`,
  knowsAbout: [
    "Go",
    "JavaScript",
    "Java",
    "TypeScript",
    "PostgreSQL",
    "SQL Server",
    "Backend Engineering",
    "Full Stack Development",
  ],
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={pressStart2P.variable + " " + vt323.variable}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="pixel-skip-link">Skip to main content</a>
        <LoadingSpinner />
        <Navigation />
        <div className="pixel-container">
          <main id="main-content">
            {children}
          </main>
          <div className="pixel-scanline" aria-hidden="true" />
        </div>
      </body>
    </html>
  );
}
