import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import AiRecommendations from '@/components/home/AiRecommendations';
import ProductCard from '@/components/products/ProductCard';
import { PRODUCTS } from '@/app/lib/products';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 6);

  return (
    <div className="flex flex-col">
      <Hero />
      
      {/* Featured Products */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Featured Assets</h2>
            <p className="text-muted-foreground">The most popular digital products available right now.</p>
          </div>
          <Button asChild variant="link" className="text-primary font-bold">
            <Link href="/products">View All Products →</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <AiRecommendations />
      
      <Categories />

      {/* Social Proof */}
      <section className="py-20 bg-background border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-12 opacity-80">Trusted by 50,000+ creators and builders worldwide</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 grayscale opacity-50">
            <div className="flex items-center justify-center font-bold text-2xl tracking-tighter italic">VECTA</div>
            <div className="flex items-center justify-center font-bold text-2xl tracking-tighter">MORPH</div>
            <div className="flex items-center justify-center font-bold text-2xl tracking-tighter italic">CORE.AI</div>
            <div className="flex items-center justify-center font-bold text-2xl tracking-tighter">STUDIO</div>
            <div className="flex items-center justify-center font-bold text-2xl tracking-tighter italic">DESIGN.IO</div>
            <div className="flex items-center justify-center font-bold text-2xl tracking-tighter">ZENITH</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-secondary p-12 md:p-20 text-center">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold font-headline text-white mb-8">Ready to grow your business?</h2>
              <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12">
                Join our community and get instant access to hundreds of premium digital products for absolutely free.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-10 h-14 text-lg font-bold shadow-xl">
                  Create Free Account
                </Button>
                <div className="flex items-center gap-2 text-white/90 font-medium">
                  <CheckCircle2 className="w-5 h-5" />
                  No credit card required
                </div>
              </div>
            </div>
            {/* Background Decorative */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-1/4 h-full bg-black/10 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2" />
          </div>
        </div>
      </section>
    </div>
  );
}