import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Search, 
  Mail, 
  Shield, 
  MoreVertical,
  UserPlus,
  TrendingUp,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { blink } from '@/lib/blink';
import { useAuth } from '@/contexts/AuthContext';
import { TeamMember, Task } from '@/types';
import { cn } from '@/lib/utils';

export function TeamPage() {
  const { user } = useAuth();
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const [tm, t] = await Promise.all([
          blink.db.team_members.list({ where: { userId: user.id } }),
          blink.db.tasks.list({ where: { userId: user.id } }),
        ]);
        setTeam(tm as TeamMember[]);
        setTasks(t as Task[]);
      } catch (error) {
        console.error('Error fetching team:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const filteredTeam = team.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center h-full bg-background/50 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-accent/20 rounded-2xl" />
          <div className="absolute inset-0 border-4 border-accent border-t-transparent rounded-2xl animate-spin" />
        </div>
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em] animate-pulse">Compiling Directory</p>
      </div>
    </div>
  );

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
            Personnel Management System
          </Badge>
          <div className="space-y-1">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter gradient-text">
              Team
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
              Orchestrate your high-performance <span className="text-primary font-bold">squad of {team.length} specialists</span>. Monitor cognitive load and operational throughput.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button className="h-14 px-8 font-bold text-xs uppercase tracking-[0.15em] rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl shadow-primary/20 transition-all active:scale-95 glow-accent gap-3">
            <UserPlus className="w-4 h-4" />
            Recruit Specialist
          </Button>
        </div>
      </motion.div>

      <div className="flex items-center gap-4 glass p-2 rounded-[2rem] border-border/50 shadow-2xl shadow-black/5">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60 group-focus-within:text-accent transition-colors" />
          <Input 
            placeholder="Search by identity, designation, or communication terminal..." 
            className="pl-16 h-14 border-none bg-transparent focus-visible:ring-0 text-lg font-medium tracking-tight"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredTeam.map((member, i) => {
            const memberTasks = tasks.filter(t => t.assigneeId === member.id);
            const activeTasks = memberTasks.filter(t => t.status !== 'done').length;
            
            return (
              <motion.div
                key={member.id}
                variants={item}
                layout
                initial="hidden"
                animate="show"
                exit={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="premium-card h-full flex flex-col relative overflow-hidden bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-none">
                  <div className="absolute top-0 right-0 w-48 h-48 -mr-16 -mt-16 bg-accent/5 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  
                  <CardHeader className="p-8 pb-4 relative">
                    <div className="flex items-start justify-between">
                      <div className="relative">
                        <Avatar className="h-24 w-24 rounded-[2rem] border-4 border-background shadow-2xl ring-4 ring-border/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                          <AvatarImage src={member.avatarUrl} />
                          <AvatarFallback className="bg-accent text-white font-black text-2xl">{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-xl border-4 border-background shadow-xl" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-slate-900 border border-border/50 shadow-sm">
                            <MoreVertical className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl border-border/50 shadow-2xl p-2 min-w-[180px]">
                          <DropdownMenuItem className="rounded-xl font-bold text-xs uppercase tracking-widest px-4 py-3">Review Profile</DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl font-bold text-xs uppercase tracking-widest px-4 py-3">Edit Clearance</DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl font-bold text-xs uppercase tracking-widest px-4 py-3 text-rose-500 focus:bg-rose-500/10 focus:text-rose-500">Terminate Protocol</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-8 space-y-2">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-3xl font-black tracking-tighter group-hover:text-accent transition-colors">{member.name}</CardTitle>
                        <Award className="w-5 h-5 text-amber-500 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0" />
                      </div>
                      <p className="text-[11px] font-black text-muted-foreground/60 uppercase tracking-[0.2em]">{member.role}</p>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-8 pt-4 space-y-8 flex-1">
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-border/20 transition-all duration-300 group-hover:border-accent/30 shadow-sm">
                        <Mail className="w-4 h-4 text-muted-foreground/60" />
                        <span className="text-sm font-bold tracking-tight text-foreground/80">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-border/20 transition-all duration-300 group-hover:border-accent/30 shadow-sm">
                        <Shield className="w-4 h-4 text-accent" />
                        <Badge variant="secondary" className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-accent/10 text-accent border-none glow-accent">Authorized Personnel</Badge>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-border/30 grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <p className="text-[10px] text-muted-foreground/60 font-black uppercase tracking-[0.2em] leading-none">Active Load</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-black tracking-tighter">{activeTasks}</span>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Units</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[10px] text-muted-foreground/60 font-black uppercase tracking-[0.2em] leading-none">Successful Exits</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-black tracking-tighter text-emerald-500">{memberTasks.length - activeTasks}</span>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Finalized</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <div className="p-6 mt-auto">
                    <Button variant="ghost" className="w-full h-14 text-[11px] font-black uppercase tracking-[0.2em] text-accent hover:bg-accent/10 rounded-2xl transition-all duration-300 group-hover:shadow-xl shadow-accent/5 border border-transparent hover:border-accent/20">
                      Performance Telemetry
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

