import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { Clock, ArrowRight, MapPin, Phone, ArrowLeft } from "lucide-react";
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Tin Tức & Sự Kiện Xe Điện | Xe Điện Đông Anh",
  description: "Cập nhật tin tức mới nhất về thị trường xe điện, các mẹo sử dụng xe bền bỉ và chương trình khuyến mãi hấp dẫn từ Hệ thống Xe điện Đông Anh.",
  alternates: {
    canonical: "https://xediendonganh.vn/tin-tuc",
  },
  openGraph: {
    title: "Tin Tức & Sự Kiện Xe Điện | Xe Điện Đông Anh",
    description: "Cập nhật tin tức mới nhất, mẹo hay và khuyến mãi xe điện.",
    url: "https://xediendonganh.vn/tin-tuc",
  }
};

const elegantFont = Plus_Jakarta_Sans({ 
  subsets: ["latin", "vietnamese"], 
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
});

async function getNewsData() {
  try {
    let filePath = path.join(process.cwd(), 'public', 'newsData.json');
    if (!fs.existsSync(filePath)) {
      filePath = '/var/www/shop-xe-dien-donganh/public/newsData.json';
    }
    
    if (!fs.existsSync(filePath)) return [];
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    const rawItems = Array.isArray(data) ? data : [data];
    
    return rawItems.map((item: any, index: number) => {
      let finalImage = item.imageUrl || item.image || "/images/default-news.jpg";
      if (finalImage && !finalImage.startsWith('http') && !finalImage.startsWith('/')) {
        finalImage = '/' + finalImage;
      }

      return {
        id: item.id || `bai-viet-${index + 1}`,
        category: item.category || "Hot Trend",
        image: finalImage,
        date: item.createdAt ? new Date(item.createdAt).toLocaleDateString('vi-VN') : (item.date || "Vừa cập nhật"),
        title: item.title || "Tin tức xe điện mới nhất",
        excerpt: item.excerpt || ""
      };
    });
  } catch (error) {
    console.error("Lỗi đồng bộ dữ liệu JSON:", error);
    return [];
  }
}

export default async function NewsPage() {
  const newsList = await getNewsData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Tin Tức Xe Điện Đông Anh",
    "url": "https://xediendonganh.vn/tin-tuc",
    "description": "Cập nhật tin tức mới nhất về thị trường xe điện, các mẹo sử dụng xe bền bỉ."
  };

  return (
    <main className={`min-h-screen bg-white text-slate-800 ${elegantFont.className} overflow-x-hidden font-light`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="fixed w-full top-0 bg-white/90 backdrop-blur-md z-50 border-b border-slate-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity">
            <h1 className="text-2xl font-extrabold tracking-wider uppercase text-slate-900 leading-none">Đông Anh</h1>
            <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase mt-1">Xe điện tương lai</span>
          </Link>
          
          <nav className="hidden lg:flex gap-10 text-[13px] font-bold uppercase tracking-widest text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
            <Link href="/#san-pham" className="hover:text-blue-600 transition-colors">Sản phẩm</Link>
            <Link href="/#cong-nghe" className="hover:text-blue-600 transition-colors">Công nghệ</Link>
            <Link href="/tin-tuc" className="text-blue-600 transition-colors border-b-2 border-blue-600 pb-1">Tin tức</Link>
          </nav>

          <Link href="/#showroom" className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-full text-sm font-bold shadow-lg shadow-blue-600/20 transition-all">
            Liên hệ <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      <section className="pt-36 pb-16 px-6 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-100 rounded-full blur-[100px] opacity-50 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-slate-400 hover:text-blue-600 transition-colors mb-6">
            <ArrowLeft size={14} /> Trở về trang chủ
          </Link>
          <h2 className="text-5xl md:text-6xl font-extrabold uppercase tracking-widest text-slate-900 mb-4">
            Tin tức <span className="text-blue-600">Đông Anh</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Cập nhật những xu hướng công nghệ mới nhất, sự kiện ra mắt xe và tin tức nóng hổi từ hệ thống Xe điện Đông Anh.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto min-h-[50vh] bg-white">
        {!Array.isArray(newsList) || newsList.length === 0 ? (
          <div className="text-center text-slate-400 py-10 font-medium">
            Chưa có bài viết nào. Đang chờ hệ thống cập nhật tin tức...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {newsList.map((news: any) => (
              <Link 
                href={`/tin-tuc/${news.id}`} 
                key={news.id} 
                className="group cursor-pointer flex flex-col h-full bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-2 transition-all duration-300 border border-slate-100"
              >
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-slate-50">
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md text-blue-600 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm border border-slate-100">
                    {news.category}
                  </div>
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>

                <div className="flex flex-col flex-1 px-3 pb-2">
                  <span className="text-slate-400 text-[11px] font-bold tracking-widest mb-3 flex items-center gap-2 uppercase">
                    <Clock size={12} /> {news.date}
                  </span>
                  <h4 className="text-xl font-extrabold text-slate-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                    {news.title}
                  </h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 line-clamp-3">
                    {news.excerpt}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">
                    Đọc chi tiết <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <footer className="bg-slate-950 text-white pt-24 pb-10 px-6 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 border-b border-slate-800 pb-16 mb-8">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-extrabold mb-2 uppercase tracking-widest leading-none">Đông Anh</h2>
            <span className="text-[10px] text-blue-500 font-bold tracking-[0.3em] uppercase block mb-6">Hệ sinh thái xe điện</span>
            <p className="text-slate-400 text-sm leading-relaxed font-medium max-w-sm mb-8">Kiến tạo phong cách số hiện đại. Chuyên phân phối các dòng xe điện chính hãng hàng đầu tại khu vực Đông Anh.</p>
          </div>
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold mb-8 uppercase tracking-[0.2em] text-slate-300">Thông tin liên hệ</h3>
            <div className="space-y-6 text-slate-400 font-medium text-sm">
              <a href="#" className="flex items-start gap-4 hover:text-white transition-colors"><MapPin className="shrink-0 text-blue-500 mt-0.5" size={18} /> Đông Anh, Hà Nội</a>
              <p className="flex items-center gap-4 hover:text-white transition-colors"><Phone className="shrink-0 text-blue-500" size={18} /> <a href="tel:0582376666" className="font-bold tracking-wider">058.237.6666</a></p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}