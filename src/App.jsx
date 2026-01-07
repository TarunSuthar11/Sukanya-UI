import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import ShopPage from "./pages/ShopPage";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Signin from "./pages/Signin";
import NotFound from "./pages/NotFound";

function App() {


  return (
    <BrowserRouter>
      <div className="flex flex-col  ">
        <Navbar />
        <main className='flex'>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/category" element={<CategoriesPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/products/:productId" element={<ProductDetailsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;