import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Grid2X2, 
  List as ListIcon,
  Calendar as CalendarIcon,
  Users,
  Clock,
  CheckCircle2,
  Layout,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { blink } from '@/lib/blink';
import { useAuth } from '@/contexts/AuthContext';
import { Project, Task } from '@/types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';

export function ProjectsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    if (!user) return;
    try {
      const [p, t] = await Promise.all([
        blink.db.projects.list({ where: { userId: user.id } }),
        blink.db.tasks.list({ where: { userId: user.id } }),
      ]);
      setProjects(p as Project[]);
      setTasks(t as Task[]);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project and all its tasks?')) return;
    
    try {
      await Promise.all([
        blink.db.projects.delete(projectId),
        blink.db.tasks.deleteMany({ where: { projectId } })
      ]);
      toast.success('Project deleted');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  const handleCreateProject = async () => {
    if (!user) return;
    const name = prompt('Project Name:');
    if (!name) return;
    
    try {
      await blink.db.projects.create({
        name,
        description: 'New workspace',
        color: '#' + Math.floor(Math.random()*16777215).toString(16),
        userId: user.id
      });
      toast.success('Project created');
      fetchData();
    } catch (error) {
      toast.error('Failed to create project');
    }
  };

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
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
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em] animate-pulse">Scanning Collections</p>
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
            Brilliance Management
          </Badge>
          <div className="space-y-1">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter gradient-text">
              Workspace
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
              You are currently supervising <span className="text-primary font-bold">{projects.length} active modules</span>. Deploy new assets to expand your workspace capability.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleCreateProject} className="h-14 px-8 font-bold text-xs uppercase tracking-[0.15em] rounded-2xl bg-accent hover:bg-accent/90 text-white shadow-2xl shadow-accent/20 transition-all active:scale-95 glow-accent gap-3">
            <Plus className="w-4 h-4" />
            Initialize Module
          </Button>
        </div>
      </motion.div>

      <div className="flex items-center gap-4 glass p-2 rounded-[2rem] border-border/50 shadow-2xl shadow-black/5">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60 group-focus-within:text-accent transition-colors" />
          <Input 
            placeholder="Search collections by identity or designation..." 
            className="pl-16 h-14 border-none bg-transparent focus-visible:ring-0 text-lg font-medium tracking-tight"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="h-8 w-px bg-border/50 hidden md:block" />
        <div className="flex items-center gap-2 px-2">
          <Button variant="ghost" size="sm" className="h-11 px-5 gap-3 text-muted-foreground/60 hover:bg-white dark:hover:bg-slate-900 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <div className="flex items-center bg-muted/30 p-1.5 rounded-2xl border border-border/50">
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 bg-white dark:bg-slate-900 shadow-sm rounded-xl">
              <Grid2X2 className="h-4.5 w-4.5 text-primary" />
            </Button>
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-muted-foreground/40 rounded-xl">
              <ListIcon className="h-4.5 w-4.5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => {
            const projectTasks = tasks.filter(t => t.projectId === project.id);
            const completedTasks = projectTasks.filter(t => t.status === 'done').length;
            const progress = projectTasks.length > 0 ? (completedTasks / projectTasks.length) * 100 : 0;
            
            return (
              <motion.div
                key={project.id}
                variants={item}
                layout
                initial="hidden"
                animate="show"
                exit={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card 
                  className="bento-card h-full cursor-pointer relative overflow-hidden flex flex-col border-none"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <div 
                    className="h-1.5 w-full absolute top-0 left-0 transition-all duration-500 group-hover:h-3" 
                    style={{ backgroundColor: project.color }}
                  />
                  <CardHeader className="p-8 pb-4 relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color }} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Active Module</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl border-border/50 shadow-2xl p-2 min-w-[180px]">
                          <DropdownMenuItem className="rounded-xl font-bold text-xs uppercase tracking-widest px-4 py-3" onClick={(e) => { e.stopPropagation(); handleDeleteProject(project.id); }}>
                            Decommission
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardTitle className="text-3xl font-black mt-6 tracking-tighter">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-sm font-medium mt-2 leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8 flex-1">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">System Progress</span>
                        <span className="text-sm font-black text-primary tracking-tighter">{Math.round(progress)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full" 
                          style={{ backgroundColor: project.color }} 
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Operations</span>
                        <span className="text-sm font-black tracking-tight">{projectTasks.length} Units</span>
                      </div>
                      <div className="flex -space-x-3">
                        {[1, 2, 3].map((_, idx) => (
                          <Avatar key={idx} className="h-9 w-9 rounded-xl border-4 border-background ring-1 ring-border/20 shadow-xl transition-all group-hover:translate-x-1">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=member-${idx}-${project.id}`} />
                            <AvatarFallback className="bg-muted font-black text-xs">M</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>

        <motion.div variants={item}>
          <Card 
            onClick={handleCreateProject}
            className="bento-card border-2 border-dashed border-border hover:border-accent/40 hover:bg-accent/5 transition-all duration-500 cursor-pointer flex flex-col items-center justify-center p-16 text-center h-full group"
          >
            <div className="w-20 h-20 rounded-[2.5rem] bg-accent/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <Plus className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-black text-2xl tracking-tighter">New Module</h3>
            <p className="text-sm text-muted-foreground/60 mt-3 font-medium max-w-[200px]">Expand your operational scope.</p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
