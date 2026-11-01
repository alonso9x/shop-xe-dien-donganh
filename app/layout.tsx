import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xediendonganh.vn"),
  title: {
    default: "Xe Điện Đông Anh | Kỷ Nguyên Di Chuyển Mới",
    template: "%s | Xe Điện Đông Anh",
  },
  description:
    "Đại lý phân phối xe máy điện, xe đạp điện chính hãng hàng đầu tại Đông Anh, Hà Nội. Trải nghiệm các dòng xe thời thượng Powelldd, TMT với giá tốt nhất.",
  applicationName: "Xe Điện Đông Anh",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://xediendonganh.vn/",
    siteName: "Xe Điện Đông Anh",
    title: "Xe Điện Đông Anh | Kỷ Nguyên Di Chuyển Mới",
    description:
      "Đại lý phân phối xe máy điện, xe đạp điện chính hãng tại Đông Anh. Trải nghiệm các mẫu xe điện công nghệ cao, thiết kế đón đầu xu hướng.",
    images: [
      {
        url: "/images/banner/banner-seo(3).png",
        width: 1200,
        height: 630,
        alt: "Xe Điện Đông Anh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xe Điện Đông Anh | Kỷ Nguyên Di Chuyển Mới",
    description:
      "Đại lý phân phối xe máy điện, xe đạp điện chính hãng tại khu vực Đông Anh, Hà Nội.",
    images: ["/images/banner/banner-seo(3).png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://xediendonganh.vn/#website",
      "url": "https://xediendonganh.vn/",
      "name": "Xe Điện Đông Anh",
      "alternateName": [
        "xediendonganh.vn"
      ],
      "publisher": {
        "@id": "https://xediendonganh.vn/#store"
      }
    },
    {
      "@type": "MotorcycleDealer",
      "@id": "https://xediendonganh.vn/#store",
      "name": "Xe Điện Đông Anh",
      "url": "https://xediendonganh.vn/",
      "telephone": "0582376666",
      "priceRange": "10.000.000đ - 20.500.000đ",
      "hasMap": "https://maps.app.goo.gl/TMF9s4ZiED3EdCGm9",
      "logo": {
        "@type": "ImageObject",
        "url": "https://xediendonganh.vn/favicon.ico"
      },
      "image": [
        "https://xediendonganh.vn/images/banner/banner-seo(1).png",
        "https://xediendonganh.vn/images/banner/banner-seo(2).png",
        "https://xediendonganh.vn/images/banner/banner-seo(3).png",
        "https://xediendonganh.vn/images/banner/banner-seo(4).png"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Đông Anh",
        "addressLocality": "Đông Anh",
        "addressRegion": "Hà Nội",
        "addressCountry": "VN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 21.136668629210686,
        "longitude": 105.84370208948461
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "08:00",
        "closes": "21:00"
      },
      "sameAs": [
        "https://www.facebook.com/xemaydientuonglai",
        "https://vt.tiktok.com/ZSqxquYYX/"
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={montserrat.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}