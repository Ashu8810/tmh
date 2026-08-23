import { Metadata } from "next";
import { notFound } from "next/navigation";
import { vehicles } from "@/data/vehiclesData";
import VehicleDetailView from "@/features/vehicles/VehicleDetailView";
import StructuredData from "@/components/seo/StructuredData";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vehicle = vehicles.find((v) => v.id === params.id);

  if (!vehicle) {
    return {
      title: "Vehicle Not Found | Motor Head",
    };
  }

  return {
    title: `${vehicle.name} | Student Vehicle | Motor Head`,
    description: vehicle.description,
    alternates: { canonical: `/vehicles/${vehicle.id}` },
    openGraph: {
      title: `${vehicle.name} | Motor Head`,
      description: vehicle.description,
      url: `https://motorhead.bmsit.ac.in/vehicles/${vehicle.id}`,
      images: vehicle.image ? [{ url: vehicle.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${vehicle.name} | Motor Head`,
      description: vehicle.description,
    },
  };
}

export function generateStaticParams() {
  return vehicles.map((vehicle) => ({
    id: vehicle.id,
  }));
}

export default function VehicleDetailPage({ params }: Props) {
  const vehicle = vehicles.find((v) => v.id === params.id);

  if (!vehicle) {
    notFound();
  }

  const vehicleSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: vehicle.name,
    description: vehicle.description,
    image: vehicle.image,
    brand: {
      "@type": "Organization",
      name: "Motor Head",
    },
  };

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

  return (
    <main className="flex-1 w-full bg-background text-foreground pt-24 pb-20 px-4">
      <StructuredData data={vehicleSchema} />
      <StructuredData data={breadcrumbSchema} />
      <div className="max-w-4xl mx-auto">
        <VehicleDetailView vehicle={vehicle} />
      </div>
    </main>
  );
}
