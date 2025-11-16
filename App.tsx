
import React, { useState, useMemo } from 'react';
import { Product, CartItem, View, ProductCategory } from './types';
import { PRODUCTS } from './constants';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import CartView from './components/CartView';
import ScentRecommender from './components/ScentRecommender';
import Footer from './components/Footer';
import { LanguageProvider } from './hooks/useTranslation';
import Placeholder from './components/Placeholder';
import { useTranslation } from './hooks/useTranslation';
import HomePage from './components/HomePage';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const { t } = useTranslation();

  const handleNavigate = (view: View, category?: ProductCategory) => {
    setCurrentView(view);
    setSelectedCategory(category || null);
    setSelectedProductId(null);
    window.scrollTo(0, 0);
  };

  const handleViewProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product');
    window.scrollTo(0, 0);
  };

  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    setCurrentView('cart');
    window.scrollTo(0, 0);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prevCart => {
      if (quantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const selectedProduct = useMemo(() => {
    return PRODUCTS.find(p => p.id === selectedProductId) || null;
  }, [selectedProductId]);
  
  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const renderContent = () => {
    switch (currentView) {
      case 'product':
        const fromCategory = selectedProduct ? selectedProduct.category : null;
        const backView = fromCategory ? 'category' : 'home';
        return selectedProduct && <ProductDetail product={selectedProduct} onAddToCart={addToCart} onBack={() => handleNavigate(backView, fromCategory || undefined)} />;
      case 'cart':
        return <CartView cart={cart} onUpdateQuantity={updateCartQuantity} onRemove={removeFromCart} onContinueShopping={() => handleNavigate('home')} />;
      case 'recommender':
        return <ScentRecommender onProductSelect={handleViewProduct} />;
      case 'category':
        const filteredProducts = selectedCategory ? PRODUCTS.filter(p => p.category === selectedCategory) : [];
        return <ProductList products={filteredProducts} onViewProduct={handleViewProduct} category={selectedCategory} />;
      case 'oud_world':
        return <Placeholder title={t('oudWorldTitle')} message={t('oudWorldMessage')} />;
      case 'account':
        return <Placeholder title={t('myAccountTitle')} message={t('myAccountMessage')} />;
      case 'custom_gifts':
        return <Placeholder title={t('customGiftsTitle')} message={t('customGiftsMessage')} />;
      case 'limited_editions':
        return <Placeholder title={t('limitedEditionsTitle')} message={t('limitedEditionsMessage')} />;
      case 'origins':
        return <Placeholder title={t('originsTitle')} message={t('originsMessage')} />;
      case 'usage_tips':
        return <Placeholder title={t('usageTipsTitle')} message={t('usageTipsMessage')} />;
      case 'blog':
        return <Placeholder title={t('blogTitle')} message={t('blogMessage')} />;
      case 'login':
        return <Placeholder title={t('loginTitle')} message={t('loginMessage')} />;
      case 'order_history':
        return <Placeholder title={t('orderHistoryTitle')} message={t('orderHistoryMessage')} />;
      case 'wishlist':
        return <Placeholder title={t('wishlistTitle')} message={t('wishlistMessage')} />;
      case 'about':
        return <Placeholder title={t('aboutTitle')} message={t('aboutMessage')} />;
      case 'faq':
        return <Placeholder title={t('faqTitle')} message={t('faqMessage')} />;
      case 'shipping':
        return <Placeholder title={t('shippingTitle')} message={t('shippingMessage')} />;
      case 'privacy':
        return <Placeholder title={t('privacyTitle')} message={t('privacyMessage')} />;
      case 'terms':
        return <Placeholder title={t('termsTitle')} message={t('termsMessage')} />;
      case 'contact':
        return <Placeholder title={t('contactTitle')} message={t('contactMessage')} />;
      case 'home':
      default:
        return <HomePage products={PRODUCTS} onNavigate={handleNavigate} onViewProduct={handleViewProduct} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-dark">
      <Header onNavigate={handleNavigate} cartItemCount={cartItemCount} />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {renderContent()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}


const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
