import React from 'react';
import { 
  MoreVertical, 
  Calendar,
  MessageSquare,
  Paperclip,
  CheckCircle2,
  Circle,
  GripVertical
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Task, TeamMember } from '@/types';
import { format, parseISO } from 'date-fns';
import { blink } from '@/lib/blink';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface TaskListViewProps {
  tasks: Task[];
  team: TeamMember[];
  onEditTask: (task: Task) => void;
  onTaskUpdate: () => void;
}

export function TaskListView({ tasks, team, onEditTask, onTaskUpdate }: TaskListViewProps) {
  const toggleTaskStatus = async (task: Task) => {
    const nextStatus = task.status === 'done' ? 'todo' : 'done';
    await blink.db.tasks.update(task.id, { status: nextStatus });
    onTaskUpdate();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-rose-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader className="border-none">
          <TableRow className="hover:bg-transparent border-b border-border/30">
            <TableHead className="w-[40px]"></TableHead>
            <TableHead className="w-[400px] text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 py-4">Designation</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Personnel</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Status</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Temporal</TableHead>
            <TableHead className="w-[80px] text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} className="group hover:bg-muted/30 transition-all border-b border-border/10">
              <TableCell className="py-4">
                <button 
                  onClick={() => toggleTaskStatus(task)} 
                  className="w-5 h-5 rounded-md border-2 border-muted transition-all flex items-center justify-center hover:border-primary"
                >
                  {task.status === 'done' && <CheckCircle2 className="h-3 w-3 text-primary" />}
                </button>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span 
                    className={cn(
                      "font-bold text-[15px] tracking-tight group-hover:text-primary transition-colors cursor-pointer",
                      task.status === 'done' && "opacity-40"
                    )} 
                    onClick={() => onEditTask(task)}
                  >
                    {task.title}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className={cn("w-1 h-3 rounded-full", getPriorityColor(task.priority))} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">
                      ID: {task.id.slice(0, 6)}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-7 w-7 rounded-lg border border-border/50">
                    <AvatarImage src={team.find(m => m.id === task.assigneeId)?.avatarUrl} />
                    <AvatarFallback className="bg-muted font-black text-[9px]">{team.find(m => m.id === task.assigneeId)?.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-bold tracking-tight">
                    {team.find(m => m.id === task.assigneeId)?.name || 'N/A'}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="bg-muted/50 text-muted-foreground font-black text-[9px] uppercase tracking-widest border-none px-2 h-6">
                  {task.status.replace('_', ' ')}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground/60">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{format(parseISO(task.dueDate), 'MMM dd')}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl border-border/50 shadow-2xl">
                    <DropdownMenuItem className="text-xs font-bold py-2 px-3 rounded-lg" onClick={() => onEditTask(task)}>Details</DropdownMenuItem>
                    <DropdownMenuItem className="text-xs font-bold py-2 px-3 rounded-lg text-rose-500">Archive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
