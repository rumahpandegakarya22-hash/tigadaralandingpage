import type { LandingData } from "@/lib/data";
import {
  SITE_URL,
  REGION,
  absoluteUrl,
  buildPropertyDescription,
  formatPriceId,
  getGeo,
  getPostalCode,
} from "@/lib/seo";

export function JsonLd({ data }: { data: LandingData }) {
  const { property, faqs, rooms, facilities, galleryPhotos } = data;
  const pageUrl = `${SITE_URL}/${property.id}`;
  const prices = rooms.map((r) => r.price);
  const minPrice = prices.length ? Math.min(...prices) : undefined;
  const maxPrice = prices.length ? Math.max(...prices) : undefined;

  const images = [property.heroPhotoUrl, ...galleryPhotos.map((p) => p.src)]
    .filter(Boolean)
    .slice(0, 6)
    .map((src) => absoluteUrl(src));
  const geo = getGeo(property);

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Kost Tiga Dara",
      inLanguage: "id-ID",
    },
    {
      "@type": "LodgingBusiness",
      "@id": `${pageUrl}#lodging`,
      name: property.name,
      description: buildPropertyDescription(property, rooms, facilities),
      url: pageUrl,
      mainEntityOfPage: pageUrl,
      image: images.length ? images : undefined,
      telephone: property.phoneDisplay,
      address: {
        "@type": "PostalAddress",
        streetAddress: property.address,
        addressLocality: property.city,
        addressRegion: REGION,
        postalCode: getPostalCode(property),
        addressCountry: "ID",
      },
      geo: geo ? { "@type": "GeoCoordinates", ...geo } : undefined,
      hasMap: property.mapsUrl || undefined,
      priceRange:
        minPrice && maxPrice
          ? `${formatPriceId(minPrice)} - ${formatPriceId(maxPrice)}`
          : undefined,
      amenityFeature: facilities.map((f) => ({
        "@type": "LocationFeatureSpecification",
        name: f.name,
        value: true,
      })),
      makesOffer: rooms.map((room) => ({
        "@type": "Offer",
        name: room.name,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: room.price,
          priceCurrency: "IDR",
          unitText: "MONTH",
        },
        itemOffered: { "@type": "HotelRoom", name: room.name },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: property.name, item: pageUrl },
      ],
    },
    ...(faqs.length
      ? [
          {
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          },
        ]
      : []),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
          /</g,
          "\u003c"
        ),
      }}
    />
  );
}
