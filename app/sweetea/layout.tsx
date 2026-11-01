import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xe Điện Sweetea | Xe Điện Đông Anh",
  description: "Khám phá xe máy điện Powelldd Sweetea với thiết kế nhỏ gọn, kute và cực kỳ nữ tính. Trải nghiệm ngay tại Xe Điện Đông Anh.",
  alternates: {
    canonical: "https://xediendonganh.vn/sweetea",
  },
};

export default function SweeteaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // BỘ KHUNG SCHEMA CHUẨN SEO DÀNH RIÊNG CHO DÒNG SWEETEA
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Xe máy điện Powelldd Sweetea",
    "image": "https://xediendonganh.vn/images/vehicles/sweetea/anh-1.jpg",
    "description": "Khám phá xe máy điện Powelldd Sweetea với thiết kế nhỏ gọn, kute và cực kỳ nữ tính. Trải nghiệm ngay tại Xe Điện Đông Anh.",
    "sku": "POWELLDD-SWEETEA",
    "brand": {
      "@type": "Brand",
      "name": "Powelldd"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://xediendonganh.vn/sweetea",
      "priceCurrency": "VND",
      "price": "13800000",
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