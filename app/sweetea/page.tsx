'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { ArrowLeft, Zap, BatteryCharging, ShieldCheck, Ruler, Gauge, Weight, Check, MapPin, Phone, Clock } from "lucide-react";
import ImageSlider from "@/components/ImageSlider";

// --- CUSTOM ICONS ---
const FacebookIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const MessengerIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.14 2 11.25c0 2.91 1.5 5.5 3.94 7.22.18.13.3.34.3.56v2.45c0 .4.46.62.77.38l2.84-2.19c.2-.15.44-.21.68-.18 1.13.16 2.29.25 3.47.25 5.523 0 10-4.14 10-9.25S17.523 2 12 2zm1.09 12.35l-2.48-2.65c-.2-.22-.55-.26-.8-.09l-3.23 2.17c-.36.24-.8-.2-.55-.57l3.66-5.59c.2-.3.57-.38.88-.19l2.48 1.55c.2.13.45.1.62-.07l3.52-3.35c.34-.32.84.14.58.53l-3.8 5.76c-.2.31-.57.4-.88.2z"/>
  </svg>
);

const TiktokIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
    <path d="M15 8v8a4 4 0 0 1-4 4"></path>
    <path d="M15 4v4a4 4 0 0 0 4 4"></path>
  </svg>
);

const elegantFont = Plus_Jakarta_Sans({ 
  subsets: ["latin", "vietnamese"], 
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap"
});

// --- DATA CHI TIẾT SWEETEA ---
const sweeteaData = {
  name: "Sweetea",
  tagline: "Thanh xuân ngọt ngào",
  price: "13.800.000 VNĐ",
  signatureHex: "#EC4899", 
  description: "Ngọt ngào như một ly trà sữa, Powelldd Sweetea mang đến thiết kế nhỏ gọn, kute và cực kỳ nữ tính. Lớp sơn pastel thời thượng kết hợp cùng các đường nét bo tròn mềm mại biến Sweetea thành món phụ kiện không thể thiếu, giúp bạn tự tin tỏa sáng rạng rỡ mỗi ngày khi đến trường hay dạo phố.",
  colors: [
    { name: "Kem trà sữa", hex: "#F3E5AB", img: "/images/powelldd/sweetea/kem-tra-sua.png" },
    { name: "Xanh Matcha", hex: "#D9F99D", img: "/images/powelldd/sweetea/xanh-matcha.png" },
    { name: "Xám sương mai", hex: "#D1D5DB", img: "/images/powelldd/sweetea/xam-suong-mai.png" },
    { name: "Vàng ánh dương", hex: "#FDE047", img: "/images/powelldd/sweetea/vang-anh-duong.png" }
  ],
  specs: [
    { icon: <Zap size={24} strokeWidth={1.5}/>, label: "Động cơ", value: "600W - Bền bỉ, êm ái" },
    { icon: <BatteryCharging size={24} strokeWidth={1.5}/>, label: "Pin/Ắc quy", value: "60V-22.3Ah" },
    { icon: <Ruler size={24} strokeWidth={1.5}/>, label: "Quãng đường", value: "70 km / 1 lần sạc" },
    { icon: <Gauge size={24} strokeWidth={1.5}/>, label: "Vận tốc tối đa", value: "35 km/h" },
    { icon: <Weight size={24} strokeWidth={1.5}/>, label: "Tải trọng", value: "Lên đến 180 kg" },
    { icon: <ShieldCheck size={24} strokeWidth={1.5}/>, label: "Kháng nước", value: "Chuẩn IPX5 an tâm" }
  ]
};

// --- DANH SÁCH ẢNH TÍNH NĂNG SWEETEA ---
const featureImages = [
  "/images/vehicles/sweetea/anh-1.jpg",
  "/images/vehicles/sweetea/anh-2.jpg",
  "/images/vehicles/sweetea/anh-3.jpg",
  "/images/vehicles/sweetea/anh-4.jpg",
  "/images/vehicles/sweetea/anh-5.jpg",
  "/images/vehicles/sweetea/anh-6.jpg",
  "/images/vehicles/sweetea/anh-7.jpg"
];

const galleryImages = Array.from({ length: 7 }, (_, i) => `/images/vehicles/sweetea/anh-${i + 1}.jpg`);

export default function SweeteaDetail() {
  const [activeColor, setActiveColor] = useState(sweeteaData.colors[0]);

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50; 
    const currentIndex = sweeteaData.colors.findIndex(c => c.name === activeColor.name);

    if (info.offset.x < -swipeThreshold) {
      const nextIndex = (currentIndex + 1) % sweeteaData.colors.length;
      setActiveColor(sweeteaData.colors[nextIndex]);
    } else if (info.offset.x > swipeThreshold) {
      const prevIndex = (currentIndex - 1 + sweeteaData.colors.length) % sweeteaData.colors.length;
      setActiveColor(sweeteaData.colors[prevIndex]);
    }
  };

  return (
    <main className={`min-h-screen bg-white text-pink-950 ${elegantFont.className} selection:bg-pink-500 selection:text-white`}>
      
      {/* HEADER HỒNG PASTEL TỐI GIẢN */}
      <header className="fixed w-full top-0 bg-white/90 backdrop-blur-md z-50 border-b border-pink-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-pink-400 hover:text-pink-600 transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold tracking-widest uppercase mt-0.5">Trở về</span>
          </Link>
          <div className="flex flex-col items-end">
            <h1 className="text-xl font-extrabold tracking-wider uppercase text-pink-600 leading-none">Đông Anh</h1>
            <span className="text-[9px] font-bold tracking-widest text-pink-400 uppercase mt-1">E-Scooter</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION PRODUCT */}
      <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-3/5 relative">
          <motion.div 
            animate={{ backgroundColor: activeColor.hex }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full opacity-30 blur-[80px] -z-10 mix-blend-multiply"
          ></motion.div>
          
          <div className="w-full aspect-[4/3] lg:aspect-square bg-pink-50 rounded-3xl p-10 flex items-center justify-center border border-pink-100 relative overflow-hidden shadow-xl shadow-pink-200/50 group">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeColor.name}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                src={activeColor.img} 
                alt={`Xe điện Sweetea màu ${activeColor.name}`} 
                className="w-full h-full object-contain drop-shadow-2xl z-10 cursor-grab active:cursor-grabbing group-hover:scale-105 transition-transform duration-500" 
                drag="x" 
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd} 
              />
            </AnimatePresence>
            <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
              <span className="text-[80px] lg:text-[120px] font-black text-pink-500/[0.05] tracking-tighter uppercase leading-none select-none mix-blend-multiply">
                SWEETEA
              </span>
            </div>
          </div>

          <div className="mt-8 lg:hidden flex flex-col items-center justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-900 mb-4">
              Màu sắc: <span className="text-pink-500">{activeColor.name}</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4 bg-pink-50 p-3 rounded-full border border-pink-100 shadow-sm">
              {sweeteaData.colors.map((color) => (
                <button 
                  key={`mobile-${color.name}`}
                  onClick={() => setActiveColor(color)}
                  className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeColor.name === color.name ? "ring-2 ring-offset-2 ring-pink-400 scale-110 shadow-md" : "ring-1 ring-pink-200 hover:scale-110"}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {activeColor.name === color.name && <Check size={16} className="text-black/70 drop-shadow-sm" />}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-pink-400 mt-4 font-bold uppercase tracking-widest">← Vuốt ảnh để xem màu khác →</p>
          </div>
        </div>

        <div className="w-full lg:w-2/5 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-block px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 mb-4">
               <p className="text-xs font-bold tracking-[0.2em] uppercase text-pink-500">Powelldd E-Scooter</p>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tighter text-pink-600">{sweeteaData.name}</h1>
            <p className="text-lg md:text-xl font-medium text-pink-400 mb-8">{sweeteaData.tagline}</p>
            
            <p className="text-3xl md:text-4xl font-extrabold tracking-tight text-pink-900 mb-8">{sweeteaData.price}</p>
            
            <p className="text-pink-950/70 text-sm leading-relaxed mb-10 font-medium text-justify">
              {sweeteaData.description}
            </p>

            <div className="mb-12 hidden lg:block bg-pink-50/50 p-6 rounded-3xl border border-pink-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-900">Chọn màu sắc</p>
                <p className="text-xs font-bold text-pink-500">{activeColor.name}</p>
              </div>
              <div className="flex flex-wrap gap-4">
                {sweeteaData.colors.map((color) => (
                  <button 
                    key={`desktop-${color.name}`}
                    onClick={() => setActiveColor(color)}
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all ${activeColor.name === color.name ? "ring-2 ring-offset-4 ring-pink-400 scale-110 shadow-md" : "ring-1 ring-pink-200 hover:scale-110"}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {activeColor.name === color.name && <Check size={20} className="text-black/70 drop-shadow-sm" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:0582376666" className="flex-1 bg-pink-500 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm text-center hover:bg-pink-600 transition-colors shadow-lg shadow-pink-500/30">
                Gọi Hotline
              </a>
              <a href="https://zalo.me/0582376666" target="_blank" rel="noreferrer" className="flex-1 bg-white border-2 border-pink-200 text-pink-600 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm text-center hover:bg-pink-50 hover:border-pink-300 transition-colors shadow-sm">
                Nhắn Zalo
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURE IMAGES SECTION */}
      <section className="py-24 bg-pink-50/30 border-y border-pink-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-12">
          {featureImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="w-full rounded-3xl overflow-hidden shadow-xl shadow-pink-100/50 border border-pink-100"
            >
              <img 
                src={src} 
                alt={`Tính năng Sweetea ${index + 1}`} 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* GALLERY SECTION (Sử dụng lại featureImages vì thư mục Sweetea ít ảnh gallery riêng) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest mb-4 text-pink-900">Thư viện <span className="text-pink-500">Ảnh</span></h2>
            <div className="w-16 h-1 bg-pink-200 mx-auto rounded-full"></div>
          </div>
          <ImageSlider images={galleryImages} />
        </div>
      </section>

      {/* SPECS SECTION */}
      <section className="py-24 bg-pink-50/50 border-t border-pink-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest mb-4 text-pink-900">Thông số <span className="text-pink-500">Kỹ thuật</span></h2>
            <div className="w-16 h-1 bg-pink-200 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sweeteaData.specs.map((spec, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-3xl border border-pink-100 flex items-center gap-5 hover:shadow-xl hover:shadow-pink-200/50 hover:border-pink-200 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform shrink-0">
                  {spec.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-pink-400 tracking-widest uppercase mb-1">{spec.label}</p>
                  <p className="text-base font-extrabold text-pink-950">{spec.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWROOM & GOOGLE MAPS */}
      <section id="showroom" className="py-24 bg-white border-t border-pink-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-8">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-pink-500 block mb-3">Hệ thống phân phối</span>
                <h3 className="text-4xl font-extrabold uppercase tracking-widest text-slate-900 mb-6">SHOWROOM <br />ĐÔNG ANH</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-8">Không gian trưng bày tiêu chuẩn 5 sao với đầy đủ các phiên bản xe điện mới nhất. Kính mời quý khách đến trải nghiệm thực tế.</p>
              </motion.div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm"><MapPin className="text-pink-500" size={20} /></div>
                  <div>
                    <p className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-1">Địa chỉ</p>
                    <p className="text-slate-500 text-sm">Đông Anh, Hà Nội</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm"><Phone className="text-pink-500" size={20} /></div>
                  <div>
                    <p className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-1">Hotline</p>
                    <a href="tel:0582376666" className="text-lg font-extrabold text-pink-600">058.237.6666</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm"><Clock className="text-pink-500" size={20} /></div>
                  <div>
                    <p className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-1">Giờ mở cửa</p>
                    <p className="text-slate-500 text-sm">08:00 - 21:00 (Thứ 2 - Chủ Nhật)</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-7 w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 relative border-4 border-white bg-slate-100">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232.58719461458594!2d105.84370208948461!3d21.136668629210686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313501d4ae7e6869%3A0x9675f89957718e87!2zWGUgxJFp4buHbiDEkMO0bmcgQW5o!5e0!3m2!1svi!2s!4v1793262823788!5m2!1svi!2s" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="absolute inset-0"></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="lien-he" className="bg-slate-950 text-white pt-24 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 border-b border-slate-800 pb-16 mb-8">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-extrabold mb-2 uppercase tracking-widest leading-none">Đông Anh</h2>
            <span className="text-[10px] text-pink-500 font-bold tracking-[0.3em] uppercase block mb-6">Hệ sinh thái xe điện</span>
            <p className="text-slate-400 text-sm leading-relaxed font-medium max-w-sm mb-8">Kiến tạo phong cách số hiện đại. Chuyên phân phối các dòng xe điện chính hãng hàng đầu tại khu vực Đông Anh.</p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/xemaydientuonglai" target="_blank" rel="noreferrer" className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all border border-slate-800">
                <FacebookIcon size={20} />
              </a>
              <a href="https://zalo.me/0582376666" target="_blank" rel="noreferrer" className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all border border-slate-800">
                <span className="font-bold text-sm">Zalo</span>
              </a>
              <a href="https://vt.tiktok.com/ZSqxquYYX/" target="_blank" rel="noreferrer" className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all border border-slate-800">
                <TiktokIcon size={20} />
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold mb-8 uppercase tracking-[0.2em] text-slate-300">Thông tin liên hệ</h3>
            <div className="space-y-6 text-slate-400 font-medium text-sm">
              <p className="flex items-start gap-4 hover:text-white transition-colors cursor-default"><MapPin className="shrink-0 mt-0.5 text-pink-500" size={18} /> Đông Anh, Hà Nội</p>
              <p className="flex items-center gap-4 hover:text-white transition-colors"><Phone className="shrink-0 text-pink-500" size={18} /> <a href="tel:0582376666" className="font-bold tracking-wider">058.237.6666</a></p>
              <p className="flex items-center gap-4"><Clock className="shrink-0 text-pink-500" size={18} /> 08:00 - 21:00 (T2 - CN)</p>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold mb-8 uppercase tracking-[0.2em] text-slate-300">Khách hàng</h3>
            <ul className="space-y-4 font-medium text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo hành</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hướng dẫn trả góp</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chăm sóc khách hàng</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          <p>© 2026 XE ĐIỆN ĐÔNG ANH. KỶ NGUYÊN TỐC ĐỘ.</p>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-6 right-6 z-[90] flex flex-col gap-4">
        <div className="relative w-14 h-14 group">
          <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-30"></span>
          <motion.a href="https://zalo.me/0582376666" target="_blank" rel="noreferrer" whileHover={{ scale: 1.1 }} className="relative flex items-center justify-center w-full h-full rounded-full bg-blue-600 text-white shadow-xl shadow-blue-500/30">
             <span className="font-extrabold text-sm">Zalo</span>
          </motion.a>
        </div>
        <div className="relative w-14 h-14 group">
          <motion.a href="https://www.facebook.com/xemaydientuonglai" target="_blank" rel="noreferrer" whileHover={{ scale: 1.1 }} className="relative flex items-center justify-center w-full h-full bg-gradient-to-tr from-[#00C6FF] to-[#0072FF] text-white rounded-full shadow-xl shadow-blue-500/30">
            <MessengerIcon size={26} />
          </motion.a>
        </div>
      </div>

    </main>
  );
}