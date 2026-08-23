import { Metadata } from "next";
import { notFound } from "next/navigation";
import StructuredData from "@/components/seo/StructuredData";
import { vehicles } from "@/data/vehiclesData";
import VehicleDetailView from "@/features/vehicles/VehicleDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return vehicles.map((vehicle) => ({
    id: vehicle.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return {
      title: "Vehicle Not Found | Motor Head",
    };
  }

  return {
    title: `${vehicle.name} (${vehicle.yearBuilt}) | Motor Head Vehicles`,
    description: `${vehicle.name}: ${vehicle.description}. Top speed: ${vehicle.technicalSpecs.topSpeed}. Powertrain: ${vehicle.technicalSpecs.powertrain}.`,
    alternates: { canonical: `/vehicles/${vehicle.id}` },
    openGraph: {
      title: `${vehicle.name} | Motor Head Vehicles`,
      description: vehicle.description,
      url: `https://motorhead.bmsit.ac.in/vehicles/${vehicle.id}`,
      images: vehicle.image ? [{ url: vehicle.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${vehicle.name} | Motor Head Vehicles`,
      description: vehicle.description,
    },
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    notFound();
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://motorhead.bmsit.ac.in/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Vehicles",
        item: "https://motorhead.bmsit.ac.in/vehicles",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: vehicle.name,
        item: `https://motorhead.bmsit.ac.in/vehicles/${vehicle.id}`,
      },
    ],
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: vehicle.name,
    description: vehicle.description,
    category: vehicle.category,
    image: vehicle.image,
    brand: {
      "@type": "Brand",
      name: "Motor Head",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="flex-1 w-full bg-background text-foreground pt-24 pb-20 px-4">
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={productSchema} />
      <div className="max-w-4xl mx-auto">
        <VehicleDetailView vehicle={vehicle} />
      </div>
    </main>
  );
}
