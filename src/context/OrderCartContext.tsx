import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem, CartItem } from '../types';
import { businessConfig } from '../data/businessConfig';

interface OrderCartContextType {
  cart: CartItem[];
  isDrawerOpen: boolean;
  orderType: 'delivery' | 'dinein' | 'takeaway';
  tableOrAddress: string;
  customerName: string;
  customerPhone: string;
  notes: string;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  setOrderType: (type: 'delivery' | 'dinein' | 'takeaway') => void;
  setTableOrAddress: (val: string) => void;
  setCustomerName: (val: string) => void;
  setCustomerPhone: (val: string) => void;
  setNotes: (val: string) => void;
  getWhatsAppOrderUrl: () => string;
}

const OrderCartContext = createContext<OrderCartContextType | undefined>(undefined);

export const OrderCartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('giocasa_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [orderType, setOrderType] = useState<'delivery' | 'dinein' | 'takeaway'>('delivery');
  const [tableOrAddress, setTableOrAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('giocasa_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = (item: MenuItem, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.item.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { item, quantity }];
    });
    setIsDrawerOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(i => {
          if (i.item.id === itemId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter((i): i is CartItem => i !== null);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  const subtotal = cart.reduce((sum, i) => {
    const price = typeof i.item.price === 'number' ? i.item.price : 0;
    return sum + price * i.quantity;
  }, 0);

  const deliveryFee = orderType === 'delivery' ? (subtotal >= businessConfig.delivery.freeDeliveryAbove || subtotal === 0 ? 0 : 40) : 0;
  const totalAmount = subtotal + deliveryFee;

  const getWhatsAppOrderUrl = () => {
    if (cart.length === 0) return `https://wa.me/${businessConfig.contact.whatsappNumber}?text=${encodeURIComponent("Hello GioCasa! I'd like to place an order.")}`;

    const itemsSummary = cart
      .map(i => `• ${i.quantity}x ${i.item.name} (₹${typeof i.item.price === 'number' ? i.item.price * i.quantity : 'MRP'})`)
      .join('\n');

    const msg = 
`🍕 *GIOCASA AYODHYA — ORDER REQUEST* 🍕
-----------------------------------
*Order Type:* ${orderType.toUpperCase()}
*Customer Name:* ${customerName || 'Guest'}
*Phone:* ${customerPhone || 'Not specified'}
*${orderType === 'dinein' ? 'Table / Floor' : 'Delivery Address'}:* ${tableOrAddress || 'To be confirmed on call'}

*Items Ordered:*
${itemsSummary}

-----------------------------------
*Subtotal:* ₹${subtotal}
${orderType === 'delivery' ? `*Delivery Fee:* ₹${deliveryFee === 0 ? 'FREE (Above ₹' + businessConfig.delivery.freeDeliveryAbove + ')' : deliveryFee}` : ''}
*Total Estimated:* ₹${totalAmount}
${notes ? `*Special Notes:* ${notes}` : ''}

Please confirm preparation & delivery time! Thank you.`;

    return `https://wa.me/${businessConfig.contact.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <OrderCartContext.Provider
      value={{
        cart,
        isDrawerOpen,
        orderType,
        tableOrAddress,
        customerName,
        customerPhone,
        notes,
        totalItems,
        subtotal,
        deliveryFee,
        totalAmount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        setOrderType,
        setTableOrAddress,
        setCustomerName,
        setCustomerPhone,
        setNotes,
        getWhatsAppOrderUrl,
      }}
    >
      {children}
    </OrderCartContext.Provider>
  );
};

export const useOrderCart = (): OrderCartContextType => {
  const context = useContext(OrderCartContext);
  if (!context) {
    throw new Error('useOrderCart must be used within an OrderCartProvider');
  }
  return context;
};
