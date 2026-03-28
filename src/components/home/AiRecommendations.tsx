"use client"

import { useState } from 'react';
import { recommendProducts, AiPoweredProductRecommendationsOutput } from '@/ai/flows/ai-powered-product-recommendations';
import { PRODUCTS, Product } from '@/app/lib/products';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import ProductCard from '../products/ProductCard';

export default function AiRecommendations() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [hasInteracted, setHasInteracted] = useState(false);

  const getRecommendations = async (interests: string) => {
    setLoading(true);
    setHasInteracted(true);
    try {
      const result = await recommendProducts({
        userInterests: interests,
        availableProducts: PRODUCTS.map(p => ({
          id: p.id,
          title: p.title,
          description: p.description
        }))
      });
      
      const recommendedProducts = PRODUCTS.filter(p => 
        result.recommendations.some(rec => rec.id === p.id)
      );
      
      setRecommendations(recommendedProducts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-card/30 border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-primary font-semibold mb-2">
              <Sparkles className="w-5 h-5" />
              <span>AI Personalized Picks</span>
            </div>
            <h2 className="text-3xl font-bold font-headline mb-4">Can't find what you're looking for?</h2>
            <p className="text-muted-foreground">
              Our AI agent can help you find the perfect digital asset based on your current project or interests.
            </p>
          </div>
          
          {!hasInteracted ? (
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => getRecommendations("I want to learn design and marketing")} className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
                Design & Marketing
              </Button>
              <Button onClick={() => getRecommendations("I am building a new SaaS product")} className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
                SaaS & Development
              </Button>
              <Button onClick={() => getRecommendations("I need free resources for social media")} className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
                Social Media Assets
              </Button>
            </div>
          ) : (
             <Button 
                variant="outline" 
                onClick={() => setHasInteracted(false)}
                className="rounded-full"
             >
               Reset Recommendations
             </Button>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-muted-foreground animate-pulse">Our AI is analyzing your interests...</p>
          </div>
        ) : (
          recommendations.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
              {recommendations.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )
        )}
      </div>
    </section>
  );
}