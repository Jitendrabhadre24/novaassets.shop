import { CATEGORIES } from '@/app/lib/products';
import { Book, GraduationCap, Layout, Cpu, Palette } from 'lucide-react';
import Link from 'next/link';

const categoryIcons = {
  Ebooks: Book,
  Courses: GraduationCap,
  Templates: Layout,
  Software: Cpu,
  Graphics: Palette,
};

export default function Categories() {
  return (
    <section id="categories" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Browse by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find exactly what you need to take your projects to the next level.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = categoryIcons[cat];
            return (
              <Link 
                key={cat} 
                href={`/products?category=${cat}`}
                className="group flex flex-col items-center p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/50 transition-all glow-card text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Icon className="w-8 h-8 text-primary group-hover:text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{cat}</h3>
                <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  Explore Assets →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}