import React, { useState, useCallback, useMemo } from 'react';
import { getOudRecommendation } from '../services/geminiService';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { WandSparklesIcon } from './IconComponents';
import { useTranslation } from '../hooks/useTranslation';

interface ScentRecommenderProps {
  onProductSelect: (productId: string) => void;
}

const scentOptions = ['Woody', 'Floral', 'Spicy', 'Citrus', 'Gourmand', 'Leather', 'Fresh'];
const occasionKeys = ['eveningGala', 'casualDaytime', 'intimateDinner', 'professionalSetting', 'relaxingAtHome'];
const moodKeys = ['confidentPowerful', 'romanticSophisticated', 'vibrantEnergetic', 'warmCozy', 'mysteriousAlluring'];

interface RecommendationResult {
    product: Product;
    reasoning: string;
    occasionSuggestion: string;
}

const ScentRecommender: React.FC<ScentRecommenderProps> = ({ onProductSelect }) => {
  const { t } = useTranslation();
  
  const occasionOptions = useMemo(() => occasionKeys.map(key => ({ key, label: t(`occasion_${key}` as any) })), [t]);
  const moodOptions = useMemo(() => moodKeys.map(key => ({ key, label: t(`mood_${key}` as any) })), [t]);

  const [selectedScents, setSelectedScents] = useState<string[]>([]);
  const [occasion, setOccasion] = useState(occasionOptions[0].label);
  const [mood, setMood] = useState(moodOptions[0].label);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScentToggle = (scent: string) => {
    setSelectedScents(prev =>
      prev.includes(scent) ? prev.filter(s => s !== scent) : [...prev, scent]
    );
  };

  const getRecommendation = useCallback(async () => {
    if (selectedScents.length === 0) {
      setError(t('errorScentSelection'));
      return;
    }
    setError(null);
    setIsLoading(true);
    setResult(null);

    try {
      const recommendation = await getOudRecommendation(
        { occasion, mood, scents: selectedScents },
        PRODUCTS
      );
      const recommendedProduct = PRODUCTS.find(p => p.id === recommendation.productId);
      if (recommendedProduct) {
        setResult({
            product: recommendedProduct,
            reasoning: recommendation.reasoning,
            occasionSuggestion: recommendation.occasionSuggestion,
        });
      } else {
        setError(t('recommendationError'));
      }
    } catch (err) {
      setError(t('unexpectedError'));
    } finally {
      setIsLoading(false);
    }
  }, [occasion, mood, selectedScents, t]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-serif font-bold text-brand-gold">{t('aiScentConcierge')}</h2>
        <p className="mt-2 text-lg text-brand-light/80 max-w-2xl mx-auto">
          {t('conciergeSubtitle')}
        </p>
      </div>

      <div className="bg-brand-gray p-8 rounded-lg space-y-6">
        {/* Step 1: Occasion */}
        <div>
          <label className="block text-xl font-serif text-brand-light mb-2">{t('whatsTheOccasion')}</label>
          <select value={occasion} onChange={e => setOccasion(e.target.value)} className="w-full bg-brand-dark p-3 rounded-md border border-brand-light/30 focus:ring-brand-gold focus:border-brand-gold">
            {occasionOptions.map(o => <option key={o.key} value={o.label}>{o.label}</option>)}
          </select>
        </div>

        {/* Step 2: Mood */}
        <div>
          <label className="block text-xl font-serif text-brand-light mb-2">{t('whatMood')}</label>
          <select value={mood} onChange={e => setMood(e.target.value)} className="w-full bg-brand-dark p-3 rounded-md border border-brand-light/30 focus:ring-brand-gold focus:border-brand-gold">
            {moodOptions.map(m => <option key={m.key} value={m.label}>{m.label}</option>)}
          </select>
        </div>
        
        {/* Step 3: Scent Families */}
        <div>
          <label className="block text-xl font-serif text-brand-light mb-2">{t('whichScentFamilies')}</label>
          <div className="flex flex-wrap gap-3">
            {scentOptions.map(scent => (
              <button key={scent} onClick={() => handleScentToggle(scent)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedScents.includes(scent) ? 'bg-brand-gold text-brand-dark' : 'bg-brand-dark border border-brand-light/50 text-brand-light hover:bg-brand-light/10'}`}>
                {scent}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-red-400 text-center">{error}</p>}
        
        <div className="pt-4 text-center">
          <button onClick={getRecommendation} disabled={isLoading} className="bg-brand-gold text-brand-dark font-bold py-3 px-8 rounded-md hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center space-x-2">
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{t('analyzing')}</span>
              </>
            ) : (
                <>
                <WandSparklesIcon className="w-5 h-5"/>
                <span>{t('findMyScent')}</span>
                </>
            )}
          </button>
        </div>
      </div>
      
      {result && (
        <div className="mt-10 bg-gradient-to-br from-brand-gray to-brand-dark border border-brand-gold/30 p-8 rounded-lg animate-fade-in">
            <h3 className="text-3xl font-serif text-center text-brand-gold mb-6">{t('yourRecommendation')}</h3>
            <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-1 text-center">
                    <img src={result.product.imageUrl} alt={result.product.name} className="w-48 h-48 mx-auto object-cover rounded-lg shadow-2xl mb-4"/>
                    <h4 className="text-2xl font-serif font-semibold">{result.product.name}</h4>
                    <button onClick={() => onProductSelect(result.product.id)} className="mt-4 text-brand-gold hover:underline">
                        {t('viewProduct')} &rarr;
                    </button>
                </div>
                <div className="md:col-span-2">
                    <p className="text-brand-light/90 italic leading-relaxed text-left">"{result.reasoning}"</p>
                    <p className="mt-4 text-left"><strong className="text-brand-gold">{t('suggestedOccasion')}</strong> {result.occasionSuggestion}</p>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ScentRecommender;