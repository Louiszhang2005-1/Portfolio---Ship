import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Isle Commander | Mechanical Engineering Portfolio",
  description:
    "Navigate the seas and discover engineering projects in this interactive, game-like portfolio. Drive a steamboat between islands to explore internships, aerospace, robotics, and AI projects.",
  openGraph: {
    title: "Isle Commander — The Kinetic Odyssey",
    description:
      "A playable nautical portfolio. Sail between islands to discover engineering projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-[var(--color-background)]">
        {children}
      </body>
    </html>
  );
}
