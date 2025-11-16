import React, { useState } from 'react';
import { Product } from '../types';
import { ChevronLeftIcon } from './IconComponents';
import { useTranslation } from '../hooks/useTranslation';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onBack }) => {
  const [quantity, setQuantity] = useState(1);
  const { t } = useTranslation();

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart(product, quantity);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <button onClick={onBack} className="flex items-center space-x-2 text-brand-gold hover:underline mb-6">
        <ChevronLeftIcon className="w-5 h-5" />
        <span>{t('backToCollection')}</span>
      </button>
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 bg-brand-gray p-6 sm:p-8 rounded-lg">
        <div className="rounded-lg overflow-hidden">
          <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover aspect-square" />
        </div>
        <div>
          <h2 className="text-4xl font-serif font-bold text-brand-gold">{product.name}</h2>
          <p className="text-3xl font-sans font-bold text-brand-light mt-2">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-brand-light/80 leading-relaxed">{product.description}</p>
          
          <div className="mt-6">
            <h4 className="font-semibold text-brand-light">{t('scentProfile')}</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.scentProfile.map(note => (
                <span key={note} className="bg-brand-dark text-brand-gold text-sm font-medium px-3 py-1 rounded-full">
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center space-x-4">
            <div className="flex items-center border border-brand-light/50 rounded-md">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                className="px-3 py-2 text-xl font-bold text-brand-light/80 hover:bg-brand-light/10 rounded-l-md transition-colors"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-4 py-2 text-lg w-12 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)} 
                className="px-3 py-2 text-xl font-bold text-brand-light/80 hover:bg-brand-light/10 rounded-r-md transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-grow bg-brand-gold text-brand-dark font-bold py-3 px-6 rounded-md hover:opacity-90 transition-opacity duration-300"
            >
              {t('addToCart')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;