import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://plethore-reseaux.fr"),
  title: {
    default: "Pléthore Réseaux — Ateliers barber pour salons de coiffure",
    template: "%s — Pléthore Réseaux",
  },
  description:
    "Pléthore Réseaux aide les salons de coiffure indépendants à capter la demande barber moderne grâce au diagnostic salon, au bootcamp découverte 1 jour, au bootcamp intensif 3 jours et aux options de suivi.",
};

const themeInitScript = `
try {
  var stored = localStorage.getItem("plethore-theme");
  document.documentElement.setAttribute("data-theme", stored === "dark" ? "dark" : "light");
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${manrope.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
