import React from 'react';
import { useBookingModal } from '../../context/BookingModalContext';
import { useOrderCart } from '../../context/OrderCartContext';
import { ShoppingBag, CalendarDays, Flame, Gamepad2 } from 'lucide-react';

import { PageRoute } from '../../types';

interface MobileBottomBarProps {
  onNavigate?: (page: PageRoute) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onNavigate }) => {
  const { openBookingModal } = useBookingModal();
  const { openDrawer, totalItems } = useOrderCart();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-brand-dark/80 backdrop-blur-2xl border-t border-brand-cream/15 px-3 py-2.5 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] pb-[max(0.65rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        {/* Order Pizza Delivery Button - Luxury Glassmorphic */}
        <button
          onClick={openDrawer}
          className="relative flex items-center justify-center gap-1.5 py-3 px-3 rounded-full bg-brand-surface/75 backdrop-blur-lg border border-brand-cream/25 text-brand-cream font-bold text-xs uppercase tracking-wider active:scale-95 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] hover:border-brand-gold"
        >
          <ShoppingBag className="w-4 h-4 text-brand-gold" />
          <span>Order Pizza</span>
          {totalItems > 0 && (
            <span className="w-4 h-4 rounded-full bg-brand-terracotta text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
              {totalItems}
            </span>
          )}
        </button>

        {/* Reserve Table / Play Button */}
        <button
          onClick={() => {
            if (onNavigate) {
              onNavigate('book');
            } else {
              openBookingModal('gaming');
            }
          }}
          className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-full bg-brand-terracotta/90 backdrop-blur-lg text-brand-cream font-bold text-xs uppercase tracking-wider active:scale-95 transition-all shadow-luxury-ember border border-brand-cream/20"
        >
          <CalendarDays className="w-4 h-4" />
          <span>Book / Play</span>
        </button>
      </div>
    </div>
  );
};
