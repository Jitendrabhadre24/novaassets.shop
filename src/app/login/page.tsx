
'use client';

import { useState } from 'react';
import { useAuth } from '@/firebase';
import { initiateEmailSignIn } from '@/firebase/non-blocking-login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingBag, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && !isUserLoading) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    initiateEmailSignIn(auth, email, password);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-background hero-gradient">
      <Card className="w-full max-w-md border-white/5 bg-card/50 backdrop-blur-xl rounded-[2rem] overflow-hidden">
        <CardHeader className="pt-12 pb-8 text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
            <ShoppingBag className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-black font-headline uppercase tracking-tighter">Welcome Back</h1>
          <p className="text-muted-foreground font-medium">Access your premium assets dashboard.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 bg-white/5 border-white/10 rounded-xl px-6 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-14 bg-white/5 border-white/10 rounded-xl px-6 focus:ring-primary"
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full h-14 rounded-xl font-black uppercase tracking-widest bg-primary hover:bg-primary/90">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Login to Account'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="pb-12 justify-center">
          <p className="text-sm text-muted-foreground font-medium">
            Don't have an account? <Link href="/signup" className="text-primary hover:underline">Sign up for free</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
