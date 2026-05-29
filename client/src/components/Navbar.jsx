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
  const { totalItems }          = useCart();
  const navigate                = useNavigate();
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("All category");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?search=${encodeURIComponent(search.trim())}`);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-[1000] shadow-sm">

      {/* ── Row 1: Logo + Search + Icons ───────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-5 py-2.5 flex items-center gap-4">

        {/* Logo */}
        <Link to="/" className="no-underline min-w-[110px]">
          <img src="layout/Brand/logo-colored.png" alt="Brand" className="h-10 block" />
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex-1 flex border-2 border-blue-600 rounded-lg overflow-hidden">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search"
            className="flex-1 px-3.5 py-2 border-none outline-none text-[13px] bg-white font-sans"
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="border-none border-l border-gray-300 bg-white px-2.5 text-xs text-gray-500 cursor-pointer outline-none font-sans"
          >
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <button type="submit" className="bg-blue-600 text-white border-none px-5 cursor-pointer text-[13px] font-semibold flex items-center gap-1.5 transition-colors hover:bg-blue-700">
            <SearchIcon /> <span className="hidden md:inline">Search</span>
          </button>
        </form>

        {/* Right icon buttons */}
        <div className="flex gap-1 items-center">
          {[
            { icon: <UserIcon />,    label: "Profile",  path: "/login" },
            { icon: <MessageIcon />, label: "Message",  path: "/" },
            { icon: <HeartIcon />,   label: "Wishlist", path: "/" },
          ].map(({ icon, label, path }) => (
            <Link key={label} to={path} className="flex flex-col items-center text-gray-500 text-[10px] gap-0.5 px-2 py-1 no-underline rounded-md transition-all hover:bg-blue-50 hover:text-blue-600">
              {icon}
              <span>{label}</span>
            </Link>
          ))}

          {/* Cart */}
          <Link to="/cart" className="flex flex-col items-center text-gray-500 text-[10px] gap-0.5 px-2 py-1 no-underline rounded-md relative transition-all hover:bg-blue-50 hover:text-blue-600">
            <CartIcon />
            <span>My cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white rounded-full w-4 h-4 text-[9px] font-bold flex items-center justify-center border border-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* ── Row 2: Category nav + links ────────────────────────── */}
      <div className="border-t border-gray-100 hidden md:block">
        <div className="max-w-[1200px] mx-auto px-5 flex items-center">

          {/* All category dropdown */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white border-none cursor-pointer text-[13px] font-semibold hover:bg-blue-700 transition-colors"
            >
              <MenuIcon /> All category <ChevronDown />
            </button>

            {menuOpen && (
              <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-b-lg min-w-[200px] shadow-xl z-[200]">
                {categories.slice(1).map(cat => (
                  <Link
                    key={cat}
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2.5 text-[13px] text-gray-700 no-underline border-b border-gray-50 transition-colors hover:bg-blue-50"
                  >{cat}</Link>
                ))}
              </div>
            )}
          </div>

          {/* Nav links */}
          <div className="flex">
            {navLinks.map(({ label, path }) => (
              <Link key={label} to={path} className="px-4 py-3 text-[13px] text-gray-600 no-underline whitespace-nowrap transition-colors hover:text-blue-600 font-medium">
                {label}
              </Link>
            ))}
          </div>

          <div className="flex-1" />

          {/* Language / Ship to */}
          <div className="flex items-center gap-1">
            <button className="bg-transparent border-none cursor-pointer flex items-center gap-1 text-xs text-gray-500 px-2 py-1 rounded hover:bg-gray-50 font-sans">
              English, USD <ChevronDown />
            </button>
            <button className="bg-transparent border-none cursor-pointer flex items-center gap-1 text-xs text-gray-500 px-2 py-1 rounded hover:bg-gray-50 font-sans">
              Ship to 🇩🇪 <ChevronDown />
            </button>
          </div>
        </div>
      </div>

      {/* Click-outside overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-[199]"
        />
      )}
    </header>
  );
}
