import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/app/lib/products';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Download, ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="bg-card border-white/5 overflow-hidden glow-card group relative flex flex-col h-full rounded-[2rem]">
      <Link href={`/products/${product.id}`} className="block relative aspect-[4/3] overflow-hidden m-3 rounded-2xl">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-black/60 text-white border-none backdrop-blur-md px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">
            {product.category}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
          <span className="text-white text-xs font-bold flex items-center gap-2">
            View Details <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
      
      <CardContent className="p-6 pt-2 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-black text-xl group-hover:text-primary transition-colors font-headline uppercase tracking-tighter leading-tight">
              {product.title}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-secondary font-black bg-secondary/10 px-2 py-1 rounded-md gold-text-glow">
            <Star className="w-3 h-3 fill-secondary" />
            {product.stats.rating}
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm font-medium line-clamp-2 mb-6 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase font-black tracking-widest">
          <div className="flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5 text-primary" />
            {product.stats.downloads} Downloads
          </div>
          <div className="w-1 h-1 rounded-full bg-white/10" />
          <div className="text-secondary/80">Verified Asset</div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full bg-white/5 hover:bg-primary text-white font-black rounded-full h-14 border border-white/5 hover:border-primary shadow-sm group-hover:shadow-[0_10px_30px_rgba(168,85,247,0.3)] transition-all uppercase tracking-tighter">
          <Link href={`/products/${product.id}`}>
            Get Now — Free
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}