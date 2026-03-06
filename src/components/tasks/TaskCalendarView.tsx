import React from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  parseISO
} from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Task, TeamMember } from '@/types';
import { cn } from '@/lib/utils';

interface TaskCalendarViewProps {
  tasks: Task[];
  team: TeamMember[];
  onEditTask: (task: Task) => void;
}

export function TaskCalendarView({ tasks, team, onEditTask }: TaskCalendarViewProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-rose-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="h-full flex flex-col bg-background px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 font-medium px-3" onClick={() => setCurrentMonth(new Date())}>
            Today
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col border rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-7 bg-muted/30 border-b">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="py-2 text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        <div className="flex-1 grid grid-cols-7 auto-rows-fr min-h-0">
          {days.map((day, i) => {
            const dayTasks = tasks.filter((task) => isSameDay(parseISO(task.dueDate), day));
            const isSelectedMonth = isSameMonth(day, monthStart);
            const isToday = isSameDay(day, new Date());

            return (
              <div 
                key={day.toString()} 
                className={cn(
                  "border-r border-b p-2 min-h-[100px] flex flex-col gap-1 transition-colors hover:bg-muted/10",
                  !isSelectedMonth && "bg-muted/5 text-muted-foreground/30",
                  i % 7 === 6 && "border-r-0"
                )}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={cn(
                    "text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full",
                    isToday && "bg-primary text-primary-foreground",
                    !isToday && isSelectedMonth && "text-foreground",
                    !isSelectedMonth && "text-muted-foreground/40"
                  )}>
                    {format(day, 'd')}
                  </span>
                  {isSelectedMonth && (
                    <Button variant="ghost" size="icon" className="h-5 w-5 opacity-0 hover:opacity-100 transition-opacity">
                      <Plus className="h-3 w-3" />
                    </Button>
                  )}
                </div>
                <div className="flex-1 space-y-1 overflow-y-auto scrollbar-hide">
                  {dayTasks.map((task) => (
                    <div 
                      key={task.id}
                      onClick={() => onEditTask(task)}
                      className={cn(
                        "px-1.5 py-1 rounded text-[10px] font-medium text-white truncate cursor-pointer transition-transform hover:scale-[1.02]",
                        getPriorityColor(task.priority),
                        task.status === 'done' && "opacity-50 line-through"
                      )}
                    >
                      {task.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
