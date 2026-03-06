import React from 'react';
import { Search, Bell, HelpCircle, PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/button-group'; // Wait, Input is usually in input.tsx
import { Input as CustomInput } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Header() {
  return (
    <header className="h-24 flex items-center justify-between px-8 relative z-40 bg-background/40 backdrop-blur-md border-b border-border/50">
      <div className="flex-1 max-w-xl relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 group-focus-within:text-accent transition-colors" />
        <CustomInput 
          placeholder="Search documents, emails, or chat..." 
          className="pl-12 h-12 bg-white/40 dark:bg-slate-900/40 border-border/50 focus-visible:ring-accent/50 rounded-2xl transition-all duration-300 focus:bg-white dark:focus:bg-slate-900 shadow-sm"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center bg-white/40 dark:bg-slate-900/40 rounded-2xl p-1.5 border border-border/50 shadow-sm">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl relative hover:bg-white dark:hover:bg-slate-900 transition-all duration-300">
            <Bell className="h-5 w-5 text-muted-foreground/80" />
            <Badge className="absolute top-2 right-2 h-2.5 w-2.5 p-0 bg-accent ring-2 ring-background border-none" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white dark:hover:bg-slate-900 transition-all duration-300">
            <HelpCircle className="h-5 w-5 text-muted-foreground/80" />
          </Button>
        </div>
        
        <div className="h-8 w-[1px] bg-border/50" />
        
        <Button size="lg" className="h-12 px-8 font-bold text-xs uppercase tracking-[0.15em] rounded-2xl bg-accent hover:bg-accent/90 text-white shadow-2xl shadow-accent/20 transition-all active:scale-95 group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <span className="relative z-10">Compose</span>
          <PlusCircle className="ml-3 h-4 w-4 transition-transform group-hover:rotate-90 relative z-10" />
        </Button>
      </div>
    </header>
  );
}
