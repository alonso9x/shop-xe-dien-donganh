'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, Clock, X, CheckCircle2, Loader2, Star, Zap, Shield, Battery, Navigation, ChevronDown } from "lucide-react";

// --- ICONS ---
const FacebookIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const MessengerIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.14 2 11.25c0 2.91 1.5 5.5 3.94 7.22.18.13.3.34.3.56v2.45c0 .4.46.62.77.38l2.84-2.19c.2-.15.44-.21.68-.18 1.13.16 2.29.25 3.47.25 5.523 0 10-4.14 10-9.25S17.523 2 12 2zm1.09 12.35l-2.48-2.65c-.2-.22-.55-.26-.8-.09l-3.23 2.17c-.36.24-.8-.2-.55-.57l3.66-5.59c.2-.3.57-.38.88-.19l2.48 1.55c.2.13.45.1.62-.07l3.52-3.35c.34-.32.84.14.58.53l-3.8 5.76c-.2.31-.57.4-.88.2z"/></svg>
);

const TiktokIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
    <path d="M15 8v8a4 4 0 0 1-4 4"></path>
    <path d="M15 4v4a4 4 0 0 0 4 4"></path>
  </svg>
);

// --- FONTS & DATA ---
const elegantFont = Plus_Jakarta_Sans({ 
  subsets: ["latin", "vietnamese"], 
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap"
});

const powellddBikes = [
  { id: "wespan-pro", name: "Wespan pro", price: "19.990.000 VNĐ", range: "80 km", speed: "47 km/h", tagline: "Thiết kế vượt thời gian", coverImage: "/images/powelldd/wespan-pro/xam-bac-khi.png", category: "cao-cap" },
  { id: "dimoon", name: "Dimoon", price: "17.990.000 VNĐ", range: "100 km", speed: "49 km/h", tagline: "Biểu tượng thời thượng mới", coverImage: "/images/powelldd/dimoon/trang-bang-suong.png", category: "cao-cap" },
  { id: "fancy", name: "Fancy", price: "17.990.000 VNĐ", range: "80 km", speed: "45 km/h", tagline: "Phong cách Italia", coverImage: "/images/powelldd/fancy/den.png", category: "cao-cap" },
  { id: "shine", name: "Shine pro", price: "14.990.000 VNĐ", range: "70 km", speed: "25 km/h", tagline: "Shine pro - Go to school", coverImage: "/images/powelldd/shine-pro/hong-blush.png", category: "tieu-chuan" },
  { id: "hazel", name: "Hazel", price: "14.490.000 VNĐ", range: "70 km", speed: "37 km/h", tagline: "Ngọt ngào tỏa sáng", coverImage: "/images/powelldd/hazel/hong-dao.png", category: "tieu-chuan" },
  { id: "dina", name: "Dina", price: "14.990.000 VNĐ", range: "80 km", speed: "50 km/h", tagline: "Thông minh & Thanh lịch", coverImage: "/images/powelldd/dina/hong-blush.png", category: "tieu-chuan" },
  { id: "walkmen", name: "Walkmen", price: "13.800.000 VNĐ", range: "70 km", speed: "45 km/h", tagline: "Tự do không sợ hãi", coverImage: "/images/powelldd/walkmen/trang-storm.png", category: "tieu-chuan" },
  { id: "sweetea", name: "Sweetea", price: "13.800.000 VNĐ", range: "70 km", speed: "35 km/h", tagline: "Thanh xuân ngọt ngào", coverImage: "/images/powelldd/sweetea/kem-tra-sua.png", category: "tieu-chuan" },
  { id: "eiko", name: "Eiko", price: "11.990.000 VNĐ", range: "60 km", speed: "32 km/h", tagline: "Nhỏ gọn linh hoạt", coverImage: "/images/powelldd/eiko/do-fire.png", category: "tieu-chuan" }
];

const techSlides = [
  { img: "/images/cong-nghe/ac-quy.jpg", title: "Thu hồi năng lượng", desc: "Chuyển hóa động năng thành điện năng. Tự động sạc khi trượt, xuống dốc, phanh.", icon: <Battery className="text-blue-500" size={32} /> },
  { img: "/images/cong-nghe/dong-co.jpg", title: "Động cơ đột phá", desc: "Tối ưu hiệu suất, giảm thiểu tiếng ồn và mang lại sự tin cậy tuyệt đối trên mọi cung đường.", icon: <Zap className="text-amber-500" size={32} /> },
  { img: "/images/cong-nghe/bo-dieu-khien.jpg", title: "Điều khiển an toàn", desc: "Kết cấu ổn định, xử lý chuẩn xác mang đến tầm hoạt động xa và tương thích hoàn hảo.", icon: <Shield className="text-emerald-500" size={32} /> },
  { img: "/images/cong-nghe/lop-khang-luc.jpg", title: "Khí động học tối ưu", desc: "Đèn LED tiết kiệm, lốp giảm kháng lực lăn giúp tối đa hóa quãng đường di chuyển.", icon: <Navigation className="text-purple-500" size={32} /> }
];

// --- ANIMATION VARIANTS ---
const fadeUp: Variants = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };
const stagger: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const scaleIn: Variants = { hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } } };

export default function Home() {
  const [filter, setFilter] = useState("all");
  const filteredBikes = powellddBikes.filter(bike => filter === "all" ? true : bike.category === filter);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");
  const [formData, setFormData] = useState({ name: "", phone: "", model: "Chưa xác định", note: "" });
  const [scrolled, setScrolled] = useState(false);

  const bannerImages = [
    "/images/banner/banner-1.png",
    "/images/banner/banner-2.png",
    "/images/banner/banner-3.png",
    "/images/banner/banner-4.jpg" 
  ];
  const [currentBanner, setCurrentBanner] = useState(0);

  // Hiệu ứng thay đổi Header khi cuộn
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Slide Banner tự động
  useEffect(() => {
    const slideInterval = setInterval(() => setCurrentBanner((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1)), 6000); 
    return () => clearInterval(slideInterval);
  }, [bannerImages.length]);

  // Xử lý Form Đăng ký Telegram
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    try {
      const response = await fetch('/api/dang-ky-lai-thu', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setFormStatus("success");
        setTimeout(() => { 
          setIsModalOpen(false); 
          setFormStatus("idle"); 
          setFormData({ name: "", phone: "", model: "Chưa xác định", note: "" }); 
        }, 3000);
      } else {
        alert(result.message || "Có lỗi xảy ra, vui lòng thử lại.");
        setFormStatus("idle");
      }
    } catch (error) {
      console.error(error);
      alert("Không thể kết nối đến máy chủ.");
      setFormStatus("idle");
    }
  };

  return (
    <main className={`min-h-screen bg-slate-50 text-slate-800 ${elegantFont.className} overflow-x-hidden selection:bg-blue-600 selection:text-white`}>
      
      {/* HEADER: Thiết kế Dynamic trong suốt -> Nền trắng khi scroll + Logo Thực Tế */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-500 border-b ${scrolled ? 'bg-white/90 backdrop-blur-xl border-slate-200 shadow-lg shadow-slate-200/50 py-3' : 'bg-transparent border-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Cập nhật dùng Logo File /favicon.ico (Sửa bg-black thành bg-white) */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg shadow-green-500/20 group-hover:scale-105 transition-transform duration-300 border border-slate-100 bg-white flex items-center justify-center p-1">
              <img src="/favicon.ico" alt="Xe Điện Đông Anh" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black tracking-wider uppercase text-slate-900 leading-none">Đông Anh</h1>
              <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase mt-1">Hệ sinh thái xe điện</span>
            </div>
          </Link>
          
          <nav className="hidden lg:flex gap-10 text-[13px] font-extrabold uppercase tracking-widest text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
            <Link href="/#san-pham" className="hover:text-blue-600 transition-colors">Sản phẩm</Link>
            <Link href="/#cong-nghe" className="hover:text-blue-600 transition-colors">Công nghệ</Link>
            <Link href="/tin-tuc" className="hover:text-blue-600 transition-colors">Tin tức</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={() => setIsModalOpen(true)} className="hidden md:flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-8 py-3.5 rounded-full text-sm font-bold transition-all duration-300 shadow-xl shadow-slate-900/20 hover:shadow-blue-600/30 hover:-translate-y-0.5">
              Nhận tư vấn <ArrowRight size={16} />
            </button>
            <button className="lg:hidden text-slate-900 p-2 bg-white rounded-full shadow-md" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }} className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-28 px-6 border-b border-slate-100 shadow-2xl">
            <div className="flex flex-col gap-6 text-xl font-black uppercase tracking-widest text-slate-700">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-600 border-b border-slate-100 pb-4 flex justify-between items-center">Trang chủ <ChevronDown size={20} className="-rotate-90 text-slate-300"/></Link>
              <Link href="/#san-pham" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-600 border-b border-slate-100 pb-4 flex justify-between items-center">Sản phẩm <ChevronDown size={20} className="-rotate-90 text-slate-300"/></Link>
              <Link href="/#cong-nghe" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-600 border-b border-slate-100 pb-4 flex justify-between items-center">Công nghệ <ChevronDown size={20} className="-rotate-90 text-slate-300"/></Link>
              <Link href="/tin-tuc" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-600 border-b border-slate-100 pb-4 flex justify-between items-center">Tin tức <ChevronDown size={20} className="-rotate-90 text-slate-300"/></Link>
              <button onClick={() => { setIsMobileMenuOpen(false); setIsModalOpen(true); }} className="mt-8 bg-blue-600 text-white px-6 py-5 rounded-2xl text-base font-bold flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30">
                Đăng ký tư vấn ngay <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION: Nền Gradient sáng, Text đổ bóng mạnh mẽ */}
      <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/50 via-white to-transparent -z-10 blur-3xl"></div>
        
        <motion.div variants={stagger} initial="hidden" animate="show" className="text-center max-w-4xl mx-auto mb-16 mt-8">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-200 bg-blue-50/80 text-blue-700 mb-8 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span></span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Xu hướng di chuyển 2026</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.05] text-slate-900 drop-shadow-sm">
            KỶ NGUYÊN <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400">TỐC ĐỘ MỚI</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg md:text-xl mb-10 text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Khám phá bộ sưu tập xe máy điện chính hãng Powelldd. Thiết kế thời thượng, công năng bứt phá và trải nghiệm lái hoàn hảo.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-4 px-4">
            <a href="#san-pham" className="bg-slate-900 text-white px-10 py-4.5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-slate-900/20 hover:shadow-blue-600/30 hover:-translate-y-1">Xem bộ sưu tập</a>
            <button onClick={() => setIsModalOpen(true)} className="bg-white border-2 border-slate-200 text-slate-900 px-10 py-4.5 rounded-full font-bold text-sm uppercase tracking-widest hover:border-slate-900 transition-all duration-300">Đăng ký lái thử</button>
          </motion.div>
        </motion.div>

        {/* Banner Slider với bo góc sâu hơn và đổ bóng */}
        <motion.div variants={scaleIn} initial="hidden" animate="show" className="w-full relative px-2 md:px-0">
          <div className="relative w-full aspect-square md:aspect-[21/9] rounded-[2.5rem] overflow-hidden bg-white border-8 border-white shadow-2xl shadow-slate-300/60">
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentBanner}
                initial={{ opacity: 0, scale: 1.05 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                src={bannerImages[currentBanner]} 
                alt="Banner Xe Điện" 
                className="w-full h-full object-cover" 
              />
            </AnimatePresence>
            
            {/* Overlay Gradient cho text (nếu có) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-20 bg-black/20 backdrop-blur-md p-2 rounded-full">
              {bannerImages.map((_, idx) => (
                <button key={idx} onClick={() => setCurrentBanner(idx)} className={`w-10 h-1.5 rounded-full transition-all duration-300 ${currentBanner === idx ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}`} />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. DẢI TICKER: Màu xanh chủ đạo để hút mắt */}
      <div className="w-full bg-blue-600 py-5 overflow-hidden flex whitespace-nowrap mt-8">
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 30, repeat: Infinity }} className="flex text-white font-extrabold text-sm tracking-[0.25em] uppercase">
          {[...Array(15)].map((_, i) => (
            <span key={i} className="mx-10 flex items-center gap-10">
              BẢO HÀNH 2 NĂM <span className="w-2 h-2 rounded-full bg-cyan-300"></span>
              TRẢ GÓP 0% <span className="w-2 h-2 rounded-full bg-cyan-300"></span>
              GIAO XE TẬN NƠI <span className="w-2 h-2 rounded-full bg-cyan-300"></span>
              THU CŨ ĐỔI MỚI <span className="w-2 h-2 rounded-full bg-cyan-300"></span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* 3. SẢN PHẨM: Card hiệu ứng Hover Float mạnh */}
      <section id="san-pham" className="bg-slate-100 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center">
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-slate-900 mb-6 drop-shadow-sm">Bộ sưu tập 2026</h3>
            <p className="text-slate-500 text-lg font-medium mb-10 max-w-2xl mx-auto">Thiết kế công thái học. Khung gầm hợp kim siêu nhẹ. Trải nghiệm cảm giác làm chủ mọi cung đường.</p>
            
            <div className="inline-flex bg-white p-2 rounded-full shadow-lg shadow-slate-200/50">
              {["all", "cao-cap", "tieu-chuan"].map((cat) => (
                <button key={cat} onClick={() => setFilter(cat)} className={`px-10 py-3.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${filter === cat ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20 scale-105" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}>
                  {cat === "all" ? "Tất cả dòng xe" : cat.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence>
              {filteredBikes.map((bike) => (
                <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }} transition={{ duration: 0.4 }} key={bike.id} className="group bg-white rounded-[2.5rem] p-6 transition-all duration-500 relative overflow-hidden flex flex-col shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 border border-white hover:border-blue-50">
                  
                  {/* Badge */}
                  {(bike.id === "dimoon" || bike.id === "wespan-pro") && (
                    <div className="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full z-20 shadow-md">Best Seller</div>
                  )}
                  
                  <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-slate-50 to-slate-100 rounded-3xl mb-8 flex items-center justify-center p-6 transition-transform duration-700 group-hover:scale-105">
                    <img src={bike.coverImage} alt={bike.name} className="w-full h-full object-contain z-10 filter drop-shadow-2xl" />
                    {/* Shadow Decor dưới gầm xe */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-black/10 blur-xl rounded-full"></div>
                  </div>
                  
                  <div className="flex-1 flex flex-col px-3">
                    <h4 className="text-2xl font-black mb-1.5 text-slate-900">{bike.name}</h4>
                    <p className="text-blue-600 text-xs mb-8 uppercase tracking-widest font-bold">{bike.tagline}</p>
                    
                    <div className="flex justify-between items-center bg-slate-50/80 p-5 rounded-2xl mb-8 border border-slate-100/50">
                      <div className="text-center w-full">
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">Quãng đường</p>
                        <p className="font-black text-slate-800 text-lg">{bike.range}</p>
                      </div>
                      <div className="w-px h-10 bg-slate-200 mx-2"></div>
                      <div className="text-center w-full">
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">Vận tốc</p>
                        <p className="font-black text-slate-800 text-lg">{bike.speed}</p>
                      </div>
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xl font-black text-slate-900">{bike.price}</span>
                      <Link href={`/${bike.id}`} className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-blue-600 hover:rotate-[-45deg] transition-all duration-300 shadow-md"><ArrowRight size={20} /></Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 4. CÔNG NGHỆ */}
      <section id="cong-nghe" className="py-32 bg-white relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/4"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center">
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-slate-900 drop-shadow-sm">Lõi công nghệ</h3>
            <p className="text-slate-500 mt-6 font-medium text-lg max-w-2xl mx-auto">Hệ sinh thái kỹ thuật vượt trội được tích hợp trên mọi dòng xe, mang đến sự an toàn và hiệu suất tối đa.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techSlides.map((slide, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.15, duration: 0.6 }} viewport={{ once: true, margin: "-50px" }} className="bg-white border border-slate-100 shadow-xl shadow-slate-200/40 rounded-[2rem] p-8 group hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10 transition-transform group-hover:scale-150"></div>
                
                <div className="w-16 h-16 bg-white border border-slate-100 shadow-sm rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-50 transition-all duration-300">
                  {slide.icon}
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-4">{slide.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{slide.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. KHÁCH HÀNG */}
      <section className="py-32 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl md:text-5xl font-black uppercase mb-20 text-center tracking-widest">
            Góc nhìn <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">khách hàng</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { name: "Anh Tuấn", bike: "Dimoon", text: "Trải nghiệm vận hành ấn tượng. Xe chạy êm, thiết kế đậm chất tương lai. Mua tại Xe điện Đông Anh chính sách bảo hành cực tốt." },
              { name: "Chị Hạnh", bike: "Hazel", text: "Thiết kế nhỏ gọn, dễ luồn lách. Pin trâu bò đi mãi chưa thấy hết. Các bạn nhân viên Đông Anh tư vấn rất nhiệt tình." },
              { name: "Bạn Đức", bike: "Wespan pro", text: "Chốt ngay từ cái nhìn đầu tiên. Đèn LED siêu sáng, lốp bám đường cực chắc. Vote 5 sao cho chất lượng dịch vụ." }
            ].map((review, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.2, duration: 0.6 }} viewport={{ once: true }} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-10 rounded-[2.5rem] relative hover:bg-slate-800 transition-colors">
                <div className="flex gap-1.5 text-amber-400 mb-8">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <p className="text-slate-300 text-base leading-relaxed mb-10 font-medium italic">"{review.text}"</p>
                <div className="flex items-center gap-5 mt-auto">
                  <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-full flex items-center justify-center font-black text-lg text-white shadow-lg">{review.name.charAt(0)}</div>
                  <div>
                    <p className="font-black text-white text-lg">{review.name}</p>
                    <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest mt-1.5">Đã mua {review.bike}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION: Banner Xanh dương nổi bật */}
      <section className="py-28 bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center px-6 relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>

        <motion.div initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-widest uppercase text-white drop-shadow-lg">
            BẮT ĐẦU HÀNH TRÌNH
          </h2>
          <p className="text-xl font-medium mb-12 text-blue-100 max-w-2xl mx-auto">Đến ngay showroom Xe điện Đông Anh hoặc liên hệ hotline để nhận voucher ưu đãi lên đến 2 triệu đồng.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <button onClick={() => setIsModalOpen(true)} className="bg-white text-blue-700 px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-300 shadow-2xl shadow-black/20">
              Đăng ký lái thử
            </button>
            <a href="tel:0582376666" className="inline-flex items-center justify-center bg-transparent border-2 border-white/50 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white hover:text-blue-700 hover:border-white transition-all duration-300">
              058.237.6666
            </a>
          </div>
        </motion.div>
      </section>

      {/* 7. SHOWROOM */}
      <section id="showroom" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-10">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <span className="text-xs font-black tracking-[0.3em] uppercase text-blue-600 block mb-4">Hệ thống phân phối</span>
                <h3 className="text-5xl font-black uppercase tracking-widest text-slate-900 mb-8 leading-[1.1]">SHOWROOM <br />ĐÔNG ANH</h3>
                <p className="text-slate-500 font-medium text-lg leading-relaxed mb-10">Không gian trưng bày tiêu chuẩn 5 sao với đầy đủ các phiên bản xe điện mới nhất. Kính mời quý khách đến trải nghiệm thực tế.</p>
              </motion.div>

              <div className="space-y-5">
                <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-[2rem] hover:bg-blue-50/50 transition-colors border border-slate-100">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-slate-100"><MapPin className="text-blue-600" size={24} /></div>
                  <div>
                    <p className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1.5">Địa chỉ</p>
                    <p className="text-slate-600 font-medium">Đông Anh, Hà Nội</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-[2rem] hover:bg-blue-50/50 transition-colors border border-slate-100">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-slate-100"><Phone className="text-blue-600" size={24} /></div>
                  <div>
                    <p className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1.5">Hotline</p>
                    <a href="tel:0582376666" className="text-xl font-black text-blue-600">058.237.6666</a>
                  </div>
                </div>
                <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-[2rem] hover:bg-blue-50/50 transition-colors border border-slate-100">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-slate-100"><Clock className="text-blue-600" size={24} /></div>
                  <div>
                    <p className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1.5">Giờ mở cửa</p>
                    <p className="text-slate-600 font-medium">08:00 - 21:00 (Thứ 2 - Chủ Nhật)</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:col-span-7 w-full h-[600px] rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-300/60 relative border-8 border-slate-50 bg-slate-100">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232.58719461458594!2d105.84370208948461!3d21.136668629210686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313501d4ae7e6869%3A0x9675f89957718e87!2zWGUgxJFp4buHbiDEkMO0bmcgQW5o!5e0!3m2!1svi!2s!4v1793262823788!5m2!1svi!2s" width="100%" height="100%" style={{ border: 0, filter: 'contrast(1.1) saturate(1.2)' }} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="absolute inset-0"></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer id="lien-he" className="bg-slate-950 text-white pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 border-b border-slate-800/80 pb-20 mb-10">
          <div className="lg:col-span-5">
            {/* Logo Footer (Sửa bg-black thành bg-white) */}
            <div className="flex items-center gap-4 mb-6">
               <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white flex items-center justify-center p-1 shadow-lg">
                  <img src="/favicon.ico" alt="Xe Điện Đông Anh" className="w-full h-full object-contain" />
               </div>
               <div>
                 <h2 className="text-3xl font-black uppercase tracking-widest leading-none">Đông Anh</h2>
                 <span className="text-[10px] text-blue-500 font-bold tracking-[0.3em] uppercase mt-1.5 block">Hệ sinh thái xe điện</span>
               </div>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed font-medium max-w-sm mb-10">Kiến tạo phong cách số hiện đại. Chuyên phân phối các dòng xe điện chính hãng hàng đầu tại khu vực Đông Anh.</p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/xemaydientuonglai" target="_blank" rel="noreferrer" className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300 border border-slate-800">
                <FacebookIcon size={20} />
              </a>
              <a href="https://zalo.me/0582376666" target="_blank" rel="noreferrer" className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center hover:bg-blue-500 hover:-translate-y-1 transition-all duration-300 border border-slate-800">
                <span className="font-black text-sm">Zalo</span>
              </a>
              <a href="https://vt.tiktok.com/ZSqxquYYX/" target="_blank" rel="noreferrer" className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center hover:bg-black hover:-translate-y-1 transition-all duration-300 border border-slate-800 hover:border-slate-700">
                <TiktokIcon size={20} />
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <h3 className="text-xs font-black mb-10 uppercase tracking-[0.3em] text-slate-300">Thông tin liên hệ</h3>
            <div className="space-y-6 text-slate-400 font-medium text-sm">
              <p className="flex items-start gap-4 hover:text-white transition-colors cursor-default"><MapPin className="shrink-0 mt-0.5 text-blue-500" size={20} /> Đông Anh, Hà Nội</p>
              <p className="flex items-center gap-4 hover:text-white transition-colors"><Phone className="shrink-0 text-blue-500" size={20} /> <a href="tel:0582376666" className="font-bold tracking-wider text-base">058.237.6666</a></p>
              <p className="flex items-center gap-4"><Clock className="shrink-0 text-blue-500" size={20} /> 08:00 - 21:00 (T2 - CN)</p>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <h3 className="text-xs font-black mb-10 uppercase tracking-[0.3em] text-slate-300">Khách hàng</h3>
            <ul className="space-y-5 font-medium text-sm text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Chính sách bảo hành</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Hướng dẫn trả góp</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Chăm sóc khách hàng</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
          <p>© 2026 XE ĐIỆN ĐÔNG ANH. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-8 right-8 z-[90] flex flex-col gap-5">
        <div className="relative w-16 h-16 group">
          <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-30 duration-1000"></span>
          <motion.a href="https://zalo.me/0582376666" target="_blank" rel="noreferrer" whileHover={{ scale: 1.1 }} className="relative flex items-center justify-center w-full h-full rounded-full bg-blue-500 text-white shadow-2xl shadow-blue-500/40 border-2 border-white/20">
             <span className="font-black text-base">Zalo</span>
          </motion.a>
        </div>
        <div className="relative w-16 h-16 group">
          <motion.a href="https://www.facebook.com/xemaydientuonglai" target="_blank" rel="noreferrer" whileHover={{ scale: 1.1 }} className="relative flex items-center justify-center w-full h-full bg-gradient-to-tr from-[#00C6FF] to-[#0072FF] text-white rounded-full shadow-2xl shadow-blue-500/40 border-2 border-white/20">
            <MessengerIcon size={30} />
          </motion.a>
        </div>
      </div>

      {/* MODAL FORM TƯ VẤN & LÁI THỬ: Glassmorphism */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md cursor-pointer" />
            
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="relative bg-white/95 backdrop-blur-xl border border-white/50 w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl shadow-black/40 z-10 overflow-hidden">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-colors"><X size={20} /></button>

              {formStatus === "success" ? (
                <div className="text-center py-12">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="flex justify-center mb-8 text-emerald-500">
                    <CheckCircle2 size={80} strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-3xl font-black mb-3 text-slate-900">Đăng ký thành công</h3>
                  <p className="text-slate-500 font-medium text-base">Chuyên viên của Xe điện Đông Anh sẽ liên hệ với bạn trong ít phút tới.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-black uppercase tracking-widest mb-3 text-slate-900">Đăng ký lái thử</h3>
                  <p className="text-slate-500 text-sm mb-10 font-medium border-b border-slate-100 pb-6">Trải nghiệm tốc độ, nhận ngay đặc quyền.</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50/50 border border-slate-200 text-slate-900 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-bold placeholder-slate-400" placeholder="Họ và tên của bạn *" />
                    </div>
                    <div>
                      <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-50/50 border border-slate-200 text-slate-900 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-bold placeholder-slate-400" placeholder="Số điện thoại liên hệ *" />
                    </div>
                    <div>
                      <select value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} className="w-full bg-slate-50/50 border border-slate-200 text-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer text-sm font-bold">
                        <option value="Chưa xác định">Bạn đang quan tâm dòng xe nào?</option>
                        {powellddBikes.map(bike => <option key={bike.id} value={bike.name}>{bike.name}</option>)}
                      </select>
                    </div>
                    <button type="submit" disabled={formStatus === "submitting"} className="w-full bg-blue-600 text-white rounded-2xl py-4.5 font-black uppercase tracking-widest mt-6 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 transition-all flex items-center justify-center disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none">
                      {formStatus === "submitting" ? <Loader2 className="animate-spin" size={24} /> : "Xác nhận gửi"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}