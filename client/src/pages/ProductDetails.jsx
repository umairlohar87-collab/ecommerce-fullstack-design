import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <span style={{ display: "inline-flex", gap: 1, alignItems: "center" }}>
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
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80",
    "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&q=80",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80",
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
  { id: 1, name: "Xiaomi Redmi 8 Original", price: "$32.00 - $40.00", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=160&q=80" },
  { id: 2, name: "Xiaomi Redmi 8 Original", price: "$32.00 - $40.00", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=160&q=80" },
  { id: 3, name: "Xiaomi Redmi 8 Original", price: "$32.00 - $40.00", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=160&q=80" },
  { id: 4, name: "Xiaomi Redmi 8 Original", price: "$32.00 - $40.00", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=160&q=80" },
  { id: 5, name: "Xiaomi Redmi 8 Original", price: "$32.00 - $40.00", img: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=160&q=80" },
  { id: 6, name: "Xiaomi Redmi 8 Original", price: "$32.00 - $40.00", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=160&q=80" },
];

const youMayLike = [
  { id: 1, name: "Men Blazers Sets Elegant Formal", price: "$7.00 – $99.50", img: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=80&q=80" },
  { id: 2, name: "Man Shirt Sleeve Polo Contrast",  price: "$7.00 – $99.50", img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=80&q=80" },
  { id: 3, name: "Apple Watch Series Gray",         price: "$7.00 – $99.50", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&q=80" },
  { id: 4, name: "Basketball Crew Socks Long Stuff", price: "$7.00 – $99.50", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&q=80" },
  { id: 5, name: "New Summer Men's casual T-Shirts", price: "$7.00 – $99.50", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&q=80" },
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
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "#f5f5f5", minHeight: "100vh", color: "#222",
    }}>

      <Navbar />

      {/* ── BREADCRUMB ─────────────────────────────────────── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #eee" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "10px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#888" }}>
            {["Home","Clothings","Men's wear","Summer clothing"].map((crumb, i, arr) => (
              <span key={crumb} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {i < arr.length - 1
                  ? <><Link to="/" style={{ color: "#888", textDecoration: "none" }}>{crumb}</Link><ChevronRight /></>
                  : <span style={{ color: "#333" }}>{crumb}</span>
                }
              </span>
            ))}
          </div>
        </div>
      </div>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 20px" }}>

        {/* ── PRODUCT TOP SECTION ─────────────────────────── */}
        <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #e8e8e8", padding: 24, marginBottom: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr 240px", gap: 28 }}>

            {/* ── LEFT: Images ─────────────────────────────── */}
            <div>
              {/* Main image */}
              <div style={{
                border: "1px solid #e8e8e8", borderRadius: 8, overflow: "hidden",
                marginBottom: 12, height: 260, background: "#f8f8f8",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <img src={product.images[activeImg]} alt="product"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>

              {/* Thumbnails */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {product.images.map((img, i) => (
                  <div key={i} onClick={() => setActiveImg(i)} style={{
                    width: 48, height: 48, borderRadius: 6, overflow: "hidden",
                    border: activeImg === i ? "2px solid #2563eb" : "1.5px solid #e0e0e0",
                    cursor: "pointer", flexShrink: 0,
                  }}>
                    <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            </div>

            {/* ── MIDDLE: Product Info ──────────────────────── */}
            <div>
              {/* In stock badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                background: "#f0fdf4", border: "1px solid #bbf7d0",
                borderRadius: 4, padding: "3px 10px", marginBottom: 10,
              }}>
                <span style={{ color: "#16a34a", fontSize: 11 }}>✓</span>
                <span style={{ color: "#16a34a", fontSize: 12, fontWeight: 500 }}>In stock</span>
              </div>

              {/* Name */}
              <h1 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e", margin: "0 0 10px", lineHeight: 1.4 }}>
                {product.name}
              </h1>

              {/* Rating row */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                <Stars rating={4} />
                <span style={{ fontSize: 12, color: "#888" }}>{product.rating}</span>
                <span style={{ fontSize: 12, color: "#ccc" }}>|</span>
                <span style={{ fontSize: 12, color: "#888" }}>{product.reviews} reviews</span>
                <span style={{ fontSize: 12, color: "#ccc" }}>|</span>
                <span style={{ fontSize: 12, color: "#888" }}>{product.sold} sold</span>
              </div>

              {/* Price tiers */}
              <div style={{
                display: "flex", gap: 0, border: "1px solid #e0e0e0",
                borderRadius: 6, overflow: "hidden", marginBottom: 16, alignSelf: "flex-start",
                width: "fit-content",
              }}>
                {product.prices.map((tier, i) => (
                  <div key={i} style={{
                    padding: "8px 16px", textAlign: "center",
                    borderRight: i < product.prices.length - 1 ? "1px solid #e0e0e0" : "none",
                    background: i === 1 ? "#fff7f0" : "#fff",
                  }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: i === 1 ? "#e85d04" : "#222" }}>
                      {tier.price}
                    </div>
                    <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{tier.range}</div>
                  </div>
                ))}
              </div>

              {/* Specs table */}
              <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: 12 }}>
                <tbody>
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
                      <td style={{ padding: "5px 0", fontSize: 13, color: "#888", width: 120, verticalAlign: "top" }}>
                        {key}:
                      </td>
                      <td style={{ padding: "5px 0", fontSize: 13, color: "#333", fontWeight: 500 }}>
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── RIGHT: Supplier + Actions ─────────────────── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

              {/* Supplier card */}
              <div style={{ border: "1px solid #e8e8e8", borderRadius: 8, padding: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", background: "#2563eb",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontWeight: 700, fontSize: 14, flexShrink: 0,
                  }}>R</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#222" }}>Supplier</div>
                    <div style={{ fontSize: 12, color: "#888" }}>Guanjia Trading LLC</div>
                  </div>
                </div>

                {/* Location + badges */}
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#555" }}>
                    <span>🇩🇪</span> Germany, Berlin
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#16a34a" }}>
                    <ShieldIcon /> Verified Seller
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#555" }}>
                    <TruckIcon /> Worldwide shipping
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <button onClick={handleAddToCart} style={{
                width: "100%", padding: "11px 0", background: "#2563eb", color: "#fff",
                border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600,
                cursor: "pointer", transition: "background .15s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
                onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
              >
                Send Inquiry
              </button>

              <button style={{
                width: "100%", padding: "11px 0", background: "#fff", color: "#2563eb",
                border: "1.5px solid #2563eb", borderRadius: 6, fontSize: 13, fontWeight: 600,
                cursor: "pointer", transition: "background .15s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}
              >
                Seller's profile
              </button>

              {/* Save for later */}
              <button onClick={() => setSaved(v => !v)} style={{
                background: "none", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 6, fontSize: 13, color: saved ? "#ef4444" : "#888",
                padding: "4px 0",
              }}>
                <HeartIcon /> {saved ? "Saved" : "Save for later"}
              </button>
            </div>
          </div>
        </div>

        {/* ── TABS + DESCRIPTION + YOU MAY LIKE ──────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16, marginBottom: 16 }}>

          {/* Tabs + content */}
          <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #e8e8e8" }}>

            {/* Tab bar */}
            <div style={{ display: "flex", borderBottom: "1px solid #e8e8e8" }}>
              {tabs.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  padding: "12px 18px", background: "none", border: "none",
                  cursor: "pointer", fontSize: 13, fontWeight: activeTab === tab ? 600 : 400,
                  color: activeTab === tab ? "#2563eb" : "#555",
                  borderBottom: activeTab === tab ? "2px solid #2563eb" : "2px solid transparent",
                  marginBottom: -1, transition: "color .15s",
                  fontFamily: "inherit",
                }}>{tab}</button>
              ))}
            </div>

            <div style={{ padding: "20px 24px" }}>
              {activeTab === "Description" && (
                <>
                  <p style={{ fontSize: 13, color: "#555", lineHeight: 1.8, marginTop: 0, marginBottom: 20 }}>
                    {product.description}
                  </p>

                  {/* Specs table */}
                  <table style={{ borderCollapse: "collapse", width: "100%", marginBottom: 20 }}>
                    <tbody>
                      {Object.entries(product.specs).map(([key, val]) => (
                        <tr key={key} style={{ borderBottom: "1px solid #f5f5f5" }}>
                          <td style={{ padding: "8px 0", fontSize: 13, color: "#888", width: 140 }}>{key}</td>
                          <td style={{ padding: "8px 0", fontSize: 13, color: "#333" }}>{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Features */}
                  <div>
                    {product.features.map((f, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 7 }}>
                        <span style={{ color: "#16a34a", marginTop: 1 }}>✓</span>
                        <span style={{ fontSize: 13, color: "#555" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {activeTab === "Reviews" && (
                <p style={{ fontSize: 13, color: "#888" }}>No reviews yet.</p>
              )}
              {activeTab === "Shipping" && (
                <p style={{ fontSize: 13, color: "#888" }}>Free worldwide shipping on all orders.</p>
              )}
              {activeTab === "About seller" && (
                <p style={{ fontSize: 13, color: "#888" }}>Guanjia Trading LLC — Verified seller based in Germany.</p>
              )}
            </div>
          </div>

          {/* You may like */}
          <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #e8e8e8", padding: 16 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 14px" }}>You may like</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {youMayLike.map(item => (
                <div key={item.id} style={{
                  display: "flex", gap: 10, cursor: "pointer", paddingBottom: 12,
                  borderBottom: "1px solid #f5f5f5",
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = ".8"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  <img src={item.img} alt={item.name} style={{
                    width: 50, height: 50, objectFit: "cover",
                    borderRadius: 6, border: "1px solid #eee", flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 500, color: "#222", lineHeight: 1.4, marginBottom: 4 }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#888" }}>{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RELATED PRODUCTS ────────────────────────────────── */}
        <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #e8e8e8", padding: "20px 24px", marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px" }}>Related products</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 12 }}>
            {relatedProducts.map(item => (
              <div key={item.id} style={{
                border: "1px solid #e8e8e8", borderRadius: 8, overflow: "hidden",
                cursor: "pointer", transition: "box-shadow .18s",
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.08)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <img src={item.img} alt={item.name}
                  style={{ width: "100%", height: 110, objectFit: "cover", display: "block" }} />
                <div style={{ padding: "8px 10px" }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "#222", marginBottom: 4, lineHeight: 1.3 }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: 12, color: "#888" }}>{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SUPER DISCOUNT BANNER ───────────────────────────── */}
        <div style={{
          background: "linear-gradient(90deg,#1e3a8a 0%,#2563eb 100%)",
          borderRadius: 8, padding: "18px 28px", marginBottom: 16,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
              Super discount on more than 100 USD
            </div>
            <div style={{ fontSize: 13, color: "#bfdbfe" }}>
              Have you ever finally just write dummy info
            </div>
          </div>
          <button style={{
            background: "#f59e0b", color: "#fff", border: "none",
            padding: "10px 24px", borderRadius: 6, fontSize: 13, fontWeight: 600,
            cursor: "pointer", whiteSpace: "nowrap", transition: "background .15s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#d97706"}
            onMouseLeave={e => e.currentTarget.style.background = "#f59e0b"}
          >
            Shop now
          </button>
        </div>

      </main>

      {/* ── SUBSCRIBE BANNER ─────────────────────────────────── */}
      <div style={{
        background: "#fff", borderTop: "1px solid #e8e8e8",
        borderBottom: "1px solid #e8e8e8", padding: "28px 20px", textAlign: "center",
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
            <input type="email" placeholder="Email" value={email}
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
          display: "grid", gridTemplateColumns: "1.4fr repeat(4,1fr) 1.2fr", gap: 32,
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
              {["f","t","in","be","yt"].map((s, i) => (
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

          {[
            { title: "About",       links: ["About Us","Find store","Categories","Blogs"] },
            { title: "Partnership", links: ["About Us","Find store","Categories","Blogs"] },
            { title: "Information", links: ["Help Center","Money Refund","Shipping","Contact us"] },
            { title: "For users",   links: ["Login","Register","Settings","My Orders"] },
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

        {/* Bottom */}
        <div style={{
          maxWidth: 1200, margin: "24px auto 0",
          borderTop: "1px solid #374151", paddingTop: 16,
          display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12,
        }}>
          <span>© 2023 Ecommerce.</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#888" }}>
            <span>🇺🇸</span><span>English</span><ChevronDown />
          </div>
        </div>
      </footer>
    </div>
  );
}