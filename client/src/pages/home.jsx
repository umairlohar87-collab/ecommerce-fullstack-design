import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const categories = [
  "Automobiles", "Clothes and wear", "Home interiors",
  "Computer and tech", "Tools, equipments", "Sports and outdoor",
  "Animal and pets", "Machinery tools", "More category",
];

const dealProducts = [
  { id: 1, name: "Smart watches", discount: 25, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&q=80" },
  { id: 2, name: "Laptops",       discount: 15, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=120&q=80" },
  { id: 3, name: "GoPro cameras", discount: 40, img: "https://images.unsplash.com/photo-1596246100254-c42e64a7af3d?w=120&q=80" },
  { id: 4, name: "Headphones",    discount: 25, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&q=80" },
  { id: 5, name: "Canon cameras", discount: 25, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=120&q=80" },
];

const homeItems = [
  { id: 1, name: "Soft chairs",    from: "USD 19",  img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=80&q=80" },
  { id: 2, name: "Sofa & chair",   from: "USD 19",  img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&q=80" },
  { id: 3, name: "Kitchen dishes", from: "USD 19",  img: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=80&q=80" },
  { id: 4, name: "Smart watches",  from: "USD 19",  img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&q=80" },
  { id: 5, name: "Kitchen mixer",  from: "USD 100", img: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=80&q=80" },
  { id: 6, name: "Blenders",       from: "USD 39",  img: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=80&q=80" },
  { id: 7, name: "Home appliance", from: "USD 19",  img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=80&q=80" },
  { id: 8, name: "Coffee maker",   from: "USD 10",  img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=80&q=80" },
];

const electronicsItems = [
  { id: 1, name: "Smart watches",  from: "USD 19",  img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&q=80" },
  { id: 2, name: "Cameras",        from: "USD 89",  img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=80&q=80" },
  { id: 3, name: "Headphones",     from: "USD 10",  img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&q=80" },
  { id: 4, name: "Smart watches",  from: "USD 90",  img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=80&q=80" },
  { id: 5, name: "Laptops & PC",   from: "USD 340", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&q=80" },
  { id: 6, name: "Smartphones",    from: "USD 18",  img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=80&q=80" },
  { id: 7, name: "Electric kettle",from: "USD 240", img: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=80&q=80" },
];

// ── Recommended items (matches screenshot: clothes, bags, accessories) ────────
const recommendedItems = [
  { id: 1,  price: "$10.30", name: "T-shirts with multiple colors, for men",    img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&q=80" },
  { id: 2,  price: "$10.30", name: "Jeans shorts, blue color",                  img: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=200&q=80" },
  { id: 3,  price: "$12.50", name: "Brown winter coat medium size",              img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=200&q=80" },
  { id: 4,  price: "$34.00", name: "Jeans bag for travel for men",               img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=80" },
  { id: 5,  price: "$99.00", name: "Leather wallet",                             img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&q=80" },
  { id: 6,  price: "$9.99",  name: "Canon camera black, 100x zoom",             img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&q=80" },
  { id: 7,  price: "$8.99",  name: "Headset for gaming with mic",               img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80" },
  { id: 8,  price: "$10.30", name: "Smartwatch silver color modern",            img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80" },
  { id: 9,  price: "$10.30", name: "Blue wallet for men leather metarfial",     img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&q=80" },
  { id: 10, price: "$80.95", name: "Jeans bag for travel for men",              img: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=200&q=80" },
];

// ── Extra services ─────────────────────────────────────────────────────────────
const extraServices = [
  {
    id: 1, label: "Source from Industry Hubs",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&q=80",
    icon: "🔍",
  },
  {
    id: 2, label: "Customize Your Products",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",
    icon: "🖊️",
  },
  {
    id: 3, label: "Fast, reliable shipping by ocean or air",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&q=80",
    icon: "✈️",
  },
  {
    id: 4, label: "Product monitoring and inspection",
    img: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=300&q=80",
    icon: "🌐",
  },
];

// ── Suppliers by region ────────────────────────────────────────────────────────
const suppliers = [
  { country: "Arabic Emirates", flag: "🇦🇪", url: "shopname.ae" },
  { country: "Australia",       flag: "🇦🇺", url: "shopname.ae" },
  { country: "United States",   flag: "🇺🇸", url: "shopname.ae" },
  { country: "Russia",          flag: "🇷🇺", url: "shopname.ru" },
  { country: "Italy",           flag: "🇮🇹", url: "shopname.it" },
  { country: "Denmark",         flag: "🇩🇰", url: "shopname.dk" },
  { country: "France",          flag: "🇫🇷", url: "shopname.fr" },
  { country: "Arabic Emirates", flag: "🇦🇪", url: "shopname.ae" },
  { country: "China",           flag: "🇨🇳", url: "shopname.au" },
  { country: "Great Britain",   flag: "🇬🇧", url: "shopname.co.uk" },
];

// ─── Countdown Timer Hook ─────────────────────────────────────────────────────
function useCountdown(targetDate) {
  const calc = () => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    return {
      days:  Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      mins:  Math.floor((diff % 3600000) / 60000),
      secs:  Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function TimerBlock({ value, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        background: "#fff", border: "1px solid #e0e0e0", borderRadius: 4,
        fontSize: 18, fontWeight: 700, color: "#222",
        padding: "2px 8px", display: "inline-block", minWidth: 38,
      }}>
        {String(value).padStart(2, "0")}
      </div>
      <div style={{ fontSize: 10, color: "#888", marginTop: 2 }}>{label}</div>
    </div>
  );
}

function ProductMiniCard({ name, from, img }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "8px 10px", borderRadius: 8, cursor: "pointer",
        background: hovered ? "#f5f8ff" : "transparent", transition: "background .15s",
      }}
    >
      <img src={img} alt={name} style={{
        width: 54, height: 54, objectFit: "cover",
        borderRadius: 6, border: "1px solid #eee", flexShrink: 0,
      }} />
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: "#222" }}>{name}</div>
        <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
          From<br />
          <span style={{ color: "#444", fontWeight: 600 }}>{from}</span>
        </div>
      </div>
    </div>
  );
}

function SectionPanel({ title, bannerImg, items }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "220px 1fr",
      border: "1px solid #e8e8e8", borderRadius: 10,
      overflow: "hidden", marginBottom: 24, background: "#fff",
    }}>
      <div style={{
        background: "linear-gradient(145deg,#dce9ff 0%,#f0f5ff 100%)",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: 20, position: "relative", minHeight: 200,
      }}>
        <img src={bannerImg} alt={title} style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", opacity: 0.2,
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e", marginBottom: 10 }}>{title}</div>
          <button style={{
            padding: "7px 18px", borderRadius: 6, border: "none", cursor: "pointer",
            background: "#fff", fontSize: 12, fontWeight: 600, color: "#222",
            boxShadow: "0 1px 4px rgba(0,0,0,.12)",
          }}>Source now</button>
        </div>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4,1fr)",
        padding: "8px 4px", gap: 4, alignContent: "start",
      }}>
        {items.map(item => <ProductMiniCard key={item.id} {...item} />)}
      </div>
    </div>
  );
}

// ─── Main Home Page ───────────────────────────────────────────────────────────
export default function Home() {
  const { days, hours, mins, secs } = useCountdown("2025-12-31T23:59:59");
  const [email, setEmail] = useState("");

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "#f5f5f5", minHeight: "100vh", color: "#222",
    }}>

      {/* ── NAVBAR ─────────────────────────────────────────── */}
      <Navbar />

      {/* ── PAGE CONTENT ───────────────────────────────────── */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 20px" }}>

        {/* ── HERO ─────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 220px", gap: 16, marginBottom: 24 }}>

          {/* Category sidebar */}
          <div style={{ background: "#fff", borderRadius: 8, padding: "8px 0", border: "1px solid #e8e8e8", alignSelf: "start" }}>
            {categories.map((cat) => (
              <div key={cat} style={{
                padding: "9px 16px", fontSize: 13, cursor: "pointer", color: "#333", transition: "background .12s",
                borderBottom: cat === "More category" ? "none" : "1px solid #f5f5f5",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#f0f5ff"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >{cat}</div>
            ))}
          </div>

          {/* Hero banner */}
          <div style={{
            background: "linear-gradient(135deg,#b8d4f0 0%,#d4e8f7 50%,#e8f4f8 100%)",
            borderRadius: 10, padding: "32px 40px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            overflow: "hidden", position: "relative", minHeight: 240,
          }}>
            <div>
              <p style={{ fontSize: 13, color: "#555", margin: "0 0 6px" }}>Latest trending</p>
              <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1a1a2e", lineHeight: 1.25, margin: "0 0 20px" }}>
                Electronic<br />items
              </h1>
              <button style={{
                padding: "10px 22px", background: "#fff", border: "none", borderRadius: 6,
                fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#222",
                boxShadow: "0 2px 8px rgba(0,0,0,.1)",
              }}>Learn more</button>
            </div>
            <img src="images/tech/6.png" alt="Hero"
              style={{ height: 200, objectFit: "contain", filter: "drop-shadow(0 8px 24px rgba(0,0,0,.18))" }} />
          </div>

          {/* Right promo cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #e8e8e8", padding: "14px 16px" }}>
              <p style={{ fontSize: 13, color: "#666", margin: "0 0 10px" }}>
                Hi, <strong>user</strong><br /><span style={{ fontSize: 12 }}>let's get started</span>
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ flex: 1, padding: "7px 0", background: "#2563eb", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Join now</button>
                <button style={{ flex: 1, padding: "7px 0", background: "#fff", color: "#2563eb", border: "1.5px solid #2563eb", borderRadius: 5, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Log in</button>
              </div>
            </div>
            <div style={{ background: "linear-gradient(135deg,#f59e0b,#fbbf24)", borderRadius: 8, padding: "14px 16px" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", margin: 0 }}>Get US $10 off<br />with a new supplier</p>
            </div>
            <div style={{ background: "linear-gradient(135deg,#a78bfa,#7c3aed)", borderRadius: 8, padding: "14px 16px" }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#fff", margin: 0 }}>Send quotes with<br />supplier preferences</p>
            </div>
          </div>
        </div>

        {/* ── DEALS & OFFERS ───────────────────────────────── */}
        <div style={{
          background: "#fff", borderRadius: 10, border: "1px solid #e8e8e8",
          padding: "16px 20px", marginBottom: 24, display: "flex", alignItems: "center",
        }}>
          <div style={{ minWidth: 190, paddingRight: 20, borderRight: "1px solid #e8e8e8" }}>
            <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700 }}>Deals and offers</h3>
            <p style={{ margin: "0 0 12px", fontSize: 12, color: "#888" }}>Hygiene equipments</p>
            <div style={{ display: "flex", gap: 8 }}>
              <TimerBlock value={days}  label="Days" />
              <TimerBlock value={hours} label="Hour" />
              <TimerBlock value={mins}  label="Min" />
              <TimerBlock value={secs}  label="Sec" />
            </div>
          </div>
          <div style={{ flex: 1, display: "flex" }}>
            {dealProducts.map((p, i) => (
              <div key={p.id} style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                padding: "8px 10px", cursor: "pointer",
                borderRight: i < dealProducts.length - 1 ? "1px solid #f0f0f0" : "none",
              }}>
                <img src={p.img} alt={p.name} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, marginBottom: 8 }} />
                <div style={{ fontSize: 12, fontWeight: 500, color: "#333", textAlign: "center", marginBottom: 6 }}>{p.name}</div>
                <div style={{ background: "#fee2e2", color: "#dc2626", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>
                  -{p.discount}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── HOME & OUTDOOR ───────────────────────────────── */}
        <SectionPanel
          title="Home and outdoor"
          bannerImg="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80"
          items={homeItems}
        />

        {/* ── CONSUMER ELECTRONICS ─────────────────────────── */}
        <SectionPanel
          title="Consumer electronics and gadgets"
          bannerImg="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80"
          items={electronicsItems}
        />

        {/* ── SUPPLIER INQUIRY BANNER ──────────────────────── */}
        <div style={{
          background: "linear-gradient(135deg,#1e3a8a 0%,#2563eb 60%,#3b82f6 100%)",
          borderRadius: 10, padding: "40px 48px", marginBottom: 24,
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center",
        }}>
          <div>
            <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: "0 0 10px" }}>
              An easy way to send<br />requests to all suppliers
            </h2>
            <p style={{ color: "#bfdbfe", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt.
            </p>
          </div>
          <div style={{ background: "#fff", borderRadius: 10, padding: 24 }}>
            <p style={{ fontSize: 13, color: "#888", margin: "0 0 12px" }}>Send quote to suppliers</p>
            <input placeholder="What item you need?" style={{
              width: "100%", padding: "10px 12px", border: "1px solid #e0e0e0",
              borderRadius: 6, fontSize: 13, marginBottom: 10,
              boxSizing: "border-box", outline: "none", fontFamily: "inherit",
            }} />
            <textarea placeholder="Type more details" rows={3} style={{
              width: "100%", padding: "10px 12px", border: "1px solid #e0e0e0",
              borderRadius: 6, fontSize: 13, marginBottom: 10,
              boxSizing: "border-box", resize: "none", outline: "none", fontFamily: "inherit",
            }} />
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              <input placeholder="Quantity" style={{
                flex: 1, padding: "9px 12px", border: "1px solid #e0e0e0",
                borderRadius: 6, fontSize: 13, outline: "none", fontFamily: "inherit",
              }} />
              <select style={{
                padding: "9px 12px", border: "1px solid #e0e0e0", borderRadius: 6,
                fontSize: 13, background: "#fff", outline: "none", cursor: "pointer", fontFamily: "inherit",
              }}>
                <option>Pcs</option><option>Kg</option><option>Ltr</option>
              </select>
            </div>
            <button style={{
              width: "100%", padding: "11px 0", background: "#2563eb", color: "#fff",
              border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
              onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
            >Send Inquiry</button>
          </div>
        </div>

        {/* ── RECOMMENDED ITEMS ────────────────────────────── */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Recommended items</h3>
            <a href="#" style={{ fontSize: 13, color: "#2563eb", textDecoration: "none" }}>View all →</a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12 }}>
            {recommendedItems.map((item) => (
              <div key={item.id} style={{
                background: "#fff", borderRadius: 8,
                border: "1px solid #e8e8e8", overflow: "hidden",
                cursor: "pointer", transition: "box-shadow .18s",
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.10)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <img src={item.img} alt={item.name} style={{ width: "100%", height: 130, objectFit: "cover" }} />
                <div style={{ padding: "10px 10px 12px" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#222", marginBottom: 4 }}>{item.price}</div>
                  <div style={{ fontSize: 12, color: "#666", lineHeight: 1.4 }}>{item.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── OUR EXTRA SERVICES ───────────────────────────── */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 16px" }}>Our extra services</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {extraServices.map((svc) => (
              <div key={svc.id} style={{
                borderRadius: 10, overflow: "hidden", position: "relative",
                cursor: "pointer", border: "1px solid #e8e8e8",
                transition: "box-shadow .18s",
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.12)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <img src={svc.img} alt={svc.label} style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
                {/* Icon circle */}
                <div style={{
                  position: "absolute", bottom: 44, right: 10,
                  width: 32, height: 32, background: "rgba(255,255,255,.9)",
                  borderRadius: "50%", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 16,
                  boxShadow: "0 2px 8px rgba(0,0,0,.15)",
                }}>
                  {svc.icon}
                </div>
                {/* Label */}
                <div style={{
                  padding: "10px 12px", background: "#fff",
                  fontSize: 13, fontWeight: 500, color: "#222", lineHeight: 1.4,
                }}>
                  {svc.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SUPPLIERS BY REGION ──────────────────────────── */}
        <div style={{
          background: "#fff", border: "1px solid #e8e8e8",
          borderRadius: 10, padding: "20px 24px", marginBottom: 24,
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 16px" }}>Suppliers by region</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "10px 0" }}>
            {suppliers.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "4px 0" }}>
                <span style={{ fontSize: 22 }}>{s.flag}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#222" }}>{s.country}</div>
                  <div style={{ fontSize: 11, color: "#2563eb" }}>{s.url}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* ── SUBSCRIBE BANNER ────────────────────────────────── */}
      <div style={{
        background: "#fff", borderTop: "1px solid #e8e8e8",
        borderBottom: "1px solid #e8e8e8", padding: "28px 20px", textAlign: "center",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 6px" }}>Subscribe on our newsletter</h3>
          <p style={{ fontSize: 13, color: "#888", margin: "0 0 16px" }}>
            Get daily news on upcoming offers from many suppliers all over the world
          </p>
          <div style={{ display: "flex", gap: 0, border: "1.5px solid #2563eb", borderRadius: 7, overflow: "hidden", maxWidth: 440, margin: "0 auto" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                flex: 1, padding: "10px 16px", border: "none", outline: "none",
                fontSize: 13, fontFamily: "inherit",
              }}
            />
            <button style={{
              background: "#2563eb", color: "#fff", border: "none",
              padding: "0 22px", fontSize: 13, fontWeight: 600, cursor: "pointer",
              transition: "background .15s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
              onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer style={{ background: "#1a1a2e", color: "#9ca3af", padding: "36px 20px 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 32 }}>

          {/* Brand col */}
          <div>
            <div style={{
              background: "#2563eb", color: "#fff", borderRadius: 6,
              padding: "5px 12px", fontSize: 15, fontWeight: 700,
              display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12,
            }}>🛒 Brand</div>
            <div style={{ fontSize: 12, lineHeight: 1.7, marginBottom: 12 }}>
              Best information about the company goes here but now lorem ipsum is
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["Facebook", "Twitter", "LinkedIn", "Instagram", "YouTube"].map((s, i) => (
                <div key={s} style={{
                  width: 28, height: 28, borderRadius: "50%", background: "#374151",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, cursor: "pointer", color: "#9ca3af",
                  transition: "background .15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#2563eb"}
                  onMouseLeave={e => e.currentTarget.style.background = "#374151"}
                  title={s}
                >
                  {["f", "t", "in", "ig", "yt"][i]}
                </div>
              ))}
            </div>
          </div>

          {[
            { title: "About",   links: ["About us", "Find store", "Categories", "Blogs"] },
            { title: "Help",    links: ["Customer support", "Delivery details", "Terms & Conditions", "Privacy Policy"] },
            { title: "FAQ",     links: ["Account", "Manage deliveries", "Orders", "Payments"] },
            { title: "Contact", links: ["(+91) 999 999 9999", "support@brand.com"] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ color: "#f9fafb", fontSize: 14, fontWeight: 600, margin: "0 0 12px" }}>{col.title}</h4>
              {col.links.map(link => (
                <div key={link} style={{ fontSize: 12, marginBottom: 8, cursor: "pointer", transition: "color .12s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
                  onMouseLeave={e => e.currentTarget.style.color = "#9ca3af"}
                >{link}</div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          maxWidth: 1200, margin: "24px auto 0",
          borderTop: "1px solid #374151", paddingTop: 16,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 12,
        }}>
          <span>© 2024 Brand. All rights reserved.</span>
          <div style={{ display: "flex", gap: 16 }}>
            {["Privacy Policy", "Terms & Conditions"].map(l => (
              <span key={l} style={{ cursor: "pointer", transition: "color .12s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"}
                onMouseLeave={e => e.currentTarget.style.color = "#9ca3af"}
              >{l}</span>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
