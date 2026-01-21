import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import LandingPage from "./pages/Home/LandingPage";
import ShopPage from "./pages/Shop/ShopPage";
import CategoriesPage from "./pages/Shop/CategoriesPage";
import CategoryPage from "./pages/Shop/CategoryPage";
import ProductDetailsPage from "./pages/Shop/ProductDetailsPage";
import About from "./pages/General/About";
import Cart from "./pages/Shop/Cart";
import Checkout from "./pages/Shop/Checkout";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import NotFound from "./pages/General/NotFound";
import CreateReview from "./pages/Shop/CreateReview";
import WishlistPage from "./pages/Shop/WishlistPage";
import OrdersPage from "./pages/Shop/OrdersPage";
import OrderDetail from "./pages/Shop/OrderDetail";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import Toast from "./components/Shared/Toast";
import ScrollToTop from "./components/Shared/ScrollToTop";
import ProfilePage from "./pages/User/ProfilePage";
import CartDrawer from "./components/Shop/CartDrawer";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/category" element={<CategoriesPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-review" element={<CreateReview />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/favorites" element={<WishlistPage />} />
        <Route path="/my-orders" element={<OrdersPage />} />
        <Route path="/orders/:orderId" element={<OrderDetail />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <WishlistProvider>
          <NotificationProvider>
            <div className="flex flex-col min-h-screen">
              <Toast />
              <CartDrawer />
              <Navbar />
              <main className='grow'>
                <AnimatedRoutes />
              </main>
              <Footer />
            </div>
          </NotificationProvider>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;