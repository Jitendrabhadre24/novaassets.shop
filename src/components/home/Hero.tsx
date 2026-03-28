import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 overflow-hidden hero-gradient">
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Zap className="w-4 h-4" />
          <span>Newly Added: 50+ Premium Templates</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold font-headline mb-6 tracking-tight leading-tight max-w-4xl mx-auto">
          Unlock Premium <span className="text-primary italic">Digital Assets</span> for Free
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          High-quality templates, courses, ebooks, and tools designed to help you build, grow, and scale your digital presence.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 text-lg font-bold shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
            <Link href="/products">
              Explore Products <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg border-white/10 bg-white/5 hover:bg-white/10 transition-all">
            How it works
          </Button>
        </div>

        <div className="pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl font-bold text-white">50k+</span>
            <span className="text-sm text-muted-foreground uppercase tracking-widest font-medium">Users</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl font-bold text-white">1,200+</span>
            <span className="text-sm text-muted-foreground uppercase tracking-widest font-medium">Assets</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl font-bold text-white">4.9/5</span>
            <span className="text-sm text-muted-foreground uppercase tracking-widest font-medium">Rating</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl font-bold text-white">100%</span>
            <span className="text-sm text-muted-foreground uppercase tracking-widest font-medium">Free Access</span>
          </div>
        </div>
      </div>

      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
      </div>
    </section>
  );
}