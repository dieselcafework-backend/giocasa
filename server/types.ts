export type ResourceCategory = 'ps5' | 'pool' | 'foosball' | 'boardgames';

export interface GamingResource {
  id: string; // e.g. 'ps5-station-1'
  name: string; // 'PS5 Pro Station 1'
  category: ResourceCategory;
  zoneId: string; // 'ps5-arena'
  ratePerHour: number;
  minDurationMinutes: number;
  maxDurationMinutes: number;
  playersCapacity: { min: number; max: number };
  active: boolean;
  isMaintenance: boolean;
  maintenanceReason?: string;
  specs: string[];
  image: string;
  order: number;
}

export type BookingStatus = 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled' | 'expired';
export type PaymentStatus = 'unpaid' | 'pending' | 'paid' | 'refunded';

export interface Booking {
  id: string; // 'GC-XXXXXX'
  customerName: string;
  phone: string;
  email?: string;
  resourceId: string;
  resourceName: string;
  category: ResourceCategory;
  date: string; // YYYY-MM-DD (Asia/Kolkata)
  startTime: string; // HH:mm in 24h (e.g. '14:00')
  endTime: string; // HH:mm in 24h (e.g. '15:00')
  durationMinutes: number;
  numberOfPeople: number;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  notes?: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  source: 'web' | 'admin' | 'phone';
}

export type SlotStatus = 'available' | 'booked' | 'playing' | 'unavailable';

export interface TimeSlot {
  startTime: string; // '14:00'
  endTime: string; // '15:00'
  status: SlotStatus;
  bookingId?: string;
  reason?: string;
}

export interface CreateBookingRequest {
  customerName: string;
  phone: string;
  email?: string;
  resourceId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  durationMinutes: number; // 30, 60, 90, 120, etc.
  numberOfPeople: number;
  notes?: string;
}

export interface ExtendBookingRequest {
  additionalMinutes: number; // e.g. 30 or 60
}

export interface AdminBookingFilter {
  date?: string;
  resourceId?: string;
  category?: ResourceCategory;
  status?: BookingStatus;
  paymentStatus?: PaymentStatus;
  search?: string;
}
