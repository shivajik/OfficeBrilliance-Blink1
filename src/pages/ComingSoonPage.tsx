import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function ComingSoonPage() {
  return (
    <div className="h-full flex items-center justify-center p-8 bg-background/50 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-8 max-w-md"
      >
        <div className="w-20 h-20 bg-accent/10 rounded-[2.5rem] flex items-center justify-center text-accent mx-auto">
          <Sparkles className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter">Under Construction</h1>
          <p className="text-muted-foreground font-medium leading-relaxed">
            We are currently synchronizing this module. Brilliance takes time to perfect.
          </p>
        </div>
        <Link to="/">
          <Button variant="outline" className="h-12 px-8 rounded-2xl border-border/50 gap-3 font-bold text-xs uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            Back to Hub
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
