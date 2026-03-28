
"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ShoppingBag, Menu, X, Sparkles, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/#categories' },
  ];

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <header className="sticky top-0 z-50 glass-morphism w-full">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.6)] group-hover:rotate-6 transition-transform">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter font-headline text-white uppercase">
            Nova<span className="text-primary italic">Assets</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          {!isUserLoading && (
            user ? (
              <div className="flex items-center gap-4 border-l border-white/10 pl-10">
                <Link 
                  href="/dashboard"
                  className={cn(
                    "flex items-center gap-2 text-xs font-black uppercase tracking-widest",
                    pathname === '/dashboard' ? "text-primary" : "text-muted-foreground hover:text-white"
                  )}
                >
                  <User className="w-4 h-4" /> Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Button asChild variant="default" className="bg-primary hover:bg-primary/90 rounded-full px-8 h-12 font-black uppercase tracking-wider text-xs shadow-[0_5px_15px_rgba(168,85,247,0.4)]">
                <Link href="/signup">
                  <Sparkles className="w-4 h-4 mr-2" /> Join Free
                </Link>
              </Button>
            )
          )}
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-white/5 p-6 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-xl font-black uppercase tracking-tighter p-3 rounded-2xl",
                  pathname === link.href ? "bg-primary/10 text-primary" : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            {!user ? (
               <Button asChild variant="default" className="bg-primary hover:bg-primary/90 w-full rounded-full h-16 text-lg font-black uppercase tracking-tighter">
                <Link href="/signup">Get Started</Link>
              </Button>
            ) : (
              <>
                <Link href="/dashboard" className="text-xl font-black uppercase tracking-tighter p-3">Dashboard</Link>
                <button onClick={handleLogout} className="text-xl font-black uppercase tracking-tighter p-3 text-left text-destructive">Logout</button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
