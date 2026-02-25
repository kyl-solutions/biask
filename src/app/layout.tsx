import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ab83e0-20260225-demo-biask.pages.dev"),
  title: "biask — Israel / Palestine",
  description:
    "Understanding conflict through both sides. Contributors who disagree agree on the facts.",
  openGraph: {
    title: "biask — Israel / Palestine",
    description:
      "Contributors who disagree about the conflict agree on what actually happened. Explore the consensus.",
    type: "website",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "biask — Israel / Palestine: Contributors who disagree agree on the facts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "biask — Israel / Palestine",
    description:
      "Contributors who disagree about the conflict agree on what actually happened.",
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
