import type { Metadata, ResolvingMetadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { Clock, ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import fs from 'fs';
import path from 'path';
import FallbackImage from './FallbackImage';
import ReactMarkdown from 'react-markdown';

export const dynamic = 'force-dynamic';

const elegantFont = Plus_Jakarta_Sans({ 
  subsets: ["latin", "vietnamese"], 
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
});

async function getArticleById(id: string) {
  try {
    // Đã trỏ về thư mục chứa data của web mới
    const filePath = '/var/www/shop-xe-dien-donganh/public/newsData.json';
    if (!fs.existsSync(filePath)) return null;
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    const newsList = Array.isArray(data) ? data : [data];

    const decodedId = decodeURIComponent(id);
    
    return newsList.find((news: any) => {
        if (!news.id) return false;
        const currentId = news.id.toString();
        return currentId === id || currentId === decodedId;
    });
  } catch (error) {
    return null;
  }
}

export async function generateMetadata(
  { params }: { params: any },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const article = await getArticleById(resolvedParams.id);

  if (!article) {
    return {
      title: "Không tìm thấy bài viết | Xe Điện Đông Anh",
    };
  }

  const url = `https://xediendonganh.vn/tin-tuc/${resolvedParams.id}`;
  let imgUrl = article.imageUrl || article.image || "/images/default-news.jpg";
  if (imgUrl && !imgUrl.startsWith('http') && !imgUrl.startsWith('/')) {
    imgUrl = '/' + imgUrl;
  }
  
  const fullImgUrl = imgUrl.startsWith('http') ? imgUrl : `https://xediendonganh.vn${imgUrl}`;

  return {
    title: `${article.title} | Xe Điện Đông Anh`,
    description: article.excerpt || "Đọc bài viết chi tiết tại website Xe Điện Đông Anh.",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: url,
      images: [{ url: fullImgUrl }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [fullImgUrl],
    }
  };
}

export default async function NewsDetail({ params }: { params: any }) {
  const resolvedParams = await Promise.resolve(params);
  const articleId = resolvedParams.id;
  
  const article = await getArticleById(articleId);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
        <h1 className="text-3xl font-extrabold mb-2 text-slate-900">Không tìm thấy bài viết!</h1>
        <p className="text-red-500 mb-8 font-mono text-sm bg-red-50 px-4 py-2 rounded">Log kiểm tra ID: {articleId}</p>
        <Link href="/tin-tuc" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:scale-105 transition-transform flex items-center gap-2 font-bold shadow-lg shadow-blue-600/20">
          <ArrowLeft size={16}/> Quay lại danh sách
        </Link>
      </div>
    );
  }

  const rawContent = article.content || article.fullContent || "";

  let imgUrl = article.imageUrl || article.image || "/images/default-news.jpg";
  if (imgUrl && !imgUrl.startsWith('http') && !imgUrl.startsWith('/')) {
    imgUrl = '/' + imgUrl;
  }

  const dateStr = article.createdAt ? new Date(article.createdAt).toLocaleDateString('vi-VN') : (article.date || "Vừa cập nhật");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "image": [
      imgUrl.startsWith('http') ? imgUrl : `https://xediendonganh.vn${imgUrl}`
    ],
    "datePublished": article.createdAt || new Date().toISOString(),
    "description": article.excerpt,
    "author": [{
        "@type": "Organization",
        "name": "Xe Điện Đông Anh",
        "url": "https://xediendonganh.vn"
      }]
  };

  return (
    <main className={`min-h-screen bg-slate-50 text-slate-900 ${elegantFont.className} font-light selection:bg-blue-600 selection:text-white`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER TỐI GIẢN (Đã đồng bộ) */}
      <header className="w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100 sticky top-0">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/tin-tuc" className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-slate-400 hover:text-blue-600 transition-colors">
            <ArrowLeft size={14} /> Trở về
          </Link>
          <div className="flex flex-col items-end">
            <h1 className="text-base font-extrabold tracking-wider uppercase text-slate-900 leading-none">Đông Anh</h1>
          </div>
        </div>
      </header>

      <div className="w-full h-[40vh] md:h-[60vh] relative bg-slate-100">
        <FallbackImage 
          src={imgUrl} 
          alt={article.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 -mt-32 relative z-10 bg-white rounded-t-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
        <div className="flex items-center gap-4 text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">
          <span className="bg-blue-50 px-4 py-1.5 rounded-full text-blue-600">{article.category || "Tin Tức"}</span>
          <span className="flex items-center gap-1"><Calendar size={14}/> {dateStr}</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-8 text-slate-900">
          {article.title}
        </h1>

        <div className="text-lg font-medium text-slate-600 italic border-l-4 border-blue-600 pl-6 mb-10 leading-relaxed bg-slate-50 py-4 pr-4 rounded-r-2xl">
          {article.excerpt}
        </div>

        <div className="text-slate-700 leading-loose text-[17px]">
          <ReactMarkdown
            components={{
              p: ({node, ...props}) => <p className="mb-6 last:mb-0 text-justify w-full" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 text-justify w-full" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6 text-justify w-full" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-slate-300 pl-4 italic text-slate-500 mb-6 text-justify w-full bg-slate-50 py-2 pr-2" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-extrabold mt-10 mb-4 text-slate-900 text-left w-full" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-8 mb-3 text-slate-900 text-left w-full" {...props} />,
              a: ({node, ...props}) => (
                <a 
                  {...props} 
                  className="text-blue-600 font-bold hover:text-blue-800 underline transition-colors decoration-2 underline-offset-4" 
                  target={props.href?.startsWith('http') ? "_blank" : "_self"} 
                  rel="noopener noreferrer"
                />
              ),
              strong: ({node, ...props}) => <strong className="font-extrabold text-slate-900" {...props} />,
              img: ({node, ...props}) => <img className="rounded-2xl shadow-md my-8 w-full" {...props} alt={props.alt || "Hình ảnh bài viết"} />
            }}
          >
            {rawContent}
          </ReactMarkdown>
        </div>

        <div className="mt-16 p-10 bg-slate-50 rounded-3xl text-center border border-slate-100 shadow-sm">
          <h3 className="text-2xl font-extrabold mb-3 text-slate-900">Bạn quan tâm đến xe điện?</h3>
          <p className="text-slate-500 font-medium mb-8">Liên hệ Xe điện Đông Anh ngay để nhận báo giá và ưu đãi lớn nhất hôm nay.</p>
          <a href="https://zalo.me/0582376666" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
            Nhắn tin Zalo <ArrowRight size={16} />
          </a>
        </div>
      </article>
      
      {/* FOOTER TIN TỨC TỐI GIẢN */}
      <footer className="bg-slate-950 text-white py-12 px-6 mt-16 text-center">
         <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">© 2026 XE ĐIỆN ĐÔNG ANH. KỶ NGUYÊN TỐC ĐỘ.</p>
      </footer>
    </main>
  );
}