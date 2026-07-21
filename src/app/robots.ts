import type { MetadataRoute } from "next";

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
