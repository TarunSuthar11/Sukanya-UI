
import { Routes, Route, BrowserRouter } from "react-router-dom";
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
import NotFound from "./pages/General/NotFound";
import CreateReview from "./pages/Shop/CreateReview";
import WishlistPage from "./pages/Shop/WishlistPage";
import { WishlistProvider } from "./context/WishlistContext";
import { NotificationProvider } from "./context/NotificationContext";
import Toast from "./components/Shared/Toast";

function App() {


  return (
    <BrowserRouter>
      <WishlistProvider>
        <NotificationProvider>
          <div className="flex flex-col min-h-screen">
            <Toast />
            <Navbar />
            <main className='grow'>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/category" element={<CategoriesPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/sign-in" element={<Signin />} />
                <Route path="/create-review" element={<CreateReview />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                <Route path="/products/:productId" element={<ProductDetailsPage />} />
                <Route path="/favorites" element={<WishlistPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </NotificationProvider>
      </WishlistProvider>
    </BrowserRouter>
  );
}

export default App;