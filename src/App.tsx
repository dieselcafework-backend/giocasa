import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { BookingModalProvider } from './context/BookingModalContext';
import { OrderCartProvider } from './context/OrderCartContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileBottomBar } from './components/layout/MobileBottomBar';
import { ReservationModal } from './components/modals/ReservationModal';
import { QuickOrderDrawer } from './components/modals/QuickOrderDrawer';

// Pages
import { HomePage } from './pages/HomePage';
import { ExperiencePage } from './pages/ExperiencePage';
import { MenuPage } from './pages/MenuPage';
import { GamingPage } from './pages/GamingPage';
import { EventsPage } from './pages/EventsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BookingPage } from './pages/BookingPage';
import { AdminPage } from './pages/AdminPage';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    const validPages: PageRoute[] = ['home', 'experience', 'menu', 'gaming', 'events', 'about', 'contact', 'book', 'admin'];
    return validPages.includes(hash as PageRoute) ? (hash as PageRoute) : 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validPages: PageRoute[] = ['home', 'experience', 'menu', 'gaming', 'events', 'about', 'contact', 'book', 'admin'];
      if (validPages.includes(hash as PageRoute)) {
        setCurrentPage(hash as PageRoute);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageRoute) => {
    setCurrentPage(page);
    window.location.hash = `/${page === 'home' ? '' : page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateTo} />;
      case 'experience':
        return <ExperiencePage onNavigate={navigateTo} />;
      case 'menu':
        return <MenuPage onNavigate={navigateTo} />;
      case 'gaming':
        return <GamingPage onNavigate={navigateTo} />;
      case 'events':
        return <EventsPage onNavigate={navigateTo} />;
      case 'about':
        return <AboutPage onNavigate={navigateTo} />;
      case 'contact':
        return <ContactPage onNavigate={navigateTo} />;
      case 'book':
        return <BookingPage onNavigate={navigateTo} />;
      case 'admin':
        return <AdminPage onNavigate={navigateTo} />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <BookingModalProvider>
      <OrderCartProvider>
        <div className="min-h-screen flex flex-col bg-brand-dark text-brand-cream relative selection:bg-brand-terracotta selection:text-white">
          
          {/* Main Navigation Header */}
          <Navbar currentPage={currentPage} onNavigate={navigateTo} />

          {/* Active Page View */}
          <main className="flex-grow pb-16 sm:pb-0">
            {renderPage()}
          </main>

          {/* Luxury Oversized Footer */}
          <Footer onNavigate={navigateTo} />

          {/* Mobile Bottom Quick Bar */}
          <MobileBottomBar onNavigate={navigateTo} />

          {/* Global Interactive Modals */}
          <ReservationModal />
          <QuickOrderDrawer />

        </div>
      </OrderCartProvider>
    </BookingModalProvider>
  );
};

export default App;
