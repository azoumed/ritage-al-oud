import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { View } from '../types';
import { FacebookIcon, InstagramIcon, TwitterIcon } from './IconComponents';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  const companyLinks = [
    { labelKey: 'footer_about', view: 'about' },
    { labelKey: 'footer_contact', view: 'contact' },
    { labelKey: 'navBlog', view: 'blog' },
  ];

  const supportLinks = [
    { labelKey: 'footer_faq', view: 'faq' },
    { labelKey: 'footer_shipping', view: 'shipping' },
    { labelKey: 'navUsageTips', view: 'usage_tips' },
  ];

  const legalLinks = [
    { labelKey: 'footer_privacy', view: 'privacy' },
    { labelKey: 'footer_terms', view: 'terms' },
  ];

  return (
    <footer className="bg-brand-gray mt-16 pt-12 border-t border-brand-light/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Logo and Motto */}
          <div className="md:col-span-1 lg:col-span-2 mb-6 md:mb-0">
             <Logo 
                className="h-12 w-auto mb-4 text-brand-light"
              />
            <p className="text-brand-light/70 text-sm max-w-xs">{t('footerMotto')}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-brand-light tracking-wider uppercase text-sm mb-4">{t('shop')}</h4>
            <ul className="space-y-3">
              {companyLinks.map(link => (
                <li key={link.view}>
                  <button onClick={() => onNavigate(link.view as View)} className="text-brand-light/70 hover:text-brand-gold transition-colors">{t(link.labelKey as any)}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-brand-light tracking-wider uppercase text-sm mb-4">{t('footer_support')}</h4>
            <ul className="space-y-3">
              {supportLinks.map(link => (
                <li key={link.view}>
                  <button onClick={() => onNavigate(link.view as View)} className="text-brand-light/70 hover:text-brand-gold transition-colors">{t(link.labelKey as any)}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-brand-light tracking-wider uppercase text-sm mb-4">{t('footer_legal')}</h4>
            <ul className="space-y-3">
              {legalLinks.map(link => (
                <li key={link.view}>
                  <button onClick={() => onNavigate(link.view as View)} className="text-brand-light/70 hover:text-brand-gold transition-colors">{t(link.labelKey as any)}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Social and Copyright */}
        <div className="mt-12 pt-8 border-t border-brand-light/10 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="text-brand-light/60 hover:text-brand-gold transition-colors"><FacebookIcon /></a>
            <a href="#" aria-label="Instagram" className="text-brand-light/60 hover:text-brand-gold transition-colors"><InstagramIcon /></a>
            <a href="#" aria-label="Twitter" className="text-brand-light/60 hover:text-brand-gold transition-colors"><TwitterIcon /></a>
          </div>
          <p className="text-sm text-brand-light/50 mt-4 sm:mt-0">&copy; {new Date().getFullYear()} {t('copyright')}</p>
        </div>
      </div>
       <div className="py-4 mt-8 bg-brand-dark/50 text-center">
          <p className="text-xs text-brand-light/40">{t('footerMotto')}</p>
        </div>
    </footer>
  );
};

export default Footer;