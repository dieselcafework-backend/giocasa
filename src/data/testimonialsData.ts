export interface Testimonial {
  id: string;
  name: string;
  badge: string;
  rating: number;
  highlight: string;
  comment: string;
  isVerifiedGuest: boolean;
  date: string;
  location: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: 't-1',
    name: 'Ayodhya Community Review',
    badge: 'Verified Dine-in & Gaming Guest',
    rating: 5,
    highlight: '“Best wood-fired crust in town & incredible PS5 setup!”',
    comment: 'GioCasa brings a fresh international vibe to Ayodhya. The Margherita pizza crust has authentic leopard spotting, and playing Tekken and Pool right after dinner made it our group’s favorite weekend hangout spot.',
    isVerifiedGuest: true,
    date: 'August 2026',
    location: 'Ayodhya, UP'
  },
  {
    id: 't-2',
    name: 'Birthday Party Host',
    badge: 'Private Event Booking',
    rating: 5,
    highlight: '“Hosted a 15-person birthday party — flawless hospitality.”',
    comment: 'The team coordinated our FIFA tournament, kept the hot pizzas and cold coffees flowing, and provided a fantastic celebration ambiance. Highly recommended for friend groups and family celebrations.',
    isVerifiedGuest: true,
    date: 'August 2026',
    location: 'Ayodhya, UP'
  },
  {
    id: 't-3',
    name: 'Local Food & Coffee Enthusiast',
    badge: 'Café & Tabletop Regular',
    rating: 5,
    highlight: '“The perfect balance of relaxed café downstairs and energy upstairs.”',
    comment: 'The Adrak Chai and Hazelnut Coffee are great, and spending Sunday afternoon playing Catan with friends felt so refreshing. A true hospitality jewel in the city.',
    isVerifiedGuest: true,
    date: 'July 2026',
    location: 'Ayodhya, UP'
  }
];
