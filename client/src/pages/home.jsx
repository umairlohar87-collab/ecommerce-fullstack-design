import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import heroImg from "../assets/hero.png";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const categories = [
  "Automobiles", "Clothes and wear", "Home interiors",
  "Computer and tech", "Tools, equipments", "Sports and outdoor",
  "Animal and pets", "Machinery tools", "More category",
];

const dealProducts = [
  { id: 1, name: "Smart watches", discount: 25, img: "images/tech/image 34.png" },
  { id: 2, name: "Laptops",       discount: 15, img: "images/tech/image 23.png" },
  { id: 3, name: "GoPro cameras", discount: 40, img: "images/tech/image 29.png" },
  { id: 4, name: "Headphones",    discount: 25, img: "images/tech/8.png" },
  { id: 5, name: "Canon cameras", discount: 25, img: "images/tech/image 32.png" },
];

const homeItems = [
  { id: 1, name: "Soft chairs",    from: "USD 19",  img: "images/interior/6.png" },
  { id: 2, name: "Sofa & chair",   from: "USD 19",  img: "images/interior/image 89.png" },
  { id: 3, name: "Kitchen dishes", from: "USD 19",  img: "images/interior/image 93.png" },
  { id: 4, name: "Smart watches",  from: "USD 19",  img: "images/tech/image 34.png" },
  { id: 5, name: "Kitchen mixer",  from: "USD 100", img: "images/interior/1.png" },
  { id: 6, name: "Blenders",       from: "USD 39",  img: "images/interior/3.png" },
  { id: 7, name: "Home appliance", from: "USD 19",  img: "images/interior/7.png" },
  { id: 8, name: "Coffee maker",   from: "USD 10",  img: "images/interior/8.png" },
];

const electronicsItems = [
  { id: 1, name: "Smart watches",  from: "USD 19",  img: "images/tech/image 34.png" },
  { id: 2, name: "Cameras",        from: "USD 89",  img: "images/tech/image 32.png" },
  { id: 3, name: "Headphones",     from: "USD 10",  img: "images/tech/8.png" },
  { id: 4, name: "Smart watches",  from: "USD 90",  img: "images/tech/image 33.png" },
  { id: 5, name: "Laptops & PC",   from: "USD 340", img: "images/tech/image 23.png" },
  { id: 6, name: "Smartphones",    from: "USD 18",  img: "images/tech/image 85.png" },
  { id: 7, name: "Electric kettle",from: "USD 240", img: "images/tech/image 86.png" },
];

const recommendedItems = [
  { id: 1,  price: "$10.30", name: "T-shirts with multiple colors, for men",    img: "layout/alibaba/Image/cloth/Bitmap.png" },
  { id: 2,  price: "$10.30", name: "Jeans shorts, blue color",                  img: "layout/alibaba/Image/cloth/image 24.png" },
  { id: 3,  price: "$12.50", name: "Brown winter coat medium size",              img: "layout/alibaba/Image/cloth/image 26.png" },
  { id: 4,  price: "$34.00", name: "Jeans bag for travel for men",               img: "layout/alibaba/Image/cloth/image 30.png" },
  { id: 5,  price: "$99.00", name: "Leather wallet",                             img: "layout/alibaba/Image/cloth/2 1.png" },
  { id: 6,  price: "$9.99",  name: "Canon camera black, 100x zoom",             img: "images/tech/image 32.png" },
  { id: 7,  price: "$8.99",  name: "Headset for gaming with mic",               img: "images/tech/8.png" },
  { id: 8,  price: "$10.30", name: "Smartwatch silver color modern",            img: "images/tech/image 34.png" },
  { id: 9,  price: "$10.30", name: "Blue wallet for men leather metarfial",     img: "layout/alibaba/Image/cloth/Bitmap (2).png" },
  { id: 10, price: "$80.95", name: "Jeans bag for travel for men",              img: "layout/alibaba/Image/cloth/image 30.png" },
];

const extraServices = [
  { id: 1, label: "Source from Industry Hubs", img: "images/backgrounds/image 106.png", icon: "🔍" },
  { id: 2, label: "Customize Your Products", img: "images/backgrounds/image 107.png", icon: "🖊️" },
  { id: 3, label: "Fast, reliable shipping by ocean or air", img: "images/backgrounds/image 98.png", icon: "✈️" },
  { id: 4, label: "Product monitoring and inspection", img: "images/backgrounds/Mask group.png", icon: "🌐" },
];

const suppliers = [
  { country: "Arabic Emirates", flag: "🇦🇪", url: "shopname.ae" },
  { country: "Australia",       flag: "🇦🇺", url: "shopname.ae" },
  { country: "United States",   flag: "🇺🇸", url: "shopname.ae" },
  { country: "Russia",          flag: "🇷🇺", url: "shopname.ru" },
  { country: "Italy",           flag: "🇮🇹", url: "shopname.it" },
  { country: "Denmark",         flag: "🇩🇰", url: "shopname.dk" },
  { country: "France",          flag: "🇫🇷", url: "shopname.fr" },
  { country: "Arabic Emirates", flag: "🇦🇪", url: "shopname.ae" },
  { country: "China",           flag: "🇨🇳", url: "shopname.au" },
  { country: "Great Britain",   flag: "🇬🇧", url: "shopname.co.uk" },
];

// ─── Countdown Timer Hook ─────────────────────────────────────────────────────
function useCountdown(targetDate) {
  const calc = () => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    return {
      days:  Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      mins:  Math.floor((diff % 3600000) / 60000),
      secs:  Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function TimerBlock({ value, label }) {
  return (
    <div className="text-center">
      <div className="bg-white border border-gray-200 rounded px-2 py-0.5 inline-block min-w-[38px] text-lg font-bold text-gray-800">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-[10px] text-gray-400 mt-0.5 uppercase">{label}</div>
    </div>
  );
}

function ProductMiniCard({ name, from, img }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
      <img src={img} alt={name} className="w-[54px] h-[54px] object-cover rounded-md border border-gray-100 flex-shrink-0" />
      <div>
        <div className="text-[13px] font-medium text-gray-800 line-clamp-1">{name}</div>
        <div className="text-[11px] text-gray-400 mt-0.5 leading-tight">
          From<br />
          <span className="text-gray-600 font-semibold">{from}</span>
        </div>
      </div>
    </div>
  );
}

function SectionPanel({ title, bannerImg, items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] border border-gray-200 rounded-lg overflow-hidden mb-6 bg-white">
      <div className="relative p-5 flex flex-col justify-end min-h-[200px] bg-gradient-to-br from-[#dce9ff] to-[#f0f5ff]">
        <img src={bannerImg} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative z-10">
          <div className="text-base font-bold text-[#1a1a2e] mb-3">{title}</div>
          <button className="px-4 py-1.5 bg-white rounded-md text-xs font-semibold text-gray-800 shadow-sm border border-transparent hover:border-gray-200 transition-all">Source now</button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 p-2 gap-1 content-start">
        {items.map(item => <ProductMiniCard key={item.id} {...item} />)}
      </div>
    </div>
  );
}

// ─── Main Home Page ───────────────────────────────────────────────────────────
export default function Home() {
  const { days, hours, mins, secs } = useCountdown("2025-12-31T23:59:59");
  const [email, setEmail] = useState("");

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800">

      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <Navbar />

      {/* ── PAGE CONTENT ───────────────────────────────────── */}
      <main className="max-w-[1200px] mx-auto px-5 py-4">

        {/* ── HERO ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_220px] gap-4 mb-6">

          {/* Category sidebar */}
          <div className="hidden md:block bg-white rounded-lg border border-gray-200 py-2 self-start">
            {categories.map((cat) => (
              <div key={cat} className={`px-4 py-2.5 text-[13px] cursor-pointer text-gray-700 transition-colors hover:bg-blue-50 ${cat !== "More category" ? "border-b border-gray-50" : ""}`}>
                {cat}
              </div>
            ))}
          </div>

          {/* Hero banner */}
          <div className="relative bg-gradient-to-br from-[#b8d4f0] via-[#d4e8f7] to-[#e8f4f8] rounded-xl p-8 flex items-center justify-between overflow-hidden min-h-[240px]">
            <div className="relative z-10">
              <p className="text-[13px] text-gray-600 mb-1.5">Latest trending</p>
              <h1 className="text-3xl font-bold text-[#1a1a2e] leading-tight mb-5">
                Electronic<br />items
              </h1>
              <button className="px-5 py-2.5 bg-white rounded-md text-[13px] font-semibold text-gray-800 shadow-sm hover:shadow-md transition-shadow">Learn more</button>
            </div>
            <img src={heroImg} alt="Hero" className="relative z-10 h-48 md:h-52 object-contain drop-shadow-2xl" />
          </div>

          {/* Right promo cards */}
          <div className="flex flex-col gap-3">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-[13px] text-gray-600 mb-2.5">
                Hi, <strong className="text-gray-800">user</strong><br /><span className="text-xs">let's get started</span>
              </p>
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 bg-blue-600 text-white rounded-md text-xs font-semibold hover:bg-blue-700 transition-colors">Join now</button>
                <button className="flex-1 py-1.5 bg-white text-blue-600 border border-blue-600 rounded-md text-xs font-semibold hover:bg-blue-50 transition-colors">Log in</button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg p-4">
              <p className="text-[13px] font-bold text-white">Get US $10 off<br />with a new supplier</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg p-4">
              <p className="text-xs font-semibold text-white">Send quotes with<br />supplier preferences</p>
            </div>
          </div>
        </div>

        {/* ── DEALS & OFFERS ───────────────────────────────── */}
        <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-[190px] md:pr-5 md:border-r border-gray-200 mb-4 md:mb-0">
            <h3 className="text-base font-bold mb-1">Deals and offers</h3>
            <p className="text-xs text-gray-400 mb-3">Hygiene equipments</p>
            <div className="flex gap-2 justify-center md:justify-start">
              <TimerBlock value={days}  label="Days" />
              <TimerBlock value={hours} label="Hour" />
              <TimerBlock value={mins}  label="Min" />
              <TimerBlock value={secs}  label="Sec" />
            </div>
          </div>
          <div className="flex-1 flex overflow-x-auto w-full scrollbar-hide">
            {dealProducts.map((p, i) => (
              <div key={p.id} className={`flex-1 min-w-[120px] flex flex-col items-center p-2 cursor-pointer transition-colors hover:bg-gray-50 ${i < dealProducts.length - 1 ? "border-r border-gray-50" : ""}`}>
                <img src={p.img} alt={p.name} className="w-20 h-20 object-cover rounded-lg mb-2" />
                <div className="text-xs font-medium text-gray-700 text-center mb-1.5">{p.name}</div>
                <div className="bg-red-100 text-red-600 rounded-full px-2.5 py-0.5 text-[11px] font-bold">
                  -{p.discount}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── HOME & OUTDOOR ───────────────────────────────── */}
        <SectionPanel
          title="Home and outdoor"
          bannerImg="images/backgrounds/Group 969.png"
          items={homeItems}
        />

        {/* ── CONSUMER ELECTRONICS ─────────────────────────── */}
        <SectionPanel
          title="Consumer electronics and gadgets"
          bannerImg="images/backgrounds/Group 982.png"
          items={electronicsItems}
        />

        {/* ── SUPPLIER INQUIRY BANNER ──────────────────────── */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 rounded-xl p-10 mb-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-white text-2xl font-bold mb-3">
              An easy way to send<br />requests to all suppliers
            </h2>
            <p className="text-blue-200 text-[13px] leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-xl">
            <p className="text-[13px] text-gray-500 mb-3">Send quote to suppliers</p>
            <input placeholder="What item you need?" className="w-full px-3 py-2 border border-gray-200 rounded-md text-[13px] mb-2.5 focus:border-blue-500 outline-none transition-colors" />
            <textarea placeholder="Type more details" rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-md text-[13px] mb-2.5 focus:border-blue-500 outline-none resize-none transition-colors" />
            <div className="flex gap-2.5 mb-3.5">
              <input placeholder="Quantity" className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-[13px] focus:border-blue-500 outline-none transition-colors" />
              <select className="px-3 py-2 border border-gray-200 rounded-md text-[13px] bg-white cursor-pointer focus:border-blue-500 outline-none">
                <option>Pcs</option><option>Kg</option><option>Ltr</option>
              </select>
            </div>
            <button className="w-full py-2.5 bg-blue-600 text-white rounded-md text-[14px] font-semibold hover:bg-blue-700 transition-colors shadow-md">Send Inquiry</button>
          </div>
        </div>

        {/* ── RECOMMENDED ITEMS ────────────────────────────── */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Recommended items</h3>
            <a href="#" className="text-[13px] text-blue-600 hover:underline">View all →</a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {recommendedItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-all">
                <img src={item.img} alt={item.name} className="w-full h-[130px] object-cover" />
                <div className="p-3">
                  <div className="text-sm font-bold text-gray-800 mb-1">{item.price}</div>
                  <div className="text-xs text-gray-500 leading-normal line-clamp-2">{item.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── OUR EXTRA SERVICES ───────────────────────────── */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4">Our extra services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {extraServices.map((svc) => (
              <div key={svc.id} className="group rounded-xl overflow-hidden relative cursor-pointer border border-gray-200 hover:shadow-lg transition-all bg-white">
                <img src={svc.img} alt={svc.label} className="w-full h-32 object-cover block" />
                <div className="absolute bottom-11 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-lg shadow-md border border-gray-100 group-hover:scale-110 transition-transform">
                  {svc.icon}
                </div>
                <div className="p-3 bg-white text-[13px] font-medium text-gray-800 leading-tight pr-12">
                  {svc.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SUPPLIERS BY REGION ──────────────────────────── */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">Suppliers by region</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-3">
            {suppliers.map((s, i) => (
              <div key={i} className="flex items-center gap-2.5 cursor-pointer py-1 group">
                <span className="text-2xl group-hover:scale-110 transition-transform">{s.flag}</span>
                <div>
                  <div className="text-[13px] font-medium text-gray-800">{s.country}</div>
                  <div className="text-[11px] text-blue-600">{s.url}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* ── SUBSCRIBE BANNER ────────────────────────────────── */}
      <div className="bg-white border-y border-gray-200 py-8 px-5 text-center">
        <div className="max-w-[600px] mx-auto">
          <h3 className="text-lg font-bold mb-1.5">Subscribe on our newsletter</h3>
          <p className="text-[13px] text-gray-400 mb-4">
            Get daily news on upcoming offers from many suppliers all over the world
          </p>
          <div className="flex border-[1.5px] border-blue-600 rounded-lg overflow-hidden max-w-[440px] mx-auto">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 text-[13px] outline-none"
            />
            <button className="bg-blue-600 text-white px-5 py-2 text-[13px] font-semibold hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="bg-[#1a1a2e] text-gray-400 py-10 px-5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand col */}
          <div className="lg:col-span-1">
            <div className="bg-blue-600 text-white rounded-md px-3 py-1.5 text-base font-bold inline-flex items-center gap-2 mb-4">
              🛒 Brand
            </div>
            <div className="text-xs leading-relaxed mb-4 max-w-[200px]">
              Best information about the company goes here but now lorem ipsum is
            </div>
            <div className="flex gap-2">
              {["Facebook", "Twitter", "LinkedIn", "Instagram", "YouTube"].map((s, i) => (
                <div key={s} className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-[10px] cursor-pointer hover:bg-blue-600 transition-colors" title={s}>
                  {["f", "t", "in", "ig", "yt"][i]}
                </div>
              ))}
            </div>
          </div>

          {[
            { title: "About",   links: ["About us", "Find store", "Categories", "Blogs"] },
            { title: "Help",    links: ["Customer support", "Delivery details", "Terms & Conditions", "Privacy Policy"] },
            { title: "FAQ",     links: ["Account", "Manage deliveries", "Orders", "Payments"] },
            { title: "Contact", links: ["(+91) 999 999 9999", "support@brand.com"] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-gray-50 text-[14px] font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link} className="text-xs hover:text-blue-400 cursor-pointer transition-colors">{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="max-w-[1200px] mx-auto mt-10 border-t border-gray-700 pt-5 flex flex-col sm:flex-row justify-between items-center text-xs gap-4">
          <span>© 2024 Brand. All rights reserved.</span>
          <div className="flex gap-5">
            <span className="cursor-pointer hover:text-blue-400 transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-blue-400 transition-colors">Terms & Conditions</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
