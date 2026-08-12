import type { MetadataRoute } from "next";

export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/demo", "/inscription", "/connexion", "/mot-de-passe-oublie", "/confirmation-email"],
    },
    sitemap: "https://plethore-reseaux.fr/sitemap.xml",
  };
}
