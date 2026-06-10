import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider }  from "./context/CartContext";

import Home           from "./pages/home";
import Products       from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart           from "./pages/Cart";
import Login          from "./pages/Login";
import Register       from "./pages/Register";
import Admin          from "./pages/Admin";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/products"   element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart"       element={<Cart />} />
          <Route path="/login"      element={<Login />} />
          <Route path="/register"   element={<Register />} />
          <Route path="/admin"      element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
