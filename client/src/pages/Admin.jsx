import { useState } from "react";
import { Link } from "react-router-dom";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
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
  { id: 1, name: "T-Shirt Cotton Slim",        category: "Clothing",     price: 19.99, stock: 120, status: "Active",   img: "layout/alibaba/Image/cloth/Bitmap.png" },
  { id: 2, name: "Wireless Headphones X1",     category: "Electronics",  price: 89.00, stock: 45,  status: "Active",   img: "images/tech/8.png" },
  { id: 3, name: "Smart Watch Series Pro",     category: "Electronics",  price: 240.00,stock: 30,  status: "Active",   img: "images/tech/image 34.png" },
  { id: 4, name: "Leather Wallet Slim",        category: "Accessories",  price: 34.00, stock: 0,   status: "Out of stock", img: "layout/alibaba/Image/cloth/2 1.png" },
  { id: 5, name: "Laptop Ultra 15\"",          category: "Electronics",  price: 340.00,stock: 18,  status: "Active",   img: "images/tech/image 23.png" },
  { id: 6, name: "Running Shoes Nike",         category: "Footwear",     price: 99.50, stock: 55,  status: "Active",   img: "layout/alibaba/Image/cloth/image 24.png" },
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
  { label: "Total Revenue",  value: "$84,200",  change: "+12.5%", up: true,  color: "text-blue-600", bg: "bg-blue-50",  icon: "💰" },
  { label: "Total Orders",   value: "1,284",    change: "+8.2%",  up: true,  color: "text-purple-600", bg: "bg-purple-50",  icon: "📦" },
  { label: "Total Products", value: "342",      change: "+3.1%",  up: true,  color: "text-cyan-600", bg: "bg-cyan-50",  icon: "🛍️" },
  { label: "Total Customers",value: "5,620",    change: "-1.4%",  up: false, color: "text-green-600", bg: "bg-green-50",  icon: "👤" },
];

const orderStatusColor = {
  Delivered:  { bg: "bg-green-100", color: "text-green-600" },
  Processing: { bg: "bg-yellow-100", color: "text-yellow-600" },
  Shipped:    { bg: "bg-blue-100", color: "text-blue-600" },
  Pending:    { bg: "bg-orange-100", color: "text-orange-600" },
  Cancelled:  { bg: "bg-red-100", color: "text-red-600" },
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
    <div className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center p-5 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-[520px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"><CloseIcon /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ─── Form Input ────────────────────────────────────────────────────────────────
function FormInput({ label, value, onChange, type = "text", placeholder }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[13px] outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-sans"
      />
    </div>
  );
}

// ─── Status Badge ──────────────────────────────────────────────────────────────
function Badge({ label, bg, color }) {
  return (
    <span className={`${bg} ${color} rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap`}>
      {label}
    </span>
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
      setProducts(prev => [...prev, { id: Date.now(), img: "images/tech/image 85.png", ...form, price: parseFloat(form.price) || 0, stock: parseInt(form.stock) || 0 }]);
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
    <div className="flex min-h-screen bg-[#f5f7fb] text-gray-800 font-sans">

      {/* ── SIDEBAR ──────────────────────────────────────────── */}
      <aside className={`bg-[#1a1a2e] text-gray-400 flex flex-col transition-all duration-300 ease-in-out sticky top-0 h-screen overflow-hidden shrink-0 ${sidebarOpen ? "w-[240px]" : "w-[72px]"}`}>
        {/* Logo */}
        <div className="p-5 border-b border-white/5 flex items-center gap-3 min-h-[64px]">
          <div className="bg-blue-600 text-white rounded-lg w-8 h-8 flex items-center justify-center shrink-0 text-base shadow-lg shadow-blue-600/20">🛒</div>
          {sidebarOpen && <span className="text-base font-bold text-white whitespace-nowrap tracking-tight">Brand Admin</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 py-4 space-y-1">
          {navItems.map(item => {
            const active = activeTab === item.key;
            return (
              <button key={item.key} onClick={() => setActiveTab(item.key)} className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all group shrink-0
                ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "hover:bg-white/5 hover:text-gray-200"}`}>
                <span className={`shrink-0 ${active ? "" : "text-gray-500 group-hover:text-blue-400 transition-colors"}`}>{item.icon}</span>
                {sidebarOpen && <span className="text-[13px] font-semibold whitespace-nowrap">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-2 border-t border-white/5 space-y-1">
          <button onClick={() => setSidebarOpen(v => !v)} className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 text-gray-500 hover:text-gray-200 transition-all shrink-0">
            <Icon d={sidebarOpen ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} size={18} />
            {sidebarOpen && <span className="text-xs font-bold uppercase tracking-wider">Collapse</span>}
          </button>
          <Link to="/" className="block">
            <button className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all shrink-0">
              <LogoutIcon />
              {sidebarOpen && <span className="text-xs font-bold uppercase tracking-wider">Storefront</span>}
            </button>
          </Link>
        </div>
      </aside>

      {/* ── MAIN AREA ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* ── TOP NAV ─────────────────────────────────────────── */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-[100] shadow-sm">
          <div>
            <h2 className="text-lg font-black text-gray-900 leading-none mb-1">
              {navItems.find(n => n.key === activeTab)?.label}
            </h2>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-64 focus-within:bg-white focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-50 transition-all group">
              <SearchIcon className="text-gray-400 group-focus-within:text-blue-600" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search everything…" className="bg-transparent border-none outline-none text-[13px] w-full font-medium" />
            </div>

            {/* Notification */}
            <button className="relative p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors">
              <BellIcon />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100 cursor-pointer group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">A</div>
              <div className="hidden lg:block">
                <p className="text-[13px] font-bold text-gray-900 leading-tight">Admin User</p>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-tighter leading-tight">Super Admin</p>
              </div>
              <ChevronDown className="text-gray-400 group-hover:text-gray-900 transition-colors" />
            </div>
          </div>
        </header>

        {/* ── PAGE CONTENT ─────────────────────────────────────── */}
        <main className="flex-1 p-8 overflow-auto animate-in fade-in slide-in-from-bottom-2 duration-500">

          {/* ══ DASHBOARD TAB ═══════════════════════════════════ */}
          {activeTab === "dashboard" && (
            <>
              {/* Stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map(s => (
                  <div key={s.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1.5">{s.label}</p>
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight">{s.value}</h3>
                      </div>
                      <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>{s.icon}</div>
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-bold ${s.up ? "text-green-600" : "text-red-600"}`}>
                      <span className={`p-0.5 rounded-md ${s.up ? "bg-green-100" : "bg-red-100"}`}>
                        {s.up ? <TrendUp /> : <TrendDown />}
                      </span>
                      {s.change} <span className="text-gray-400 font-medium ml-1">vs last month</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts / Tables Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent orders */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center">
                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-wider">Recent Orders</h4>
                    <button onClick={() => setActiveTab("orders")} className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">View all</button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {orders.slice(0, 5).map(o => (
                      <div key={o.id} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50/50 transition-colors">
                        <div>
                          <p className="text-[13px] font-bold text-gray-900 mb-0.5">{o.id}</p>
                          <p className="text-[11px] text-gray-400 font-medium">{o.customer}</p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-[13px] font-black text-gray-900 leading-none">{o.total}</p>
                          <Badge label={o.status} {...(orderStatusColor[o.status] || { bg: "bg-gray-100", color: "text-gray-500" })} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top products */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center">
                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-wider">Top Products</h4>
                    <button onClick={() => setActiveTab("products")} className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">Manage</button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {products.slice(0, 5).map(p => (
                      <div key={p.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
                        <img src={p.img} alt="" className="w-10 h-10 rounded-lg object-cover border border-gray-100 bg-gray-50" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-bold text-gray-900 truncate mb-0.5">{p.name}</p>
                          <p className="text-[11px] text-gray-400 font-medium">{p.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[13px] font-black text-blue-600 leading-none mb-1">${p.price}</p>
                          <p className={`text-[10px] font-bold uppercase ${p.stock === 0 ? "text-red-500" : "text-gray-400"}`}>
                            {p.stock === 0 ? "Empty" : `${p.stock} units`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ══ PRODUCTS TAB ═══════════════════════════════════ */}
          {activeTab === "products" && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">
                  Inventory <span className="text-blue-600 ml-1">({filteredProducts.length})</span>
                </h4>
                <button onClick={openAdd} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl text-[13px] font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">
                  <PlusIcon /> New Product
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <tr>
                      {["Product", "Category", "Price", "Stock", "Status", "Actions"].map(h => (
                        <th key={h} className="px-6 py-4 text-left">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-[13px]">
                    {filteredProducts.map(p => (
                      <tr key={p.id} className="hover:bg-blue-50/20 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={p.img} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100 shrink-0 shadow-sm" />
                            <span className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors leading-tight">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-500">{p.category}</td>
                        <td className="px-6 py-4 font-black text-gray-900">${p.price}</td>
                        <td className={`px-6 py-4 font-bold ${p.stock === 0 ? "text-red-500" : "text-gray-500"}`}>{p.stock}</td>
                        <td className="px-6 py-4">
                          <Badge label={p.status} bg={p.status === "Active" ? "bg-green-100" : "bg-red-100"} color={p.status === "Active" ? "text-green-600" : "text-red-600"} />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <ActionBtn icon={<EditIcon />} color="text-blue-600" bg="bg-blue-50" onClick={() => openEdit(p)} />
                            <ActionBtn icon={<TrashIcon />} color="text-red-600" bg="bg-red-50" onClick={() => openDel(p)} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══ ORDERS TAB ═════════════════════════════════════ */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Global Orders</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <tr>
                      {["Order ID", "Customer", "Date", "Items", "Total", "Status", "Actions"].map(h => (
                        <th key={h} className="px-6 py-4 text-left">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-[13px]">
                    {filteredOrders.map(o => (
                      <tr key={o.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4 font-black text-blue-600">{o.id}</td>
                        <td className="px-6 py-4 font-bold text-gray-800">{o.customer}</td>
                        <td className="px-6 py-4 font-medium text-gray-400">{o.date}</td>
                        <td className="px-6 py-4 font-bold text-gray-500">{o.items}</td>
                        <td className="px-6 py-4 font-black text-gray-900">{o.total}</td>
                        <td className="px-6 py-4">
                          <Badge label={o.status} {...(orderStatusColor[o.status] || { bg: "bg-gray-100", color: "text-gray-500" })} />
                        </td>
                        <td className="px-6 py-4">
                          <ActionBtn icon={<EyeIcon />} color="text-purple-600" bg="bg-purple-50" onClick={() => {}} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══ USERS TAB ══════════════════════════════════════ */}
          {activeTab === "users" && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Accounts Database</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <tr>
                      {["User", "Email", "Role", "Joined", "Orders", "Status", "Actions"].map(h => (
                        <th key={h} className="px-6 py-4 text-left">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-[13px]">
                    {filteredUsers.map(u => (
                      <tr key={u.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black shadow-md shrink-0">{u.avatar}</div>
                            <span className="font-bold text-gray-800">{u.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-400">{u.email}</td>
                        <td className="px-6 py-4">
                          <Badge label={u.role} bg={u.role === "Admin" ? "bg-yellow-100" : "bg-gray-100"} color={u.role === "Admin" ? "text-yellow-600" : "text-gray-600"} />
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-400">{u.joined}</td>
                        <td className="px-6 py-4 font-black text-gray-900">{u.orders}</td>
                        <td className="px-6 py-4">
                          <Badge label={u.status} bg={u.status === "Active" ? "bg-green-100" : "bg-gray-100"} color={u.status === "Active" ? "text-green-600" : "text-gray-400"} />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex gap-2">
                            <ActionBtn icon={<EditIcon />} color="text-blue-600" bg="bg-blue-50" onClick={() => {}} />
                            <ActionBtn icon={<TrashIcon />} color="text-red-600" bg="bg-red-50" onClick={() => setUsers(prev => prev.filter(x => x.id !== u.id))} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══ SETTINGS TAB ═══════════════════════════════════ */}
          {activeTab === "settings" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Store Profile", fields: [["Store Name","Brand Store"],["Contact Email","admin@brand.com"],["Customer Phone","+1 555 000 0000"],["Warehouse Address","123 Main St, New York"]] },
                { title: "Authentication",  fields: [["Administrator Name","Admin User"],["Admin Email","admin@brand.com"],["Current Password","••••••••"],["Set New Password",""]] },
              ].map(section => (
                <div key={section.title} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col">
                  <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6 pb-2 border-b border-gray-50">{section.title}</h4>
                  <div className="flex-1 space-y-1">
                    {section.fields.map(([label, val]) => (
                      <FormInput key={label} label={label} placeholder={val} type={label.toLowerCase().includes("password") ? "password" : "text"} value="" onChange={() => {}} />
                    ))}
                  </div>
                  <button className="w-full mt-6 py-3 bg-blue-600 text-white rounded-xl text-[13px] font-black uppercase tracking-widest hover:bg-blue-700 active:scale-[0.98] shadow-lg shadow-blue-100 transition-all">Save Profile</button>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>

      {/* ══ MODALS ══════════════════════════════════════════════ */}

      {(modal === "add" || modal === "edit") && (
        <Modal title={modal === "add" ? "Register New Entry" : "Modify Details"} onClose={() => setModal(null)}>
          <FormInput label="Full Name / Title" value={form.name} onChange={setF("name")} placeholder="e.g. Smart Watch Pro" />
          <FormInput label="Department / Category" value={form.category} onChange={setF("category")} placeholder="e.g. Electronics" />
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Unit Price ($)" type="number" value={form.price} onChange={setF("price")} placeholder="0.00" />
            <FormInput label="Stock Count" type="number" value={form.stock} onChange={setF("stock")} placeholder="0" />
          </div>
          <div className="mb-8">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Live Status</label>
            <select value={form.status} onChange={setF("status")} className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[13px] font-semibold outline-none focus:bg-white focus:border-blue-600 transition-all cursor-pointer">
              <option>Active</option>
              <option>Out of stock</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setModal(null)} className="flex-1 py-3 bg-white border border-gray-200 rounded-xl text-[13px] font-bold text-gray-500 hover:bg-gray-50 transition-all">Discard</button>
            <button onClick={handleSave} className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-[13px] font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all uppercase tracking-wider">Confirm Save</button>
          </div>
        </Modal>
      )}

      {modal === "delete" && (
        <Modal title="System Warning" onClose={() => setModal(null)}>
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl shadow-inner shadow-red-100">⚠️</div>
            <p className="text-[14px] text-gray-500 font-medium mb-1">Confirm removal of:</p>
            <p className="text-lg font-black text-gray-900 tracking-tight mb-2">"{editTarget?.name}"</p>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest italic">Warning: This action is permanent.</p>
          </div>
          <div className="flex gap-3 mt-8">
            <button onClick={() => setModal(null)} className="flex-1 py-3 bg-white border border-gray-200 rounded-xl text-[13px] font-bold text-gray-500 hover:bg-gray-50 transition-all">Go Back</button>
            <button onClick={handleDelete} className="flex-1 py-3 bg-red-600 text-white rounded-xl text-[13px] font-bold shadow-lg shadow-red-200 hover:bg-red-700 transition-all uppercase tracking-wider">Perm-Delete</button>
          </div>
        </Modal>
      )}

    </div>
  );
}

// ─── Action Button ─────────────────────────────────────────────────────────────
function ActionBtn({ icon, color, bg, onClick, title }) {
  return (
    <button onClick={onClick} title={title} className={`w-8 h-8 ${bg} ${color} border-none rounded-lg cursor-pointer flex items-center justify-center transition-all hover:scale-110 active:scale-90 shadow-sm hover:shadow-md`}>
      {icon}
    </button>
  );
}
