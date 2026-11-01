import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xe Điện Fancy | Xe Điện Đông Anh",
  description: "Khám phá xe máy điện Powelldd Fancy với thiết kế thời thượng, đậm chất Ý. Trải nghiệm ngay tại Xe Điện Đông Anh.",
  alternates: {
    canonical: "https://xediendonganh.vn/fancy",
  },
};

export default function FancyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Xe máy điện Powelldd Fancy",
    "image": "https://xediendonganh.vn/images/powelldd/fancy/xam-magic.png",
    "description": "Khám phá xe máy điện Powelldd Fancy với thiết kế thời thượng, đậm chất Ý. Trải nghiệm ngay tại Xe Điện Đông Anh.",
    "sku": "POWELLDD-FANCY",
    "brand": {
      "@type": "Brand",
      "name": "Powelldd"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://xediendonganh.vn/fancy",
      "priceCurrency": "VND",
      "price": "17990000",
      "priceValidUntil": "2026-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Xe Điện Đông Anh"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {children}
    </>
  );
}