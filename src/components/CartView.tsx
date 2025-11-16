import React from 'react';
import { CartItem } from '../types';
import { Trash2Icon } from './IconComponents';
import { useTranslation } from '../hooks/useTranslation';

interface CartViewProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onContinueShopping: () => void;
}

const CartView: React.FC<CartViewProps> = ({ cart, onUpdateQuantity, onRemove, onContinueShopping }) => {
  const { t } = useTranslation();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-serif font-bold text-brand-gold text-center mb-8">{t('shoppingCart')}</h2>
      
      {cart.length === 0 ? (
        <div className="text-center bg-brand-gray p-8 rounded-lg">
          <p className="text-xl text-brand-light/80 mb-6">{t('cartEmpty')}</p>
          <button 
            onClick={onContinueShopping}
            className="bg-brand-gold text-brand-dark font-bold py-2 px-6 rounded-md hover:opacity-90 transition-opacity"
          >
            {t('continueShopping')}
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center bg-brand-gray p-4 rounded-lg gap-4">
                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md"/>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-brand-light">{item.name}</h3>
                  <p className="text-brand-gold font-bold">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                   <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value, 10) || 1)}
                        className="w-16 bg-brand-dark border border-brand-light/30 rounded-md text-center py-1"
                        aria-label={`Quantity for ${item.name}`}
                    />
                  <button onClick={() => onRemove(item.id)} className="text-brand-light/50 hover:text-red-500 p-2 transition-colors" aria-label={`Remove ${item.name}`}>
                    <Trash2Icon className="w-5 h-5"/>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-brand-gray p-6 rounded-lg self-start">
            <h3 className="text-2xl font-serif font-semibold border-b border-brand-light/20 pb-3 mb-4">{t('orderSummary')}</h3>
            <div className="flex justify-between mb-2">
              <span>{t('subtotal')}</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>{t('shipping')}</span>
              <span>{t('free')}</span>
            </div>
            <div className="flex justify-between font-bold text-xl border-t border-brand-light/20 pt-3">
              <span>{t('total')}</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-brand-gold text-brand-dark font-bold py-3 mt-6 rounded-md hover:opacity-90 transition-opacity">
              {t('proceedToCheckout')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;