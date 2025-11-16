import React from 'react';
import { Product } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface ProductCardProps {
  product: Product;
  onViewProduct: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewProduct }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-brand-gray rounded-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-brand-gold/20">
      <div className="relative overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-64 object-cover group-hover:scale-125 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300"></div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-serif font-semibold text-brand-light truncate">{product.name}</h3>
        <p className="text-xl font-sans font-bold text-brand-gold mt-2">${product.price.toFixed(2)}</p>
        <p className="text-brand-light/70 mt-3 h-12 overflow-hidden text-ellipsis">
          {product.scentProfile.join(', ')}
        </p>
        <button
          onClick={() => onViewProduct(product.id)}
          className="mt-4 w-full bg-transparent border-2 border-brand-gold text-brand-gold font-bold py-2 px-4 rounded-md hover:bg-brand-gold hover:text-brand-dark transition-all duration-300"
        >
          {t('viewDetails')}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;