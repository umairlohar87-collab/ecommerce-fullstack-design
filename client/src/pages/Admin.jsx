import { useState } from "react";
import { Link } from "react-router-dom";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const DashIcon    = () => <Icon d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" />;
const ProductIcon = () => <Icon d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />;
const OrderIcon   = () => <Icon d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />;
const UserIcon    = () => <Icon d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />;
const SettingIcon = () => <Icon d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />;
const PlusIcon    = () => <Icon d="M12 5v14M5 12h14" size={16} />;
const EditIcon    = () => <Icon d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" size={15} />;
const TrashIcon   = () => <Icon d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" size={15} />;
const EyeIcon     = () => <Icon d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" size={15} />;
const SearchIcon  = () => <Icon d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" size={15} />;
const BellIcon    = () => <Icon d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" size={18} />;
const ChevronDown = () => <Icon d="M6 9l6 6 6-6" size={14} />;
const LogoutIcon  = () => <Icon d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" size={16} />;
const TrendUp     = () => <Icon d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" size={14} />;
const TrendDown   = () => <Icon d="M23 18l-9.5-9.5-5 5L1 6M17 18h6v-6" size={14} />;
const CloseIcon   = () => <Icon d="M18 6L6 18M6 6l12 12" size={16} />;
const CheckIcon   = () => <Icon d="M20 6L9 17l-5-5" size={13} />;

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const initProducts = [
  { id: 1, name: "T-Shirt Cotton Slim",        category: "Clothing",     price: 19.99, stock: 120, status: "Active",   img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=60&q=80" },
  { id: 2, name: "Wireless Headphones X1",     category: "Electronics",  price: 89.00, stock: 45,  status: "Active",   img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&q=80" },
  { id: 3, name: "Smart Watch Series Pro",     category: "Electronics",  price: 240.00,stock: 30,  status: "Active",   img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=60&q=80" },
  { id: 4, name: "Leather Wallet Slim",        category: "Accessories",  price: 34.00, stock: 0,   status: "Out of stock", img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=60&q=80" },
  { id: 5, name: "Laptop Ultra 15\"",          category: "Electronics",  price: 340.00,stock: 18,  status: "Active",   img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=60&q=80" },
  { id: 6, name: "Running Shoes Nike",         category: "Footwear",     price: 99.50, stock: 55,  status: "Active",   img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=60&q=80" },
];

const initOrders = [
  { id: "#10021", customer: "Sarah Johnson",  date: "May 25, 2026", total: "$340.00", status: "Delivered",  items: 3 },
  { id: "#10022", customer: "James Miller",   date: "May 26, 2026", total: "$89.00",  status: "Processing", items: 1 },
  { id: "#10023", customer: "Emily Clark",    date: "May 26, 2026", total: "$459.00", status: "Shipped",    items: 4 },
  { id: "#10024", customer: "Robert Brown",   date: "May 27, 2026", total: "$19.99",  status: "Pending",    items: 1 },
  { id: "#10025", customer: "Lisa Anderson",  date: "May 27, 2026", total: "$128.50", status: "Delivered",  items: 2 },
  { id: "#10026", customer: "David Wilson",   date: "May 28, 2026", total: "$240.00", status: "Cancelled",  items: 1 },
];

const initUsers = [
  { id: 1, name: "Sarah Johnson",  email: "sarah@email.com",  role: "Customer", joined: "Jan 2026", orders: 12, status: "Active",   avatar: "S" },
  { id: 2, name: "James Miller",   email: "james@email.com",  role: "Customer", joined: "Feb 2026", orders: 5,  status: "Active",   avatar: "J" },
  { id: 3, name: "Emily Clark",    email: "emily@email.com",  role: "Admin",    joined: "Mar 2025", orders: 0,  status: "Active",   avatar: "E" },
  { id: 4, name: "Robert Brown",   email: "robert@email.com", role: "Customer", joined: "Apr 2026", orders: 3,  status: "Inactive", avatar: "R" },
  { id: 5, name: "Lisa Anderson",  email: "lisa@email.com",   role: "Customer", joined: "May 2026", orders: 8,  status: "Active",   avatar: "L" },
];

const statCards = [
  { label: "Total Revenue",  value: "$84,200",  change: "+12.5%", up: true,  color: "#2563eb", bg: "#eff6ff",  icon: "💰" },
  { label: "Total Orders",   value: "1,284",    change: "+8.2%",  up: true,  color: "#7c3aed", bg: "#f5f3ff",  icon: "📦" },
  { label: "Total Products", value: "342",      change: "+3.1%",  up: true,  color: "#0891b2", bg: "#ecfeff",  icon: "🛍️" },
  { label: "Total Customers",value: "5,620",    change: "-1.4%",  up: false, color: "#16a34a", bg: "#f0fdf4",  icon: "👤" },
];

const orderStatusColor = {
  Delivered:  { bg: "#dcfce7", color: "#16a34a" },
  Processing: { bg: "#fef9c3", color: "#ca8a04" },
  Shipped:    { bg: "#dbeafe", color: "#2563eb" },
  Pending:    { bg: "#ffedd5", color: "#ea580c" },
  Cancelled:  { bg: "#fee2e2", color: "#dc2626" },
};

const navItems = [
  { key: "dashboard", label: "Dashboard",  icon: <DashIcon /> },
  { key: "products",  label: "Products",   icon: <ProductIcon /> },
  { key: "orders",    label: "Orders",     icon: <OrderIcon /> },
  { key: "users",     label: "Users",      icon: <UserIcon /> },
  { key: "settings",  label: "Settings",   icon: <SettingIcon /> },
];

// ─── Modal ─────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,.45)",
      zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: 12, width: "100%", maxWidth: 520,
        boxShadow: "0 20px 60px rgba(0,0,0,.2)", overflow: "hidden",
      }} onClick={e => e.stopPropagation()}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "18px 24px", borderBottom: "1px solid #f0f0f0",
        }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{title}</h3>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer", color: "#888",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 4, borderRadius: 4,
          }}><CloseIcon /></button>
        </div>
        <div style={{ padding: "20px 24px" }}>{children}</div>
      </div>
    </div>
  );
}

// ─── Form Input ────────────────────────────────────────────────────────────────
function FormInput({ label, value, onChange, type = "text", placeholder }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#555", marginBottom: 5 }}>
        {label}
      </label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{
        width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb",
        borderRadius: 7, fontSize: 13, outline: "none", fontFamily: "inherit",
        boxSizing: "border-box", transition: "border-color .15s",
      }}
        onFocus={e => e.target.style.borderColor = "#2563eb"}
        onBlur={e  => e.target.style.borderColor = "#e5e7eb"}
      />
    </div>
  );
}

// ─── Status Badge ──────────────────────────────────────────────────────────────
function Badge({ label, bg, color }) {
  return (
    <span style={{
      background: bg, color, borderRadius: 20,
      padding: "3px 10px", fontSize: 11, fontWeight: 600,
    }}>{label}</span>
  );
}

// ─── Main Admin Component ─────────────────────────────────────────────────────
export default function Admin() {
  const [activeTab,   setActiveTab]   = useState("dashboard");
  const [products,    setProducts]    = useState(initProducts);
  const [orders,      setOrders]      = useState(initOrders);
  const [users,       setUsers]       = useState(initUsers);
  const [search,      setSearch]      = useState("");
  const [modal,       setModal]       = useState(null); // null | "add" | "edit" | "delete"
  const [editTarget,  setEditTarget]  = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // product form state
  const [form, setForm] = useState({ name: "", category: "", price: "", stock: "", status: "Active" });
  const setF = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const openAdd  = () => { setForm({ name: "", category: "", price: "", stock: "", status: "Active" }); setModal("add"); };
  const openEdit = (p) => { setForm({ name: p.name, category: p.category, price: p.price, stock: p.stock, status: p.status }); setEditTarget(p); setModal("edit"); };
  const openDel  = (p) => { setEditTarget(p); setModal("delete"); };

  const handleSave = () => {
    if (modal === "add") {
      setProducts(prev => [...prev, { id: Date.now(), img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=60&q=80", ...form, price: parseFloat(form.price) || 0, stock: parseInt(form.stock) || 0 }]);
    } else {
      setProducts(prev => prev.map(p => p.id === editTarget.id ? { ...p, ...form, price: parseFloat(form.price) || 0, stock: parseInt(form.stock) || 0 } : p));
    }
    setModal(null);
  };

  const handleDelete = () => {
    setProducts(prev => prev.filter(p => p.id !== editTarget.id));
    setModal(null);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.customer.toLowerCase().includes(search.toLowerCase())
  );

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: "flex", minHeight: "100vh", background: "#f5f7fb", color: "#222",
    }}>

      {/* ── SIDEBAR ──────────────────────────────────────────── */}
      <aside style={{
        width: sidebarOpen ? 240 : 64, flexShrink: 0,
        background: "#1a1a2e", color: "#9ca3af",
        display: "flex", flexDirection: "column",
        transition: "width .22s ease", overflow: "hidden",
        position: "sticky", top: 0, height: "100vh",
      }}>
        {/* Logo */}
        <div style={{
          padding: "18px 16px", borderBottom: "1px solid #374151",
          display: "flex", alignItems: "center", gap: 10, minHeight: 64,
        }}>
          <div style={{
            background: "#2563eb", borderRadius: 8, width: 32, height: 32,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, fontSize: 16,
          }}>🛒</div>
          {sidebarOpen && (
            <span style={{ fontSize: 16, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>
              Brand Admin
            </span>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 8px" }}>
          {navItems.map(item => {
            const active = activeTab === item.key;
            return (
              <button key={item.key} onClick={() => setActiveTab(item.key)} style={{
                width: "100%", display: "flex", alignItems: "center",
                gap: 12, padding: sidebarOpen ? "10px 12px" : "10px 0",
                justifyContent: sidebarOpen ? "flex-start" : "center",
                background: active ? "#2563eb" : "transparent",
                border: "none", borderRadius: 8, cursor: "pointer",
                color: active ? "#fff" : "#9ca3af",
                fontSize: 13, fontWeight: active ? 600 : 400,
                marginBottom: 4, transition: "background .15s, color .15s",
                fontFamily: "inherit",
              }}
                onMouseEnter={e => !active && (e.currentTarget.style.background = "#374151")}
                onMouseLeave={e => !active && (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ flexShrink: 0 }}>{item.icon}</span>
                {sidebarOpen && <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom: collapse + logout */}
        <div style={{ padding: "12px 8px", borderTop: "1px solid #374151" }}>
          <button onClick={() => setSidebarOpen(v => !v)} style={{
            width: "100%", padding: "10px 12px", background: "transparent",
            border: "none", cursor: "pointer", color: "#9ca3af",
            display: "flex", alignItems: "center",
            justifyContent: sidebarOpen ? "flex-start" : "center",
            gap: 10, fontSize: 12, borderRadius: 8, fontFamily: "inherit",
            transition: "background .15s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#374151"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <Icon d={sidebarOpen ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} size={16} />
            {sidebarOpen && "Collapse"}
          </button>
          <Link to="/" style={{ textDecoration: "none" }}>
            <button style={{
              width: "100%", padding: "10px 12px", background: "transparent",
              border: "none", cursor: "pointer", color: "#9ca3af",
              display: "flex", alignItems: "center",
              justifyContent: sidebarOpen ? "flex-start" : "center",
              gap: 10, fontSize: 12, borderRadius: 8, fontFamily: "inherit",
              transition: "background .15s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#374151"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <LogoutIcon />
              {sidebarOpen && "Back to store"}
            </button>
          </Link>
        </div>
      </aside>

      {/* ── MAIN AREA ─────────────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* ── TOP NAV ─────────────────────────────────────────── */}
        <header style={{
          background: "#fff", borderBottom: "1px solid #e8e8e8",
          padding: "0 24px", height: 64, display: "flex",
          alignItems: "center", justifyContent: "space-between",
          position: "sticky", top: 0, zIndex: 100,
          boxShadow: "0 1px 4px rgba(0,0,0,.04)",
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#1a1a2e" }}>
              {navItems.find(n => n.key === activeTab)?.label}
            </h2>
            <p style={{ margin: 0, fontSize: 12, color: "#aaa" }}>
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* Search */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              border: "1.5px solid #e5e7eb", borderRadius: 8,
              padding: "7px 12px", background: "#f9fafb",
            }}>
              <SearchIcon />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search…"
                style={{
                  border: "none", background: "transparent", outline: "none",
                  fontSize: 13, width: 180, fontFamily: "inherit", color: "#333",
                }}
              />
            </div>

            {/* Bell */}
            <button style={{
              position: "relative", background: "none", border: "none",
              cursor: "pointer", padding: 6, borderRadius: 8, color: "#555",
              transition: "background .15s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#f3f4f6"}
              onMouseLeave={e => e.currentTarget.style.background = "none"}
            >
              <BellIcon />
              <span style={{
                position: "absolute", top: 4, right: 4,
                width: 8, height: 8, background: "#ef4444",
                borderRadius: "50%", border: "2px solid #fff",
              }} />
            </button>

            {/* Avatar */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "linear-gradient(135deg,#2563eb,#7c3aed)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 700, fontSize: 14,
              }}>A</div>
              <div style={{ lineHeight: 1.3 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Admin</div>
                <div style={{ fontSize: 11, color: "#888" }}>Super Admin</div>
              </div>
              <ChevronDown />
            </div>
          </div>
        </header>

        {/* ── PAGE CONTENT ─────────────────────────────────────── */}
        <main style={{ flex: 1, padding: "24px", overflow: "auto" }}>

          {/* ══ DASHBOARD TAB ══════════════════════════════════ */}
          {activeTab === "dashboard" && (
            <>
              {/* Stat cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
                {statCards.map(s => (
                  <div key={s.label} style={{
                    background: "#fff", borderRadius: 12, padding: "18px 20px",
                    border: "1px solid #e8e8e8", boxShadow: "0 1px 4px rgba(0,0,0,.04)",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>{s.label}</div>
                        <div style={{ fontSize: 24, fontWeight: 700, color: "#1a1a2e" }}>{s.value}</div>
                      </div>
                      <div style={{
                        width: 44, height: 44, borderRadius: 10,
                        background: s.bg, display: "flex",
                        alignItems: "center", justifyContent: "center", fontSize: 20,
                      }}>{s.icon}</div>
                    </div>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 4, marginTop: 10,
                      color: s.up ? "#16a34a" : "#dc2626", fontSize: 12, fontWeight: 500,
                    }}>
                      {s.up ? <TrendUp /> : <TrendDown />}
                      {s.change} vs last month
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

                {/* Recent orders */}
                <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e8e8e8", padding: "18px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Recent Orders</h4>
                    <button onClick={() => setActiveTab("orders")} style={{
                      background: "none", border: "none", color: "#2563eb",
                      fontSize: 12, cursor: "pointer", fontFamily: "inherit",
                    }}>View all →</button>
                  </div>
                  {orders.slice(0, 5).map(o => (
                    <div key={o.id} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "10px 0", borderBottom: "1px solid #f5f5f5",
                    }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{o.id}</div>
                        <div style={{ fontSize: 12, color: "#888" }}>{o.customer}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{o.total}</div>
                        <Badge label={o.status} {...(orderStatusColor[o.status] || { bg: "#f3f4f6", color: "#555" })} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Top products */}
                <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e8e8e8", padding: "18px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Top Products</h4>
                    <button onClick={() => setActiveTab("products")} style={{
                      background: "none", border: "none", color: "#2563eb",
                      fontSize: 12, cursor: "pointer", fontFamily: "inherit",
                    }}>View all →</button>
                  </div>
                  {products.slice(0, 5).map(p => (
                    <div key={p.id} style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "8px 0", borderBottom: "1px solid #f5f5f5",
                    }}>
                      <img src={p.img} alt={p.name} style={{
                        width: 40, height: 40, borderRadius: 6, objectFit: "cover",
                        border: "1px solid #eee",
                      }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {p.name}
                        </div>
                        <div style={{ fontSize: 12, color: "#888" }}>{p.category}</div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#2563eb" }}>${p.price}</div>
                        <div style={{ fontSize: 11, color: p.stock === 0 ? "#dc2626" : "#888" }}>
                          {p.stock === 0 ? "Out of stock" : `${p.stock} left`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ══ PRODUCTS TAB ═══════════════════════════════════ */}
          {activeTab === "products" && (
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e8e8e8" }}>
              {/* Header */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "18px 20px", borderBottom: "1px solid #f0f0f0",
              }}>
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>
                  All Products <span style={{ fontSize: 13, color: "#888", fontWeight: 400 }}>({filteredProducts.length})</span>
                </h4>
                <button onClick={openAdd} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "#2563eb", color: "#fff", border: "none",
                  borderRadius: 7, padding: "9px 16px", cursor: "pointer",
                  fontSize: 13, fontWeight: 600, fontFamily: "inherit",
                  transition: "background .15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
                  onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
                >
                  <PlusIcon /> Add Product
                </button>
              </div>

              {/* Table */}
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f9fafb" }}>
                      {["Product", "Category", "Price", "Stock", "Status", "Actions"].map(h => (
                        <th key={h} style={{
                          padding: "12px 16px", textAlign: "left",
                          fontSize: 12, fontWeight: 600, color: "#888",
                          borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap",
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p, i) => (
                      <tr key={p.id} style={{ borderBottom: "1px solid #f5f5f5" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <img src={p.img} alt={p.name} style={{
                              width: 40, height: 40, borderRadius: 6, objectFit: "cover",
                              border: "1px solid #eee", flexShrink: 0,
                            }} />
                            <span style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: "12px 16px", fontSize: 13, color: "#555" }}>{p.category}</td>
                        <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#2563eb" }}>${p.price}</td>
                        <td style={{ padding: "12px 16px", fontSize: 13, color: p.stock === 0 ? "#dc2626" : "#555" }}>
                          {p.stock === 0 ? "—" : p.stock}
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <Badge
                            label={p.status}
                            bg={p.status === "Active" ? "#dcfce7" : "#fee2e2"}
                            color={p.status === "Active" ? "#16a34a" : "#dc2626"}
                          />
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ display: "flex", gap: 6 }}>
                            <ActionBtn icon={<EditIcon />}  color="#2563eb" bg="#eff6ff"  onClick={() => openEdit(p)} title="Edit" />
                            <ActionBtn icon={<TrashIcon />} color="#dc2626" bg="#fee2e2"  onClick={() => openDel(p)}  title="Delete" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredProducts.length === 0 && (
                  <div style={{ textAlign: "center", padding: 40, color: "#aaa", fontSize: 14 }}>
                    No products found.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══ ORDERS TAB ═════════════════════════════════════ */}
          {activeTab === "orders" && (
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e8e8e8" }}>
              <div style={{ padding: "18px 20px", borderBottom: "1px solid #f0f0f0" }}>
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>
                  All Orders <span style={{ fontSize: 13, color: "#888", fontWeight: 400 }}>({filteredOrders.length})</span>
                </h4>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f9fafb" }}>
                      {["Order ID", "Customer", "Date", "Items", "Total", "Status", "Actions"].map(h => (
                        <th key={h} style={{
                          padding: "12px 16px", textAlign: "left",
                          fontSize: 12, fontWeight: 600, color: "#888",
                          borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap",
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map(o => (
                      <tr key={o.id} style={{ borderBottom: "1px solid #f5f5f5" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#2563eb" }}>{o.id}</td>
                        <td style={{ padding: "12px 16px", fontSize: 13 }}>{o.customer}</td>
                        <td style={{ padding: "12px 16px", fontSize: 13, color: "#888" }}>{o.date}</td>
                        <td style={{ padding: "12px 16px", fontSize: 13, color: "#555" }}>{o.items}</td>
                        <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600 }}>{o.total}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <Badge label={o.status} {...(orderStatusColor[o.status] || { bg: "#f3f4f6", color: "#555" })} />
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <ActionBtn icon={<EyeIcon />} color="#7c3aed" bg="#f5f3ff" title="View" onClick={() => {}} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredOrders.length === 0 && (
                  <div style={{ textAlign: "center", padding: 40, color: "#aaa", fontSize: 14 }}>No orders found.</div>
                )}
              </div>
            </div>
          )}

          {/* ══ USERS TAB ══════════════════════════════════════ */}
          {activeTab === "users" && (
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e8e8e8" }}>
              <div style={{ padding: "18px 20px", borderBottom: "1px solid #f0f0f0" }}>
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>
                  All Users <span style={{ fontSize: 13, color: "#888", fontWeight: 400 }}>({filteredUsers.length})</span>
                </h4>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f9fafb" }}>
                      {["User", "Email", "Role", "Joined", "Orders", "Status", "Actions"].map(h => (
                        <th key={h} style={{
                          padding: "12px 16px", textAlign: "left",
                          fontSize: 12, fontWeight: 600, color: "#888",
                          borderBottom: "1px solid #f0f0f0", whiteSpace: "nowrap",
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(u => (
                      <tr key={u.id} style={{ borderBottom: "1px solid #f5f5f5" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{
                              width: 34, height: 34, borderRadius: "50%",
                              background: "linear-gradient(135deg,#2563eb,#7c3aed)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0,
                            }}>{u.avatar}</div>
                            <span style={{ fontSize: 13, fontWeight: 500 }}>{u.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: "12px 16px", fontSize: 13, color: "#888" }}>{u.email}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <Badge
                            label={u.role}
                            bg={u.role === "Admin" ? "#fef9c3" : "#f3f4f6"}
                            color={u.role === "Admin" ? "#ca8a04" : "#555"}
                          />
                        </td>
                        <td style={{ padding: "12px 16px", fontSize: 13, color: "#888" }}>{u.joined}</td>
                        <td style={{ padding: "12px 16px", fontSize: 13, color: "#555" }}>{u.orders}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <Badge
                            label={u.status}
                            bg={u.status === "Active" ? "#dcfce7" : "#f3f4f6"}
                            color={u.status === "Active" ? "#16a34a" : "#888"}
                          />
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ display: "flex", gap: 6 }}>
                            <ActionBtn icon={<EditIcon />}  color="#2563eb" bg="#eff6ff" onClick={() => {}} title="Edit" />
                            <ActionBtn icon={<TrashIcon />} color="#dc2626" bg="#fee2e2" onClick={() => setUsers(prev => prev.filter(x => x.id !== u.id))} title="Delete" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredUsers.length === 0 && (
                  <div style={{ textAlign: "center", padding: 40, color: "#aaa", fontSize: 14 }}>No users found.</div>
                )}
              </div>
            </div>
          )}

          {/* ══ SETTINGS TAB ═══════════════════════════════════ */}
          {activeTab === "settings" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { title: "Store Information", fields: [["Store Name","Brand Store"],["Store Email","admin@brand.com"],["Phone","+1 555 000 0000"],["Address","123 Main St, New York"]] },
                { title: "Account Settings",  fields: [["Admin Name","Admin User"],["Admin Email","admin@brand.com"],["Current Password",""],["New Password",""]] },
              ].map(section => (
                <div key={section.title} style={{
                  background: "#fff", borderRadius: 12, border: "1px solid #e8e8e8",
                  padding: "20px 24px",
                }}>
                  <h4 style={{ margin: "0 0 18px", fontSize: 15, fontWeight: 700 }}>{section.title}</h4>
                  {section.fields.map(([label, val]) => (
                    <FormInput key={label} label={label} placeholder={val}
                      type={label.toLowerCase().includes("password") ? "password" : "text"}
                      value="" onChange={() => {}} />
                  ))}
                  <button style={{
                    marginTop: 4, padding: "9px 20px", background: "#2563eb", color: "#fff",
                    border: "none", borderRadius: 7, fontSize: 13, fontWeight: 600,
                    cursor: "pointer", fontFamily: "inherit",
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
                    onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
                  >Save Changes</button>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>

      {/* ══ MODALS ══════════════════════════════════════════════ */}

      {/* Add / Edit Product */}
      {(modal === "add" || modal === "edit") && (
        <Modal title={modal === "add" ? "Add New Product" : "Edit Product"} onClose={() => setModal(null)}>
          <FormInput label="Product Name"   value={form.name}     onChange={setF("name")}     placeholder="e.g. Smart Watch Pro" />
          <FormInput label="Category"       value={form.category} onChange={setF("category")} placeholder="e.g. Electronics" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FormInput label="Price ($)" type="number" value={form.price} onChange={setF("price")} placeholder="0.00" />
            <FormInput label="Stock"     type="number" value={form.stock} onChange={setF("stock")} placeholder="0" />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: "#555", display: "block", marginBottom: 5 }}>Status</label>
            <select value={form.status} onChange={setF("status")} style={{
              width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb",
              borderRadius: 7, fontSize: 13, outline: "none", fontFamily: "inherit",
              background: "#fff", cursor: "pointer",
            }}>
              <option>Active</option>
              <option>Out of stock</option>
              <option>Inactive</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setModal(null)} style={{
              padding: "9px 20px", border: "1.5px solid #e5e7eb", borderRadius: 7,
              background: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
            }}>Cancel</button>
            <button onClick={handleSave} style={{
              padding: "9px 20px", background: "#2563eb", color: "#fff",
              border: "none", borderRadius: 7, fontSize: 13, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit",
            }}>
              {modal === "add" ? "Add Product" : "Save Changes"}
            </button>
          </div>
        </Modal>
      )}

      {/* Delete confirm */}
      {modal === "delete" && (
        <Modal title="Delete Product" onClose={() => setModal(null)}>
          <div style={{ textAlign: "center", padding: "8px 0 20px" }}>
            <div style={{
              width: 56, height: 56, background: "#fee2e2", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 14px", fontSize: 22,
            }}>🗑️</div>
            <p style={{ fontSize: 14, color: "#444", margin: "0 0 6px" }}>
              Are you sure you want to delete
            </p>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>
              "{editTarget?.name}"?
            </p>
            <p style={{ fontSize: 12, color: "#aaa", marginTop: 6 }}>This action cannot be undone.</p>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button onClick={() => setModal(null)} style={{
              padding: "9px 24px", border: "1.5px solid #e5e7eb", borderRadius: 7,
              background: "#fff", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
            }}>Cancel</button>
            <button onClick={handleDelete} style={{
              padding: "9px 24px", background: "#dc2626", color: "#fff",
              border: "none", borderRadius: 7, fontSize: 13, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit",
            }}>Delete</button>
          </div>
        </Modal>
      )}

    </div>
  );
}

// ─── Action Button ─────────────────────────────────────────────────────────────
function ActionBtn({ icon, color, bg, onClick, title }) {
  return (
    <button onClick={onClick} title={title} style={{
      width: 30, height: 30, background: bg, color, border: "none",
      borderRadius: 6, cursor: "pointer", display: "flex",
      alignItems: "center", justifyContent: "center",
      transition: "opacity .15s",
    }}
      onMouseEnter={e => e.currentTarget.style.opacity = ".75"}
      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
    >{icon}</button>
  );
}