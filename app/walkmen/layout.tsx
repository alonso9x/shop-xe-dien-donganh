import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xe Điện Walkmen | Xe Điện Đông Anh",
  description: "Khám phá xe máy điện Powelldd Walkmen với thiết kế kiểu dáng thể thao, góc cạnh với những đường nét mạnh mẽ. Trải nghiệm ngay tại Xe Điện Đông Anh.",
  alternates: {
    canonical: "https://xediendonganh.vn/walkmen",
  },
};

export default function WalkmenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // BỘ KHUNG SCHEMA CHUẨN SEO DÀNH RIÊNG CHO DÒNG WALKMEN
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Xe máy điện Powelldd Walkmen",
    // Link ảnh lấy chính xác theo cấu trúc: thư mục vehicles và đuôi .JPG viết hoa (nếu có)
    "image": "https://xediendonganh.vn/images/vehicles/walkmen/gallery/anh(7).jpg",
    "description": "Khám phá xe máy điện Powelldd Walkmen với thiết kế kiểu dáng thể thao, góc cạnh với những đường nét mạnh mẽ. Trải nghiệm ngay tại Xe Điện Đông Anh.",
    "sku": "POWELLDD-WALKMEN",
    "brand": {
      "@type": "Brand",
      "name": "Powelldd"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://xediendonganh.vn/walkmen",
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