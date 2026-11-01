'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { ArrowLeft, Zap, BatteryCharging, ShieldCheck, Ruler, Gauge, Weight, Check, MapPin, Phone, Clock } from "lucide-react";
import ImageSlider from "@/components/ImageSlider";

const FacebookIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const ZaloIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.1 11.1c0-4.6-4.3-8.3-9.6-8.3-5.3 0-9.6 3.7-9.6 8.3 0 2.5 1.3 4.8 3.3 6.3-.2 1.4-1.3 3.3-1.3 3.3-.1.2 0 .5.3.6.1 0 .2.1.3.1 1.9-.8 3.9-1.8 3.9-1.8 1.1.3 2.3.4 3.5.4 5.3 0 9.6-3.7 9.6-8.3zm-12.7 3.2H6V12.7h2.8c.1 0 .2-.1.2-.2v-.8c0-.1-.1-.2-.2-.2H6.3V9.8h3.3c.1 0 .2-.1.2-.2V8.8c0-.1-.1-.2-.2-.2H4.9c-.5 0-.9.4-.9.9v4.7c0 .5.4.9.9.9h3.6v-1.1h-.1zM11.6 13h1.1v-4.1h-1.1V13zm3.4-3.1c-.6 0-1.1.5-1.1 1.1 0 .6.5 1.1 1.1 1.1.6 0 1.1-.5 1.1-1.1 0-.6-.5-1.1-1.1-1.1zm0 3.3c-1.1 0-2.1-.9-2.1-2.1 0-1.1.9-2.1 2.1-2.1 1.1 0 2.1.9 2.1 2.1 0 1.2-.9 2.1-2.1 2.1zm3.6-3.2H17.5V13h1.1V10z" />
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
  weight: ["300", "400", "500", "600"],
  display: "swap"
});

const walkmenData = {
  name: "Walkmen",
  tagline: "Tự do không sợ hãi",
  price: "13.800.000 VNĐ",
  signatureHex: "#DC2626", 
  description: "Đánh thức bản lĩnh, bứt phá giới hạn. Powelldd Walkmen mang kiểu dáng thể thao, góc cạnh với những đường nét mạnh mẽ. Khung gầm chắc chắn cùng khối động cơ 600W bứt tốc ấn tượng, Walkmen sẵn sàng cùng bạn chinh phục mọi thử thách, thể hiện cá tính không trộn lẫn trên mọi hành trình.",
  colors: [
    { name: "Đen Phantom", hex: "#1A1A1A", img: "/images/powelldd/walkmen/den-phantom.png" },
    { name: "Trắng Storm", hex: "#F3F4F6", img: "/images/powelldd/walkmen/trang-storm.png" },
    { name: "Vàng Chanh", hex: "#EAB308", img: "/images/powelldd/walkmen/vang-chanh.png" },
    { name: "Xám Khói", hex: "#6B7280", img: "/images/powelldd/walkmen/xam-khoi.png" },
    { name: "Xanh Năng Động", hex: "#0F766E", img: "/images/powelldd/walkmen/xanh-nang-dong.png" }
  ],
  specs: [
    { icon: <Zap size={20} strokeWidth={1.5}/>, label: "Động cơ", value: "600W - Thể thao bứt tốc" },
    { icon: <BatteryCharging size={20} strokeWidth={1.5}/>, label: "Pin/Ắc quy", value: "45V-22.3Ah" },
    { icon: <Ruler size={20} strokeWidth={1.5}/>, label: "Quãng đường", value: "60 km / 1 lần sạc" },
    { icon: <Gauge size={20} strokeWidth={1.5}/>, label: "Vận tốc tối đa", value: "45 km/h" },
    { icon: <Weight size={20} strokeWidth={1.5}/>, label: "Tải trọng", value: "Lên đến 180 kg" },
    { icon: <ShieldCheck size={20} strokeWidth={1.5}/>, label: "Kháng nước", value: "Chuẩn IP67 an toàn" }
  ]
};

const featureImages = [
  "/images/vehicles/walkmen/anh-1.jpg", 
  "/images/vehicles/walkmen/anh-2.jpg",
  "/images/vehicles/walkmen/anh-3.jpg",
  "/images/vehicles/walkmen/anh-4.jpg"
];

const galleryImages = Array.from({ length: 10 }, (_, i) => `/images/vehicles/walkmen/gallery/anh(${i + 1}).jpg`);

export default function WalkmenDetail() {
  const [activeColor, setActiveColor] = useState(walkmenData.colors[0]);

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50; 
    const currentIndex = walkmenData.colors.findIndex(c => c.name === activeColor.name);

    if (info.offset.x < -swipeThreshold) {
      const nextIndex = (currentIndex + 1) % walkmenData.colors.length;
      setActiveColor(walkmenData.colors[nextIndex]);
    } else if (info.offset.x > swipeThreshold) {
      const prevIndex = (currentIndex - 1 + walkmenData.colors.length) % walkmenData.colors.length;
      setActiveColor(walkmenData.colors[prevIndex]);
    }
  };

  return (
    <main className={`min-h-screen bg-[#0A0A0A] text-white ${elegantFont.className} font-light selection:bg-red-600 selection:text-white`}>
      
      {/* HEADER */}
      <header className="fixed w-full top-0 bg-[#0A0A0A]/80 backdrop-blur-xl z-50 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform text-red-500" />
            <span className="text-sm font-bold tracking-widest uppercase mt-0.5">Trở về</span>
          </Link>
          <div className="flex flex-col items-end">
            <h1 className="text-xl font-bold tracking-widest uppercase text-white leading-none">Đông Anh</h1>
            <span className="text-[9px] font-bold tracking-widest text-red-500 uppercase mt-1">E-Scooter</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION PRODUCT */}
      <section className="pt-28 pb-20 px-6 max-w-7xl mx-auto min-h-[90vh] flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-3/5 relative">
          <motion.div 
            animate={{ backgroundColor: activeColor.hex }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full opacity-20 blur-[100px] -z-10"
          ></motion.div>
          
          <div className="w-full aspect-[4/3] lg:aspect-square bg-gradient-to-br from-neutral-900 to-black rounded-3xl p-10 flex items-center justify-center border border-neutral-800 relative overflow-hidden shadow-2xl shadow-red-900/10 group">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeColor.name}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                src={activeColor.img} 
                alt={`Xe điện Walkmen màu ${activeColor.name}`} 
                className="w-full h-full object-contain drop-shadow-2xl z-10 cursor-grab active:cursor-grabbing group-hover:scale-105 transition-transform duration-500"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
              />
            </AnimatePresence>
            <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
              <span className="text-[70px] lg:text-[120px] font-black text-neutral-800/40 tracking-tighter uppercase leading-none select-none">
                WALKMEN
              </span>
            </div>
          </div>

          <div className="mt-8 lg:hidden flex flex-col items-center justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">
              Màu sắc: <span className="text-red-400">{activeColor.name}</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4 bg-neutral-900 p-3 rounded-full border border-neutral-800">
              {walkmenData.colors.map((color) => (
                <button 
                  key={`mobile-${color.name}`}
                  onClick={() => setActiveColor(color)}
                  className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeColor.name === color.name ? "ring-2 ring-offset-2 ring-offset-[#0A0A0A] ring-red-500 scale-110" : "ring-1 ring-neutral-700 hover:scale-110"}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {activeColor.name === color.name && (color.hex === "#F3F4F6" || color.hex === "#EAB308") && <Check size={16} className="text-black drop-shadow-md" />}
                  {activeColor.name === color.name && color.hex !== "#F3F4F6" && color.hex !== "#EAB308" && <Check size={16} className="text-white drop-shadow-md" />}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-neutral-600 mt-4 font-bold uppercase tracking-widest">← Vuốt ảnh để xem màu khác →</p>
          </div>
        </div>

        <div className="w-full lg:w-2/5 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-block px-4 py-1.5 rounded-full bg-red-900/30 border border-red-500/30 mb-4">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-red-500">Powelldd Thể Thao</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tighter leading-none text-white">{walkmenData.name}</h1>
            <p className="text-xl md:text-2xl font-medium text-neutral-400 mb-8 italic">{walkmenData.tagline}</p>
            
            <p className="text-4xl font-extrabold tracking-tight text-white mb-10">{walkmenData.price}</p>
            
            <p className="text-neutral-400 text-sm leading-relaxed mb-10 font-medium text-justify">
              {walkmenData.description}
            </p>

            <div className="mb-12 hidden lg:block bg-neutral-900 p-6 rounded-3xl border border-neutral-800">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">Chọn màu sắc</p>
                <p className="text-xs font-bold text-red-400">{activeColor.name}</p>
              </div>
              <div className="flex flex-wrap gap-4">
                {walkmenData.colors.map((color) => (
                  <button 
                    key={`desktop-${color.name}`}
                    onClick={() => setActiveColor(color)}
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all ${activeColor.name === color.name ? "ring-2 ring-offset-4 ring-offset-[#171717] ring-red-500 scale-110" : "ring-1 ring-neutral-700 hover:scale-110"}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {activeColor.name === color.name && (color.hex === "#F3F4F6" || color.hex === "#EAB308") && <Check size={20} className="text-black drop-shadow-md" />}
                    {activeColor.name === color.name && color.hex !== "#F3F4F6" && color.hex !== "#EAB308" && <Check size={20} className="text-white drop-shadow-md" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:0582376666" className="flex-1 bg-red-600 text-white px-8 py-5 rounded-full font-bold uppercase tracking-widest text-sm text-center hover:bg-red-700 hover:scale-105 transition-all shadow-lg shadow-red-600/30">
                Gọi Hotline
              </a>
              <a href="https://zalo.me/0582376666" target="_blank" rel="noreferrer" className="flex-1 bg-transparent border-2 border-neutral-700 text-white px-8 py-5 rounded-full font-bold uppercase tracking-widest text-sm text-center hover:bg-neutral-800 hover:border-neutral-600 transition-colors">
                Nhắn Zalo
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURE IMAGES SECTION */}
      <section className="py-20 bg-neutral-950 border-y border-neutral-900">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-12">
          {featureImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="w-full rounded-3xl overflow-hidden shadow-xl shadow-black transition-shadow duration-500 border border-neutral-800"
            >
              <img 
                src={src} 
                alt={`Tính năng Walkmen ${index + 1}`} 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700 opacity-90 hover:opacity-100" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest mb-4 text-white">
              Thư viện <span className="text-red-500">Ảnh</span>
            </h2>
            <div className="w-16 h-1 bg-red-900 mx-auto rounded-full"></div>
          </div>
          <ImageSlider images={galleryImages} />
        </div>
      </section>

      {/* SPECS SECTION */}
      <section className="py-24 bg-neutral-950 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest mb-4 text-white">Thông số <span className="text-red-500">Kỹ thuật</span></h2>
            <div className="w-16 h-1 bg-red-900 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {walkmenData.specs.map((spec, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800 flex items-center gap-5 hover:shadow-xl hover:shadow-red-500/10 hover:border-red-500/50 transition-all group"
              >
                <div className="w-16 h-16 rounded-2xl bg-neutral-950 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform shrink-0">
                  {spec.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase mb-1">{spec.label}</p>
                  <p className="text-base font-extrabold text-white">{spec.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWROOM SECTION */}
      <section id="showroom" className="py-24 bg-[#0A0A0A] border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-8">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-red-500 block mb-3">Hệ thống phân phối</span>
                <h3 className="text-4xl font-extrabold uppercase tracking-widest text-white mb-6">SHOWROOM <br />ĐÔNG ANH</h3>
                <p className="text-neutral-400 font-medium leading-relaxed mb-8">Không gian trưng bày đẳng cấp với đầy đủ các phiên bản xe điện mới nhất. Kính mời quý khách đến trải nghiệm tốc độ và công nghệ đột phá.</p>
              </motion.div>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-4 p-5 bg-neutral-900 rounded-2xl border border-neutral-800">
                  <div className="w-12 h-12 bg-neutral-950 rounded-full flex items-center justify-center shrink-0"><MapPin className="text-red-500" size={20} /></div>
                  <div>
                    <p className="font-bold text-white uppercase tracking-wider text-xs mb-1">Địa chỉ</p>
                    <p className="text-neutral-400">Đông Anh, Hà Nội</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 bg-neutral-900 rounded-2xl border border-neutral-800">
                  <div className="w-12 h-12 bg-neutral-950 rounded-full flex items-center justify-center shrink-0"><Phone className="text-red-500" size={20} /></div>
                  <div>
                    <p className="font-bold text-white uppercase tracking-wider text-xs mb-1">Hotline tư vấn</p>
                    <a href="tel:0582376666" className="text-lg font-extrabold text-red-500">058.237.6666</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 bg-neutral-900 rounded-2xl border border-neutral-800">
                  <div className="w-12 h-12 bg-neutral-950 rounded-full flex items-center justify-center shrink-0"><Clock className="text-red-500" size={20} /></div>
                  <div>
                    <p className="font-bold text-white uppercase tracking-wider text-xs mb-1">Giờ mở cửa</p>
                    <p className="text-neutral-400">08:00 - 21:00 (Thứ 2 - Chủ Nhật)</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="lg:col-span-7 w-full h-[500px] rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl relative">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232.58719461458594!2d105.84370208948461!3d21.136668629210686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313501d4ae7e6869%3A0x9675f89957718e87!2zWGUgxJFp4buHbiDEkMO0bmcgQW5o!5e0!3m2!1svi!2s!4v1793262823788!5m2!1svi!2s" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="absolute inset-0 object-cover filter grayscale opacity-80 contrast-125 hover:grayscale-0 hover:opacity-100 transition-all duration-500"></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="lien-he" className="bg-[#050505] text-white pt-24 pb-10 px-6 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 border-b border-neutral-900 pb-16 mb-8">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-extrabold mb-2 uppercase tracking-widest leading-none">Đông Anh</h2>
            <span className="text-[10px] text-red-500 font-bold tracking-[0.3em] uppercase block mb-6">Hệ sinh thái xe điện</span>
            <p className="text-neutral-500 text-sm leading-relaxed font-medium max-w-sm mb-8">Kiến tạo phong cách số hiện đại. Chuyên phân phối các dòng xe điện chính hãng hàng đầu tại khu vực Đông Anh.</p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/xemaydientuonglai" target="_blank" rel="noreferrer" className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center hover:bg-red-600 transition-all border border-neutral-800">
                <FacebookIcon size={20} />
              </a>
              <a href="https://zalo.me/0582376666" target="_blank" rel="noreferrer" className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center hover:bg-red-600 transition-all border border-neutral-800">
                <span className="font-bold text-sm">Zalo</span>
              </a>
              <a href="https://vt.tiktok.com/ZSqxquYYX/" target="_blank" rel="noreferrer" className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center hover:bg-red-600 transition-all border border-neutral-800">
                <TiktokIcon size={20} />
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold mb-8 uppercase tracking-[0.2em] text-white">Thông tin liên hệ</h3>
            <div className="space-y-6 text-neutral-400 font-medium text-sm">
              <p className="flex items-start gap-4 hover:text-red-500 transition-colors cursor-default"><MapPin className="shrink-0 mt-0.5" size={18} /> Đông Anh, Hà Nội</p>
              <p className="flex items-center gap-4 hover:text-red-500 transition-colors"><Phone className="shrink-0" size={18} /> <a href="tel:0582376666" className="font-bold tracking-wider">058.237.6666</a></p>
              <p className="flex items-center gap-4"><Clock className="shrink-0" size={18} /> 08:00 - 21:00 (T2 - CN)</p>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold mb-8 uppercase tracking-[0.2em] text-white">Khách hàng</h3>
            <ul className="space-y-4 font-medium text-sm text-neutral-400">
              <li><a href="#" className="hover:text-red-500 transition-colors">Chính sách bảo hành</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Hướng dẫn trả góp</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Chăm sóc khách hàng</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-neutral-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          <p>© 2026 XE ĐIỆN ĐÔNG ANH. KỶ NGUYÊN TỐC ĐỘ.</p>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-6 right-6 z-[90] flex flex-col gap-4">
        <div className="relative w-12 h-12 group">
          <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-30"></span>
          <motion.a href="https://zalo.me/0582376666" target="_blank" rel="noreferrer" whileHover={{ scale: 1.1 }} className="relative flex items-center justify-center w-full h-full rounded-full bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] border border-blue-500">
             <span className="font-bold text-sm">Zalo</span>
          </motion.a>
        </div>
        <div className="relative w-12 h-12 group">
          <motion.a href="https://www.facebook.com/xemaydientuonglai" target="_blank" rel="noreferrer" whileHover={{ scale: 1.1 }} className="relative flex items-center justify-center w-full h-full bg-gradient-to-tr from-[#00C6FF] to-[#0072FF] text-white rounded-full shadow-[0_0_15px_rgba(0,198,255,0.5)]">
            <MessengerIcon size={24} />
          </motion.a>
        </div>
      </div>

    </main>
  );
}