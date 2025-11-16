
import React from 'react';
import { Product, ProductCategory } from '../types';
import ProductCard from './ProductCard';
import { useTranslation } from '../hooks/useTranslation';

interface ProductListProps {
  products: Product[];
  onViewProduct: (productId: string) => void;
  category?: ProductCategory | null;
  title?: string;
  subtitle?: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, onViewProduct, category, title: customTitle, subtitle: customSubtitle }) => {
  const { t } = useTranslation();

  const title = customTitle || (category ? t(`category_${category}_title` as any) : t('ourCollection'));
  const subtitle = customSubtitle || (category ? t(`category_${category}_subtitle` as any) : t('collectionSubtitle'));

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-4xl font-serif font-bold text-brand-gold">{title}</h2>
        <p className="mt-2 text-lg text-brand-light/80 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onViewProduct={onViewProduct} />
          ))}
        </div>
      ) : (
        <div className="text-center text-brand-light/70 py-16">
          <p>No products found in this category yet.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
