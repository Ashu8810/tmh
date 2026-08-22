import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://motorhead.bmsit.ac.in';

  const routes = [
    '',
    '/about',
    '/team',
    '/vehicles',
    '/events',
    '/resources',
    '/reports',
    '/media',
    '/support-us',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
