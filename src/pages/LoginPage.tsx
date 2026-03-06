import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { blink } from '@/lib/blink';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';
import { toast } from 'react-hot-toast';

import { Zap, Mail, Lock, Github, Chrome, ArrowRight, Sparkles } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isForgotPassword) {
        await blink.auth.sendPasswordResetEmail(email);
        setResetSent(true);
        toast.success('Security cipher propagation initiated.');
      } else if (isSignUp) {
        await blink.auth.signUp({ email, password });
        toast.success('Welcome to Office Brilliance. Workspace initializing.');
      } else {
        await blink.auth.signInWithEmail(email, password);
        toast.success('Session verified. Welcome back.');
      }
    } catch (error: any) {
      toast.error(error.message || 'Verification failure detected.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    try {
      if (provider === 'google') {
        await blink.auth.signInWithGoogle();
      } else {
        await blink.auth.signInWithGitHub();
      }
    } catch (error: any) {
      toast.error(error.message || `${provider} authentication failure.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Background visual narrative */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] -mr-96 -mt-96 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] -ml-72 -mb-72" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="flex flex-col items-center mb-12 space-y-4">
          <div className="w-16 h-16 bg-accent text-white rounded-[2rem] flex items-center justify-center shadow-2xl glow-accent transition-transform hover:rotate-12 duration-500 group cursor-pointer">
            <Sparkles className="w-8 h-8 fill-current group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-black tracking-tighter gradient-text">Office Brilliance</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent/80 mt-1">Unified Workspace Platform</p>
          </div>
        </div>

        <Card className="border-none shadow-2xl bg-white/60 dark:bg-slate-950/60 backdrop-blur-2xl rounded-[3rem] overflow-hidden relative">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-20" />
          
          <CardHeader className="p-12 pb-8 space-y-3">
            <CardTitle className="text-3xl font-black tracking-tighter text-center">
              {isForgotPassword 
                ? 'Cipher Recovery' 
                : isSignUp 
                  ? 'Initiate Sequence' 
                  : 'Session Verification'}
            </CardTitle>
            <CardDescription className="text-center text-sm font-medium text-muted-foreground/80 leading-relaxed uppercase tracking-widest max-w-[280px] mx-auto">
              {isForgotPassword
                ? resetSent 
                  ? "Check terminal for the secure uplink" 
                  : "Propagate node ID to receive recovery cipher"
                : isSignUp 
                  ? 'Initialize your personal operational environment' 
                  : 'Synchronize access keys to proceed'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-12 pb-12">
            {resetSent ? (
              <Button 
                variant="outline" 
                className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] border-border/50 hover:bg-white transition-all shadow-sm" 
                onClick={() => {
                  setResetSent(false);
                  setIsForgotPassword(false);
                }}
              >
                Back to Authentication
              </Button>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Terminal ID</Label>
                    <div className="relative group">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/40 group-focus-within:text-accent transition-colors" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="identity@collective.net" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 pl-14 rounded-2xl bg-muted/30 border-border/50 focus-visible:ring-accent/30 font-bold tracking-tight text-lg"
                      />
                    </div>
                  </div>
                  {!isForgotPassword && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Security Cipher</Label>
                        {!isSignUp && (
                          <Button 
                            type="button"
                            variant="link" 
                            className="px-0 h-auto font-black text-[10px] text-muted-foreground/60 hover:text-accent uppercase tracking-widest"
                            onClick={() => setIsForgotPassword(true)}
                          >
                            Lost Cipher?
                          </Button>
                        )}
                      </div>
                      <div className="relative group">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/40 group-focus-within:text-accent transition-colors" />
                        <Input 
                          id="password" 
                          type="password" 
                          required 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="h-14 pl-14 rounded-2xl bg-muted/30 border-border/50 focus-visible:ring-accent/30 font-black tracking-[0.3em] text-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <Button type="submit" className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] bg-primary text-primary-foreground shadow-2xl shadow-primary/20 transition-all active:scale-95 glow-accent group relative overflow-hidden" disabled={isLoading}>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="relative z-10">{isLoading ? 'Processing...' : (isForgotPassword ? 'Propagate Link' : isSignUp ? 'Initiate sequence' : 'Verify Session')}</span>
                  <ArrowRight className="ml-3 h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            )}
          </CardContent>
          
          {!resetSent && (
            <CardFooter className="px-12 pb-12 flex flex-col space-y-8">
              {!isForgotPassword && (
                <>
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border/30" />
                    </div>
                    <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em]">
                      <span className="bg-transparent px-4 text-muted-foreground/40 backdrop-blur-md">Alternative Nodes</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <Button 
                      variant="outline" 
                      className="h-12 rounded-xl border-border/50 bg-white/40 hover:bg-white dark:bg-slate-900/40 dark:hover:bg-slate-900 font-bold text-xs gap-3 transition-all shadow-sm" 
                      disabled={isLoading}
                      onClick={() => handleSocialLogin('google')}
                    >
                      <Chrome className="w-4 h-4 text-rose-500" />
                      Google
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-12 rounded-xl border-border/50 bg-white/40 hover:bg-white dark:bg-slate-900/40 dark:hover:bg-slate-900 font-bold text-xs gap-3 transition-all shadow-sm" 
                      disabled={isLoading}
                      onClick={() => handleSocialLogin('github')}
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </Button>
                  </div>
                </>
              )}
              <div className="text-center">
                {isForgotPassword ? (
                  <Button 
                    variant="ghost" 
                    className="h-auto px-6 py-2 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] text-accent hover:bg-accent/10" 
                    onClick={() => setIsForgotPassword(false)}
                  >
                    Return to verification
                  </Button>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest">{isSignUp ? 'Verified status held? ' : "No operational ID? "}</span>
                    <Button 
                      variant="ghost" 
                      className="h-auto p-0 px-2 font-black text-[11px] uppercase tracking-[0.2em] text-accent hover:bg-transparent hover:text-accent/80 transition-colors" 
                      onClick={() => {
                        setIsSignUp(!isSignUp);
                        setIsForgotPassword(false);
                      }}
                    >
                      {isSignUp ? 'Verify session' : 'Initialize ID'}
                    </Button>
                  </div>
                )}
              </div>
            </CardFooter>
          )}
        </Card>

        <div className="mt-12 text-center flex flex-col items-center space-y-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Global Systems Operational</span>
          </div>
          <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em]">© 2026 Office Brilliance Systems. High-Fidelity Infrastructure.</p>
        </div>
      </motion.div>
    </div>
  );
}
