import React from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  CreditCard,
  Mail,
  Lock,
  Camera,
  Check,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export function SettingsPage() {
  const { user } = useAuth();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="page-container space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="space-y-4">
          <Badge variant="secondary" className="px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] bg-accent/10 text-accent border-none glow-accent">
            Control Center
          </Badge>
          <div className="space-y-1">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter gradient-text">
              Settings
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
              Fine-tune your <span className="text-primary font-bold text-base uppercase tracking-widest">Personal Workspace</span> parameters and operational preferences.
            </p>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-muted/30 h-auto p-1.5 rounded-[1.5rem] gap-2 border border-border/50 shadow-inner mb-12">
          {[
            { value: 'general', icon: User, label: 'Identity' },
            { value: 'notifications', icon: Bell, label: 'Alerts' },
            { value: 'security', icon: Shield, label: 'Vault' },
            { value: 'billing', icon: CreditCard, label: 'Treasury' },
          ].map((tab) => (
            <TabsTrigger 
              key={tab.value}
              value={tab.value} 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-xl data-[state=active]:text-primary rounded-xl px-10 py-3 font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-all duration-300 flex items-center gap-3 border border-transparent data-[state=active]:border-border/50"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="general" className="space-y-10 focus-visible:ring-0">
            <motion.div 
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }} 
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} 
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-10"
            >
              <Card className="premium-card bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-none overflow-hidden">
                <CardHeader className="p-10 pb-8 border-b border-border/30">
                  <CardTitle className="text-2xl font-black tracking-tight uppercase tracking-[0.1em]">Public Identity Profile</CardTitle>
                  <CardDescription className="text-sm font-medium">How your presence is represented across the collective workspace.</CardDescription>
                </CardHeader>
                <CardContent className="p-10 space-y-12">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
                    <div className="relative group">
                      <Avatar className="h-32 w-32 rounded-[2.5rem] border-4 border-background shadow-2xl ring-4 ring-border/30 transition-all duration-500 group-hover:scale-105 group-hover:rotate-3">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`} />
                        <AvatarFallback className="bg-accent text-white font-black text-4xl">{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <Button size="icon" className="h-10 w-10 rounded-2xl absolute -bottom-2 -right-2 bg-primary text-white shadow-2xl border-4 border-background hover:scale-110 active:scale-95 transition-all glow-accent">
                        <Camera className="h-5 h-5" />
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-black text-xl tracking-tight leading-none">Avatar Identity</h3>
                      <p className="text-sm text-muted-foreground/80 font-medium max-w-sm leading-relaxed">System Recommendation: High-contrast individual portrait. Optimal size: 2MB or below.</p>
                      <div className="flex items-center gap-4 pt-4">
                        <Button size="lg" className="rounded-2xl h-12 px-8 font-black text-[11px] uppercase tracking-[0.1em] shadow-xl shadow-primary/10">Initialize Upload</Button>
                        <Button size="lg" variant="ghost" className="rounded-2xl h-12 px-8 font-black text-[11px] uppercase tracking-[0.1em] text-rose-500 hover:bg-rose-500/10">Reset Node</Button>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-border/30" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <Label htmlFor="firstName" className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Handle Name</Label>
                      <Input id="firstName" className="h-14 rounded-2xl bg-muted/30 border-border/50 focus-visible:ring-accent/30 font-black px-6 text-lg tracking-tight" defaultValue={user?.email?.split('@')[0]} />
                    </div>
                    <div className="space-y-4">
                      <Label htmlFor="lastName" className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Squad Surname</Label>
                      <Input id="lastName" className="h-14 rounded-2xl bg-muted/30 border-border/50 focus-visible:ring-accent/30 font-black px-6 text-lg tracking-tight" placeholder="Collective Alpha" />
                    </div>
                    <div className="space-y-4">
                      <Label htmlFor="email" className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Communication Node</Label>
                      <div className="relative group">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/40 transition-colors group-focus-within:text-accent" />
                        <Input id="email" className="h-14 pl-14 rounded-2xl bg-muted/20 border-border/30 font-black px-6 text-lg tracking-tight opacity-60 cursor-not-allowed" defaultValue={user?.email || ''} readOnly />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Label htmlFor="timezone" className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Temporal Zone</Label>
                      <div className="relative group">
                        <Globe className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/40 transition-colors group-focus-within:text-accent" />
                        <Input id="timezone" className="h-14 pl-14 rounded-2xl bg-muted/30 border-border/50 focus-visible:ring-accent/30 font-black px-6 text-lg tracking-tight" defaultValue="PST (UTC -8:00)" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="p-8 bg-muted/20 border-t border-border/30 flex justify-end gap-4">
                  <Button variant="ghost" className="h-14 px-10 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60 hover:text-primary">Cancel Protocol</Button>
                  <Button className="h-14 px-12 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] bg-primary shadow-2xl shadow-primary/20 glow-accent">Commit Session Changes</Button>
                </div>
              </Card>

              <Card className="premium-card bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-none overflow-hidden">
                <CardHeader className="p-10 pb-8 border-b border-border/30">
                  <CardTitle className="text-2xl font-black tracking-tight uppercase tracking-[0.1em]">System Visual Preferences</CardTitle>
                  <CardDescription className="text-sm font-medium">Fine-tune your sensory experience within the platform interface.</CardDescription>
                </CardHeader>
                <CardContent className="p-10 space-y-10">
                  <div className="flex items-center justify-between group hover:translate-x-1 transition-transform duration-300">
                    <div className="space-y-2">
                      <Label className="text-xl font-black tracking-tight">Stealth Environment</Label>
                      <p className="text-sm text-muted-foreground/80 font-medium max-w-md">Activate dark mode protocols for reduced optical strain during high-intensity late-night sessions.</p>
                    </div>
                    <Switch className="data-[state=checked]:bg-emerald-500 scale-125" />
                  </div>
                  <Separator className="bg-border/30" />
                  <div className="flex items-center justify-between group hover:translate-x-1 transition-transform duration-300">
                    <div className="space-y-2">
                      <Label className="text-xl font-black tracking-tight">Synchronized Tactical Intel</Label>
                      <p className="text-sm text-muted-foreground/80 font-medium max-w-md">Propagate a comprehensive summary of your team's operational progress every 168-hour cycle.</p>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-accent scale-125 glow-accent" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="security" className="space-y-10 focus-visible:ring-0">
            <motion.div 
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }} 
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} 
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="premium-card bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-none overflow-hidden max-w-3xl">
                <CardHeader className="p-10 pb-8 border-b border-border/30">
                  <CardTitle className="text-2xl font-black tracking-tight uppercase tracking-[0.1em]">Authentication Security Layer</CardTitle>
                  <CardDescription className="text-sm font-medium">Maintain the operational integrity of your personal access node.</CardDescription>
                </CardHeader>
                <CardContent className="p-10 space-y-10">
                  <div className="space-y-4">
                    <Label htmlFor="current" className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Current Protocol Cipher</Label>
                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/40 transition-colors group-focus-within:text-accent" />
                      <Input id="current" type="password" className="h-14 pl-14 rounded-2xl bg-muted/30 border-border/50 focus-visible:ring-accent/30 font-black px-6 tracking-widest" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="new" className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">New Access Cipher</Label>
                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/40 transition-colors group-focus-within:text-accent" />
                      <Input id="new" type="password" className="h-14 pl-14 rounded-2xl bg-muted/30 border-border/50 focus-visible:ring-accent/30 font-black px-6 tracking-widest" />
                    </div>
                  </div>
                  <div className="pt-6">
                    <Button className="h-14 px-12 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] bg-primary shadow-2xl shadow-primary/20 glow-accent transition-all active:scale-95">Rotate Security Access Keys</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="billing" className="space-y-10 focus-visible:ring-0">
            <motion.div 
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }} 
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} 
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="premium-card bg-primary text-primary-foreground border-none overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -ml-48 -mb-48" />
                
                <CardHeader className="p-12 pb-10 border-b border-white/5 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-4xl font-black tracking-tighter text-white">Enterprise Strategic Core</CardTitle>
                      <CardDescription className="text-white/60 text-lg font-medium">Flagship access protocol enabled. Infinite operational work streams active.</CardDescription>
                    </div>
                    <div className="w-20 h-20 rounded-[2.5rem] bg-white/5 backdrop-blur-3xl flex items-center justify-center shadow-2xl ring-1 ring-white/10">
                      <Award className="w-10 h-10 text-accent glow-accent" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-12 space-y-12 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[
                      'Infinite Command Decks',
                      'High-Performance Squads',
                      'Deep Tactical Analytics',
                      'Advanced Grid Modality',
                      'Priority Support Uplink',
                      'Zero Latency Protocol Sync'
                    ].map((feature, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                        className="flex items-center gap-4"
                      >
                        <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 ring-1 ring-accent/30 shadow-lg shadow-accent/10">
                          <Check className="w-4 h-4 text-accent" />
                        </div>
                        <span className="text-sm font-black tracking-tight text-white/90 uppercase tracking-widest">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 p-10 rounded-[2.5rem] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl">
                    <div className="space-y-2">
                      <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 leading-none">Operational Status</p>
                      <p className="text-3xl font-black text-white tracking-tighter">ACTIVE PROTOCOL</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="outline" className="h-14 px-10 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] border-white/10 bg-white/5 text-white hover:bg-white hover:text-primary transition-all duration-500">Manage Treasury Ledger</Button>
                      <Button className="h-14 px-12 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] bg-accent text-white shadow-2xl shadow-accent/20 hover:scale-[1.05] active:scale-95 transition-all duration-500 glow-accent">Expand Strategic Reach</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}

