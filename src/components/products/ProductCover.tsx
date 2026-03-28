
'use client';

import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCoverProps {
  title: string;
  category: string;
  className?: string;
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  Graphics: 'from-purple-900 via-black to-black',
  Courses: 'from-blue-900 via-black to-black',
  Templates: 'from-emerald-900 via-black to-black',
  Ebooks: 'from-amber-900 via-black to-black',
  Software: 'from-indigo-900 via-black to-black',
  default: 'from-zinc-900 via-black to-black',
};

export default function ProductCover({ title, category, className }: ProductCoverProps) {
  const gradient = CATEGORY_GRADIENTS[category] || CATEGORY_GRADIENTS.default;

  return (
    <div className={cn(
      "relative aspect-square w-full overflow-hidden bg-black flex flex-col items-center justify-between p-12 text-center",
      "bg-gradient-to-br",
      gradient,
      className
    )}>
      {/* Top: Logo */}
      <div className="flex items-center gap-2 opacity-60">
        <div className="w-5 h-5 bg-primary rounded-sm flex items-center justify-center">
          <ShoppingBag className="w-3 h-3 text-white" />
        </div>
        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white">NovaAssets</span>
      </div>

      {/* Center: Title & Icon */}
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-4xl md:text-5xl font-black font-headline text-white uppercase tracking-tighter leading-none max-w-[80%]">
          {title}
        </h2>
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
             <ShoppingBag className="w-10 h-10 text-primary" />
          </div>
        </div>
      </div>

      {/* Bottom: Minimal Space */}
      <div className="h-4" />

      {/* Decorative Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-radial-gradient from-white/5 to-transparent opacity-30" />
      </div>
    </div>
  );
}
