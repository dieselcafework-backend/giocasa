import React, { useState } from 'react';
import { PageRoute, MenuItem } from '../types';
import { menuCategories, menuData } from '../data/menuData';
import { businessConfig } from '../data/businessConfig';
import { useOrderCart } from '../context/OrderCartContext';
import { PizzaFeatureCard } from '../components/shared/PizzaFeatureCard';
import { Badge } from '../components/ui/Badge';
import { 
  Flame, 
  ShoppingBag, 
  Plus, 
  Check, 
  Clock, 
  Sparkles, 
  Bike, 
  Phone, 
  MessageCircle, 
  Search,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, cart, openDrawer, totalItems, totalAmount } = useOrderCart();

  const filteredItems = menuData.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.ingredients && item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const pizzaItems = filteredItems.filter(i => i.category === 'pizza');
  const otherItems = filteredItems.filter(i => i.category !== 'pizza');

  return (
    <div className="min-h-screen bg-brand-dark text-brand-cream pt-28 pb-24 px-4 sm:px-6 lg:px-8 selection:bg-brand-terracotta selection:text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-terracotta font-semibold block">
            Artisanal Dining & Café
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-brand-cream">
            The GioCasa Menu
          </h1>
          <p className="font-italic-accent text-xl sm:text-2xl text-brand-gold italic">
            Good Food • Good Mood • Good Times
          </p>
          <p className="text-sm text-brand-subtle font-light max-w-xl mx-auto leading-relaxed">
            Hand-stretched wood-fired pizzas, slow-brewed ginger chai, rich espresso frappes, loaded snacks and juicy burgers served in our basement café or delivered across Ayodhya.
          </p>
        </div>

        {/* Category Pills & Search Filter */}
        <div className="space-y-4 max-w-5xl mx-auto">
          {/* Search bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-brand-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search pizza, pasta, shake, chai, burger..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-brand-surface border border-brand-border text-brand-cream text-xs focus:outline-none focus:border-brand-terracotta placeholder:text-brand-muted"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-brand-muted hover:text-brand-cream"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
            {menuCategories.map(cat => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? 'bg-brand-terracotta text-brand-cream shadow-luxury-ember border border-brand-terracotta'
                      : 'bg-brand-surface border border-brand-border text-brand-subtle hover:text-brand-cream hover:border-brand-borderStrong'
                  }`}
                >
                  {cat.highlight && <Flame className="w-3.5 h-3.5 text-brand-gold" />}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Delivery Announcement Banner */}
        <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-brand-surfaceElevated to-brand-surface border border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-brand-cream uppercase tracking-wider">
                Delivering Piping Hot Across Ayodhya
              </div>
              <div className="text-xs text-brand-subtle">
                Direct WhatsApp Order Dispatch • Free Delivery Above ₹{businessConfig.delivery.freeDeliveryAbove}
              </div>
            </div>
          </div>

          <button
            onClick={openDrawer}
            className="py-2.5 px-6 rounded-full bg-brand-terracotta hover:bg-brand-terracottaHover text-brand-cream text-xs font-semibold uppercase tracking-wider transition-all shrink-0 flex items-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Open Cart ({totalItems})</span>
          </button>
        </div>

        {/* 1. WOOD-FIRED PIZZAS (If matched) */}
        {pizzaItems.length > 0 && (
          <div className="space-y-6">
            <div className="border-b border-brand-border/60 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-brand-terracotta" />
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-cream">
                  Signature Wood-Fired Pizzas
                </h2>
              </div>
              <span className="text-xs text-brand-gold font-mono">
                48-hr Fermented Dough • 450°C Hearth
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pizzaItems.map(pizza => (
                <PizzaFeatureCard key={pizza.id} pizza={pizza} />
              ))}
            </div>
          </div>
        )}

        {/* 2. OTHER FOOD, BURGERS, BEVERAGES & SNACKS */}
        {otherItems.length > 0 && (
          <div className="space-y-6">
            <div className="border-b border-brand-border/60 pb-3 flex items-center justify-between">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-cream">
                Café Specialties, Bites & Beverages
              </h2>
              <span className="text-xs text-brand-subtle font-mono">
                {otherItems.length} items
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {otherItems.map(item => {
                const inCart = cart.find(i => i.item.id === item.id);
                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-brand-surface border border-brand-border hover:border-brand-borderStrong transition-all flex flex-col justify-between space-y-4 shadow-md group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                            <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-cream group-hover:text-brand-gold transition-colors">
                              {item.name}
                            </h3>
                          </div>
                          <span className="text-[10px] uppercase font-mono tracking-widest text-brand-subtle block mt-0.5">
                            {item.category.replace('-', ' ')}
                          </span>
                        </div>

                        <div className="font-mono text-base font-bold text-brand-terracotta shrink-0">
                          {typeof item.price === 'number' ? `₹${item.price}` : item.price}
                        </div>
                      </div>

                      {item.description && (
                        <p className="text-xs text-brand-subtle font-light line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}

                      {/* Ingredients or note */}
                      {item.ingredients && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {item.ingredients.slice(0, 3).map((ing, i) => (
                            <span key={i} className="text-[9px] px-2 py-0.5 rounded bg-brand-surfaceElevated text-brand-muted border border-brand-border/40">
                              {ing}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-brand-border/40 flex items-center justify-between">
                      <div className="flex gap-1">
                        {item.isBestseller && <Badge variant="gold" size="sm">Bestseller</Badge>}
                        {item.isSignature && <Badge variant="terracotta" size="sm">House Special</Badge>}
                      </div>

                      <button
                        onClick={() => addToCart(item)}
                        className={`py-1.5 px-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1 ${
                          inCart
                            ? 'bg-emerald-600 text-white'
                            : 'bg-brand-surfaceElevated hover:bg-brand-terracotta text-brand-cream border border-brand-border hover:border-brand-terracotta'
                        }`}
                      >
                        {inCart ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>({inCart.quantity}) Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3 text-brand-terracotta group-hover:text-white" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <p className="font-serif text-2xl text-brand-cream">No menu items found</p>
            <p className="text-xs text-brand-subtle font-light">
              Try searching for something else or reset your filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="py-2 px-5 rounded-full bg-brand-terracotta text-brand-cream text-xs uppercase tracking-wider font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Floating Cart Trigger Bar (when items are in cart) - Center Aligned Glassmorphic */}
        {totalItems > 0 && (
          <div className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 animate-slide-up w-auto max-w-[92vw] flex justify-center">
            <button
              onClick={openDrawer}
              className="py-3.5 px-6 sm:py-4 sm:px-8 rounded-full bg-brand-dark/80 backdrop-blur-2xl border border-brand-cream/35 text-brand-cream font-bold text-xs sm:text-sm uppercase tracking-widest shadow-[0_12px_40px_0_rgba(0,0,0,0.7),inset_0_1px_1.5px_0_rgba(255,255,255,0.35)] hover:bg-brand-dark/95 hover:border-brand-terracotta hover:shadow-glow-subtle flex items-center gap-3 transition-all hover:scale-105 active:scale-95 group shrink-0 whitespace-nowrap"
            >
              <div className="w-6 h-6 rounded-full bg-brand-terracotta text-white flex items-center justify-center font-mono text-xs font-bold shadow-md group-hover:scale-110 transition-transform">
                {totalItems}
              </div>
              <span className="tracking-wider">View Order (₹{totalAmount})</span>
              <ShoppingBag className="w-4 h-4 text-brand-gold group-hover:text-brand-terracotta transition-colors" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
