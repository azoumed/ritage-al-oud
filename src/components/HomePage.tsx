import React from 'react';
import { Product, View, ProductCategory } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import HomeMenu from './HomeMenu';
import ProductList from './ProductList';

interface HomePageProps {
  products: Product[];
  onNavigate: (view: View, category?: ProductCategory) => void;
  onViewProduct: (productId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ products, onNavigate, onViewProduct }) => {
  const { t } = useTranslation();
  // Show a selection of products for "New Arrivals"
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="text-center py-16 md:py-24 bg-brand-gray rounded-lg mb-12">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-gold leading-tight">{t('welcomeTitle')}</h1>
        <p className="mt-4 text-xl text-brand-light/80 max-w-3xl mx-auto">{t('welcomeSubtitle')}</p>
        <button
            onClick={() => onNavigate('recommender')}
            className="mt-8 bg-brand-gold text-brand-dark font-bold py-3 px-8 rounded-md hover:opacity-90 transition-opacity duration-300"
        >
            {t('discoverYourScent')}
        </button>
      </div>

      {/* Categories Menu */}
      <HomeMenu onNavigate={onNavigate} />

      {/* Featured Products Section (Nouveautés) */}
      <div className="mt-16">
        <ProductList 
          products={featuredProducts} 
          onViewProduct={onViewProduct}
          title={t('newArrivals')}
          subtitle={t('newArrivalsSubtitle')}
        />
      </div>
    </div>
  );
};

export default HomePage;