import { MetadataRoute } from "next";
import { mediaItems } from "@/data/mediaData";
import { vehicles } from "@/data/vehiclesData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://motorhead.bmsit.ac.in";

  const staticRoutes = [
    "",
    "/about",
    "/team",
    "/vehicles",
    "/events",
    "/resources",
    "/reports",
    "/media",
    "/support-us",
    "/contact",
    "/join",
  ];

  const staticSitemapEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1 : 0.8,
  }));

  const mediaSitemapEntries = mediaItems.map((item) => ({
    url: `${baseUrl}/media/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const vehicleSitemapEntries = vehicles.map((vehicle) => ({
    url: `${baseUrl}/vehicles/${vehicle.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticSitemapEntries,
    ...mediaSitemapEntries,
    ...vehicleSitemapEntries,
  ];
}
