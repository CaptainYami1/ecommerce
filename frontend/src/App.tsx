import "./css/App.css";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./components/pages/shop/shop";
import { useContext } from "react";
import { ShopContext } from "../src/context/shopContext";
import Footer from "./components/footer/footer";
import Signup from "./components/pages/loginAndSignup/signup";
import Login from "./components/pages/loginAndSignup/login";
import Product from "./components/pages/productPage/product";
import Cart from "./components/pages/cart/cart";
import Men from "./components/pages/women-men-kids/men";
import Women from "./components/pages/women-men-kids/women";
import Kids from "./components/pages/women-men-kids/kids";
import Checkout from "./components/pages/checkout/checkout";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import Confirmation from "./components/pages/confirmation page/confirmation";

function App() {
  const { darkMode } = useContext(ShopContext)!;
  const user = localStorage.getItem("user");
 const isConfirmationPage = location.pathname === "/confirmation";

  return (
    <BrowserRouter>
      <div className={darkMode ? "dark" : ""}>
        <div className="dark:bg-gray-900 ">
           {!isConfirmationPage && <Navbar />}
          <div className="mt-20 pt-8.5  ">
            <Routes>
              
              <Route path="/" element={<Shop />} />

              <Route path="/men" element={<Men />} />

              <Route path="/women" element={<Women />} />

              <Route path="/kids" element={<Kids />} />

              <Route
                path="/:category/product/:productId"
                element={<Product />}
              />

              <Route path="/cart" element={<Cart />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute user={user}>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
               <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
          </div>
           {!isConfirmationPage && <Footer />}
        </div>
       
      </div>
    </BrowserRouter>
  );
}

export default App;
