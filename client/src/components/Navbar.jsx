import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// ─── Inline SVG Icons ──────────────────────────────────────────────────────────
const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const SearchIcon  = () => <Icon d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />;
const UserIcon    = () => <Icon d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />;
const MessageIcon = () => <Icon d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />;
const HeartIcon   = () => <Icon d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />;
const CartIcon    = () => <Icon d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />;
const MenuIcon    = () => <Icon d="M3 12h18M3 6h18M3 18h18" />;
const ChevronDown = () => <Icon d="M6 9l6 6 6-6" size={14} />;

const categories = [
  "All category", "Automobiles", "Clothes and wear", "Home interiors",
  "Computer and tech", "Tools, equipments", "Sports and outdoor",
  "Animal and pets", "Machinery tools",
];

const navLinks = [
  { label: "Hot offers", path: "/products?filter=hot" },
  { label: "Gift boxes", path: "/products?filter=gift" },
  { label: "Projects",   path: "/products" },
  { label: "Menu Item",  path: "/" },
];

export default function Navbar() {
  const { cart }                = useCart();
  const navigate                = useNavigate();
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("All category");
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <header style={{
      background: "#fff",
      borderBottom: "1px solid #e8e8e8",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: "0 1px 4px rgba(0,0,0,.06)"
    }}>

      {/* ── Row 1: Logo + Search + Icons ───────────────────────── */}
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "10px 20px",
        display: "flex", alignItems: "center", gap: 16
      }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", minWidth: 110 }}>
          <div style={{
            background: "#2563eb", color: "#fff", borderRadius: 7,
            padding: "6px 12px", fontSize: 15, fontWeight: 700,
            display: "inline-flex", alignItems: "center", gap: 6,
          }}>
            🛒 Brand
          </div>
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} style={{
          flex: 1, display: "flex",
          border: "1.5px solid #2563eb", borderRadius: 7, overflow: "hidden"
        }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search"
            style={{
              flex: 1, padding: "9px 14px", border: "none", outline: "none",
              fontSize: 13, background: "#fff", fontFamily: "inherit"
            }}
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{
              border: "none", borderLeft: "1px solid #ddd",
              background: "#fff", padding: "0 10px",
              fontSize: 12, color: "#555", cursor: "pointer",
              outline: "none", fontFamily: "inherit"
            }}
          >
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <button type="submit" style={{
            background: "#2563eb", color: "#fff", border: "none",
            padding: "0 20px", cursor: "pointer", fontSize: 13,
            fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
            transition: "background .15s"
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
            onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
          >
            <SearchIcon /> Search
          </button>
        </form>

        {/* Right icon buttons */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {[
            { icon: <UserIcon />,    label: "Profile",  path: "/login" },
            { icon: <MessageIcon />, label: "Message",  path: "/" },
            { icon: <HeartIcon />,   label: "Wishlist", path: "/" },
          ].map(({ icon, label, path }) => (
            <Link key={label} to={path} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              color: "#555", fontSize: 10, gap: 2, padding: "4px 8px",
              textDecoration: "none", borderRadius: 6,
              transition: "background .12s, color .12s"
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.color = "#2563eb"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#555"; }}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}

          {/* Cart */}
          <Link to="/cart" style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            color: "#555", fontSize: 10, gap: 2, padding: "4px 8px",
            textDecoration: "none", borderRadius: 6, position: "relative",
            transition: "background .12s, color .12s"
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.color = "#2563eb"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#555"; }}
          >
            <CartIcon />
            <span>My cart</span>
            {cartCount > 0 && (
              <span style={{
                position: "absolute", top: 0, right: 4,
                background: "#ef4444", color: "#fff",
                borderRadius: "50%", width: 17, height: 17,
                fontSize: 10, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>{cartCount}</span>
            )}
          </Link>
        </div>
      </div>

      {/* ── Row 2: Category nav + links ────────────────────────── */}
      <div style={{ borderTop: "1px solid #f0f0f0" }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 20px",
          display: "flex", alignItems: "center"
        }}>

          {/* All category dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setMenuOpen(v => !v)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "12px 16px", background: "#2563eb", color: "#fff",
                border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
              }}
            >
              <MenuIcon /> All category <ChevronDown />
            </button>

            {menuOpen && (
              <div style={{
                position: "absolute", top: "100%", left: 0,
                background: "#fff", border: "1px solid #e8e8e8",
                borderRadius: "0 0 8px 8px", minWidth: 200,
                boxShadow: "0 8px 24px rgba(0,0,0,.1)", zIndex: 200
              }}>
                {categories.slice(1).map(cat => (
                  <Link
                    key={cat}
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block", padding: "10px 16px",
                      fontSize: 13, color: "#333", textDecoration: "none",
                      borderBottom: "1px solid #f5f5f5", transition: "background .1s"
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#eff6ff"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >{cat}</Link>
                ))}
              </div>
            )}
          </div>

          {/* Nav links */}
          {navLinks.map(({ label, path }) => (
            <Link key={label} to={path} style={{
              padding: "12px 16px", fontSize: 13, color: "#444",
              textDecoration: "none", whiteSpace: "nowrap", transition: "color .15s"
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#2563eb"}
              onMouseLeave={e => e.currentTarget.style.color = "#444"}
            >{label}</Link>
          ))}

          <div style={{ flex: 1 }} />

          {/* Language / Ship to */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 4,
              fontSize: 12, color: "#555", padding: "4px 8px", borderRadius: 4,
              fontFamily: "inherit"
            }}>
              English, USD <ChevronDown />
            </button>
            <button style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 4,
              fontSize: 12, color: "#555", padding: "4px 8px", borderRadius: 4,
              fontFamily: "inherit"
            }}>
              Ship to 🇩🇪 <ChevronDown />
            </button>
          </div>
        </div>
      </div>

      {/* Click-outside overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 199 }}
        />
      )}
    </header>
  );
}
