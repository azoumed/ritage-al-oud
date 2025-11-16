
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { View, ProductCategory } from '../types';

interface HomeMenuProps {
  onNavigate: (view: View, category?: ProductCategory) => void;
}

const menuItems = [
  {
    key: 'ouds',
    titleKey: 'navOuds',
    descriptionKey: 'homeMenuOudsDesc',
    imageUrl: 'https://picsum.photos/seed/catOud/800/600',
    view: 'category',
    category: 'pure_oud', 
  },
  {
    key: 'perfumes',
    titleKey: 'navPerfumes',
    descriptionKey: 'homeMenuPerfumesDesc',
    imageUrl: 'https://picsum.photos/seed/catPerfume/800/600',
    view: 'category',
    category: 'perfume',
  },
  {
    key: 'incense',
    titleKey: 'navIncense',
    descriptionKey: 'homeMenuIncenseDesc',
    imageUrl: 'https://picsum.photos/seed/catIncense/800/600',
    view: 'category',
    category: 'accessory',
  },
  {
    key: 'gifts',
    titleKey: 'navGifts',
    descriptionKey: 'homeMenuGiftsDesc',
    imageUrl: 'https://picsum.photos/seed/catGift/800/600',
    view: 'category',
    category: 'gift_set',
  },
];

const HomeMenu: React.FC<HomeMenuProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <div className="my-16">
      <h2 className="text-3xl font-serif font-bold text-brand-gold text-center mb-8">{t('shopByCategory')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {menuItems.map(item => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.view as View, item.category as ProductCategory)}
            className="relative rounded-lg overflow-hidden group text-left h-64 shadow-lg hover:shadow-brand-gold/20 transform hover:-translate-y-1 transition-all duration-300"
          >
            <img src={item.imageUrl} alt={t(item.titleKey as any)} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="relative h-full flex flex-col justify-end p-6">
              <h3 className="text-2xl font-serif font-bold text-white">{t(item.titleKey as any)}</h3>
              <p className="text-white/80 text-sm mt-1">{t(item.descriptionKey as any)}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeMenu;
