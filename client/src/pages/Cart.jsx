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
const ChevronDown  = () => <Icon d="M6 9l6 6 6-6" size={13} />;
const ChevronLeft  = () => <Icon d="M15 18l-6-6 6-6" size={14} />;
const ShieldIcon   = () => <Icon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" size={18} />;
const HeadsetIcon  = () => <Icon d="M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" size={18} />;
const TruckIcon    = () => <Icon d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3M9 17h6m4 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM13 8h8l-2 9H15" size={18} />;
const CartSmall    = () => <Icon d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" size={14} />;

// ─── Mock saved-for-later items ───────────────────────────────────────────────
const savedItems = [
  { id: 1, name: "GoPro HERO6 4K Action Camera – Black", price: "$99.50", img: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=200&q=80" },
  { id: 2, name: "GoPro HERO6 4K Action Camera – Black", price: "$99.50", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80" },
  { id: 3, name: "GoPro HERO6 4K Action Camera – Black", price: "$99.50", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80" },
  { id: 4, name: "GoPro HERO6 4K Action Camera – Black", price: "$99.50", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&q=80" },
];

// ─── Trust badges ─────────────────────────────────────────────────────────────
const trustBadges = [
  { icon: <ShieldIcon />,  label: "Secure payment",    sub: "Have you ever finally just" },
  { icon: <HeadsetIcon />, label: "Customer support",  sub: "Have you ever finally just" },
  { icon: <TruckIcon />,   label: "Free delivery",     sub: "Have you ever finally just" },
];

// ─── Payment icons (text-based) ───────────────────────────────────────────────
const payIcons = ["VISA", "MC", "PP", "VISA", "ApplePay"];

// ─── Single cart item row ─────────────────────────────────────────────────────
function CartItemRow({ item, onRemove, onQtyChange, onSave }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "64px 1fr auto",
      gap: 14, padding: "16px 0",
      borderBottom: "1px solid #f0f0f0", alignItems: "start",
    }}>
      {/* Thumbnail */}
      <img src={item.img} alt={item.name} style={{
        width: 64, height: 64, objectFit: "cover",
        borderRadius: 6, border: "1px solid #eee",
      }} />

      {/* Details */}
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#222", marginBottom: 4 }}>
          {item.name}
        </div>
        <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>
          Size: medium &nbsp; Color: blue &nbsp; Material: Plastic
        </div>
        <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>
          Seller: {item.seller || "Best Factory LLC"}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => onRemove(item._id)} style={{
            background: "none", border: "none", color: "#ef4444",
            fontSize: 12, cursor: "pointer", padding: 0, fontFamily: "inherit",
          }}>Remove</button>
          <button onClick={() => onSave(item._id)} style={{
            background: "none", border: "none", color: "#2563eb",
            fontSize: 12, cursor: "pointer", padding: 0, fontFamily: "inherit",
          }}>Save for later</button>
        </div>
      </div>

      {/* Price + Qty */}
      <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#222" }}>
          ${(item.price * item.qty).toFixed(2)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 13, color: "#888" }}>Qty:</span>
          <div style={{
            display: "flex", alignItems: "center", gap: 4,
            border: "1px solid #e0e0e0", borderRadius: 4, overflow: "hidden",
          }}>
            <button onClick={() => onQtyChange(item._id, item.qty - 1)} style={{
              width: 28, height: 28, background: "#f5f5f5", border: "none",
              cursor: "pointer", fontSize: 15, color: "#555",
            }}>−</button>
            <span style={{ minWidth: 24, textAlign: "center", fontSize: 13, fontWeight: 600 }}>
              {item.qty}
            </span>
            <button onClick={() => onQtyChange(item._id, item.qty + 1)} style={{
              width: 28, height: 28, background: "#f5f5f5", border: "none",
              cursor: "pointer", fontSize: 15, color: "#555",
            }}>+</button>
          </div>
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
  const [email,      setEmail]      = useState("");

  // Totals
  const subtotal  = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount  = couponApplied ? 60 : 0;
  const tax       = 14;
  const total     = subtotal - discount + tax;

  const handleApplyCoupon = () => {
    if (coupon.trim()) setCouponApplied(true);
  };

  // Fallback cart items for demo (if context is empty)
  const displayCart = cart.length > 0 ? cart : [
    { _id: "d1", name: "T-shirts with multiple colors, for men and lady", price: 78.99, qty: 9,  img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=120&q=80" },
    { _id: "d2", name: "T-shirts with multiple colors, for men and lady", price: 13.00, qty: 3,  img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=120&q=80" },
    { _id: "d3", name: "T-shirts with multiple colors, for men and lady", price: 170.50,qty: 1,  img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=120&q=80" },
  ];

  const displaySubtotal = displayCart.reduce((s, i) => s + i.price * i.qty, 0);
  const displayDiscount = couponApplied ? 60 : 0;
  const displayTax      = 14;
  const displayTotal    = displaySubtotal - displayDiscount + displayTax;

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "#f5f5f5", minHeight: "100vh", color: "#222",
    }}>
      <Navbar />

      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 20px" }}>

        {/* ── TITLE ─────────────────────────────────────────── */}
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 20px" }}>
          My cart ({displayCart.length})
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20 }}>

          {/* ── LEFT: Cart items ─────────────────────────────── */}
          <div>
            <div style={{
              background: "#fff", borderRadius: 8,
              border: "1px solid #e8e8e8", padding: "0 20px", marginBottom: 16,
            }}>
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
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", padding: "14px 0",
              }}>
                <button onClick={() => navigate("/products")} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "none", border: "1px solid #e0e0e0",
                  borderRadius: 6, padding: "7px 14px", cursor: "pointer",
                  fontSize: 13, color: "#444", fontFamily: "inherit",
                  transition: "border-color .15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#2563eb"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#e0e0e0"}
                >
                  <ChevronLeft /> Back to shop
                </button>
                <button onClick={() => cart.length > 0 && clearCart()} style={{
                  background: "none", border: "none", color: "#ef4444",
                  fontSize: 13, cursor: "pointer", fontFamily: "inherit",
                }}>
                  Remove all
                </button>
              </div>
            </div>

            {/* ── Trust badges ─────────────────────────────── */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12,
            }}>
              {trustBadges.map(b => (
                <div key={b.label} style={{
                  background: "#fff", border: "1px solid #e8e8e8",
                  borderRadius: 8, padding: "14px 16px",
                  display: "flex", alignItems: "flex-start", gap: 10,
                }}>
                  <span style={{ color: "#2563eb", marginTop: 1, flexShrink: 0 }}>{b.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#222", marginBottom: 2 }}>
                      {b.label}
                    </div>
                    <div style={{ fontSize: 11, color: "#aaa" }}>{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Order Summary ──────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{
              background: "#fff", border: "1px solid #e8e8e8",
              borderRadius: 8, padding: "18px 18px 20px",
            }}>

              {/* Coupon */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#222", marginBottom: 8 }}>
                  Have a coupon?
                </div>
                <div style={{ display: "flex", gap: 0, border: "1px solid #e0e0e0", borderRadius: 6, overflow: "hidden" }}>
                  <input
                    value={coupon}
                    onChange={e => setCoupon(e.target.value)}
                    placeholder="Add coupon"
                    style={{
                      flex: 1, padding: "8px 10px", border: "none",
                      outline: "none", fontSize: 12, fontFamily: "inherit",
                    }}
                  />
                  <button onClick={handleApplyCoupon} style={{
                    padding: "0 12px", background: "#fff", border: "none",
                    borderLeft: "1px solid #e0e0e0", color: "#2563eb",
                    fontSize: 12, fontWeight: 600, cursor: "pointer",
                    fontFamily: "inherit",
                  }}>Apply</button>
                </div>
                {couponApplied && (
                  <div style={{ fontSize: 11, color: "#16a34a", marginTop: 4 }}>
                    ✓ Coupon applied! $60 off
                  </div>
                )}
              </div>

              {/* Divider */}
              <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: 14 }} />

              {/* Price breakdown */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#555" }}>
                  <span>Subtotal:</span>
                  <span style={{ fontWeight: 600, color: "#222" }}>
                    ${displaySubtotal.toFixed(2)}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#555" }}>
                  <span>Discount:</span>
                  <span style={{ fontWeight: 600, color: "#ef4444" }}>
                    {displayDiscount > 0 ? `-$${displayDiscount.toFixed(2)}` : "-$00.00"}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#555" }}>
                  <span>Tax:</span>
                  <span style={{ fontWeight: 600, color: "#ef4444" }}>+${displayTax.toFixed(2)}</span>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: 14 }} />

              {/* Total */}
              <div style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", marginBottom: 16,
              }}>
                <span style={{ fontSize: 15, fontWeight: 700 }}>Total:</span>
                <span style={{ fontSize: 20, fontWeight: 700, color: "#222" }}>
                  ${displayTotal.toFixed(2)}
                </span>
              </div>

              {/* Checkout button */}
              <button style={{
                width: "100%", padding: "13px 0", background: "#22c55e", color: "#fff",
                border: "none", borderRadius: 6, fontSize: 15, fontWeight: 700,
                cursor: "pointer", transition: "background .15s", letterSpacing: ".3px",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#16a34a"}
                onMouseLeave={e => e.currentTarget.style.background = "#22c55e"}
                onClick={() => navigate("/")}
              >
                Checkout
              </button>

              {/* Payment icons */}
              <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 12, flexWrap: "wrap" }}>
                {[
                  { label: "VISA",     bg: "#1a1f71", color: "#fff"    },
                  { label: "MC",       bg: "#eb001b", color: "#fff"    },
                  { label: "PayPal",   bg: "#003087", color: "#fff"    },
                  { label: "AMEX",     bg: "#007bc1", color: "#fff"    },
                  { label: "Pay",      bg: "#000",    color: "#fff"    },
                ].map(p => (
                  <div key={p.label} style={{
                    background: p.bg, color: p.color,
                    borderRadius: 3, padding: "2px 6px",
                    fontSize: 9, fontWeight: 700, letterSpacing: ".5px",
                  }}>{p.label}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SAVED FOR LATER ─────────────────────────────────── */}
        <div style={{ marginTop: 32, marginBottom: 16 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 16px" }}>Saved for later</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
            {savedItems.map(item => (
              <div key={item.id} style={{
                background: "#fff", border: "1px solid #e8e8e8",
                borderRadius: 8, overflow: "hidden",
                transition: "box-shadow .18s",
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.08)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <img src={item.img} alt={item.name}
                  style={{ width: "100%", height: 150, objectFit: "cover", display: "block" }} />
                <div style={{ padding: "12px 12px 14px" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#222", marginBottom: 4 }}>
                    {item.price}
                  </div>
                  <div style={{ fontSize: 12, color: "#888", lineHeight: 1.4, marginBottom: 10 }}>
                    {item.name}
                  </div>
                  <button style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: "none", border: "1px solid #e0e0e0",
                    borderRadius: 5, padding: "6px 12px", cursor: "pointer",
                    fontSize: 12, color: "#2563eb", fontFamily: "inherit",
                    fontWeight: 500, transition: "border-color .15s, background .15s",
                    width: "100%", justifyContent: "center",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.borderColor = "#2563eb"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.borderColor = "#e0e0e0"; }}
                  >
                    <CartSmall /> Move to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SUPER DISCOUNT BANNER ───────────────────────────── */}
        <div style={{
          background: "linear-gradient(90deg,#1e3a8a 0%,#2563eb 100%)",
          borderRadius: 8, padding: "18px 28px", marginBottom: 8,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
              Super discount on more than 100 USD
            </div>
            <div style={{ fontSize: 13, color: "#bfdbfe" }}>
              Have you ever finally just write dummy info
            </div>
          </div>
          <button style={{
            background: "#f59e0b", color: "#fff", border: "none",
            padding: "10px 22px", borderRadius: 6, fontSize: 13, fontWeight: 600,
            cursor: "pointer", whiteSpace: "nowrap",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#d97706"}
            onMouseLeave={e => e.currentTarget.style.background = "#f59e0b"}
          >Shop now</button>
        </div>

      </main>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer style={{ background: "#1a1a2e", color: "#9ca3af", padding: "36px 20px 20px" }}>
        <div style={{
          maxWidth: 1000, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1.4fr repeat(4,1fr) 1.2fr", gap: 28,
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
                  fontSize: 11, cursor: "pointer",
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

        <div style={{
          maxWidth: 1000, margin: "24px auto 0",
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