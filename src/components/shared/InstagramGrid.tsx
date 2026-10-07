import React from 'react';
import { businessConfig } from '../../data/businessConfig';
import { ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from '../ui/InstagramIcon';

export const InstagramGrid: React.FC = () => {
  const posts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      tag: '#WoodFiredPizza',
      caption: '48-hour slow fermented dough meets 450°C wood fire. Leopard crust perfection.'
    },
    {
      id: 2,
      image: '/assets/real/ps5_setup.png',
      tag: '#PS5Arena',
      caption: '4K HDR gaming station live in Ayodhya. Tekken 8 showdown in full effect!'
    },
    {
      id: 3,
      image: '/assets/real/pool_table.png',
      tag: '#8BallPool',
      caption: 'Championship slate pool table ready for Friday evening frames.'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
      tag: '#ColdCoffee',
      caption: 'Classic iced cold coffee brewed to keep the gaming sessions energized.'
    },
    {
      id: 5,
      image: '/assets/real/foosball_lounge.png',
      tag: '#FoosballLounge',
      caption: 'Fast-paced soccer foosball in our first-floor lounge with friends.'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=600&q=80',
      tag: '#BoardGameSocial',
      caption: 'Catan & Chai Sundays at GioCasa Ayodhya.'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {posts.map(post => (
          <a
            key={post.id}
            href={businessConfig.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square rounded-2xl overflow-hidden bg-brand-surface border border-brand-border block"
          >
            <img
              src={post.image}
              alt={post.tag}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-brand-dark/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-brand-cream">
              <span className="text-[10px] font-mono text-brand-gold font-bold">
                {post.tag}
              </span>
              <p className="text-[11px] font-light line-clamp-3 leading-snug">
                {post.caption}
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-brand-border/40 text-[10px] text-brand-subtle">
                <span className="flex items-center gap-1">
                  <InstagramIcon className="w-3 h-3 text-brand-terracotta" />
                  GioCasa
                </span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="text-center pt-2">
        <a
          href={businessConfig.contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-surface border border-brand-border hover:border-brand-terracotta text-brand-cream hover:text-brand-terracotta text-xs font-semibold uppercase tracking-widest transition-colors"
        >
          <InstagramIcon className="w-4 h-4 text-brand-terracotta" />
          <span>Follow {businessConfig.contact.instagramHandle}</span>
        </a>
      </div>
    </div>
  );
};
