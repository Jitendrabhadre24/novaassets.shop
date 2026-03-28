"use client"

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { PRODUCTS, Product } from '@/app/lib/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Download, 
  CheckCircle2, 
  Share2, 
  ShieldCheck, 
  ArrowLeft,
  Lock,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [unlocking, setUnlocking] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const foundProduct = PRODUCTS.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  const handleUnlock = () => {
    setUnlocking(true);
    // Simulate redirect to external link
    setTimeout(() => {
      // In a real app, this would be a window.location.href to an ad network or similar
      // Here we simulate the return flow
      setUnlocking(false);
      setShowModal(true);
    }, 2000);
  };

  if (!product) return null;

  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4">
        <Button variant="ghost" asChild className="mb-8 hover:bg-white/5 group">
          <Link href="/products" className="flex items-center gap-2 text-muted-foreground group-hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Product Image */}
          <div className="relative aspect-video lg:aspect-square overflow-hidden rounded-3xl border border-white/5 shadow-2xl">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-6 left-6">
              <Badge className="bg-primary/90 text-white border-none backdrop-blur-md px-4 py-1.5 text-sm">
                {product.category}
              </Badge>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-secondary font-bold">
                  <Star className="w-5 h-5 fill-secondary" />
                  {product.stats.rating}
                </div>
                <div className="text-muted-foreground text-sm flex items-center gap-1 border-l border-white/10 pl-4">
                  <Download className="w-4 h-4" />
                  {product.stats.downloads} downloads
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold font-headline mb-4 tracking-tight leading-tight">
                {product.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/5 border border-white/5 p-4 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <Button 
                onClick={handleUnlock}
                disabled={unlocking}
                size="lg" 
                className="w-full h-16 rounded-full text-xl font-bold bg-primary hover:bg-primary/90 shadow-[0_10px_30px_rgba(140,64,255,0.4)] relative overflow-hidden group"
              >
                {unlocking ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-6 h-6 animate-spin" /> Verifying Connection...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5" /> Unlock Download Free
                  </div>
                )}
              </Button>
              
              <div className="flex items-center justify-between gap-4 px-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  Virus-free Guarantee
                </div>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Share2 className="w-4 h-4 mr-2" /> Share Product
                </Button>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5">
              <h3 className="font-bold text-lg mb-4">Why choose NovaAssets?</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Every digital product in our marketplace is verified for quality and usability. We ensure that you get the best resources to accelerate your growth without any financial barrier.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Unlock Success Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-card border-white/10 rounded-[2rem] sm:max-w-md text-center p-12">
          <div className="mx-auto w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <DialogHeader className="mb-8">
            <DialogTitle className="text-3xl font-bold font-headline mb-2">Your download is ready!</DialogTitle>
            <DialogDescription className="text-muted-foreground text-lg">
              Unlock successful. You can now download "{product.title}" and start your project.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button 
              className="w-full bg-primary hover:bg-primary/90 h-14 rounded-full text-lg font-bold shadow-xl shadow-primary/20"
              onClick={() => {
                setShowModal(false);
                window.open('https://example.com/download-placeholder', '_blank');
              }}
            >
              <Download className="mr-2 w-5 h-5" /> Download Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}