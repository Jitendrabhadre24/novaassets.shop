
'use client';

import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Clock, Mail, CheckCircle2, User as UserIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();

  const requestsQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(
      collection(db, 'users', user.uid, 'productRequests'),
      orderBy('timestamp', 'desc')
    );
  }, [db, user]);

  const { data: requests, isLoading: isRequestsLoading } = useCollection(requestsQuery);

  if (isUserLoading) return null;
  if (!user) redirect('/login');

  return (
    <div className="min-h-screen py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header Profile */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16 p-8 rounded-[2rem] bg-card/30 border border-white/5 backdrop-blur-sm">
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <UserIcon className="w-12 h-12" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black font-headline uppercase tracking-tighter mb-2">My Profile</h1>
            <div className="flex items-center gap-2 text-muted-foreground font-medium">
              <Mail className="w-4 h-4" />
              {user.email}
            </div>
          </div>
          <div className="md:ml-auto">
             <Badge className="bg-secondary text-secondary-foreground px-6 py-2 rounded-full font-black uppercase text-xs tracking-widest">
               Premium Member
             </Badge>
          </div>
        </div>

        <h2 className="text-2xl font-black font-headline uppercase tracking-tighter mb-8 flex items-center gap-3">
          <ShoppingBag className="w-6 h-6 text-primary" />
          My Requested Assets
        </h2>

        {isRequestsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 rounded-[2rem] bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : requests && requests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
              <Card key={request.id} className="bg-card border-white/5 rounded-[2rem] overflow-hidden glow-card group">
                <CardHeader className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-black uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors">
                      {request.productName}
                    </h3>
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      Requested on {format(new Date(request.timestamp), 'MMM dd, yyyy')}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-primary/80 bg-primary/10 px-3 py-1 rounded-full w-fit">
                      Processing Access
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-card/20 rounded-[2rem] border border-dashed border-white/10">
            <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-6 opacity-20" />
            <h3 className="text-xl font-bold mb-2">No active requests</h3>
            <p className="text-muted-foreground max-w-xs mx-auto mb-8 font-medium">
              Explore our marketplace and unlock your first premium asset to see it here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
