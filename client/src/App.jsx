import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topbar from './components/Topbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProfilePage from './pages/ProfilePage';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // Cart Handlers
  const handleAddToCart = (product, quantity, size) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }
      return [...prevCart, { product, quantity, size }];
    });
    setCartOpen(true); // Auto-open cart on add
  };

  const handleUpdateQuantity = (productId, size, direction) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const newQty = item.quantity + direction;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleRemoveFromCart = (productId, size) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((p) => p.id === product.id);
      if (exists) {
        return prevWishlist.filter((p) => p.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((p) => p.id !== productId));
  };

  const handleMoveWishlistItemToCart = (product) => {
    const defaultSize = product.categoryId === 1 ? 'unstitched' : 'M';
    handleAddToCart(product, 1, defaultSize);
    handleRemoveFromWishlist(product.id);
  };

  return (
    <Router>
      <Topbar />
      <Header 
        cart={cart} 
        wishlist={wishlist} 
        onOpenCart={() => setCartOpen(true)} 
        onOpenWishlist={() => setWishlistOpen(true)} 
      />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route 
          path="/product/:productId" 
          element={
            <ProductDetailPage 
              wishlist={wishlist} 
              onAddToCart={handleAddToCart} 
              onToggleWishlist={handleToggleWishlist} 
            />
          } 
        />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      
      <Footer />

      {/* Cart & Wishlist Overlays */}
      <CartDrawer 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
      />
      
      <WishlistDrawer 
        isOpen={wishlistOpen} 
        onClose={() => setWishlistOpen(false)} 
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={handleMoveWishlistItemToCart}
      />
    </Router>
  );
}

export default App;
