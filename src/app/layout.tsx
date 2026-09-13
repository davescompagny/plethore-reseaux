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
    default: "Pléthore Réseaux — Profils de coiffeurs pour renforcer votre salon",
    template: "%s — Pléthore Réseaux",
  },
  description:
    "Pléthore Réseaux propose aux salons de coiffure indépendants des profils de coiffeurs en montée de compétences pour renforcer leurs équipes : alternants, stagiaires, employés. En complément : diagnostic salon et ateliers de pratique.",
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
