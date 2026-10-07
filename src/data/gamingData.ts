import { GamingZone } from '../types';

export const gamingZones: GamingZone[] = [
  {
    id: 'ps5-arena',
    name: 'PlayStation 5 Pro Stations',
    subtitle: 'Ultra-low Latency • 4K 120Hz Displays • DualSense Haptics',
    type: 'ps5',
    image: '/assets/real/ps5_setup.png',
    ratePerHour: '₹149 / hour per controller',
    playersCapacity: '1 - 4 Players per Station',
    description: 'Immerse yourself in next-gen console gaming on dedicated large-screen 4K HDR displays with high-speed response, surround sound, and ergonomic lounge seating.',
    specs: [
      'PlayStation 5 Consoles with High-Speed SSD',
      '55" & 65" 4K HDR Gaming Displays @ 120Hz',
      'DualSense Wireless Controllers with Haptic Feedback',
      'Curated AAA Competitive & Co-op Library'
    ],
    popularGames: [
      'EA Sports FC 24 / 25 (FIFA)',
      'Tekken 8',
      'Mortal Kombat 1',
      'NBA 2K26',
      'Gran Turismo 7',
      'It Takes Two (Co-op)',
      'Marvel\'s Spider-Man 2',
      'Call of Duty: Warzone & Modern Warfare',
      'WWE 2K24',
      'Street Fighter 6'
    ],
    highlights: [
      'Weekly weekend tournaments with cash prizes & trophy badges',
      'Split-screen local multiplayer duels',
      'Food & cold coffee served directly to your gaming station'
    ]
  },
  {
    id: 'hotshot-pool',
    name: 'Hot-Shot 8-Ball Championship Pool',
    subtitle: 'Precision Slate Bed • Premium Green Baize • Custom Cue Sets',
    type: 'pool',
    image: '/assets/real/pool_table.png',
    ratePerHour: '₹199 / hour per table',
    playersCapacity: '2 - 6 Players',
    description: 'Step up to our tournament-grade Hot-Shot slate pool table set under dedicated warm directional canopy lighting. Ideal for casual rounds with friends or high-stakes trick-shot showdowns.',
    specs: [
      'Tournament-spec Italian Slate Bed with True Roll Baize',
      'Balanced Ash Wood & Graphite Precision Cues',
      'Aramith Pro Ball Set with Triangle Rack & Cue Chalks',
      'Comfortable spectator banquette with pizza & drink holders'
    ],
    highlights: [
      'Official WPA 8-ball & 9-ball rules or casual house rules',
      'Regular Friday Night Pool Knockout brackets',
      'Coaching tips for bank shots, spin control, and snooker defense'
    ]
  },
  {
    id: 'competition-foosball',
    name: 'Pro Soccer Foosball Table',
    subtitle: 'Telescopic Steel Rods • Counter-Balanced Figures • Rapid Action',
    type: 'foosball',
    image: '/assets/real/foosball_lounge.png',
    ratePerHour: '₹99 / hour (or ₹30 / 10-goal match)',
    playersCapacity: '2 - 4 Players (1v1 or 2v2)',
    description: 'High-speed adrenaline and instant rivalry. Our full-size soccer table brings lightning-fast wrist action, spin tricks, and loud cheering matches right beside the lounge seating.',
    specs: [
      'Heavy-duty tournament cabinet with anti-warp green pitch',
      'Smooth chrome-plated steel rods with ergonomic grip handles',
      'Red vs Blue counter-balanced molded soccer figures',
      'Integrated manual score beads and quick ball return chutes'
    ],
    highlights: [
      'Instant crowd-pleaser for friend groups and birthday hangouts',
      'Fast 5-minute games to decide who pays for the pizza!',
      'Kids, teens, and adults friendly'
    ]
  },
  {
    id: 'board-games-vault',
    name: 'Curated Tabletop & Board Game Vault',
    subtitle: '50+ Strategy, Bluffing, Party & Family Classics',
    type: 'boardgames',
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80',
    ratePerHour: 'Complimentary with any Food/Beverage order over ₹200',
    playersCapacity: '2 - 10 Players per Table',
    description: 'Put your phones down and gather around wooden tables for hours of bluffing, laughter, trading, and strategic triumph from our vast board game library.',
    specs: [
      'Dedicated game master staff available to explain rules in 3 minutes',
      'Spacious wooden dining tables with spill-proof coasters',
      'Regularly sanitized cards, tokens, and pristine game components'
    ],
    popularGames: [
      'Catan (Settlers of Catan)',
      'Codenames & Codenames Duet',
      'Ticket to Ride Europe',
      'Exploding Kittens & Unstable Unicorns',
      'Monopoly Deal & Classic Monopoly',
      'UNO Flip & UNO Attack',
      'Jenga Giant Wooden Blocks',
      'Chess & Luxury Carrom Board',
      'Secret Hitler & The Resistance',
      'Splendor & Azul'
    ],
    highlights: [
      'Zero learning curve — our hosts help you choose the best game for your group size',
      'Sunday Board Game Socials for community players',
      'Perfect accompaniment to wood-fired pizza and hot ginger chai'
    ]
  }
];

export const gamingPricingPackages = [
  {
    name: 'Quick Match Pass',
    price: '₹149',
    duration: '1 Hour',
    zone: 'PS5 Single Controller or Foosball',
    features: ['Access to full PS5 game library', 'Free high-speed WiFi', 'Order food to station']
  },
  {
    name: 'The Duo Lounge Pass',
    price: '₹349',
    duration: '2 Hours',
    zone: 'PS5 2-Player or 1 Hour Pool Table',
    popular: true,
    features: ['2 Wireless controllers included', '1 Hour 8-Ball Pool or 2 Hours PS5', '10% discount on Pizza & Drinks']
  },
  {
    name: 'Squad Game Night Buyout',
    price: '₹999',
    duration: '3 Hours',
    zone: 'All-Access (PS5 + Pool + Foosball + Board Games)',
    features: ['Up to 6 players simultaneous access', 'Unlimited board game swaps', 'Priority table reservations', 'Complimentary snack platter']
  }
];
