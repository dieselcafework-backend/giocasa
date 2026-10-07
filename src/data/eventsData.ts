import { EventItem } from '../types';

export const upcomingEvents: EventItem[] = [
  {
    id: 'event-fc25-championship',
    title: 'Ayodhya FC 24/25 PS5 Showdown',
    date: 'AUG 29, 2026',
    dayOfWeek: 'Friday Evening',
    time: '6:00 PM – 10:00 PM',
    category: 'tournament',
    description: '1v1 Knockout tournament on 4K 120Hz displays. 32 players max. Double elimination bracket with live projector streaming.',
    entryFee: '₹199 per player (includes 1 Mocktail + Fries)',
    prizePool: '₹5,000 Cash + GioCasa Trophy + 1 Month Free Gaming Pass',
    image: '/assets/real/ps5_setup.png',
    status: 'registering'
  },
  {
    id: 'event-pool-friday',
    title: 'Hot-Shot 8-Ball Masters Cup',
    date: 'SEP 05, 2026',
    dayOfWeek: 'Friday Night',
    time: '7:00 PM – 10:30 PM',
    category: 'tournament',
    description: 'Singles and Doubles straight 8-ball tournament. Best of 3 frames, finals best of 5. Refereed house matches.',
    entryFee: '₹249 per team (includes Pizza slice + Drink)',
    prizePool: '₹3,500 Cash + Custom Engraved Cue Stick',
    image: '/assets/real/pool_table.png',
    status: 'registering'
  },
  {
    id: 'event-catan-sunday',
    title: 'Sunday Tabletop & Catan Social',
    date: 'SEP 14, 2026',
    dayOfWeek: 'Sunday Afternoon',
    time: '3:00 PM – 7:00 PM',
    category: 'game-night',
    description: 'Gather for an afternoon of friendly trades, sheep hoarding, and longest road triumphs. Beginners warmly welcomed with 3-minute tutorials!',
    entryFee: 'Free entry with any café/pizza order',
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80',
    status: 'upcoming'
  },
  {
    id: 'event-foosball-derby',
    title: 'Midweek Foosball Sprint Derby',
    date: 'SEP 24, 2026',
    dayOfWeek: 'Wednesday Evening',
    time: '6:30 PM – 9:00 PM',
    category: 'tournament',
    description: 'Lightning-round 2v2 table football tournament. 7-goal speed games with winner staying on!',
    entryFee: '₹99 per duo',
    prizePool: 'Free Pizza Party Platter + Champion Badges',
    image: '/assets/real/foosball_lounge.png',
    status: 'upcoming'
  }
];
