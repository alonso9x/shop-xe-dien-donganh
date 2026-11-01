import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xe Điện Hazel | Xe Điện Đông Anh",
  description: "Khám phá xe máy điện Powelldd Hazel với thiết kế tinh tế trong từng đường nét. Trải nghiệm ngay tại Xe Điện Đông Anh.",
  alternates: {
    canonical: "https://xediendonganh.vn/hazel",
  },
};

export default function HazelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Xe máy điện Powelldd Hazel",
    "image": "https://xediendonganh.vn/images/powelldd/hazel/hong-dao.png",
    "description": "Khám phá xe máy điện Powelldd Hazel với thiết kế tinh tế trong từng đường nét. Trải nghiệm ngay tại Xe Điện Đông Anh.",
    "sku": "POWELLDD-HAZEL",
    "brand": {
      "@type": "Brand",
      "name": "Powelldd"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://xediendonganh.vn/hazel",
      "priceCurrency": "VND",
      "price": "14490000",
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