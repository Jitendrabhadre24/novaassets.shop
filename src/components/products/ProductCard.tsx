import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/app/lib/products';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Download } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="bg-card border-white/5 overflow-hidden glow-card group">
      <Link href={`/products/${product.id}`} className="block relative aspect-video overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary/90 text-white border-none backdrop-blur-sm">
            {product.category}
          </Badge>
        </div>
      </Link>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors font-headline truncate">
              {product.title}
            </h3>
          </Link>
          <div className="flex items-center gap-1 text-xs text-secondary font-medium shrink-0">
            <Star className="w-3 h-3 fill-secondary" />
            {product.stats.rating}
          </div>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 h-10">
          {product.description}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Download className="w-3 h-3" />
            {product.stats.downloads} downloads
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-full shadow-[0_4px_10px_rgba(140,64,255,0.3)] group-hover:shadow-[0_4px_20px_rgba(140,64,255,0.5)] transition-all">
          <Link href={`/products/${product.id}`}>
            Get Now — Free
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}