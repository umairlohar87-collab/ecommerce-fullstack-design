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
const ChevronDown  = () => <Icon d="M6 9l6 6 6-6" size={13} />;
const ChevronLeft  = () => <Icon d="M15 18l-6-6 6-6" size={14} />;
const ShieldIcon   = () => <Icon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" size={18} />;
const HeadsetIcon  = () => <Icon d="M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" size={18} />;
const TruckIcon    = () => <Icon d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3M9 17h6m4 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM13 8h8l-2 9H15" size={18} />;
const CartSmall    = () => <Icon d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" size={14} />;

// ─── Mock saved-for-later items ───────────────────────────────────────────────
const savedItems = [
  { id: 1, name: "GoPro HERO6 4K Action Camera – Black", price: "$99.50", img: "images/tech/image 29.png" },
  { id: 2, name: "GoPro HERO6 4K Action Camera – Black", price: "$99.50", img: "images/tech/image 32.png" },
  { id: 3, name: "GoPro HERO6 4K Action Camera – Black", price: "$99.50", img: "images/tech/image 34.png" },
  { id: 4, name: "GoPro HERO6 4K Action Camera – Black", price: "$99.50", img: "images/tech/8.png" },
];

// ─── Trust badges ─────────────────────────────────────────────────────────────
const trustBadges = [
  { icon: <ShieldIcon />,  label: "Secure payment",    sub: "Have you ever finally just" },
  { icon: <HeadsetIcon />, label: "Customer support",  sub: "Have you ever finally just" },
  { icon: <TruckIcon />,   label: "Free delivery",     sub: "Have you ever finally just" },
];

// ─── Single cart item row ─────────────────────────────────────────────────────
function CartItemRow({ item, onRemove, onQtyChange, onSave }) {
  return (
    <div className="grid grid-cols-[64px_1fr_auto] gap-4 py-4 border-b border-gray-100 last:border-0 items-start animate-in slide-in-from-left duration-200">
      {/* Thumbnail */}
      <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-lg border border-gray-100 shadow-sm" />

      {/* Details */}
      <div>
        <div className="text-[14px] font-bold text-gray-800 mb-1 leading-tight hover:text-blue-600 cursor-pointer transition-colors">
          {item.name}
        </div>
        <div className="text-[12px] text-gray-400 font-medium mb-1">
          Size: medium &nbsp; Color: blue &nbsp; Material: Plastic
        </div>
        <div className="text-[12px] text-gray-400 mb-2 font-medium">
          Seller: {item.seller || "Best Factory LLC"}
        </div>
        <div className="flex gap-4">
          <button onClick={() => onRemove(item._id)} className="text-[11px] font-bold text-red-500 uppercase tracking-wider hover:text-red-700 transition-colors">Remove</button>
          <button onClick={() => onSave(item._id)} className="text-[11px] font-bold text-blue-600 uppercase tracking-wider hover:text-blue-800 transition-colors">Save for later</button>
        </div>
      </div>

      {/* Price + Qty */}
      <div className="text-right flex flex-col items-end gap-3">
        <div className="text-[16px] font-bold text-gray-900">
          ${(item.price * item.qty).toFixed(2)}
        </div>
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-gray-200">
          <button onClick={() => onQtyChange(item._id, item.qty - 1)} className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-md text-gray-500 font-bold hover:bg-gray-100 active:scale-95 transition-all">−</button>
          <span className="min-w-[24px] text-center text-sm font-bold text-gray-800">
            {item.qty}
          </span>
          <button onClick={() => onQtyChange(item._id, item.qty + 1)} className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-md text-gray-500 font-bold hover:bg-gray-100 active:scale-95 transition-all">+</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Cart Page ───────────────────────────────────────────────────────────
export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart } = useCart();
  const navigate = useNavigate();

  const [coupon,     setCoupon]     = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  // Fallback cart items for demo (if context is empty)
  const displayCart = cart.length > 0 ? cart : [
    { _id: "d1", name: "T-shirts with multiple colors, for men and lady", price: 78.99, qty: 9,  img: "layout/alibaba/Image/cloth/Bitmap.png" },
    { _id: "d2", name: "T-shirts with multiple colors, for men and lady", price: 13.00, qty: 3,  img: "layout/alibaba/Image/cloth/image 24.png" },
    { _id: "d3", name: "T-shirts with multiple colors, for men and lady", price: 170.50,qty: 1,  img: "layout/alibaba/Image/cloth/image 26.png" },
  ];

  const handleApplyCoupon = () => {
    if (coupon.trim()) setCouponApplied(true);
  };

  const displaySubtotal = displayCart.reduce((s, i) => s + i.price * i.qty, 0);
  const displayDiscount = couponApplied ? 60 : 0;
  const displayTax      = 14;
  const displayTotal    = displaySubtotal - displayDiscount + displayTax;

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800">
      <Navbar />

      <main className="max-w-[1000px] mx-auto px-5 py-8">

        {/* ── TITLE ─────────────────────────────────────────── */}
        <h2 className="text-[20px] font-bold mb-6 flex items-center gap-2">
          My cart <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">{displayCart.length}</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">

          {/* ── LEFT: Cart items ─────────────────────────────── */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 px-6 py-2 mb-6 shadow-sm">
              {displayCart.map(item => (
                <CartItemRow
                  key={item._id}
                  item={item}
                  onRemove={id => cart.length > 0 ? removeFromCart(id) : null}
                  onQtyChange={(id, qty) => cart.length > 0 ? updateQty(id, qty) : null}
                  onSave={() => {}}
                />
              ))}

              {/* Bottom row */}
              <div className="flex justify-between items-center py-5 border-t border-gray-50 mt-2">
                <button onClick={() => navigate("/products")} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                  <ChevronLeft className="text-white" /> Back to shop
                </button>
                <button onClick={() => cart.length > 0 && clearCart()} className="text-sm font-bold text-red-500 hover:underline transition-all">
                  Remove all
                </button>
              </div>
            </div>

            {/* ── Trust badges ─────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {trustBadges.map(b => (
                <div key={b.label} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-blue-600 mt-1 flex-shrink-0">{b.icon}</span>
                  <div>
                    <div className="text-[13px] font-bold text-gray-800 mb-0.5">
                      {b.label}
                    </div>
                    <div className="text-[11px] text-gray-400 font-medium leading-tight">{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Order Summary ──────────────────────────── */}
          <aside className="sticky top-24">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

              {/* Coupon */}
              <div className="mb-6">
                <div className="text-[13px] font-bold text-gray-700 mb-3 uppercase tracking-wider">
                  Have a coupon?
                </div>
                <div className="flex border border-gray-200 rounded-lg overflow-hidden group focus-within:border-blue-500 transition-colors">
                  <input
                    value={coupon}
                    onChange={e => setCoupon(e.target.value)}
                    placeholder="Add coupon"
                    className="flex-1 px-3 py-2 text-[13px] outline-none"
                  />
                  <button onClick={handleApplyCoupon} className="px-4 bg-gray-50 border-l border-gray-200 text-blue-600 text-xs font-bold hover:bg-blue-50 transition-colors">Apply</button>
                </div>
                {couponApplied && (
                  <div className="text-[11px] text-green-600 mt-2 font-bold flex items-center gap-1">
                    <span className="text-lg leading-none">✓</span> Coupon applied! $60 off
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 mb-4" />

              {/* Price breakdown */}
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-[13px] text-gray-500 font-medium">
                  <span>Subtotal:</span>
                  <span className="font-bold text-gray-800">${displaySubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[13px] text-gray-500 font-medium">
                  <span>Discount:</span>
                  <span className="font-bold text-red-500">
                    {displayDiscount > 0 ? `-$${displayDiscount.toFixed(2)}` : "-$00.00"}
                  </span>
                </div>
                <div className="flex justify-between text-[13px] text-gray-500 font-medium">
                  <span>Tax:</span>
                  <span className="font-bold text-green-600">+${displayTax.toFixed(2)}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 mb-4" />

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-base font-bold text-gray-800">Total:</span>
                <span className="text-[22px] font-black text-gray-900 tracking-tighter">
                  ${displayTotal.toFixed(2)}
                </span>
              </div>

              {/* Checkout button */}
              <button className="w-full py-3.5 bg-green-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-green-100 hover:bg-green-600 active:scale-[0.98] transition-all tracking-wider mb-4"
                onClick={() => navigate("/")}
              >
                CHECKOUT
              </button>

              {/* Payment icons */}
              <div className="flex gap-2 justify-center flex-wrap">
                {[
                  { label: "VISA",     bg: "bg-[#1a1f71]" },
                  { label: "MC",       bg: "bg-[#eb001b]" },
                  { label: "PayPal",   bg: "bg-[#003087]" },
                  { label: "AMEX",     bg: "bg-[#007bc1]" },
                  { label: "Pay",      bg: "bg-[#000]"    },
                ].map(p => (
                  <div key={p.label} className={`${p.bg} text-white rounded px-2 py-0.5 text-[9px] font-black tracking-widest shadow-sm`}>{p.label}</div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* ── SAVED FOR LATER ─────────────────────────────────── */}
        <div className="mt-12 mb-8">
          <h3 className="text-[18px] font-bold mb-6">Saved for later</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {savedItems.map(item => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group">
                <div className="relative overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-40 object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </div>
                <div className="p-4">
                  <div className="text-[16px] font-bold text-gray-900 mb-1">
                    {item.price}
                  </div>
                  <div className="text-[12px] text-gray-500 font-medium leading-snug mb-4 line-clamp-2">
                    {item.name}
                  </div>
                  <button className="flex items-center gap-2 border border-gray-200 rounded-lg py-2 px-3 w-full justify-center text-[12px] font-bold text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-95">
                    <CartSmall /> Move to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SUPER DISCOUNT BANNER ───────────────────────────── */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-600 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-100">
          <div>
            <div className="text-[18px] font-bold text-white mb-1.5 text-center sm:text-left">
              Super discount on more than 100 USD
            </div>
            <div className="text-[13px] text-blue-100 font-medium text-center sm:text-left opacity-80">
              Have you ever finally just write dummy info
            </div>
          </div>
          <button className="bg-orange-500 text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-orange-600 active:scale-95 shadow-lg shadow-orange-900/20 transition-all whitespace-nowrap tracking-wide">
            SHOP NOW
          </button>
        </div>

      </main>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="bg-[#1a1a2e] text-gray-500 py-12 px-5">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="bg-blue-600 text-white rounded-lg px-4 py-1.5 text-base font-bold inline-flex items-center gap-2 mb-4 shadow-lg shadow-blue-900/20">
              🛒 Brand
            </div>
            <p className="text-[12px] leading-relaxed mb-6 opacity-60 max-w-[240px]">
              Best information about the company goes here but now lorem ipsum is
            </p>
            <div className="flex gap-2">
              {["f","t","in","be","yt"].map((s, i) => (
                <div key={i} className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-[11px] font-black cursor-pointer hover:bg-blue-600 hover:text-white transition-all uppercase tracking-tighter">
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
              <h4 className="text-white text-[13px] font-bold mb-4 uppercase tracking-widest">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link} className="text-[12px] hover:text-blue-400 cursor-pointer transition-colors font-medium opacity-80">{link}</li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-white text-[13px] font-bold mb-4 uppercase tracking-widest">Get app</h4>
            <div className="space-y-3">
              {[
                { label: "App Store",   sub: "Download on the", icon: "🍎" },
                { label: "Google Play", sub: "Get it on",        icon: "▶" },
              ].map(app => (
                <div key={app.label} className="flex items-center gap-2.5 border border-gray-700 rounded-lg px-3 py-2 cursor-pointer hover:border-gray-500 hover:bg-gray-800 transition-all">
                  <span className="text-xl">{app.icon}</span>
                  <div>
                    <div className="text-[9px] opacity-50 leading-tight uppercase font-bold">{app.sub}</div>
                    <div className="text-[11px] text-gray-200 font-bold leading-tight">{app.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[1000px] mx-auto mt-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-[12px] gap-6 font-medium">
          <span className="opacity-50">© 2023 Ecommerce. All rights reserved.</span>
          <div className="flex items-center gap-5 opacity-80">
            <span className="flex items-center gap-2 cursor-pointer hover:text-white">🇺🇸 English <ChevronDown /></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
