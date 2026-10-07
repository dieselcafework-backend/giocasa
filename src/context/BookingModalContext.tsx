import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ReservationType } from '../types';

interface BookingModalContextType {
  isOpen: boolean;
  reservationType: ReservationType;
  openBookingModal: (type?: ReservationType) => void;
  closeBookingModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(undefined);

export const BookingModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reservationType, setReservationType] = useState<ReservationType>('dining');

  const openBookingModal = (type: ReservationType = 'dining') => {
    setReservationType(type);
    setIsOpen(true);
  };

  const closeBookingModal = () => {
    setIsOpen(false);
  };

  return (
    <BookingModalContext.Provider value={{ isOpen, reservationType, openBookingModal, closeBookingModal }}>
      {children}
    </BookingModalContext.Provider>
  );
};

export const useBookingModal = (): BookingModalContextType => {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error('useBookingModal must be used within a BookingModalProvider');
  }
  return context;
};
