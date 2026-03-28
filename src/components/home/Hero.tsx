import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Zap, Star, Users, Download } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden hero-gradient">
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <Zap className="w-4 h-4 fill-primary" />
          <span className="uppercase tracking-widest text-[10px] font-bold">Premium SaaS Marketplace</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black font-headline mb-8 tracking-tighter leading-[0.9] max-w-5xl mx-auto uppercase">
          Unlock Premium <span className="text-primary purple-text-glow">Digital Assets</span> <br className="hidden md:block" /> For <span className="text-secondary gold-text-glow italic">Free</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
          Get instant access to high-quality templates, courses, tools, and ebooks designed to help you build, grow, and scale your digital empire.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-16 text-lg font-bold shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all hover:scale-105 active:scale-95 border-b-4 border-primary/20">
            <Link href="/products" className="flex items-center gap-2">
              Explore Products <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-10 h-16 text-lg border-white/10 bg-white/5 hover:bg-white/10 transition-all font-bold backdrop-blur-sm">
            How it works
          </Button>
        </div>

        <div className="max-w-4xl mx-auto pt-16 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-colors">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <span className="text-3xl font-black text-white">120+</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">Active Members</span>
          </div>
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-2 group-hover:bg-secondary/10 transition-colors">
              <Download className="w-6 h-6 text-secondary" />
            </div>
            <span className="text-3xl font-black text-white">500+</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">Downloads Completed</span>
          </div>
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-colors">
              <Star className="w-6 h-6 text-primary fill-primary" />
            </div>
            <span className="text-3xl font-black text-white">4.8</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">Average Rating</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-[140px]" />
      </div>
    </section>
  );
}