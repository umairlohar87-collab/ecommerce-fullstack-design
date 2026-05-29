import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=180&q=80",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Electronics", brand: "Samsung",
  },
  {
    id: 2, name: "GoPro HERO6 4K Action Camera – Black",
    price: 998.00, oldPrice: null, rating: 7.5, orders: 154,
    shipping: "Free Shipping", verified: true,
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=180&q=80",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ea ea commodo consequat. Duis aute irure dolor in reprehenderit.",
    category: "Electronics", brand: "Apple",
  },
  {
    id: 3, name: "GoPro HERO6 4K Action Camera – Black",
    price: 998.00, oldPrice: null, rating: 7.5, orders: 164,
    shipping: "Free Shipping", verified: false,
    img: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=180&q=80",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ea ea commodo consequat. Duis aute irure dolor in reprehenderit.",
    category: "Smartphones", brand: "HUAWEI",
  },
  {
    id: 4, name: "GoPro HERO6 4K Action Camera – Black",
    price: 998.00, oldPrice: null, rating: 7.5, orders: 164,
    shipping: "Free Shipping", verified: true,
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=180&q=80",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ea ea commodo consequat. Duis aute irure dolor in reprehenderit.",
    category: "Modern tech", brand: "Xiaomi",
  },
  {
    id: 5, name: "GoPro HERO6 4K Action Camera – Black",
    price: 998.00, oldPrice: 1128.00, rating: 7.5, orders: 164,
    shipping: "Free Shipping", verified: true,
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=180&q=80",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ea ea commodo consequat. Duis aute irure dolor in reprehenderit.",
    category: "Electronics", brand: "Lenovo",
  },
  {
    id: 6, name: "GoPro HERO6 4K Action Camera – Black",
    price: 998.00, oldPrice: null, rating: 7.5, orders: 164,
    shipping: "Free Shipping", verified: false,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=180&q=80",
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
    <span style={{ display: "inline-flex", gap: 1 }}>
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
    <div style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: 14, marginBottom: 14 }}>
      <div
        onClick={() => setOpen(v => !v)}
        style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          cursor: "pointer", marginBottom: open ? 10 : 0,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 600, color: "#222" }}>{title}</span>
        <span style={{
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform .2s", display: "flex"
        }}><ChevronDown /></span>
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
    <div style={{
      background: "#fff", border: "1px solid #e8e8e8", borderRadius: 8,
      display: "flex", gap: 0, overflow: "hidden",
      transition: "box-shadow .18s", marginBottom: 12,
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.08)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      {/* Product image */}
      <div style={{
        width: 180, minHeight: 160, flexShrink: 0,
        background: "#f8f8f8", display: "flex", alignItems: "center", justifyContent: "center",
        borderRight: "1px solid #f0f0f0",
      }}>
        <img src={product.img} alt={product.name}
          style={{ width: "100%", height: 160, objectFit: "cover" }} />
      </div>

      {/* Product info */}
      <div style={{ flex: 1, padding: "16px 20px", position: "relative" }}>

        {/* Wishlist button */}
        <button
          onClick={() => setWished(v => !v)}
          style={{
            position: "absolute", top: 14, right: 14,
            background: "none", border: "none", cursor: "pointer", padding: 4,
          }}
        >
          <HeartIcon filled={wished} />
        </button>

        {/* Name */}
        <div style={{ fontSize: 15, fontWeight: 600, color: "#222", marginBottom: 6, paddingRight: 30 }}>
          {product.name}
        </div>

        {/* Price row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#222" }}>
            ${product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span style={{ fontSize: 14, color: "#aaa", textDecoration: "line-through" }}>
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Rating + orders + shipping */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
          <Stars rating={product.rating / 2} />
          <span style={{ fontSize: 12, color: "#888" }}>{product.rating}</span>
          <span style={{ fontSize: 12, color: "#ccc" }}>|</span>
          <span style={{ fontSize: 12, color: "#888" }}>{product.orders} orders</span>
          <span style={{ fontSize: 12, color: "#ccc" }}>|</span>
          <span style={{ fontSize: 12, color: "#22c55e", fontWeight: 500 }}>
            ✦ {product.shipping}
          </span>
        </div>

        {/* Description */}
        <p style={{
          fontSize: 13, color: "#888", lineHeight: 1.6, margin: "0 0 10px",
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {product.desc}
        </p>

        {/* View details */}
        <button
          onClick={() => nav(`/products/${product.id}`)}
          style={{
            background: "none", border: "none", color: "#2563eb",
            fontSize: 13, fontWeight: 500, cursor: "pointer", padding: 0,
          }}
        >
          View details
        </button>
      </div>
    </div>
  );
}

// ─── Main Products Page ────────────────────────────────────────────────────────
export default function Products() {
  // Filter states
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

  // Toggle helpers
  const toggleBrand   = b => setSelectedBrands(p => p.includes(b) ? p.filter(x => x !== b) : [...p, b]);
  const toggleFeature = f => setSelectedFeatures(p => p.includes(f) ? p.filter(x => x !== f) : [...p, f]);

  // Filtered products
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
    <label style={{
      display: "flex", alignItems: "center", gap: 8,
      cursor: "pointer", fontSize: 13, color: "#444", marginBottom: 6,
    }}>
      <div onClick={onChange} style={{
        width: 16, height: 16, borderRadius: 3, flexShrink: 0,
        border: checked ? "none" : "1.5px solid #ccc",
        background: checked ? "#2563eb" : "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
      }}>
        {checked && <CheckIcon />}
      </div>
      {label}
    </label>
  );

  // ── Radio helper ─────────────────────────────────────────────────────────────
  const Radio = ({ checked, onChange, label }) => (
    <label style={{
      display: "flex", alignItems: "center", gap: 8,
      cursor: "pointer", fontSize: 13, color: "#444", marginBottom: 6,
    }}>
      <div onClick={onChange} style={{
        width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
        border: checked ? "4px solid #2563eb" : "1.5px solid #ccc",
        background: "#fff", cursor: "pointer", boxSizing: "border-box",
      }} />
      {label}
    </label>
  );

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "#f5f5f5", minHeight: "100vh", color: "#222",
    }}>

      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <Navbar />

      {/* ── BREADCRUMB ─────────────────────────────────────── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #eee" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "10px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#888" }}>
            <Link to="/"        style={{ color: "#888", textDecoration: "none" }}>Home</Link>
            <ChevronRight />
            <Link to="/products" style={{ color: "#888", textDecoration: "none" }}>Clothings</Link>
            <ChevronRight />
            <Link to="/products" style={{ color: "#888", textDecoration: "none" }}>Men's wear</Link>
            <ChevronRight />
            <span style={{ color: "#333" }}>Summer clothing</span>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ────────────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>

          {/* ── SIDEBAR ──────────────────────────────────── */}
          <aside>
            <div style={{
              background: "#fff", borderRadius: 8,
              border: "1px solid #e8e8e8", padding: "16px 16px 8px",
            }}>

              {/* Category */}
              <FilterSection title="Category">
                {categoryList.map(cat => (
                  <div key={cat} onClick={() => setSelectedCategory(cat)} style={{
                    padding: "6px 8px", fontSize: 13, cursor: "pointer", borderRadius: 4,
                    color: selectedCategory === cat ? "#2563eb" : "#444",
                    fontWeight: selectedCategory === cat ? 600 : 400,
                    background: selectedCategory === cat ? "#eff6ff" : "transparent",
                    transition: "background .12s",
                  }}>{cat}</div>
                ))}
                <button style={{
                  background: "none", border: "none", color: "#2563eb",
                  fontSize: 12, cursor: "pointer", padding: "4px 8px", fontFamily: "inherit",
                }}>See all</button>
              </FilterSection>

              {/* Brands */}
              <FilterSection title="Brands">
                {brandList.map(b => (
                  <Checkbox
                    key={b} label={b}
                    checked={selectedBrands.includes(b)}
                    onChange={() => toggleBrand(b)}
                  />
                ))}
                <button style={{
                  background: "none", border: "none", color: "#2563eb",
                  fontSize: 12, cursor: "pointer", padding: "2px 0", fontFamily: "inherit",
                }}>See all</button>
              </FilterSection>

              {/* Features */}
              <FilterSection title="Features">
                {featureList.map(f => (
                  <Checkbox
                    key={f} label={f}
                    checked={selectedFeatures.includes(f)}
                    onChange={() => toggleFeature(f)}
                  />
                ))}
                <button style={{
                  background: "none", border: "none", color: "#2563eb",
                  fontSize: 12, cursor: "pointer", padding: "2px 0", fontFamily: "inherit",
                }}>See all</button>
              </FilterSection>

              {/* Price Range */}
              <FilterSection title="Price range">
                {/* Slider (visual only) */}
                <div style={{ marginBottom: 10 }}>
                  <input type="range" min="0" max="99999" style={{ width: "100%", accentColor: "#2563eb" }} />
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: "#888", marginBottom: 3 }}>Min</div>
                    <input value={priceMin} onChange={e => setPriceMin(e.target.value)}
                      placeholder="0"
                      style={{
                        width: "100%", padding: "6px 8px", border: "1px solid #e0e0e0",
                        borderRadius: 4, fontSize: 12, outline: "none",
                        boxSizing: "border-box", fontFamily: "inherit",
                      }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: "#888", marginBottom: 3 }}>Max</div>
                    <input value={priceMax} onChange={e => setPriceMax(e.target.value)}
                      placeholder="999999"
                      style={{
                        width: "100%", padding: "6px 8px", border: "1px solid #e0e0e0",
                        borderRadius: 4, fontSize: 12, outline: "none",
                        boxSizing: "border-box", fontFamily: "inherit",
                      }} />
                  </div>
                </div>
                <button style={{
                  width: "100%", padding: "7px 0", background: "#2563eb", color: "#fff",
                  border: "none", borderRadius: 4, fontSize: 12, fontWeight: 600,
                  cursor: "pointer", fontFamily: "inherit",
                }}>Apply</button>
              </FilterSection>

              {/* Condition */}
              <FilterSection title="Condition">
                {conditionList.map(c => (
                  <Radio
                    key={c} label={c}
                    checked={condition === c}
                    onChange={() => setCondition(c)}
                  />
                ))}
              </FilterSection>

              {/* Ratings */}
              <FilterSection title="Ratings" defaultOpen={true}>
                {ratingList.map(r => (
                  <div key={r} onClick={() => setSelectedRating(selectedRating === r ? null : r)}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      cursor: "pointer", padding: "3px 0",
                    }}>
                    <div style={{
                      width: 16, height: 16, borderRadius: 3, flexShrink: 0,
                      border: selectedRating === r ? "none" : "1.5px solid #ccc",
                      background: selectedRating === r ? "#2563eb" : "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {selectedRating === r && <CheckIcon />}
                    </div>
                    <Stars rating={r} />
                    <span style={{ fontSize: 12, color: "#888" }}>& up</span>
                  </div>
                ))}
              </FilterSection>

            </div>
          </aside>

          {/* ── MAIN CONTENT ───────────────────────────────── */}
          <div>
            {/* ── TOOLBAR ────────────────────────────────── */}
            <div style={{
              background: "#fff", border: "1px solid #e8e8e8", borderRadius: 8,
              padding: "10px 16px", marginBottom: 14,
              display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
            }}>
              <span style={{ fontSize: 13, color: "#888" }}>
                <strong style={{ color: "#222" }}>12,911 items</strong> in Mobile accessory
              </span>

              {/* Verified only toggle */}
              <label style={{
                display: "flex", alignItems: "center", gap: 6,
                cursor: "pointer", marginLeft: 8,
              }}>
                <div onClick={() => setVerifiedOnly(v => !v)} style={{
                  width: 16, height: 16, borderRadius: 3,
                  border: verifiedOnly ? "none" : "1.5px solid #ccc",
                  background: verifiedOnly ? "#2563eb" : "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                }}>
                  {verifiedOnly && <CheckIcon />}
                </div>
                <span style={{ fontSize: 13, color: "#444" }}>Verified only</span>
              </label>

              <div style={{ flex: 1 }} />

              {/* Sort by */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 13, color: "#888" }}>Featured</span>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                  border: "1px solid #e0e0e0", borderRadius: 4, padding: "5px 8px",
                  fontSize: 13, background: "#fff", cursor: "pointer",
                  outline: "none", fontFamily: "inherit",
                }}>
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>

              {/* Grid/List toggle */}
              <div style={{ display: "flex", border: "1px solid #e0e0e0", borderRadius: 4, overflow: "hidden" }}>
                {[
                  { icon: <GridIcon />, view: "grid" },
                  { icon: <ListIcon />, view: "list" },
                ].map(({ icon, view }) => (
                  <button key={view} style={{
                    padding: "5px 10px", border: "none", cursor: "pointer",
                    background: "#fff", color: "#666",
                    borderLeft: view === "list" ? "1px solid #e0e0e0" : "none",
                  }}>{icon}</button>
                ))}
              </div>
            </div>

            {/* ── PRODUCT LIST ─────────────────────────── */}
            {filtered.length === 0 ? (
              <div style={{
                background: "#fff", border: "1px solid #e8e8e8", borderRadius: 8,
                padding: 40, textAlign: "center", color: "#888", fontSize: 14,
              }}>
                No products match the selected filters.
              </div>
            ) : (
              filtered.slice((page - 1) * perPage, page * perPage).map(p => (
                <ProductCard key={p.id} product={p} />
              ))
            )}

            {/* ── PAGINATION ───────────────────────────── */}
            <div style={{
              background: "#fff", border: "1px solid #e8e8e8", borderRadius: 8,
              padding: "12px 16px", display: "flex", alignItems: "center",
              justifyContent: "space-between", marginTop: 8,
            }}>
              {/* Show per page */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#555" }}>
                Show
                <select value={perPage} onChange={e => { setPerPage(Number(e.target.value)); setPage(1); }} style={{
                  border: "1px solid #e0e0e0", borderRadius: 4,
                  padding: "4px 8px", fontSize: 13, outline: "none",
                  background: "#fff", cursor: "pointer", fontFamily: "inherit",
                }}>
                  {[10, 20, 50].map(n => <option key={n}>{n}</option>)}
                </select>
              </div>

              {/* Page buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
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
      <div style={{
        background: "#fff", borderTop: "1px solid #e8e8e8",
        borderBottom: "1px solid #e8e8e8", padding: "28px 20px",
        textAlign: "center", marginTop: 32,
      }}>
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 6px" }}>Subscribe on our newsletter</h3>
          <p style={{ fontSize: 13, color: "#888", margin: "0 0 16px" }}>
            Get daily news on upcoming offers from many suppliers all over the world
          </p>
          <div style={{
            display: "flex", gap: 0, border: "1.5px solid #2563eb",
            borderRadius: 7, overflow: "hidden", maxWidth: 380, margin: "0 auto",
          }}>
            <input
              type="email" placeholder="Email" value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                flex: 1, padding: "9px 14px", border: "none", outline: "none",
                fontSize: 13, fontFamily: "inherit",
              }}
            />
            <button style={{
              background: "#2563eb", color: "#fff", border: "none",
              padding: "0 20px", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
              onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
            >Subscribe</button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer style={{ background: "#1a1a2e", color: "#9ca3af", padding: "36px 20px 20px" }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1.4fr repeat(4, 1fr) 1.2fr", gap: 32,
        }}>
          {/* Brand */}
          <div>
            <div style={{
              background: "#2563eb", color: "#fff", borderRadius: 6,
              padding: "5px 12px", fontSize: 15, fontWeight: 700,
              display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12,
            }}>🛒 Brand</div>
            <div style={{ fontSize: 12, lineHeight: 1.7, marginBottom: 14 }}>
              Best information about the company goes here but now lorem ipsum is
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["f", "t", "in", "be", "yt"].map((s, i) => (
                <div key={i} style={{
                  width: 28, height: 28, borderRadius: "50%", background: "#374151",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, cursor: "pointer", color: "#9ca3af",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#2563eb"}
                  onMouseLeave={e => e.currentTarget.style.background = "#374151"}
                >{s}</div>
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
              <h4 style={{ color: "#f9fafb", fontSize: 13, fontWeight: 600, margin: "0 0 12px" }}>{col.title}</h4>
              {col.links.map(link => (
                <div key={link} style={{ fontSize: 12, marginBottom: 8, cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
                  onMouseLeave={e => e.currentTarget.style.color = "#9ca3af"}
                >{link}</div>
              ))}
            </div>
          ))}

          {/* Get app */}
          <div>
            <h4 style={{ color: "#f9fafb", fontSize: 13, fontWeight: 600, margin: "0 0 12px" }}>Get app</h4>
            {[
              { label: "App Store",   sub: "Download on the", icon: "🍎" },
              { label: "Google Play", sub: "Get it on",        icon: "▶" },
            ].map(app => (
              <div key={app.label} style={{
                display: "flex", alignItems: "center", gap: 10,
                border: "1px solid #374151", borderRadius: 6,
                padding: "8px 12px", marginBottom: 8, cursor: "pointer",
                transition: "border-color .15s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#6b7280"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#374151"}
              >
                <span style={{ fontSize: 20 }}>{app.icon}</span>
                <div>
                  <div style={{ fontSize: 10, color: "#9ca3af" }}>{app.sub}</div>
                  <div style={{ fontSize: 13, color: "#f9fafb", fontWeight: 600 }}>{app.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          maxWidth: 1200, margin: "24px auto 0",
          borderTop: "1px solid #374151", paddingTop: 16,
          display: "flex", justifyContent: "space-between",
          alignItems: "center", fontSize: 12,
        }}>
          <span>© 2023 Ecommerce.</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#888" }}>
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
    <button onClick={onClick} disabled={disabled} style={{
      minWidth: 32, height: 32, padding: "0 6px",
      border: "1px solid",
      borderColor: active ? "#2563eb" : "#e0e0e0",
      borderRadius: 4, background: active ? "#2563eb" : "#fff",
      color: active ? "#fff" : disabled ? "#ccc" : "#444",
      fontSize: 13, fontWeight: active ? 600 : 400,
      cursor: disabled ? "default" : "pointer",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "all .15s",
    }}>
      {children}
    </button>
  );
}