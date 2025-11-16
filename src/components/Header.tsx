import React from 'react';
import { View, ProductCategory } from '../types';
import { ShoppingBagIcon, WandSparklesIcon } from './IconComponents';
import { useTranslation } from '../hooks/useTranslation';
import Logo from './Logo';

interface HeaderProps {
  onNavigate: (view: View, category?: ProductCategory) => void;
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, cartItemCount }) => {
  const { t, setLanguage, language } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as 'en' | 'fr' | 'es' | 'ar';
    setLanguage(lang);
  };

  const navData = [
    { key: 'home', labelKey: 'navHome', view: 'home' },
    {
      key: 'ouds',
      labelKey: 'navOuds',
      subMenu: [
        { key: 'pure_oud', labelKey: 'navPureOud', view: 'category', category: 'pure_oud' },
        { key: 'bakhoor', labelKey: 'navBakhoor', view: 'category', category: 'bakhoor' },
        { key: 'powder', labelKey: 'navPowderOud', view: 'category', category: 'powder' },
        { key: 'assortments', labelKey: 'navAssortments', view: 'category', category: 'gift_set' },
        { key: 'premium', labelKey: 'navPremium', view: 'category', category: 'premium' },
      ],
    },
    {
      key: 'perfumes',
      labelKey: 'navPerfumes',
      subMenu: [
        { key: 'oud_perfumes', labelKey: 'navOudPerfumes', view: 'category', category: 'perfume' },
        { key: 'perfume_oils', labelKey: 'navPerfumeOils', view: 'category', category: 'perfume_oil' },
        { key: 'mists', labelKey: 'navMists', view: 'category', category: 'mist' },
      ],
    },
    {
      key: 'incense',
      labelKey: 'navIncense',
      subMenu: [
        { key: 'burners', labelKey: 'navBurners', view: 'category', category: 'burner' },
        { key: 'mabkhara', labelKey: 'navMabkhara', view: 'category', category: 'accessory' },
        { key: 'home_accessories', labelKey: 'navHomeAccessories', view: 'category', category: 'home_accessory' },
      ],
    },
    {
      key: 'gifts',
      labelKey: 'navGifts',
      subMenu: [
        { key: 'gift_sets', labelKey: 'navPrestigeSets', view: 'category', category: 'gift_set' },
        { key: 'custom_gifts', labelKey: 'navCustomGifts', view: 'custom_gifts' },
        { key: 'limited_editions', labelKey: 'navLimitedEditions', view: 'limited_editions' },
      ],
    },
    {
      key: 'oud_world',
      labelKey: 'navOudWorld',
      subMenu: [
        { key: 'origins', labelKey: 'navOrigins', view: 'origins' },
        { key: 'usage_tips', labelKey: 'navUsageTips', view: 'usage_tips' },
        { key: 'blog', labelKey: 'navBlog', view: 'blog' },
      ],
    },
    {
      key: 'account',
      labelKey: 'navAccount',
      subMenu: [
        { key: 'login', labelKey: 'navLogin', view: 'login' },
        { key: 'order_history', labelKey: 'navOrderHistory', view: 'order_history' },
        { key: 'wishlist', labelKey: 'navWishlist', view: 'wishlist' },
      ],
    },
  ];

  return (
    <header className="bg-brand-dark/80 backdrop-blur-sm sticky top-0 z-50 border-b border-brand-gray">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <button
            onClick={() => onNavigate('home')}
            aria-label="Go to homepage"
            className="focus:outline-none focus:ring-2 focus:ring-brand-gold rounded"
          >
            <Logo className="h-12 md:h-14 w-auto text-brand-gold" />
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navData.map(item => (
              <div key={item.key} className="relative group">
                <button 
                  onClick={() => item.view && onNavigate(item.view as View)} 
                  className="text-brand-light hover:text-brand-gold transition-colors duration-300 font-medium px-3 py-2 text-sm rounded-md flex items-center space-x-1"
                >
                  <span>{t(item.labelKey as any)}</span>
                  {item.subMenu && (
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  )}
                </button>
                {item.subMenu && (
                  <div className="absolute top-full ltr:left-0 rtl:right-0 mt-1 p-2 w-60 bg-brand-gray rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    {item.subMenu.map(subItem => (
                      <button 
                        key={subItem.key}
                        onClick={() => onNavigate(subItem.view as View, subItem.category as ProductCategory)}
                        className="block w-full text-left px-3 py-2 text-sm text-brand-light hover:bg-brand-dark hover:text-brand-gold rounded-md"
                      >
                        {t(subItem.labelKey as any)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
             <button 
              onClick={() => onNavigate('recommender')} 
              className="hidden sm:flex items-center space-x-2 text-brand-light hover:text-brand-gold transition-colors duration-300 font-medium px-2"
            >
              <WandSparklesIcon className="w-4 h-4" />
              <span className="hidden xl:inline">{t('aiRecommender')}</span>
            </button>
            
            <div className="hidden sm:block">
                <select 
                    aria-label={t('language')}
                    value={language} 
                    onChange={handleLanguageChange} 
                    className="bg-brand-dark border border-brand-light/30 rounded-md py-1 px-2 text-sm text-brand-light focus:ring-brand-gold focus:border-brand-gold"
                >
                    <option value="en">{t('english')}</option>
                    <option value="fr">{t('french')}</option>
                    <option value="es">{t('spanish')}</option>
                    <option value="ar">{t('arabic')}</option>
                </select>
            </div>
            
            <button 
              onClick={() => onNavigate('cart')} 
              className="relative text-brand-light hover:text-brand-gold transition-colors duration-300 p-2"
              aria-label={t('viewCart')}
            >
              <ShoppingBagIcon className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-brand-gold text-brand-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            {/* Mobile menu button placeholder */}
            <div className="lg:hidden">
              {/* A proper hamburger menu would be implemented here */}
               <button aria-label="Open menu" className="text-brand-light p-2">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
               </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;