export const businessConfig = {
  brandName: "GioCasa",
  tagline: "Eat. Play. Stay.",
  slogan: "Wood-fired pizza, good games and even better company.",
  location: {
    city: "Ayodhya",
    state: "Uttar Pradesh",
    country: "India",
    addressLine1: "Civil Lines / Main Hub",
    addressLine2: "Ayodhya, Uttar Pradesh 224001",
    landmark: "Near City Center",
    googleMapsUrl: "https://maps.google.com/?q=Ayodhya+Uttar+Pradesh",
    mapEmbedPlaceholder: "Ayodhya, Uttar Pradesh, India"
  },
  contact: {
    phone: "+91 98765 43210", // Placeholder for actual owner phone
    displayPhone: "+91 98765 43210",
    whatsappNumber: "919876543210", // Format for wa.me links
    email: "ciao@giocasa.in",
    instagramHandle: "@giocasa.ayodhya",
    instagramUrl: "https://instagram.com",
  },
  hours: [
    { days: "Monday – Thursday", timing: "11:00 AM – 11:00 PM", note: "Dine-in, Gaming & Delivery" },
    { days: "Friday – Sunday", timing: "11:00 AM – Midnight", note: "Late-night Gaming & Pizza" }
  ],
  delivery: {
    status: "Active",
    radius: "Delivering across Ayodhya",
    freeDeliveryAbove: 499,
    avgDeliveryTime: "30-45 mins",
    orderVia: ["WhatsApp Direct", "Phone Call", "Zomato / Swiggy (Coming Soon)"]
  },
  floors: {
    downstairs: {
      level: "Level 0 • Basement & Ground",
      name: "The Hearth & Café Dining",
      vibe: "Warm, Intimate & Aromatic",
      highlights: [
        "Artisan Wood-Fired Pizza Oven (450°C)",
        "Specialty Espresso & Brew Bar",
        "Cozy Banquettes & Warm Wood Paneling",
        "Italian Comfort Bites & Decadent Shakes"
      ],
      idealFor: "Dinner dates, family meals, quiet work with chai/coffee, relaxed conversations."
    },
    upstairs: {
      level: "Level 1 • First Floor",
      name: "The Arena & Social Lounge",
      vibe: "High Energy, Friendly Competition & Play",
      highlights: [
        "PS5 Stations with 4K HDR 120Hz Displays",
        "Hot-Shot Slate 8-Ball Championship Pool Table",
        "Competition Foosball (Table Football)",
        "Curated 50+ Tabletop Board Game Vault"
      ],
      idealFor: "Group hangouts, intense multiplayer duels, birthday tournaments, after-dinner games."
    }
  }
};
