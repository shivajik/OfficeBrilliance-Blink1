import React from 'react';
import { 
  MoreHorizontal, 
  Plus, 
  Calendar,
  MessageSquare,
  Paperclip,
  Clock,
  Layers,
  ChevronRight
} from 'lucide-react';
import { motion, Reorder } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Task, TeamMember } from '@/types';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskKanbanViewProps {
  tasks: Task[];
  team: TeamMember[];
  onEditTask: (task: Task) => void;
  onTaskUpdate: () => void;
}

const COLUMNS = [
  { id: 'todo', title: 'Preparation', color: 'bg-slate-400', glow: 'shadow-slate-400/20' },
  { id: 'in_progress', title: 'Active Phase', color: 'bg-accent', glow: 'shadow-accent/20' },
  { id: 'review', title: 'Validation', color: 'bg-indigo-500', glow: 'shadow-indigo-500/20' },
  { id: 'done', title: 'Archived', color: 'bg-emerald-500', glow: 'shadow-emerald-500/20' },
];

export function TaskKanbanView({ tasks, team, onEditTask, onTaskUpdate }: TaskKanbanViewProps) {
  const getTasksByStatus = (status: string) => tasks.filter(t => t.status === status);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-rose-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-slate-400';
    }
  };

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

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="h-full flex gap-12 p-8 overflow-x-auto bg-transparent scrollbar-hide"
    >
      {COLUMNS.map((column) => (
        <motion.div 
          key={column.id} 
          variants={item}
          className="flex-shrink-0 w-[360px] flex flex-col gap-6"
        >
          <div className="flex items-center justify-between px-4 h-12">
            <div className="flex items-center gap-3">
              <div className={cn("w-2 h-2 rounded-full", column.color)} />
              <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {column.title}
              </h3>
              <Badge variant="secondary" className="h-5 px-2 text-[9px] font-black bg-muted/50 border-none">
                {getTasksByStatus(column.id).length}
              </Badge>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl opacity-0 hover:opacity-100 transition-opacity">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto min-h-0 pb-12 scrollbar-hide">
            {getTasksByStatus(column.id).map((task) => (
              <motion.div
                key={task.id}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                layoutId={task.id}
                className="group"
              >
                <Card 
                  className="bento-card cursor-pointer overflow-hidden border-none p-6 space-y-4"
                  onClick={() => onEditTask(task)}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="text-base font-bold leading-tight tracking-tight line-clamp-2">
                        {task.title}
                      </h4>
                    </div>
                    {task.description && (
                      <p className="text-[13px] text-muted-foreground/80 line-clamp-2 font-medium">
                        {task.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-1 h-4 rounded-full", getPriorityColor(task.priority))} />
                      {task.dueDate && (
                        <span className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          {format(parseISO(task.dueDate), 'MMM d')}
                        </span>
                      )}
                    </div>
                    <Avatar className="h-8 w-8 rounded-lg shadow-sm border border-border/50 transition-transform group-hover:scale-110">
                      <AvatarImage src={team.find(m => m.id === task.assigneeId)?.avatarUrl} />
                      <AvatarFallback className="bg-muted font-black text-[10px]">{team.find(m => m.id === task.assigneeId)?.name[0] || '?'}</AvatarFallback>
                    </Avatar>
                  </div>
                </Card>
              </motion.div>
            ))}
            
            {getTasksByStatus(column.id).length === 0 && (
              <div className="border-2 border-dashed border-border/30 rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center bg-muted/5 group hover:bg-muted/10 transition-all duration-500">
                <p className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-[0.2em]">Staging Area</p>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

