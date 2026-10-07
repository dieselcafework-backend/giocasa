import { MenuItem } from '../types';

export interface MenuCategoryDef {
  id: string;
  label: string;
  icon: string;
  highlight?: boolean;
}

export const menuCategories: MenuCategoryDef[] = [
  { id: 'all', label: 'All Items', icon: 'Sparkles' },
  { id: 'pizza', label: 'Wood-Fired Pizza', icon: 'Flame', highlight: true },
  { id: 'hot-coffee', label: 'Coffee & Tea', icon: 'Coffee' },
  { id: 'cold-coffee', label: 'Cold Brews & Frappes', icon: 'CupSoda' },
  { id: 'shakes', label: 'Shakes & Smoothies', icon: 'Milk' },
  { id: 'mocktails', label: 'Mocktails & Sodas', icon: 'GlassWater' },
  { id: 'burgers', label: 'Burgers', icon: 'Sandwich' },
  { id: 'sides', label: 'Sides & Pasta', icon: 'Utensils' },
  { id: 'combos', label: 'Gamer Combos', icon: 'Gamepad2' },
];

export const menuData: MenuItem[] = [
  // --- SIGNATURE WOOD-FIRED PIZZAS ---
  {
    id: 'pizza-margherita',
    name: 'Margherita Classica',
    category: 'pizza',
    price: 299,
    description: '48-hour slow fermented dough, Italian San Marzano pomodoro, fresh Fior di Latte mozzarella, fragrant basil leaves, and extra virgin olive oil.',
    ingredients: ['Italian San Marzano Tomato', 'Fior di Latte Mozzarella', 'Fresh Sweet Basil', 'Extra Virgin Olive Oil'],
    isVegetarian: true,
    isSignature: true,
    isBestseller: true,
    isWoodFired: true,
    spicyLevel: 0,
    prepTime: '12-15 mins',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza-giocasa-special',
    name: 'GioCasa Signature Hearth',
    category: 'pizza',
    price: 369,
    description: 'Our flagship wood-fired creation. Fire-roasted bell peppers, caramelized balsamic onions, sun-ripened cherry tomatoes, kalamata olives, and melted bocconcini.',
    ingredients: ['Roasted Bell Peppers', 'Caramelized Onions', 'Sun-Dried Tomatoes', 'Bocconcini Mozzarella', 'Kalamata Olives'],
    isVegetarian: true,
    isSignature: true,
    isBestseller: true,
    isWoodFired: true,
    spicyLevel: 1,
    prepTime: '12-15 mins',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza-quattro-formaggi',
    name: 'Quattro Formaggi (Four Cheese)',
    category: 'pizza',
    price: 389,
    description: 'A decadent four-cheese blend of aged mozzarella, creamy gouda, sharp parmesan, and mild gorgonzola with a drizzle of infused garlic rosemary oil.',
    ingredients: ['Aged Mozzarella', 'Creamy Gouda', 'Parmigiano-Reggiano', 'Gorgonzola', 'Rosemary Garlic Infusion'],
    isVegetarian: true,
    isSignature: false,
    isBestseller: true,
    isWoodFired: true,
    spicyLevel: 0,
    prepTime: '12-15 mins',
    image: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza-farmhouse-crunch',
    name: 'Farmhouse Rustic Veggie',
    category: 'pizza',
    price: 329,
    description: 'Crisp tri-color bell peppers, earthy button mushrooms, sweet golden corn, red onions, and hand-pulled mozzarella on a charred leopard-crust.',
    ingredients: ['Tri-color Bell Peppers', 'Button Mushrooms', 'Golden Sweet Corn', 'Red Onion Rings', 'Hand-pulled Mozzarella'],
    isVegetarian: true,
    isSignature: false,
    isBestseller: false,
    isWoodFired: true,
    spicyLevel: 1,
    prepTime: '12-15 mins',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza-spicy-paneer',
    name: 'Fiery Charred Paneer & Jalapeño',
    category: 'pizza',
    price: 349,
    description: 'Marinated cottage cheese charred in the wood oven, fiery Mexican jalapeños, crisp capsicum, and house-made crushed red chili oil.',
    ingredients: ['Tandoor-marinated Paneer', 'Pickled Jalapeños', 'Crunchy Capsicum', 'Fiery Red Chili Pomodoro', 'Mozzarella'],
    isVegetarian: true,
    isSignature: false,
    isBestseller: true,
    isWoodFired: true,
    spicyLevel: 2,
    prepTime: '12-15 mins',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pizza-truffle-mushroom',
    name: 'Wild Mushroom & Truffle Essence',
    category: 'pizza',
    price: 399,
    description: 'Slow-sautéed portobello and button mushrooms, fresh thyme, rich garlic cream base, mozzarella, and a mist of white truffle oil.',
    ingredients: ['Portobello Mushrooms', 'Button Mushrooms', 'White Truffle Essence', 'Garlic Cream', 'Fresh Thyme'],
    isVegetarian: true,
    isSignature: true,
    isBestseller: false,
    isWoodFired: true,
    spicyLevel: 0,
    prepTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&w=800&q=80'
  },

  // --- OFFICIAL REAL MENU: HOT COFFEE & TEA ---
  {
    id: 'tea-adrak',
    name: 'Adrak (Ginger) Tea',
    category: 'hot-coffee',
    price: 29,
    description: 'Fresh crushed ginger infused slow-brewed milk chai. Pure comfort and warmth in every sip.',
    isVegetarian: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tea-elaichi',
    name: 'Elaichi (Cardamom) Tea',
    category: 'hot-coffee',
    price: 29,
    description: 'Fragrant green cardamom crushed and simmered with premium Assam tea leaves.',
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tea-green',
    name: 'Organic Green Tea',
    category: 'hot-coffee',
    price: 49,
    description: 'Light, antioxidant-rich whole leaf green tea with subtle floral notes.',
    isVegetarian: true,
  },
  {
    id: 'coffee-plain-hot',
    name: 'Plain Hot Coffee',
    category: 'hot-coffee',
    price: 99,
    description: 'Rich dark roast espresso blended with steamed frothy milk.',
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'coffee-hazelnut',
    name: 'Hazelnut Hot Coffee',
    category: 'hot-coffee',
    price: 149,
    description: 'Signature espresso frothed with velvety steamed milk and aromatic roasted hazelnut syrup.',
    isVegetarian: true,
    isSignature: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80'
  },

  // --- OFFICIAL REAL MENU: COLD COFFEE & FRAPPES ---
  {
    id: 'cold-classic',
    name: 'Classic Cold Coffee',
    category: 'cold-coffee',
    price: 109,
    description: 'Chilled rich espresso, creamy milk and cane sugar shaken over ice with a frothy crown.',
    isVegetarian: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cold-coffee-frappe',
    name: 'Coffee Frappe',
    category: 'cold-coffee',
    price: 149,
    description: 'Blended espresso ice frappe topped with fresh whipped cream and chocolate drizzle.',
    isVegetarian: true,
    isSignature: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cold-vanilla-frappe',
    name: 'Vanilla Frappe',
    category: 'cold-coffee',
    price: 149,
    description: 'Madagascar vanilla bean blend with chilled espresso, crushed ice, and velvet milk foam.',
    isVegetarian: true,
  },

  // --- OFFICIAL REAL MENU: SHAKES & SMOOTHIES ---
  {
    id: 'shake-chocolate',
    name: 'Decadent Chocolate Shake',
    category: 'shakes',
    price: 129,
    description: 'Thick Belgian chocolate ganache blended with vanilla dairy cream.',
    isVegetarian: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'shake-oreo',
    name: 'Oreo Cookie Crunch Shake',
    category: 'shakes',
    price: 129,
    description: 'Loaded with real crushed Oreo cookies, rich milk, and chocolate swirl.',
    isVegetarian: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'shake-vanilla-icecream',
    name: 'Vanilla Shake (with Ice Cream)',
    category: 'shakes',
    price: 129,
    description: 'Classic creamy vanilla shake topped with a rich scoop of dairy ice cream.',
    isVegetarian: true,
  },
  {
    id: 'shake-kitkat',
    name: 'Kit Kat Shake',
    category: 'shakes',
    price: 179,
    description: 'Crushed crisp Kit Kat wafer bars, chocolate fudge, and rich chilled milk shake.',
    isVegetarian: true,
    isSignature: true,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'smoothie-strawberry',
    name: 'Strawberry Smoothie',
    category: 'shakes',
    price: 219,
    description: 'Fresh real strawberry compote blended with chilled greek yogurt and crushed ice.',
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'smoothie-mixed-berry',
    name: 'Mixed Berry Smoothie',
    category: 'shakes',
    price: 219,
    description: 'Antioxidant blast of raspberries, blackberries, and blueberries with creamy yogurt.',
    isVegetarian: true,
    isSignature: true,
  },

  // --- OFFICIAL REAL MENU: MOCKTAILS ---
  {
    id: 'mocktail-lime-soda',
    name: 'Fresh Lime Soda (Sweet / Salt / Mixed)',
    category: 'mocktails',
    price: 99,
    description: 'Freshly hand-squeezed Ayodhya lime with effervescent sparkling soda.',
    isVegetarian: true,
  },
  {
    id: 'mocktail-lime-water',
    name: 'Fresh Lime Water',
    category: 'mocktails',
    price: 99,
    description: 'Natural fresh lime with filtered chilled spring water and mint.',
    isVegetarian: true,
  },
  {
    id: 'mocktail-mint-mojito',
    name: 'Classic Mint Mojito',
    category: 'mocktails',
    price: 99,
    description: 'Muddled fresh mint sprigs, zesty lime wedges, simple syrup, and sparkling soda on crushed ice.',
    isVegetarian: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'mocktail-kalakhatta',
    name: 'Nostalgic Kalakhatta Fizz',
    category: 'mocktails',
    price: 99,
    description: 'Tangy, sweet, and spiced jamun berry reduction with black salt and bubbly soda.',
    isVegetarian: true,
    isSignature: true,
  },
  {
    id: 'mocktail-spicy-mango',
    name: 'Spicy Mango Sparkler',
    category: 'mocktails',
    price: 99,
    description: 'Ripe Alphonso mango puree with a hint of red chili-salt rim and sparkling soda.',
    isVegetarian: true,
    spicyLevel: 1,
  },

  // --- OFFICIAL REAL MENU: SIDES & PASTA ---
  {
    id: 'side-plain-maggi',
    name: 'Plain Maggi Noodles',
    category: 'sides',
    price: 80,
    description: 'The nostalgic Indian classic 2-minute noodles prepared to piping hot perfection.',
    isVegetarian: true,
  },
  {
    id: 'side-veg-maggi',
    name: 'Veg Loaded Maggi',
    category: 'sides',
    price: 89,
    description: 'Tossed with sautéed onions, tomatoes, sweet peas, and fresh coriander.',
    isVegetarian: true,
    isBestseller: true,
  },
  {
    id: 'side-cheese-maggi',
    name: 'Cheese Maggi',
    category: 'sides',
    price: 99,
    description: 'Creamy Maggi noodles loaded with melted grated cheese.',
    isVegetarian: true,
    isBestseller: true,
  },
  {
    id: 'side-french-fries',
    name: 'Fingerchips (French Fries)',
    category: 'sides',
    price: 99,
    description: 'Golden crispy potato fingers tossed in sea salt and GioCasa herb spice.',
    isVegetarian: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'side-potato-wedges',
    name: 'Crispy Potato Wedges',
    category: 'sides',
    price: 109,
    description: 'Thick cut seasoned potato wedges with crunchy exterior and fluffy center, served with house dip.',
    isVegetarian: true,
  },
  {
    id: 'side-plain-nachos',
    name: 'Plain Crunchy Nachos',
    category: 'sides',
    price: 99,
    description: 'Corn tortilla chips served with zesty salsa dip.',
    isVegetarian: true,
  },
  {
    id: 'side-loaded-nachos',
    name: 'Loaded Fiesta Nachos',
    category: 'sides',
    price: 149,
    description: 'Crispy corn nachos smothered in warm melted cheese sauce, salsa, jalapeños, and herb mayo.',
    isVegetarian: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'side-cheese-shots',
    name: 'Golden Cheese Shots (6 Pcs)',
    category: 'sides',
    price: 149,
    description: 'Crispy breaded poppers stuffed with molten cheese and Italian herbs.',
    isVegetarian: true,
    isSignature: true,
    isBestseller: true,
  },
  {
    id: 'side-veg-nuggets',
    name: 'Crunchy Veg Nuggets (6 Pcs)',
    category: 'sides',
    price: 149,
    description: 'Golden fried vegetable nuggets with crispy crumb coating and savory garlic dip.',
    isVegetarian: true,
  },
  {
    id: 'side-bun-makhan',
    name: 'Classic Bun Makhan',
    category: 'sides',
    price: 39,
    description: 'Soft toasted bun slathered with generous fresh butter. Best paired with Adrak Chai.',
    isVegetarian: true,
  },
  {
    id: 'side-bun-jam',
    name: 'Sweet Bun Jam',
    category: 'sides',
    price: 45,
    description: 'Fresh warm bun with butter and mixed fruit jam.',
    isVegetarian: true,
  },
  {
    id: 'side-white-sauce-pasta',
    name: 'Creamy White Sauce Pasta (Penne Alfredo)',
    category: 'sides',
    price: 179,
    description: 'Al dente penne pasta tossed in rich garlic parmesan cream sauce with sautéed mushrooms, bell peppers, and herbs.',
    ingredients: ['Italian Penne Pasta', 'Garlic Parmesan Cream', 'Sautéed Bell Peppers', 'Mushroom Slices', 'Oregano & Chili Flakes'],
    isVegetarian: true,
    isSignature: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80'
  },

  // --- OFFICIAL REAL MENU: BURGERS (Served with French Fries) ---
  {
    id: 'burger-classic',
    name: 'Classic Veg Burger',
    category: 'burgers',
    price: 180,
    description: 'Crispy seasoned vegetable patty, creamy mayo, crisp garden lettuce, sliced onion & ripe tomato on toasted sesame bun. Served with French fries.',
    ingredients: ['Crispy Veg Patty', 'House Herb Mayo', 'Garden Lettuce', 'Tomato & Onion', 'Sesame Brioche Bun', 'Served with French Fries'],
    isVegetarian: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'burger-paneer-crunch',
    name: 'Paneer Crunch Royale Burger',
    category: 'burgers',
    price: 199,
    description: 'Thick slab of seasoned crunchy fried cottage cheese, creamy garlic mayo, crisp lettuce, tomato, and tangy sauce on a buttery brioche bun. Served with French fries.',
    ingredients: ['Crunchy Fried Paneer Slab', 'Garlic Mayo', 'Crisp Iceberg Lettuce', 'Sliced Tomato', 'Sesame Bun', 'Served with French Fries'],
    isVegetarian: true,
    isSignature: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80'
  },

  // --- GAMER & SOCIAL COMBOS ---
  {
    id: 'combo-duo-duel',
    name: 'The Duo Duel Combo',
    category: 'combos',
    price: 549,
    description: '1 Margherita Classica Wood-Fired Pizza + 1 Loaded Nachos + 2 Classic Cold Coffees / Frappes. Perfect for 2 players.',
    isVegetarian: true,
    isSignature: true,
    isBestseller: true,
  },
  {
    id: 'combo-squad-championship',
    name: 'Squad Championship Feast',
    category: 'combos',
    price: 999,
    description: '2 Large Wood-Fired Pizzas (Margherita + Farmhouse) + 1 Cheese Shots (6pcs) + 1 Fingerchips + 4 Mocktails / Soft Drinks. Ideal for 4-5 friends.',
    isVegetarian: true,
    isSignature: true,
    isBestseller: true,
  },
  {
    id: 'combo-solo-grind',
    name: 'Solo Gamer Power Lunch',
    category: 'combos',
    price: 299,
    description: '1 Paneer Crunch Burger with Fries + 1 Classic Cold Coffee or Hazelnut Coffee.',
    isVegetarian: true,
  }
];
