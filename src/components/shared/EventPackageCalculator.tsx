import React, { useState } from 'react';
import { businessConfig } from '../../data/businessConfig';
import { 
  Users, 
  Clock, 
  Flame, 
  Gamepad2, 
  Sparkles, 
  MessageCircle, 
  PartyPopper, 
  Check, 
  ArrowRight 
} from 'lucide-react';

export const EventPackageCalculator: React.FC = () => {
  const [guests, setGuests] = useState(10);
  const [durationHours, setDurationHours] = useState(3);
  const [includeFullGaming, setIncludeFullGaming] = useState(true);
  const [includePizzaFeast, setIncludePizzaFeast] = useState(true);
  const [includeTournamentHost, setIncludeTournamentHost] = useState(true);

  // Price calculations
  const baseRatePerGuestPerHour = 150;
  const foodRatePerGuest = includePizzaFeast ? 250 : 0;
  const gamingPerGuest = includeFullGaming ? 150 : 0;
  const tournamentHostFee = includeTournamentHost ? 500 : 0;

  const estimatedTotal = (guests * (baseRatePerGuestPerHour + foodRatePerGuest + gamingPerGuest)) + tournamentHostFee;
  const estimatedPerGuest = Math.round(estimatedTotal / guests);

  const generatePackageInquiryWhatsApp = () => {
    const msg = 
`🎉 *GIOCASA AYODHYA — GROUP & BIRTHDAY EVENT INQUIRY* 🎉
------------------------------------------------
*Number of Guests:* ${guests} Persons
*Estimated Duration:* ${durationHours} Hours
*Full Gaming Floor Access:* ${includeFullGaming ? 'YES (PS5, Pool, Foosball, Board Games)' : 'Basic Games Only'}
*Artisanal Food Package:* ${includePizzaFeast ? 'YES (Wood-Fired Pizzas, Starters & Shakes)' : 'A La Carte'}
*Tournament Host & Trophy:* ${includeTournamentHost ? 'YES' : 'NO'}

*Estimated Package Quote:* ~₹${estimatedTotal} (approx. ₹${estimatedPerGuest}/person)

Hi GioCasa Team! We'd like to check availability and finalize a custom package for our event. Please get in touch!`;

    return `https://wa.me/${businessConfig.contact.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="bg-brand-surface rounded-3xl border border-brand-border p-4 sm:p-8 lg:p-10 shadow-2xl space-y-6 sm:space-y-8">
      <div className="border-b border-brand-border/40 pb-5 sm:pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brand-gold font-semibold block mb-0.5">
            Instant Event Estimator
          </span>
          <h3 className="font-serif text-xl sm:text-3xl font-bold text-brand-cream">
            Build Your Celebration Package
          </h3>
        </div>
        <div className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-brand-surfaceElevated border border-brand-border text-[11px] sm:text-xs text-brand-subtle w-fit">
          Suitable for 6 to 45 Guests
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders & Configuration (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Guest Count Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-brand-subtle uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <Users className="w-4 h-4 text-brand-terracotta" />
                Number of Guests
              </span>
              <span className="font-mono text-base font-bold text-brand-cream">
                {guests} Guests
              </span>
            </div>
            <input
              type="range"
              min={6}
              max={40}
              step={1}
              value={guests}
              onChange={e => setGuests(Number(e.target.value))}
              className="w-full h-2 bg-brand-dark rounded-lg appearance-none cursor-pointer accent-brand-terracotta"
            />
            <div className="flex justify-between text-[10px] text-brand-muted font-mono">
              <span>6 Min</span>
              <span>20 Regular</span>
              <span>40 VIP Floor Buyout</span>
            </div>
          </div>

          {/* Duration Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-brand-subtle uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-gold" />
                Celebration Duration
              </span>
              <span className="font-mono text-base font-bold text-brand-cream">
                {durationHours} Hours
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={6}
              step={1}
              value={durationHours}
              onChange={e => setDurationHours(Number(e.target.value))}
              className="w-full h-2 bg-brand-dark rounded-lg appearance-none cursor-pointer accent-brand-gold"
            />
          </div>

          {/* Add-ons Checkboxes */}
          <div className="space-y-3 pt-2">
            <span className="text-xs uppercase tracking-widest text-brand-subtle font-semibold block">
              Package Add-ons & Inclusions:
            </span>
            
            <div className="space-y-2">
              <label className="p-3 rounded-xl bg-brand-surfaceElevated border border-brand-border/60 flex items-center justify-between cursor-pointer hover:border-brand-borderStrong transition-colors">
                <div className="flex items-center gap-2.5">
                  <Gamepad2 className="w-4 h-4 text-brand-gold" />
                  <span className="text-xs text-brand-cream font-medium">
                    Unlimited PS5, 8-Ball Pool & Foosball Lounge Access
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={includeFullGaming}
                  onChange={e => setIncludeFullGaming(e.target.checked)}
                  className="w-4 h-4 accent-brand-terracotta rounded"
                />
              </label>

              <label className="p-3 rounded-xl bg-brand-surfaceElevated border border-brand-border/60 flex items-center justify-between cursor-pointer hover:border-brand-borderStrong transition-colors">
                <div className="flex items-center gap-2.5">
                  <Flame className="w-4 h-4 text-brand-terracotta" />
                  <span className="text-xs text-brand-cream font-medium">
                    Chef's Wood-Fired Pizza Feast + Shakes & Starters
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={includePizzaFeast}
                  onChange={e => setIncludePizzaFeast(e.target.checked)}
                  className="w-4 h-4 accent-brand-terracotta rounded"
                />
              </label>

              <label className="p-3 rounded-xl bg-brand-surfaceElevated border border-brand-border/60 flex items-center justify-between cursor-pointer hover:border-brand-borderStrong transition-colors">
                <div className="flex items-center gap-2.5">
                  <PartyPopper className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-brand-cream font-medium">
                    Dedicated Tournament Coordinator + Custom Trophy Setup
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={includeTournamentHost}
                  onChange={e => setIncludeTournamentHost(e.target.checked)}
                  className="w-4 h-4 accent-brand-terracotta rounded"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Live Estimate Card (5 cols) */}
        <div className="lg:col-span-5 bg-brand-dark/80 rounded-2xl border border-brand-border p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-widest text-brand-gold font-semibold block">
              Estimated Pricing Overview
            </span>

            <div>
              <div className="font-mono text-3xl sm:text-4xl font-bold text-brand-cream">
                ₹{estimatedTotal.toLocaleString()}
              </div>
              <div className="text-xs text-brand-muted mt-0.5">
                Approx. <span className="text-brand-terracotta font-mono font-semibold">₹{estimatedPerGuest}</span> per guest for {durationHours} hours
              </div>
            </div>

            <div className="space-y-2 text-xs text-brand-subtle pt-4 border-t border-brand-border/40">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Reserved floor zone with private playlist control</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Complimentary cake-cutting ceremony setup</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero cleanup hassle, 100% hospitable service</span>
              </div>
            </div>
          </div>

          <a
            href={generatePackageInquiryWhatsApp()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-full bg-brand-terracotta hover:bg-brand-terracottaHover text-brand-cream font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-luxury-ember transition-all group"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Lock Package on WhatsApp</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};
