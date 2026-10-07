export type PageRoute = 
  | 'home'
  | 'experience'
  | 'menu'
  | 'gaming'
  | 'events'
  | 'about'
  | 'contact'
  | 'book'
  | 'admin';

export type ReservationType = 'dining' | 'gaming' | 'combo' | 'event';

export interface MenuItem {
  id: string;
  name: string;
  category: 'tea' | 'hot-coffee' | 'cold-coffee' | 'shakes' | 'mocktails' | 'sides' | 'burgers' | 'pizza' | 'pasta' | 'combos';
  price: number | 'MRP';
  description?: string;
  ingredients?: string[];
  isVegetarian: boolean;
  isBestseller?: boolean;
  isSignature?: boolean;
  isWoodFired?: boolean;
  spicyLevel?: 0 | 1 | 2 | 3;
  image?: string;
  prepTime?: string;
}

export interface GamingZone {
  id: string;
  name: string;
  subtitle: string;
  type: 'ps5' | 'pool' | 'foosball' | 'boardgames';
  image: string;
  specs: string[];
  description: string;
  highlights: string[];
  popularGames?: string[];
  ratePerHour?: string;
  playersCapacity: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  dayOfWeek: string;
  time: string;
  category: 'tournament' | 'game-night' | 'live' | 'special';
  description: string;
  entryFee?: string;
  prizePool?: string;
  image: string;
  status: 'upcoming' | 'registering' | 'sold-out';
}

export interface NightExperience {
  id: string;
  title: string;
  tagline: string;
  idealFor: string;
  image: string;
  includes: string[];
  duration: string;
  vibe: string;
  bookingType: ReservationType;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface BookingFormData {
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: number;
  reservationType: ReservationType;
  preferredLevel: 'downstairs-dine' | 'upstairs-gaming' | 'full-venue' | 'any';
  specialRequests?: string;
}
