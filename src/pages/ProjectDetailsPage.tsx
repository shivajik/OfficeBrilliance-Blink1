import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  PlusCircle,
  Search, 
  MoreVertical, 
  List as ListIcon,
  Columns as KanbanIcon,
  Calendar as CalendarIcon,
  Filter,
  ArrowLeft,
  Share2,
  Settings as SettingsIcon,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
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
import { Project, Task, TeamMember } from '@/types';
import { TaskListView } from '@/components/tasks/TaskListView';
import { TaskKanbanView } from '@/components/tasks/TaskKanbanView';
import { TaskCalendarView } from '@/components/tasks/TaskCalendarView';
import { TaskDialog } from '@/components/tasks/TaskDialog';
import { cn } from '@/lib/utils';

export function ProjectDetailsPage() {
  const { projectId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const fetchProjectData = async () => {
    if (!user || !projectId) return;
    try {
      const [p, t, tm] = await Promise.all([
        blink.db.projects.get(projectId),
        blink.db.tasks.list({ where: { projectId, userId: user.id } }),
        blink.db.team_members.list({ where: { userId: user.id } }),
      ]);
      setProject(p as Project);
      setTasks(t as Task[]);
      setTeam(tm as TeamMember[]);
    } catch (error) {
      console.error('Error fetching project details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, [user, projectId]);

  const handleCreateTask = () => {
    setEditingTask(undefined);
    setIsTaskDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskDialogOpen(true);
  };

  const handleTaskSaved = () => {
    fetchProjectData();
    setIsTaskDialogOpen(false);
  };

  if (isLoading) return (
    <div className="flex items-center justify-center h-full bg-background/50 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-accent/20 rounded-2xl" />
          <div className="absolute inset-0 border-4 border-accent border-t-transparent rounded-2xl animate-spin" />
        </div>
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em] animate-pulse">Initializing Sector</p>
      </div>
    </div>
  );
  if (!project) return <div className="flex items-center justify-center h-full text-2xl font-black tracking-tighter">Sector not found</div>;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      <div className="px-8 pt-12 pb-0 space-y-10 flex-shrink-0 z-10 relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex items-start gap-6">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/projects')}
              className="mt-1 h-12 w-12 rounded-2xl hover:bg-white dark:hover:bg-slate-900 border border-border/50 shadow-sm transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }} />
                <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none">{project.name}</h1>
              </div>
              <p className="text-muted-foreground/80 font-medium text-lg max-w-2xl leading-relaxed">{project.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3 mr-4">
              {team.slice(0, 4).map((member, i) => (
                <Avatar key={i} className="h-10 w-10 border-4 border-background ring-1 ring-border/30 transition-all hover:translate-y-[-4px] hover:z-10 shadow-lg">
                  <AvatarImage src={member.avatarUrl} />
                  <AvatarFallback className="bg-muted font-black text-[10px]">{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <Button className="h-12 px-6 font-black text-[10px] uppercase tracking-widest rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl transition-all active:scale-95" onClick={handleCreateTask}>
              <Plus className="w-4 h-4 mr-2" />
              New Objective
            </Button>
          </div>
        </div>

        <Tabs defaultValue="kanban" className="w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 border-b border-border/30">
            <TabsList className="bg-transparent h-auto p-0 gap-8 justify-start">
              {[
                { value: 'kanban', icon: KanbanIcon, label: 'Board' },
                { value: 'list', icon: ListIcon, label: 'List' },
                { value: 'calendar', icon: CalendarIcon, label: 'Timeline' },
                { value: 'discussions', icon: MessageSquare, label: 'Telemetry' },
              ].map((tab) => (
                <TabsTrigger 
                  key={tab.value}
                  value={tab.value} 
                  className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary border-transparent rounded-none px-0 py-2 font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-all duration-300 flex items-center gap-2"
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 transition-colors group-focus-within:text-accent" />
                <Input placeholder="Filter objectives..." className="h-10 pl-11 w-64 text-sm font-medium bg-muted/30 border-none rounded-xl focus-visible:ring-accent/30 transition-all duration-300 focus:bg-white dark:focus:bg-slate-900" />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden h-[calc(100vh-280px)]">
            <AnimatePresence mode="wait">
              <TabsContent value="kanban" className="m-0 h-full overflow-hidden focus-visible:ring-0">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }} 
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} 
                  exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }} 
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  <TaskKanbanView tasks={tasks} team={team} onEditTask={handleEditTask} onTaskUpdate={fetchProjectData} />
                </motion.div>
              </TabsContent>
              <TabsContent value="list" className="m-0 h-full overflow-y-auto focus-visible:ring-0 p-8">
                <motion.div 
                  initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }} 
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} 
                  exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TaskListView tasks={tasks} team={team} onEditTask={handleEditTask} onTaskUpdate={fetchProjectData} />
                </motion.div>
              </TabsContent>
              <TabsContent value="calendar" className="m-0 h-full overflow-y-auto focus-visible:ring-0 p-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }} 
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} 
                  exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <TaskCalendarView tasks={tasks} team={team} onEditTask={handleEditTask} />
                </motion.div>
              </TabsContent>
              <TabsContent value="discussions" className="m-0 p-8 h-full focus-visible:ring-0">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center py-32 text-center"
                >
                  <div className="w-24 h-24 bg-accent/5 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-2xl shadow-accent/5 ring-1 ring-accent/10">
                    <Sparkles className="w-12 h-12 text-accent animate-pulse" />
                  </div>
                  <h3 className="text-3xl font-black tracking-tighter gradient-text">No Transmissions</h3>
                  <p className="text-sm text-muted-foreground/60 mt-3 max-w-xs mx-auto font-medium leading-relaxed uppercase tracking-widest">Encrypted communication terminal is operational. Waiting for first broadcast.</p>
                  <Button className="mt-10 h-14 px-10 rounded-2xl font-black text-xs uppercase tracking-[0.2em] bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl shadow-primary/20 transition-all active:scale-95 glow-accent">Launch Frequency</Button>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </div>
        </Tabs>
      </div>

      <TaskDialog 
        open={isTaskDialogOpen} 
        onOpenChange={setIsTaskDialogOpen} 
        project={project}
        team={team}
        task={editingTask}
        onSaved={handleTaskSaved}
      />
    </div>
  );
}

