import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Users,
  TrendingUp,
  MoreVertical,
  ArrowUpRight,
  Briefcase,
  Calendar,
  Layout,
  Mail,
  FileText,
  MessageSquare,
  Sparkles,
  Zap,
  Box,
  ShieldAlert
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { blink } from '@/lib/blink';
import { useAuth } from '@/contexts/AuthContext';
import { Project, Task, TeamMember, Activity } from '@/types';
import { format, isToday, isPast, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

export function DashboardPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const [p, t, tm, a] = await Promise.all([
          blink.db.projects.list({ where: { userId: user.id } }),
          blink.db.tasks.list({ where: { userId: user.id } }),
          blink.db.team_members.list({ where: { userId: user.id } }),
          blink.db.activities.list({ where: { userId: user.id }, orderBy: { createdAt: 'desc' }, limit: 5 }),
        ]);
        setProjects(p as Project[]);
        setTasks(t as Task[]);
        setTeam(tm as TeamMember[]);
        setActivities(a as Activity[]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const stats = [
    { label: 'Workspace Modules', value: projects.length, icon: Box, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Active Items', value: tasks.length, icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Due Today', value: tasks.filter(t => isToday(parseISO(t.dueDate)) && t.status !== 'done').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Attention Required', value: tasks.filter(t => isPast(parseISO(t.dueDate)) && !isToday(parseISO(t.dueDate)) && t.status !== 'done').length, icon: ShieldAlert, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const chartData = projects.map(p => {
    const projectTasks = tasks.filter(t => t.projectId === p.id);
    const completed = projectTasks.filter(t => t.status === 'done').length;
    const progress = projectTasks.length > 0 ? (completed / projectTasks.length) * 100 : 0;
    return { name: p.name, progress, color: p.color };
  });

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
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em] animate-pulse">Synchronizing Workspace Hub</p>
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
            Brilliance Hub Active
          </Badge>
          <div className="space-y-1">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter gradient-text">
              Workspace Hub
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
              Ascertain your progress, <span className="text-primary font-bold">{user?.displayName || 'Member'}</span>. You have <span className="text-accent font-black">{tasks.filter(t => isToday(parseISO(t.dueDate)) && t.status !== 'done').length} workspace items</span> demanding your attention today.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="h-14 px-8 font-bold text-xs uppercase tracking-[0.15em] rounded-2xl border-border/50 bg-white/40 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900 shadow-sm transition-all duration-300">
            Export Workspace State
          </Button>
          <Button className="h-14 px-8 font-bold text-xs uppercase tracking-[0.15em] rounded-2xl bg-accent hover:bg-accent/90 text-white shadow-2xl shadow-accent/20 transition-all active:scale-95 glow-accent">
            Invite Team
          </Button>
        </div>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        {/* Row 1: Key Stats & Focus Task */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div key={i} variants={item}>
              <Card className="bento-card group border-none">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className={cn(stat.bg, stat.color, "w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-black/5")}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em]">{stat.label}</p>
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-black tracking-tighter">{stat.value}</h3>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} className="md:col-span-4 h-full">
          <Card className="bento-card bg-primary text-primary-foreground h-full overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-150" />
            <CardContent className="p-8 relative z-10 flex flex-col h-full justify-between">
              <div className="space-y-4">
                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-white/20 text-white/60 px-3 py-1">Top Item</Badge>
                {tasks.filter(t => t.status !== 'done').length > 0 ? (
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black tracking-tight leading-tight">
                      {tasks.filter(t => t.status !== 'done')[0].title}
                    </h4>
                    <p className="text-white/60 text-sm font-medium">Focus on this item to maintain workspace momentum.</p>
                  </div>
                ) : (
                  <h4 className="text-2xl font-black tracking-tight">Workspace clear.</h4>
                )}
              </div>
              <Button className="mt-8 bg-white text-primary hover:bg-white/90 rounded-2xl h-12 font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95">
                Resume Work
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Row 2: Charts & Activities */}
        <motion.div variants={item} className="md:col-span-8">
          <Card className="bento-card overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-8 pb-0">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-black tracking-tight">Workspace Velocity</CardTitle>
                <CardDescription className="text-sm font-medium">Efficiency across active modules</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="h-8 px-3 rounded-xl border-border/50 text-[9px] font-black uppercase tracking-widest">Live Updates</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="h-[300px] w-full mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 32 }}>
                    <CartesianGrid strokeDasharray="6 6" horizontal={false} stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      axisLine={false} 
                      tickLine={false} 
                      width={120} 
                      style={{ fontSize: '11px', fontWeight: 800, fill: 'hsl(var(--primary))', letterSpacing: '-0.02em' }}
                    />
                    <Tooltip 
                      cursor={{ fill: 'hsl(var(--accent) / 0.05)', radius: 8 }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-border/50">
                              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">{payload[0].payload.name}</p>
                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black tracking-tighter">{payload[0].value}%</span>
                                <span className="text-[9px] font-bold text-accent uppercase tracking-widest">Efficiency</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="progress" radius={[0, 8, 8, 0]} barSize={24}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.9} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="md:col-span-4">
          <Card className="bento-card overflow-hidden bg-accent/5 border-accent/10">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black tracking-tight flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-accent" />
                Workspace Pulse
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              {activities.slice(0, 4).map((activity, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer relative">
                  {i !== 3 && <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-border/30" />}
                  <Avatar className="h-10 w-10 rounded-xl ring-2 ring-background transition-all group-hover:scale-110">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.userId}`} />
                    <AvatarFallback className="bg-accent text-white font-bold text-xs">{activity.content.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-xs font-medium leading-relaxed">
                      <span className="font-black text-primary">Member</span>
                      <span className="ml-1 text-muted-foreground">{activity.content}</span>
                    </p>
                    <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest">
                      {format(parseISO(activity.createdAt), 'HH:mm')}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Row 3: Priority & Team */}
        <motion.div variants={item} className="md:col-span-7">
          <Card className="bento-card">
            <CardHeader className="p-8 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-black tracking-tight">Priority Matrix</CardTitle>
                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest hover:bg-accent/10 text-accent">Full Grid</Button>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-2 space-y-3">
              {tasks.filter(t => isToday(parseISO(t.dueDate)) && t.status !== 'done').slice(0, 3).map((task, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all border border-transparent hover:border-border/50 group"
                >
                  <div className={cn(
                    "w-1 h-10 rounded-full",
                    task.priority === 'high' ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]' : task.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate tracking-tight">{task.title}</p>
                    <p className="text-[10px] text-muted-foreground/60 font-black uppercase tracking-widest mt-1">
                      {projects.find(p => p.id === task.projectId)?.name}
                    </p>
                  </div>
                  <Badge variant="outline" className="h-6 px-2 text-[9px] font-black uppercase tracking-widest rounded-lg bg-background">Due EOD</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="md:col-span-5">
          <Card className="bento-card">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black tracking-tight">Team Pulse</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-2 space-y-5">
              <div className="flex -space-x-4 mb-6">
                {team.map((member, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5, zIndex: 10 }}
                    className="relative"
                  >
                    <Avatar className="h-12 w-12 rounded-2xl border-4 border-background ring-2 ring-border/20 shadow-xl transition-all">
                      <AvatarImage src={member.avatar_url || member.avatarUrl} />
                      <AvatarFallback className="bg-muted font-black">{member.name[0]}</AvatarFallback>
                    </Avatar>
                  </motion.div>
                ))}
                <div className="h-12 w-12 rounded-2xl border-4 border-background ring-2 ring-border/20 bg-muted flex items-center justify-center text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  +{team.length}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Operational Capacity</span>
                  <span className="text-[10px] font-black text-accent uppercase tracking-widest">84% Optimal</span>
                </div>
                <Progress value={84} className="h-1.5 bg-muted/50" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
