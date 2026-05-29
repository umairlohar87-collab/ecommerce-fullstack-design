import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);
const ChevronRight = () => <Icon d="M9 18l6-6-6-6" size={13} />;
const ChevronDown  = () => <Icon d="M6 9l6 6 6-6" size={13} />;
const HeartIcon    = () => <Icon d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" size={15} />;
const CheckIcon    = () => <Icon d="M20 6L9 17l-5-5" size={13} />;
const ShieldIcon   = () => <Icon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" size={14} />;
const TruckIcon    = () => <Icon d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3M9 17h6m4 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM13 8h8l-2 9H15" size={14} />;
const StarFilled   = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const StarEmpty = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

function Stars({ rating = 4, max = 5 }) {
  return (
    <span className="inline-flex gap-0.5 items-center">
      {Array.from({ length: max }, (_, i) =>
        i < rating ? <StarFilled key={i} /> : <StarEmpty key={i} />
      )}
    </span>
  );
}

// ─── Mock product data ─────────────────────────────────────────────────────────
const product = {
  _id: "1",
  name: "Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle",
  price: 98.00,
  prices: [
    { range: "50-100 pcs", price: "$98.00" },
    { range: "100-700 pcs", price: "$90.00" },
    { range: "700+ pcs",   price: "$78.00" },
  ],
  rating: 7.5,
  reviews: 32,
  sold: 154,
  inStock: true,
  negotiable: true,
  type: "Classic shoes",
  material: "Plastic material",
  design: "Modern nice",
  customization: "Customized logo and design custom packages",
  protection: "Refund Policy",
  warranty: "2 years full warranty",
  images: [
    "layout/alibaba/Image/cloth/Bitmap.png",
    "layout/alibaba/Image/cloth/image 24.png",
    "layout/alibaba/Image/cloth/image 26.png",
    "layout/alibaba/Image/cloth/image 30.png",
    "layout/alibaba/Image/cloth/2 1.png",
    "layout/alibaba/Image/cloth/Bitmap (2).png",
  ],
  specs: {
    Model: "#8786867",
    Style: "Classic style",
    Certificate: "ISO-888921212",
    Size: "34mm × 450mm × 19mm",
    Memory: "36GB RAM",
  },
  features: [
    "Some great feature name here",
    "Lorem ipsum dolor sit amet, consectetur",
    "Duis aute irure dolor in reprehenderit",
    "Some great feature name here",
  ],
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
  category: "Electronics",
};

const relatedProducts = [
  { id: 1, name: "Xiaomi Redmi 8 Original", price: "$32.00 - $40.00", img: "images/tech/image 85.png" },
  { id: 2, name: "Xiaomi Redmi 8 Original", price: "$32.00 - $40.00", img: "images/tech/image 86.png" },
  { id: 3, name: "Xiaomi Redmi 8 Original", price: "$32.00 - $40.00", img: "images/tech/8.png" },
  { id: 4, name: "Xiaomi Redmi 8 Original", price: "$32.00 - $40.00", img: "images/tech/image 32.png" },
  { id: 5, name: "Xiaomi Redmi 8 Original", price: "$32.00 - $40.00", img: "images/tech/image 33.png" },
  { id: 6, name: "Xiaomi Redmi 8 Original", price: "$32.00 - $40.00", img: "images/tech/image 34.png" },
];

const youMayLike = [
  { id: 1, name: "Men Blazers Sets Elegant Formal", price: "$7.00 – $99.50", img: "layout/alibaba/Image/cloth/image 24.png" },
  { id: 2, name: "Man Shirt Sleeve Polo Contrast",  price: "$7.00 – $99.50", img: "layout/alibaba/Image/cloth/Bitmap.png" },
  { id: 3, name: "Apple Watch Series Gray",         price: "$7.00 – $99.50", img: "images/tech/image 34.png" },
  { id: 4, name: "Basketball Crew Socks Long Stuff", price: "$7.00 – $99.50", img: "layout/alibaba/Image/cloth/image 30.png" },
  { id: 5, name: "New Summer Men's casual T-Shirts", price: "$7.00 – $99.50", img: "layout/alibaba/Image/cloth/image 26.png" },
];

const tabs = ["Description", "Reviews", "Shipping", "About seller"];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ProductDetails() {
  const { addToCart }         = useCart();
  const navigate              = useNavigate();
  const [activeImg, setActiveImg]     = useState(0);
  const [activeTab, setActiveTab]     = useState("Description");
  const [saved, setSaved]             = useState(false);
  const [email, setEmail]             = useState("");

  const handleAddToCart = () => {
    addToCart({ ...product, price: product.price });
    navigate("/cart");
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800">

      <Navbar />

      {/* ── BREADCRUMB ─────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-5 py-2.5">
          <div className="flex items-center gap-1.5 text-[13px] text-gray-400">
            {["Home","Clothings","Men's wear","Summer clothing"].map((crumb, i, arr) => (
              <span key={crumb} className="flex items-center gap-1.5">
                {i < arr.length - 1
                  ? <><Link to="/" className="hover:text-blue-600 transition-colors">{crumb}</Link><ChevronRight /></>
                  : <span className="text-gray-700 font-medium">{crumb}</span>
                }
              </span>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-5 py-5">

        {/* ── PRODUCT TOP SECTION ─────────────────────────── */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[300px_1fr_240px] gap-8">

            {/* ── LEFT: Images ─────────────────────────────── */}
            <div>
              {/* Main image */}
              <div className="border border-gray-100 rounded-xl overflow-hidden mb-3 h-[300px] bg-gray-50 flex items-center justify-center shadow-inner">
                <img src={product.images[activeImg]} alt="product" className="w-full h-full object-cover" />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <div key={i} onClick={() => setActiveImg(i)} className={`w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer transition-all border-2 ${activeImg === i ? "border-blue-600 scale-105 shadow-md" : "border-gray-100 hover:border-blue-200"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* ── MIDDLE: Product Info ──────────────────────── */}
            <div>
              {/* In stock badge */}
              <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-100 rounded-lg px-3 py-1 mb-3">
                <span className="text-green-600 text-[10px] font-bold">✓</span>
                <span className="text-green-600 text-xs font-bold uppercase tracking-wider">In stock</span>
              </div>

              {/* Name */}
              <h1 className="text-xl font-bold text-gray-900 mb-3 leading-tight tracking-tight">
                {product.name}
              </h1>

              {/* Rating row */}
              <div className="flex items-center gap-3 mb-5 flex-wrap text-xs text-gray-400 font-medium">
                <Stars rating={4} />
                <span className="text-orange-500 font-bold">{product.rating}</span>
                <span className="text-gray-200">|</span>
                <span>{product.reviews} reviews</span>
                <span className="text-gray-200">|</span>
                <span>{product.sold} sold</span>
              </div>

              {/* Price tiers */}
              <div className="flex border border-gray-100 rounded-xl overflow-hidden mb-6 bg-gray-50/30 w-fit shadow-sm">
                {product.prices.map((tier, i) => (
                  <div key={i} className={`px-5 py-3 text-center border-r border-gray-100 last:border-0 ${i === 1 ? "bg-orange-50/50" : "bg-white"}`}>
                    <div className={`text-[17px] font-black ${i === 1 ? "text-orange-600" : "text-gray-900"}`}>
                      {tier.price}
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">{tier.range}</div>
                  </div>
                ))}
              </div>

              {/* Specs table */}
              <table className="w-full mb-4">
                <tbody className="divide-y divide-gray-50">
                  {[
                    ["Price",          "Negotiable"],
                    ["Type",           product.type],
                    ["Material",       product.material],
                    ["Design",         product.design],
                    ["Customization",  product.customization],
                    ["Protection",     product.protection],
                    ["Warranty",       product.warranty],
                  ].map(([key, val]) => (
                    <tr key={key}>
                      <td className="py-2 text-[13px] text-gray-400 font-medium w-32 align-top">
                        {key}:
                      </td>
                      <td className="py-2 text-[13px] text-gray-700 font-semibold">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── RIGHT: Supplier + Actions ─────────────────── */}
            <div className="flex flex-col gap-3">

              {/* Supplier card */}
              <div className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-100 flex-shrink-0">
                    R
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-gray-800">Supplier</div>
                    <div className="text-[12px] text-gray-400 font-medium">Guanjia Trading LLC</div>
                  </div>
                </div>

                {/* Location + badges */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <span className="text-lg">🇩🇪</span> Germany, Berlin
                  </div>
                  <div className="flex items-center gap-2 text-xs text-green-600 font-bold">
                    <ShieldIcon className="text-green-500" /> Verified Seller
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <TruckIcon className="text-gray-400" /> Worldwide shipping
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <button onClick={handleAddToCart} className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-[0.98] transition-all tracking-wide mt-2">
                Send Inquiry
              </button>

              <button className="w-full py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-50 transition-all active:scale-[0.98]">
                Seller's profile
              </button>

              {/* Save for later */}
              <button onClick={() => setSaved(v => !v)} className={`flex items-center justify-center gap-2 py-2 text-[13px] font-bold transition-all hover:scale-105 ${saved ? "text-red-500" : "text-gray-400 hover:text-gray-600"}`}>
                <HeartIcon className={saved ? "fill-red-500 stroke-red-500" : ""} /> {saved ? "Saved" : "Save for later"}
              </button>
            </div>
          </div>
        </div>

        {/* ── TABS + DESCRIPTION + YOU MAY LIKE ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-4 mb-4">

          {/* Tabs + content */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">

            {/* Tab bar */}
            <div className="flex border-b border-gray-100 bg-gray-50/50 px-2">
              {tabs.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-4 text-[13px] font-bold transition-all relative border-b-2
                  ${activeTab === tab ? "text-blue-600 border-blue-600 bg-white" : "text-gray-400 border-transparent hover:text-gray-600"}`}>
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6 sm:p-8">
              {activeTab === "Description" && (
                <div className="animate-in fade-in duration-300">
                  <p className="text-[14px] text-gray-500 leading-relaxed mb-8">
                    {product.description}
                  </p>

                  {/* Specs table */}
                  <div className="overflow-x-auto border border-gray-50 rounded-xl mb-8">
                    <table className="w-full">
                      <tbody className="divide-y divide-gray-50">
                        {Object.entries(product.specs).map(([key, val]) => (
                          <tr key={key} className="hover:bg-gray-50 transition-colors">
                            <td className="px-5 py-3 text-[13px] text-gray-400 font-bold uppercase tracking-wider w-40">{key}</td>
                            <td className="px-5 py-3 text-[13px] text-gray-700 font-semibold">{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-gray-50/50 rounded-lg border border-gray-100">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckIcon className="text-green-600" />
                        </div>
                        <span className="text-[13px] text-gray-600 font-medium leading-tight">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "Reviews" && (
                <div className="text-center py-12 animate-in fade-in duration-300">
                  <div className="text-4xl mb-4">💬</div>
                  <p className="text-[13px] text-gray-400 font-bold uppercase tracking-widest">No reviews yet.</p>
                </div>
              )}
              {activeTab === "Shipping" && (
                <div className="animate-in fade-in duration-300 flex items-center gap-4 p-5 bg-blue-50 border border-blue-100 rounded-xl">
                  <div className="text-2xl">🚚</div>
                  <div>
                    <p className="text-[13px] text-blue-900 font-bold">Free worldwide shipping</p>
                    <p className="text-[11px] text-blue-700 opacity-70">On all orders above $500. Securely packed and tracked.</p>
                  </div>
                </div>
              )}
              {activeTab === "About seller" && (
                <div className="animate-in fade-in duration-300 p-5 border border-gray-100 rounded-xl">
                  <h5 className="font-bold text-gray-800 mb-2">Guanjia Trading LLC</h5>
                  <p className="text-[13px] text-gray-500 leading-relaxed">Verified seller based in Germany. Specializing in high-quality textile and electronic products since 2015.</p>
                </div>
              )}
            </div>
          </div>

          {/* You may like */}
          <aside>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h4 className="text-[14px] font-bold text-gray-800 mb-5 uppercase tracking-wider">You may like</h4>
              <div className="space-y-5">
                {youMayLike.map(item => (
                  <div key={item.id} className="flex gap-4 group cursor-pointer border-b border-gray-50 pb-5 last:border-0 last:pb-0">
                    <img src={item.img} alt={item.name} className="w-14 h-14 object-cover rounded-lg border border-gray-100 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-[12px] font-bold text-gray-700 leading-tight mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-gray-400 font-black">{item.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* ── RELATED PRODUCTS ────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4 shadow-sm">
          <h3 className="text-base font-bold text-gray-800 mb-6 uppercase tracking-widest">Related products</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {relatedProducts.map(item => (
              <div key={item.id} className="group cursor-pointer">
                <div className="border border-gray-100 rounded-xl overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-all relative">
                  <img src={item.img} alt={item.name} className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-gray-800 leading-snug mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-gray-400 font-black">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SUPER DISCOUNT BANNER ───────────────────────────── */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-100">
          <div>
            <div className="text-[20px] font-black text-white mb-1.5 tracking-tight text-center sm:text-left">
              Super discount on more than 100 USD
            </div>
            <div className="text-[13px] text-blue-100 font-medium text-center sm:text-left opacity-80">
              Have you ever finally just write dummy info
            </div>
          </div>
          <button className="bg-orange-500 text-white px-8 py-3.5 rounded-xl text-sm font-black hover:bg-orange-600 active:scale-95 shadow-lg shadow-orange-900/20 transition-all whitespace-nowrap tracking-widest">
            SHOP NOW
          </button>
        </div>

      </main>

      {/* ── SUBSCRIBE BANNER ─────────────────────────────────── */}
      <div className="bg-white border-y border-gray-200 py-12 px-5 text-center">
        <div className="max-w-[500px] mx-auto">
          <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-tighter">Subscribe on our newsletter</h3>
          <p className="text-[13px] text-gray-400 font-medium mb-6">
            Get daily news on upcoming offers from many suppliers all over the world
          </p>
          <div className="flex border-2 border-blue-600 rounded-xl overflow-hidden max-w-[400px] mx-auto shadow-lg shadow-blue-100">
            <input type="email" placeholder="Email" value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 px-4 py-2.5 text-[13px] outline-none font-medium"
            />
            <button className="bg-blue-600 text-white px-6 py-2.5 text-[13px] font-black uppercase hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="bg-[#1a1a2e] text-gray-500 py-16 px-5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="bg-blue-600 text-white rounded-lg px-4 py-2 text-base font-black inline-flex items-center gap-2 mb-6 shadow-lg shadow-blue-900/30 uppercase tracking-tighter">
              🛒 Brand
            </div>
            <p className="text-[12px] leading-relaxed mb-8 opacity-50 max-w-[260px] font-medium">
              Best information about the company goes here but now lorem ipsum is
            </p>
            <div className="flex gap-2.5">
              {["f","t","in","be","yt"].map((s, i) => (
                <div key={i} className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-[11px] font-black cursor-pointer hover:bg-blue-600 hover:text-white transition-all uppercase tracking-tighter border border-gray-700 hover:border-blue-500">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {[
            { title: "About",       links: ["About Us","Find store","Categories","Blogs"] },
            { title: "Information", links: ["Help Center","Money Refund","Shipping","Contact us"] },
            { title: "For users",   links: ["Login","Register","Settings","My Orders"] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-white text-[12px] font-black mb-6 uppercase tracking-widest">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map(link => (
                  <li key={link} className="text-[12px] hover:text-blue-400 cursor-pointer transition-colors font-bold opacity-40 hover:opacity-100">{link}</li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-white text-[12px] font-black mb-6 uppercase tracking-widest">Get app</h4>
            <div className="space-y-3">
              {[
                { label: "App Store",   sub: "Download on the", icon: "🍎" },
                { label: "Google Play", sub: "Get it on",        icon: "▶" },
              ].map(app => (
                <div key={app.label} className="flex items-center gap-3 border border-gray-700 rounded-xl px-3 py-2.5 cursor-pointer hover:border-gray-500 hover:bg-gray-800 transition-all group">
                  <span className="text-2xl transition-transform group-hover:scale-110">{app.icon}</span>
                  <div>
                    <div className="text-[9px] opacity-40 leading-tight uppercase font-black">{app.sub}</div>
                    <div className="text-[12px] text-gray-200 font-black leading-tight">{app.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto mt-16 border-t border-gray-800 pt-10 flex flex-col sm:flex-row justify-between items-center text-[11px] gap-6 font-bold uppercase tracking-widest">
          <span className="opacity-30">© 2023 Ecommerce. All rights reserved.</span>
          <div className="flex items-center gap-6 opacity-60">
            <span className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">🇺🇸 English <ChevronDown /></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
