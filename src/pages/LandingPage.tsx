import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Mail, 
  FileText, 
  MessageSquare, 
  Calendar, 
  Video, 
  HardDrive,
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Sparkles,
  Search,
  Plus,
  Lock,
  Cloud,
  Shield,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
];

export function LandingPage() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroY = useTransform(smoothProgress, [0, 0.2], [0, -50]);
  const opacity = useTransform(smoothProgress, [0, 0.1], [1, 0.8]);

  return (
    <div className="min-h-screen bg-background selection:bg-accent/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white shadow-lg">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <span className="font-black text-2xl tracking-tighter">Office Brilliance</span>
        </div>
        
        <div className="hidden md:flex items-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-border/50 rounded-2xl px-6 py-2.5 gap-8">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="hidden sm:flex font-black text-[10px] uppercase tracking-widest">Login</Button>
          </Link>
          <Link to="/login">
            <Button className="h-12 px-8 rounded-2xl bg-accent hover:bg-accent/90 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-accent/10 transition-all active:scale-95">
              Start Building
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 lg:px-12">
        <motion.div 
          style={{ y: heroY, opacity }}
          className="max-w-7xl mx-auto space-y-20"
        >
          <div className="max-w-3xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge variant="outline" className="px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] bg-accent/10 text-accent border-none mb-6">
                Now in Private Beta
              </Badge>
              <h1 className="text-6xl md:text-[5.5rem] font-black tracking-tighter leading-[0.9] gradient-text">
                Your entire office,<br />brilliantly unified.
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-2xl"
            >
              Integrated email, documents, chat, calendar, and storage in one vendor-neutral platform. Use your existing infrastructure, avoid lock-in, and reduce costs.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/login">
                <Button className="h-16 px-10 rounded-[2rem] bg-accent hover:bg-accent/90 text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-accent/20 transition-all active:scale-95 group">
                  Initialize Workspace
                  <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="outline" className="h-16 px-10 rounded-[2rem] border-border/50 bg-background/50 backdrop-blur-md font-black text-xs uppercase tracking-[0.2em] hover:bg-white dark:hover:bg-slate-900 transition-all">
                Book a Demo
              </Button>
            </motion.div>
          </div>

          {/* Bento Hero Layout */}
          <div id="solutions" className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="md:col-span-8 group"
            >
              <Card className="bento-card bg-accent/5 border-accent/10 h-full overflow-hidden relative min-h-[400px]">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] -mr-64 -mt-64 transition-transform duration-1000 group-hover:scale-110" />
                <CardContent className="p-12 relative z-10 space-y-12">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-3xl font-black tracking-tight">Unified Workspace</h3>
                      <p className="text-sm font-medium text-muted-foreground">Everything your business needs in a single interface.</p>
                    </div>
                    <Badge variant="outline" className="h-8 px-4 rounded-xl border-accent/20 bg-accent/5 text-accent font-black text-[9px] uppercase tracking-widest">Core Infrastructure</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
                    {[
                      { label: 'Email Workspace', desc: 'Connect any IMAP account', icon: Mail },
                      { label: 'Document Hub', desc: 'ONLYOFFICE collaboration', icon: FileText },
                      { label: 'Team Communication', desc: 'Internal chat & meetings', icon: MessageSquare },
                    ].map((item, i) => (
                      <div key={i} className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-accent shadow-sm">
                          <item.icon className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-black uppercase tracking-widest">{item.label}</h4>
                          <p className="text-xs text-muted-foreground font-medium">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="md:col-span-4"
            >
              <Card className="bento-card h-full flex flex-col justify-between overflow-hidden bg-primary text-primary-foreground">
                <CardContent className="p-10 space-y-8">
                  <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-white shadow-xl">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tight">Vendor Neutral</h3>
                    <p className="text-sm font-medium text-primary-foreground/60 leading-relaxed">No lock-in. Maintain control over your data while using the infrastructure you already own.</p>
                  </div>
                  <div className="space-y-3">
                    {['IMAP/SMTP Ready', 'S3 Storage Compatible', 'Self-Host Options'].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 transition-all">
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                        <span className="text-xs font-bold">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Social Proof Strip */}
      <section className="py-24 border-y border-border/30 bg-muted/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-12 opacity-40 grayscale hover:opacity-60 transition-opacity">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Integrates With Your Ecosystem</p>
          <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-20">
            {['CPANEL', 'EXIM', 'POSTFIX', 'DOVECOT', 'NEXTCLOUD', 'AWS S3'].map((brand) => (
              <span key={brand} className="text-xl font-black tracking-widest">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem -> Solution Narrative */}
      <section className="py-40 px-6 lg:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <Badge variant="secondary" className="px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] bg-rose-500/10 text-rose-500 border-none">The Friction</Badge>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight">
              SaaS bloat is killing your bottom line.
            </h2>
            <p className="text-lg text-muted-foreground font-medium leading-relaxed">
              Paying for multiple ecosystem subscriptions just for email and documents is outdated. Businesses should be able to use their own hosting and infrastructure without sacrificing a modern experience.
            </p>
            <div className="space-y-6 pt-4">
              {[
                'Expensive Per-User Fees',
                'Forced Ecosystem Lock-in',
                'Loss of Data Sovereignty'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span className="text-xs font-black uppercase tracking-widest text-primary">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-accent/5 rounded-[3rem] blur-3xl -z-10" />
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 shadow-2xl border border-border/50 relative overflow-hidden"
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-border/30 pb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-muted" />
                    <div className="w-3 h-3 rounded-full bg-muted" />
                    <div className="w-3 h-3 rounded-full bg-muted" />
                  </div>
                  <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-accent border-accent/20">Consolidating...</Badge>
                </div>
                
                <div className="space-y-4">
                  {[
                    { width: 'w-3/4', color: 'bg-muted/20' },
                    { width: 'w-full', color: 'bg-muted/40' },
                    { width: 'w-1/2', color: 'bg-accent/20' }
                  ].map((row, i) => (
                    <motion.div 
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                      className={cn("h-4 rounded-lg", row.width, row.color)} 
                    />
                  ))}
                </div>

                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="bg-accent text-white p-8 rounded-2xl flex items-center justify-between shadow-xl shadow-accent/20"
                >
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Unified Perspective</p>
                    <p className="text-xl font-black">Structure Achieved</p>
                  </div>
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Sections (Bento Style) */}
      <section id="features" className="py-40 px-6 lg:px-12 bg-muted/10">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">Unified by design.</h2>
            <p className="text-lg text-muted-foreground font-medium uppercase tracking-widest">Complete office stack, re-imagined.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-4"
            >
              <Card className="bento-card h-full p-10 space-y-8 bg-background group">
                <div className="w-14 h-14 rounded-2xl bg-accent/5 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <Mail className="w-7 h-7" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black tracking-tight">Email Workspace</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">Connect any IMAP account. Unified inbox, powerful rules, and advanced search without switching providers.</p>
                </div>
              </Card>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-8"
            >
              <Card className="bento-card h-full p-10 bg-primary text-primary-foreground group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -mr-32 -mt-32 transition-transform duration-700 group-hover:translate-x-10" />
                <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                  <div className="space-y-6 flex-1">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-accent">
                      <FileText className="w-7 h-7" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black tracking-tight">Document Collaboration</h3>
                      <p className="text-primary-foreground/60 leading-relaxed font-medium">Real-time collaborative editing for documents, spreadsheets, and presentations powered by ONLYOFFICE.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                    {['Docs', 'Sheets', 'Slides', 'PDFs'].map((v, i) => (
                      <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5 text-center space-y-2">
                        <FileText className="w-6 h-6 mx-auto text-accent" />
                        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-7"
            >
              <Card className="bento-card h-full p-10 bg-background group">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="w-full md:w-1/2 space-y-6 order-2 md:order-1">
                    <div className="w-14 h-14 rounded-2xl bg-accent/5 flex items-center justify-center text-accent">
                      <MessageSquare className="w-7 h-7" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black tracking-tight">Team Communication</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed font-medium">Direct messages, group chats, and channels. Share files instantly and keep internal discussions organized.</p>
                    </div>
                  </div>
                  <div className="flex-1 bg-muted/30 rounded-[2.5rem] p-8 space-y-4 order-1 md:order-2 w-full">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user-${i}`} />
                        </Avatar>
                        <div className="h-2 flex-1 bg-muted rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="md:col-span-5"
            >
              <Card className="bento-card h-full p-10 bg-accent text-white group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                <div className="space-y-8 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                    <Video className="w-7 h-7" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black tracking-tight">Video Meetings</h3>
                    <p className="text-white/80 leading-relaxed font-medium">High-definition video meetings and screen sharing powered by Jitsi integration.</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/10 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white">Join Meeting</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-40 px-6 lg:px-12 bg-background">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">Choose your plan.</h2>
            <p className="text-lg text-muted-foreground font-medium uppercase tracking-widest">Transparent pricing for every stage.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: 'Intro', price: '₹4,000', per: 'month', users: 'Up to 15 users', features: ['Core Modules', 'Community Support', 'Basic Storage'] },
              { name: 'Basic', price: '₹299', per: 'user/mo', users: 'Per User', features: ['Everything in Intro', 'Priority Support', 'Custom Branding'], highlighted: true },
              { name: 'Standard', price: '₹499', per: 'user/mo', users: 'Per User', features: ['Advanced Automation', 'Workflow Tools', 'Larger Storage'], highlighted: false },
              { name: 'Business', price: '₹799', per: 'user/mo', users: 'Per User', features: ['Enterprise Compliance', 'Custom Integrations', 'Dedicated Account Mgr'], highlighted: false },
            ].map((plan, i) => (
              <Card key={i} className={cn(
                "bento-card p-10 flex flex-col justify-between space-y-8 transition-all duration-500",
                plan.highlighted ? "bg-primary text-primary-foreground scale-105 shadow-2xl shadow-primary/20 z-10" : "bg-background"
              )}>
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black tracking-tight">{plan.name}</h3>
                    <p className={cn("text-xs font-bold uppercase tracking-widest", plan.highlighted ? "text-primary-foreground/40" : "text-muted-foreground/40")}>{plan.users}</p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                    <span className={cn("text-xs font-black uppercase tracking-widest", plan.highlighted ? "text-primary-foreground/40" : "text-muted-foreground/40")}>/{plan.per}</span>
                  </div>
                  <div className="space-y-4 pt-4 border-t border-border/10">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <CheckCircle2 className={cn("w-4 h-4", plan.highlighted ? "text-accent" : "text-accent")} />
                        <span className="text-xs font-bold">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link to="/login">
                  <Button className={cn(
                    "w-full h-14 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all",
                    plan.highlighted ? "bg-accent hover:bg-accent/90 text-white" : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  )}>
                    Get Started
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Visualization */}
      <section id="workflow" className="py-40 px-6 lg:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">The Path to Done.</h2>
            <p className="text-lg text-muted-foreground font-medium uppercase tracking-widest">A frictionless progression engine.</p>
          </div>

          <div className="relative pt-20">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-border/30 -z-10" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {[
                { title: 'Capture', desc: 'Initialize every objective with full context.', icon: Plus },
                { title: 'Allocate', desc: 'Distribute load across your squad sectors.', icon: Users },
                { title: 'Execute', desc: 'Maintain momentum with focused toolsets.', icon: Zap },
                { title: 'Verify', desc: 'Validate completion with built-in QA flows.', icon: CheckCircle2 },
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                  className="space-y-8 bg-background relative"
                >
                  <div className="w-20 h-20 rounded-[2rem] bg-muted/30 border border-border/50 flex items-center justify-center mx-auto shadow-sm relative group hover:bg-accent/5 hover:border-accent/30 transition-all duration-500">
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-black text-[10px] shadow-lg">0{i+1}</div>
                    <step.icon className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
                  </div>
                  <div className="text-center space-y-3">
                    <h3 className="text-2xl font-black tracking-tight">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium max-w-[200px] mx-auto">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-40 px-6 lg:px-12 bg-muted/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Marcus Chen', role: 'Ops Director at SYNERGY', text: 'TeamFlow redefined our operational threshold. The bento interface is more than design—it is structural clarity.' },
            { name: 'Sarah J. Miller', role: 'Lead Engineer at VERTEX', text: 'We eliminated three other tools after integrating TeamFlow. The engine is incredibly lightweight but deeply functional.' },
            { name: 'David K. Ross', role: 'Product Lead at ORBIT', text: 'The spatial layouts changed how we perceive progress. Visibility is no longer a luxury, it is the default state.' },
          ].map((testimonial, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bento-card bg-background p-10 h-full flex flex-col justify-between space-y-8">
                <p className="text-lg font-medium leading-relaxed tracking-tight text-primary italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-border/30">
                  <Avatar className="h-12 w-12 rounded-xl border border-border/50">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user-${i+10}`} />
                    <AvatarFallback className="font-black text-xs">U</AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <p className="text-sm font-black tracking-tight">{testimonial.name}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-accent">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-60 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-accent/10 -z-10" />
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              Ready to shine?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
              Start your Office Brilliance workspace today. Deployment is instantaneous using your existing infrastructure.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <Link to="/login">
              <Button className="h-20 px-16 rounded-[2.5rem] bg-accent hover:bg-accent/90 text-white font-black text-base uppercase tracking-[0.2em] shadow-[0_30px_60px_-15px_rgba(13,148,136,0.3)] transition-all active:scale-95">
                Initialize Workspace
              </Button>
            </Link>
            <div className="flex items-center gap-3 px-8 h-20 rounded-[2.5rem] border border-border/50 bg-background/50 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Systems Operational</span>
            </div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 pt-12">Vendor-neutral infrastructure ready for deployment.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 lg:px-12 border-t border-border/30 bg-muted/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
              <span className="font-black text-xl tracking-tighter">Office Brilliance</span>
            </div>
            <p className="text-xs font-medium text-muted-foreground leading-relaxed">
              The unified business workspace for small businesses. Use your own hosting, avoid vendor lock-in, and empower your team.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">Product</p>
            <ul className="space-y-4">
              {['Email', 'Documents', 'Chat', 'Meetings', 'Storage'].map(item => (
                <li key={item}><a href="#" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">Resources</p>
            <ul className="space-y-4">
              {['Briefing', 'Operations', 'Signals', 'Feedback'].map(item => (
                <li key={item}><a href="#" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">Legal</p>
            <ul className="space-y-4">
              {['Protocols', 'Privacy', 'Compliance'].map(item => (
                <li key={item}><a href="#" className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-20 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-border/10 mt-20 opacity-40">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">© 2026 Office Brilliance Systems. All rights reserved.</p>
          <div className="flex items-center gap-8">
            {['X', 'GITHUB', 'LINKEDIN'].map(social => (
              <a key={social} href="#" className="text-[10px] font-black tracking-widest text-muted-foreground hover:text-primary transition-colors">{social}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
