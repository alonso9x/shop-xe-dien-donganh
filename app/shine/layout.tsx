import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xe Điện Shine | Xe Điện Đông Anh",
  description: "Khám phá xe máy điện Powelldd Shine pro, dẫn đầu xu hướng, tỏa sáng cá tính! Trải nghiệm ngay tại Xe Điện Đông Anh.",
  alternates: {
    canonical: "https://xediendonganh.vn/shine",
  },
};

export default function ShineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Xe máy điện Powelldd Shine Pro",
    "image": "https://xediendonganh.vn/images/vehicles/shine-pro/anh-1.jpg",
    "description": "Khám phá xe máy điện Powelldd Shine pro, dẫn đầu xu hướng, tỏa sáng cá tính! Trải nghiệm ngay tại Xe Điện Đông Anh.",
    "sku": "POWELLDD-SHINE-PRO",
    "brand": {
      "@type": "Brand",
      "name": "Powelldd"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://xediendonganh.vn/shine",
      "priceCurrency": "VND",
      "price": "14990000",
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