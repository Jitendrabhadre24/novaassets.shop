
"use client"

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { PRODUCTS, Product } from '@/app/lib/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Star, 
  Download, 
  CheckCircle2, 
  Share2, 
  ShieldCheck, 
  ArrowLeft,
  Lock,
  Loader2,
  Clock,
  AlertTriangle,
  ExternalLink
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

const VERIFICATION_STEPS = [
  "Checking completion...",
  "Validating session...",
  "Authenticating user...",
  "Finalizing unlock..."
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  
  // Unlock Flow States
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Security: Disable Right Click & Inspect
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
        return false;
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle Return from Smartlink
  useEffect(() => {
    const unlockStarted = localStorage.getItem('unlock_started');
    const unlockTime = localStorage.getItem('unlock_time');

    if (unlockStarted === 'true' && unlockTime) {
      const startTime = parseInt(unlockTime);
      const currentTime = Date.now();
      const diffSeconds = (currentTime - startTime) / 1000;

      if (diffSeconds > 15) {
        startFakeVerification();
      } else {
        toast({
          variant: "destructive",
          title: "Verification Failed",
          description: "Please complete the required step to unlock this download.",
        });
        localStorage.removeItem('unlock_started');
        localStorage.removeItem('unlock_time');
      }
    }

    const foundProduct = PRODUCTS.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, toast]);

  const startFakeVerification = () => {
    setIsVerifying(true);
    let currentStep = 0;
    
    const stepInterval = setInterval(() => {
      setVerificationStep(prev => {
        if (prev < VERIFICATION_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(stepInterval);
          setTimeout(() => {
            setIsVerifying(false);
            setShowSuccessModal(true);
            localStorage.removeItem('unlock_started');
            localStorage.removeItem('unlock_time');
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const handleUnlockClick = () => {
    localStorage.setItem('unlock_started', 'true');
    localStorage.setItem('unlock_time', Date.now().toString());
    window.location.href = 'https://gameflashx.space/sl/o1m5r';
  };

  if (!product) return null;

  return (
    <div className="min-h-screen py-16 bg-background select-none">
      <div className="container mx-auto px-4">
        <Button variant="ghost" asChild className="mb-12 hover:bg-white/5 group rounded-full">
          <Link href="/products" className="flex items-center gap-2 text-muted-foreground group-hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back to Marketplace
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-card group">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            <div className="absolute top-8 left-8">
              <Badge className="bg-primary/90 text-white border-none backdrop-blur-md px-6 py-2 text-xs font-bold uppercase tracking-widest shadow-xl">
                {product.category}
              </Badge>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col gap-10">
            <div>
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-1.5 text-secondary font-black text-lg gold-text-glow">
                  <Star className="w-5 h-5 fill-secondary" />
                  {product.stats.rating}
                </div>
                <div className="text-muted-foreground text-sm font-bold flex items-center gap-2 border-l border-white/10 pl-6 uppercase tracking-wider">
                  <Download className="w-4 h-4" />
                  {product.stats.downloads} downloads
                </div>
                <div className="text-muted-foreground text-sm font-bold flex items-center gap-2 border-l border-white/10 pl-6 uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  Updated Recently
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-black font-headline mb-6 tracking-tighter leading-[1.1] uppercase">
                {product.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/[0.03] border border-white/5 p-5 rounded-2xl hover:border-primary/30 transition-all group hover:bg-white/[0.05]">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-6 mt-4">
              {isVerifying ? (
                <div className="bg-card border border-white/5 p-8 rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-sm">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Verifying Access...
                    </div>
                    <span className="text-xs font-black text-muted-foreground">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-3 mb-6 bg-white/5" />
                  <div className="flex items-center gap-3 text-sm font-medium text-white/80 animate-pulse">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    {VERIFICATION_STEPS[verificationStep]}
                  </div>
                </div>
              ) : (
                <Button 
                  onClick={handleUnlockClick}
                  size="lg" 
                  className="w-full h-20 rounded-full text-2xl font-black bg-primary hover:bg-primary/90 shadow-[0_15px_40px_rgba(168,85,247,0.4)] border-b-8 border-primary/20 active:translate-y-1 active:border-b-0 transition-all uppercase tracking-tighter group overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
                  <div className="flex items-center gap-3 relative z-10">
                    <Lock className="w-6 h-6" /> Unlock Download
                  </div>
                </Button>
              )}
              
              <div className="flex items-center justify-between gap-4 px-4">
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-secondary" />
                  Secured & Verified Access
                </div>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white rounded-full">
                  <Share2 className="w-4 h-4 mr-2" /> Share Asset
                </Button>
              </div>
            </div>

            <div className="mt-8 p-8 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
              <h3 className="font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Premium Guarantee
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm font-medium">
                NovaAssets provides curated, high-performance digital resources. Every asset is manually verified by our team to ensure it meets our strictly premium quality standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Unlock Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-card border-white/10 rounded-[2.5rem] sm:max-w-md text-center p-12 shadow-[0_0_100px_rgba(168,85,247,0.2)] outline-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary animate-pulse" />
          <div className="mx-auto w-24 h-24 bg-secondary/10 rounded-3xl flex items-center justify-center mb-8 rotate-3 hover:rotate-0 transition-transform duration-500">
            <CheckCircle2 className="w-12 h-12 text-secondary gold-text-glow" />
          </div>
          <DialogHeader className="mb-10">
            <DialogTitle className="text-4xl font-black font-headline mb-4 uppercase tracking-tighter">
              Your download is ready!
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-lg font-medium leading-tight">
              Thanks for completing the quick step. Your access to "{product.title}" has been permanently unlocked.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button 
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-16 rounded-full text-xl font-black shadow-[0_10px_30px_rgba(234,179,8,0.5)] uppercase tracking-tight group"
              onClick={() => {
                setShowSuccessModal(false);
                window.open('https://example.com/download-link', '_blank');
              }}
            >
              <Download className="mr-3 w-6 h-6 group-hover:translate-y-1 transition-transform" /> Download Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
