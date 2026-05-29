import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);
const HeartIcon    = ({ filled }) => (
  <svg width={18} height={18} viewBox="0 0 24 24"
    fill={filled ? "#ef4444" : "none"} stroke={filled ? "#ef4444" : "#aaa"} strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const ChevronRight = () => <Icon d="M9 18l6-6-6-6" size={14} />;
const ChevronLeft  = () => <Icon d="M15 18l-6-6 6-6" size={14} />;
const ChevronDown  = () => <Icon d="M6 9l6 6 6-6" size={13} />;
const GridIcon     = () => <Icon d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" size={16} />;
const ListIcon     = () => <Icon d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" size={16} />;
const StarIcon     = ({ filled }) => (
  <svg width={13} height={13} viewBox="0 0 24 24"
    fill={filled ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const CheckIcon = () => <Icon d="M20 6L9 17l-5-5" size={11} />;

// ─── Mock Products ─────────────────────────────────────────────────────────────
const allProducts = [
  {
    id: 1, name: "Canon Camera EOS 2000, Black 10x zoom",
    price: 998.00, oldPrice: 1128.00, rating: 7.5, orders: 154,
    shipping: "Free Shipping", verified: true,
    img: "images/tech/image 32.png",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Electronics", brand: "Samsung",
  },
  {
    id: 2, name: "GoPro HERO6 4K Action Camera – Black",
    price: 998.00, oldPrice: null, rating: 7.5, orders: 154,
    shipping: "Free Shipping", verified: true,
    img: "images/tech/image 29.png",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ea ea commodo consequat. Duis aute irure dolor in reprehenderit.",
    category: "Electronics", brand: "Apple",
  },
  {
    id: 3, name: "GoPro HERO6 4K Action Camera – Black",
    price: 998.00, oldPrice: null, rating: 7.5, orders: 164,
    shipping: "Free Shipping", verified: false,
    img: "images/tech/image 85.png",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ea ea commodo consequat. Duis aute irure dolor in reprehenderit.",
    category: "Smartphones", brand: "HUAWEI",
  },
  {
    id: 4, name: "GoPro HERO6 4K Action Camera – Black",
    price: 998.00, oldPrice: null, rating: 7.5, orders: 164,
    shipping: "Free Shipping", verified: true,
    img: "images/tech/image 33.png",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ea ea commodo consequat. Duis aute irure dolor in reprehenderit.",
    category: "Modern tech", brand: "Xiaomi",
  },
  {
    id: 5, name: "GoPro HERO6 4K Action Camera – Black",
    price: 998.00, oldPrice: 1128.00, rating: 7.5, orders: 164,
    shipping: "Free Shipping", verified: true,
    img: "images/tech/image 34.png",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ea ea commodo consequat. Duis aute irure dolor in reprehenderit.",
    category: "Electronics", brand: "Lenovo",
  },
  {
    id: 6, name: "GoPro HERO6 4K Action Camera – Black",
    price: 998.00, oldPrice: null, rating: 7.5, orders: 164,
    shipping: "Free Shipping", verified: false,
    img: "images/tech/8.png",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ea ea commodo consequat. Duis aute irure dolor in reprehenderit.",
    category: "Electronics", brand: "Samsung",
  },
];

// ─── Filter Data ───────────────────────────────────────────────────────────────
const categoryList  = ["Mobile accessory", "Electronics", "Smartphones", "Modern tech"];
const brandList     = ["Samsung", "Apple", "HUAWEI", "Xiaomi", "Lenovo"];
const featureList   = ["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"];
const conditionList = ["Any", "Refurbished", "Brand new", "Old items"];
const ratingList    = [5, 4, 3, 2];

// ─── Helper: Stars ─────────────────────────────────────────────────────────────
function Stars({ rating, max = 5 }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <StarIcon key={i} filled={i < Math.round(rating)} />
      ))}
    </span>
  );
}

// ─── Sidebar Section wrapper ───────────────────────────────────────────────────
function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-3.5 mb-3.5 last:border-0 last:mb-0">
      <div
        onClick={() => setOpen(v => !v)}
        className="flex justify-between items-center cursor-pointer mb-2.5"
      >
        <span className="text-sm font-semibold text-gray-800">{title}</span>
        <span className={`transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}>
          <ChevronDown />
        </span>
      </div>
      {open && children}
    </div>
  );
}

// ─── Product Card (list view) ──────────────────────────────────────────────────
function ProductCard({ product }) {
  const [wished, setWished] = useState(false);
  const nav = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-lg flex flex-col sm:flex-row overflow-hidden hover:shadow-md transition-shadow mb-3">
      {/* Product image */}
      <div className="w-full sm:w-[180px] min-h-[160px] flex-shrink-0 bg-gray-50 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-gray-100">
        <img src={product.img} alt={product.name} className="w-full h-[160px] object-cover" />
      </div>

      {/* Product info */}
      <div className="flex-1 p-4 sm:p-5 relative">

        {/* Wishlist button */}
        <button
          onClick={() => setWished(v => !v)}
          className="absolute top-3.5 right-3.5 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <HeartIcon filled={wished} />
        </button>

        {/* Name */}
        <div className="text-base font-semibold text-gray-800 mb-1.5 pr-8">
          {product.name}
        </div>

        {/* Price row */}
        <div className="flex items-center gap-2.5 mb-1.5">
          <span className="text-lg font-bold text-gray-800">
            ${product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Rating + orders + shipping */}
        <div className="flex items-center gap-2.5 mb-2 flex-wrap text-xs text-gray-500">
          <Stars rating={product.rating / 2} />
          <span className="text-orange-500 font-medium">{product.rating}</span>
          <span className="text-gray-300">|</span>
          <span>{product.orders} orders</span>
          <span className="text-gray-300">|</span>
          <span className="text-green-600 font-medium flex items-center gap-1">
            <span className="text-[10px]">✦</span> {product.shipping}
          </span>
        </div>

        {/* Description */}
        <p className="text-[13px] text-gray-500 leading-relaxed mb-2.5 line-clamp-2">
          {product.desc}
        </p>

        {/* View details */}
        <button
          onClick={() => nav(`/products/${product.id}`)}
          className="text-[13px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View details
        </button>
      </div>
    </div>
  );
}

// ─── Main Products Page ────────────────────────────────────────────────────────
export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("Mobile accessory");
  const [selectedBrands,   setSelectedBrands]   = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [priceMin,         setPriceMin]         = useState("");
  const [priceMax,         setPriceMax]         = useState("");
  const [condition,        setCondition]         = useState("Any");
  const [selectedRating,   setSelectedRating]   = useState(null);
  const [verifiedOnly,     setVerifiedOnly]      = useState(false);
  const [sortBy,           setSortBy]            = useState("Featured");
  const [perPage,          setPerPage]            = useState(10);
  const [page,             setPage]               = useState(1);
  const [email,            setEmail]              = useState("");

  const toggleBrand   = b => setSelectedBrands(p => p.includes(b) ? p.filter(x => x !== b) : [...p, b]);
  const toggleFeature = f => setSelectedFeatures(p => p.includes(f) ? p.filter(x => x !== f) : [...p, f]);

  const filtered = useMemo(() => {
    return allProducts.filter(p => {
      if (verifiedOnly && !p.verified) return false;
      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
      if (priceMin && p.price < parseFloat(priceMin)) return false;
      if (priceMax && p.price > parseFloat(priceMax)) return false;
      if (condition !== "Any") {
        if (condition === "Brand new"   && p.oldPrice !== null) return false;
        if (condition === "Refurbished" && p.oldPrice === null) return false;
      }
      return true;
    });
  }, [verifiedOnly, selectedBrands, priceMin, priceMax, condition]);

  const totalPages = Math.ceil(filtered.length / perPage) || 1;

  // ── Checkbox helper ──────────────────────────────────────────────────────────
  const Checkbox = ({ checked, onChange, label }) => (
    <label className="flex items-center gap-2 cursor-pointer text-[13px] text-gray-600 mb-1.5 hover:text-gray-800 transition-colors">
      <div onClick={onChange} className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${checked ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300"}`}>
        {checked && <CheckIcon />}
      </div>
      {label}
    </label>
  );

  // ── Radio helper ─────────────────────────────────────────────────────────────
  const Radio = ({ checked, onChange, label }) => (
    <label className="flex items-center gap-2 cursor-pointer text-[13px] text-gray-600 mb-1.5 hover:text-gray-800 transition-colors">
      <div onClick={onChange} className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all ${checked ? "border-blue-600 bg-white" : "border-gray-300 bg-white"}`}>
        {checked && <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mx-auto mt-[1px]" />}
      </div>
      {label}
    </label>
  );

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800">

      <Navbar />

      {/* ── BREADCRUMB ─────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-5 py-2.5">
          <div className="flex items-center gap-1.5 text-[13px] text-gray-400">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight />
            <Link to="/products" className="hover:text-blue-600 transition-colors">Clothings</Link>
            <ChevronRight />
            <Link to="/products" className="hover:text-blue-600 transition-colors">Men's wear</Link>
            <ChevronRight />
            <span className="text-gray-700 font-medium">Summer clothing</span>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-5 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-5">

          {/* ── SIDEBAR ──────────────────────────────────── */}
          <aside className="hidden lg:block">
            <div className="bg-white rounded-lg border border-gray-200 p-4 pt-4">

              {/* Category */}
              <FilterSection title="Category">
                <div className="space-y-1">
                  {categoryList.map(cat => (
                    <div key={cat} onClick={() => setSelectedCategory(cat)} className={`px-2 py-1.5 text-[13px] cursor-pointer rounded-md transition-all ${selectedCategory === cat ? "text-blue-600 font-semibold bg-blue-50" : "text-gray-600 hover:bg-gray-50"}`}>
                      {cat}
                    </div>
                  ))}
                  <button className="text-[12px] text-blue-600 font-medium px-2 py-1 hover:underline">See all</button>
                </div>
              </FilterSection>

              {/* Brands */}
              <FilterSection title="Brands">
                <div className="mt-1">
                  {brandList.map(b => (
                    <Checkbox key={b} label={b} checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} />
                  ))}
                  <button className="text-[12px] text-blue-600 font-medium py-1 hover:underline">See all</button>
                </div>
              </FilterSection>

              {/* Features */}
              <FilterSection title="Features">
                <div className="mt-1">
                  {featureList.map(f => (
                    <Checkbox key={f} label={f} checked={selectedFeatures.includes(f)} onChange={() => toggleFeature(f)} />
                  ))}
                  <button className="text-[12px] text-blue-600 font-medium py-1 hover:underline">See all</button>
                </div>
              </FilterSection>

              {/* Price Range */}
              <FilterSection title="Price range">
                <div className="mb-3">
                  <input type="range" min="0" max="99999" className="w-full h-1.5 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                </div>
                <div className="flex gap-2 mb-2.5">
                  <div className="flex-1">
                    <label className="text-[11px] text-gray-400 mb-1 block">Min</label>
                    <input value={priceMin} onChange={e => setPriceMin(e.target.value)} placeholder="0" className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs outline-none focus:border-blue-500 transition-colors" />
                  </div>
                  <div className="flex-1">
                    <label className="text-[11px] text-gray-400 mb-1 block">Max</label>
                    <input value={priceMax} onChange={e => setPriceMax(e.target.value)} placeholder="999999" className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs outline-none focus:border-blue-500 transition-colors" />
                  </div>
                </div>
                <button className="w-full py-1.5 bg-white border border-gray-200 rounded text-[12px] font-bold text-blue-600 hover:bg-blue-50 transition-colors shadow-sm">Apply</button>
              </FilterSection>

              {/* Condition */}
              <FilterSection title="Condition">
                <div className="mt-1">
                  {conditionList.map(c => (
                    <Radio key={c} label={c} checked={condition === c} onChange={() => setCondition(c)} />
                  ))}
                </div>
              </FilterSection>

              {/* Ratings */}
              <FilterSection title="Ratings">
                <div className="mt-1 space-y-1.5">
                  {ratingList.map(r => (
                    <div key={r} onClick={() => setSelectedRating(selectedRating === r ? null : r)} className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${selectedRating === r ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300 group-hover:border-blue-300"}`}>
                        {selectedRating === r && <CheckIcon />}
                      </div>
                      <Stars rating={r} />
                      <span className="text-xs text-gray-400">& up</span>
                    </div>
                  ))}
                </div>
              </FilterSection>

            </div>
          </aside>

          {/* ── MAIN CONTENT ───────────────────────────────── */}
          <div>
            {/* ── TOOLBAR ────────────────────────────────── */}
            <div className="bg-white border border-gray-200 rounded-lg p-3 px-4 mb-4 flex flex-col sm:flex-row items-center gap-4">
              <span className="text-[13px] text-gray-500 mr-auto">
                <strong className="text-gray-800">12,911 items</strong> in Mobile accessory
              </span>

              <div className="flex items-center gap-5 w-full sm:w-auto justify-between sm:justify-end">
                {/* Verified only toggle */}
                <label className="flex items-center gap-2 cursor-pointer text-[13px] text-gray-700 hover:text-blue-600 transition-colors">
                  <div onClick={() => setVerifiedOnly(v => !v)} className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${verifiedOnly ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300"}`}>
                    {verifiedOnly && <CheckIcon />}
                  </div>
                  <span>Verified only</span>
                </label>

                {/* Sort by */}
                <div className="flex items-center gap-2">
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border border-gray-200 rounded px-2.5 py-1 text-[13px] bg-white outline-none focus:border-blue-500 cursor-pointer">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                  </select>
                </div>

                {/* Grid/List toggle */}
                <div className="flex border border-gray-200 rounded overflow-hidden">
                  <button className="p-1.5 px-2.5 bg-gray-50 text-gray-600 border-r border-gray-200 hover:bg-gray-100 transition-colors"><GridIcon /></button>
                  <button className="p-1.5 px-2.5 bg-white text-blue-600 hover:bg-gray-50 transition-colors"><ListIcon /></button>
                </div>
              </div>
            </div>

            {/* ── PRODUCT LIST ─────────────────────────── */}
            <div className="space-y-3">
              {filtered.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg p-12 text-center text-gray-400 text-sm">
                  No products match the selected filters.
                </div>
              ) : (
                filtered.slice((page - 1) * perPage, page * perPage).map(p => (
                  <ProductCard key={p.id} product={p} />
                ))
              )}
            </div>

            {/* ── PAGINATION ───────────────────────────── */}
            <div className="bg-white border border-gray-200 rounded-lg p-3 px-4 flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
              <div className="flex items-center gap-2 text-[13px] text-gray-500">
                Show
                <select value={perPage} onChange={e => { setPerPage(Number(e.target.value)); setPage(1); }} className="border border-gray-200 rounded px-2 py-1 bg-white outline-none cursor-pointer hover:border-blue-500">
                  {[10, 20, 50].map(n => <option key={n}>{n}</option>)}
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <PageBtn onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                  <ChevronLeft />
                </PageBtn>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(n => (
                  <PageBtn key={n} active={n === page} onClick={() => setPage(n)}>
                    {n}
                  </PageBtn>
                ))}
                <PageBtn onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                  <ChevronRight />
                </PageBtn>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── SUBSCRIBE BANNER ────────────────────────────────── */}
      <div className="bg-white border-y border-gray-200 py-10 px-5 text-center mt-12">
        <div className="max-w-[500px] mx-auto">
          <h3 className="text-lg font-bold mb-1.5">Subscribe on our newsletter</h3>
          <p className="text-[13px] text-gray-400 mb-5">
            Get daily news on upcoming offers from many suppliers all over the world
          </p>
          <div className="flex border-2 border-blue-600 rounded-lg overflow-hidden max-w-[380px] mx-auto shadow-sm">
            <input
              type="email" placeholder="Email" value={email}
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
      <footer className="bg-[#1a1a2e] text-gray-400 py-12 px-5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="bg-blue-600 text-white rounded-md px-3 py-1.5 text-base font-bold inline-flex items-center gap-2 mb-4">
              🛒 Brand
            </div>
            <p className="text-xs leading-relaxed mb-5 text-gray-500">
              Best information about the company goes here but now lorem ipsum is
            </p>
            <div className="flex gap-2">
              {["f", "t", "in", "be", "yt"].map((s, i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-[10px] cursor-pointer hover:bg-blue-600 transition-colors uppercase font-bold">{s}</div>
              ))}
            </div>
          </div>

          {/* Columns */}
          {[
            { title: "About",       links: ["About Us", "Find store", "Categories", "Blogs"] },
            { title: "Partnership", links: ["About Us", "Find store", "Categories", "Blogs"] },
            { title: "Information", links: ["Help Center", "Money Refund", "Shipping", "Contact us"] },
            { title: "For users",   links: ["Login", "Register", "Settings", "My Orders"] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-gray-50 text-[13px] font-semibold mb-4 uppercase tracking-wider">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link} className="text-xs hover:text-blue-400 cursor-pointer transition-colors">{link}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get app */}
          <div>
            <h4 className="text-gray-50 text-[13px] font-semibold mb-4 uppercase tracking-wider">Get app</h4>
            <div className="space-y-2">
              {[
                { label: "App Store",   sub: "Download on the", icon: "🍎" },
                { label: "Google Play", sub: "Get it on",        icon: "▶" },
              ].map(app => (
                <div key={app.label} className="flex items-center gap-2.5 border border-gray-700 rounded-md px-3 py-2 cursor-pointer hover:border-gray-400 transition-colors bg-gray-800/50">
                  <span className="text-xl">{app.icon}</span>
                  <div>
                    <div className="text-[9px] text-gray-500 leading-none mb-0.5">{app.sub}</div>
                    <div className="text-[11px] text-white font-semibold leading-none">{app.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-[1200px] mx-auto mt-12 border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center text-[12px] gap-4">
          <span className="text-gray-500">© 2023 Ecommerce.</span>
          <div className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-white transition-colors">
            <span>🇺🇸</span>
            <span>English</span>
            <ChevronDown />
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Pagination Button ─────────────────────────────────────────────────────────
function PageBtn({ children, active, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`min-w-[32px] h-8 px-2.5 rounded border flex items-center justify-center text-[13px] transition-all
        ${active ? "bg-blue-600 border-blue-600 text-white font-bold" :
          disabled ? "bg-gray-50 border-gray-200 text-gray-300 cursor-default" :
          "bg-white border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600 font-medium"}`}
    >
      {children}
    </button>
  );
}
