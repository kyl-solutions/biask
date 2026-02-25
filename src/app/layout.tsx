import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://biask.kyl.solutions"),
  title: {
    default: "biask — Interrogate Your Bias",
    template: "%s | biask",
  },
  description:
    "Structured disagreement on the issues that divide us. Not who is right — why each side believes what it does.",
  openGraph: {
    title: "biask — Interrogate Your Bias",
    description:
      "Contributors who disagree agree on the facts. Explore conflicts through both sides.",
    type: "website",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "biask — Interrogate Your Bias",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "biask — Interrogate Your Bias",
    description:
      "Contributors who disagree agree on the facts. Explore conflicts through both sides.",
    images: ["/og.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-page-bg font-[--font-body] text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
