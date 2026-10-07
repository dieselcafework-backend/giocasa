import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageRoute } from '../../types';
import { useBookingModal } from '../../context/BookingModalContext';
import { useOrderCart } from '../../context/OrderCartContext';
import { 
  Menu as MenuIcon, 
  X, 
  ShoppingBag, 
  CalendarDays, 
  MapPin, 
  Phone, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { businessConfig } from '../../data/businessConfig';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isJerkShaking, setIsJerkShaking] = useState(false);
  const { openBookingModal } = useBookingModal();
  const { totalItems, openDrawer } = useOrderCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for Letter Explosion Shockwave
  useEffect(() => {
    const handleBlast = () => {
      setIsJerkShaking(true);
      setTimeout(() => setIsJerkShaking(false), 500);
    };

    window.addEventListener('giocasa-letter-blast', handleBlast);
    return () => window.removeEventListener('giocasa-letter-blast', handleBlast);
  }, []);

  const navLinks: { id: PageRoute; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'menu', label: 'Menu & Pizza' },
    { id: 'gaming', label: 'Gaming Lounge' },
    { id: 'book', label: 'Book Slot' },
    { id: 'events', label: 'Events' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        animate={
          isJerkShaking
            ? {
                x: [0, -10, 10, -7, 6, -3, 2, 0],
                y: [0, -7, 7, -5, 4, -2, 0],
                rotate: [0, -0.9, 0.9, -0.5, 0.3, 0],
              }
            : { x: 0, y: 0, rotate: 0 }
        }
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-dark py-3.5 shadow-luxury'
            : 'bg-gradient-to-b from-brand-dark/90 via-brand-dark/40 to-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="GioCasa Home"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-brand-surfaceElevated border border-brand-border group-hover:border-brand-terracotta transition-colors">
              <span className="font-serif text-lg font-bold text-brand-cream group-hover:text-brand-terracotta transition-colors">
                G
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-brand-terracotta animate-pulse" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-brand-cream block leading-none">
                GIOCASA
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-brand-gold block mt-0.5 font-medium">
                AYODHYA • SOCIAL HOUSE
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-xs uppercase tracking-widest transition-all duration-200 relative py-1 ${
                    isActive
                      ? 'text-brand-cream font-semibold'
                      : 'text-brand-subtle hover:text-brand-cream font-medium'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-terracotta rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Pizza Cart Button */}
            <button
              onClick={openDrawer}
              className="relative p-2.5 rounded-full bg-brand-surface hover:bg-brand-surfaceElevated border border-brand-border hover:border-brand-borderStrong text-brand-cream transition-all group"
              aria-label="Open Order Cart"
            >
              <ShoppingBag className="w-4 h-4 text-brand-cream group-hover:text-brand-terracotta transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-terracotta text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Book / Reserve Button */}
            <button
              onClick={() => handleNavClick('book')}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded-full bg-brand-terracotta text-brand-cream hover:bg-brand-terracottaHover transition-all shadow-luxury-ember hover:-translate-y-0.5"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Book / Reserve</span>
            </button>
          </div>

          {/* Mobile Cart & Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={openDrawer}
              className="relative p-2 rounded-full bg-brand-surface border border-brand-border text-brand-cream"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-terracotta text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-brand-surface border border-brand-border text-brand-cream focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Full Screen Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-brand-dark/98 backdrop-blur-xl flex flex-col justify-between p-6 overflow-y-auto animate-fade-in sm:hidden">
          <div className="flex items-center justify-between pb-6 border-b border-brand-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-surfaceElevated border border-brand-border flex items-center justify-center">
                <span className="font-serif font-bold text-brand-cream">G</span>
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-brand-cream">
                GIOCASA
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-brand-surface border border-brand-border text-brand-cream"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-4 py-8">
            {navLinks.map((link, idx) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="flex items-center justify-between text-left py-2 group border-b border-brand-border/40"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-[10px] font-mono text-brand-terracotta">
                    0{idx + 1}
                  </span>
                  <span className={`font-serif text-2xl tracking-tight transition-colors ${
                    currentPage === link.id ? 'text-brand-terracotta italic font-medium' : 'text-brand-cream group-hover:text-brand-gold'
                  }`}>
                    {link.label}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-brand-subtle group-hover:text-brand-cream transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </nav>

          <div className="space-y-4 pt-4 border-t border-brand-border">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleNavClick('book')}
                className="w-full py-3 px-4 rounded-full bg-brand-terracotta text-brand-cream font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <CalendarDays className="w-3.5 h-3.5" />
                <span>Reserve Slot</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDrawer();
                }}
                className="w-full py-3 px-4 rounded-full bg-brand-surfaceElevated border border-brand-border text-brand-cream font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-brand-gold" />
                <span>Order Pizza</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-brand-subtle pt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-terracotta" />
                Ayodhya, India
              </span>
              <a 
                href={`tel:${businessConfig.contact.phone}`} 
                className="flex items-center gap-1 text-brand-cream hover:text-brand-gold"
              >
                <Phone className="w-3.5 h-3.5 text-brand-gold" />
                {businessConfig.contact.displayPhone}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
