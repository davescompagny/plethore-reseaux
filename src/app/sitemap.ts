import type { MetadataRoute } from "next";

const BASE_URL = "https://plethore-reseaux.fr";

const ROUTES = [
  "",
  "/diagnostic",
  "/offres",
  "/impact",
  "/methode",
  "/profils/salons",
  "/profils/structures",
  "/profils/barbers",
  "/profils/debutants",
  "/a-propos",
  "/contact",
  "/faq",
  "/mentions-legales",
  "/confidentialite",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
