import React, { useEffect, useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Project, Task, TeamMember } from '@/types';
import { blink } from '@/lib/blink';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
  team: TeamMember[];
  task?: Task;
  onSaved: () => void;
}

export function TaskDialog({ open, onOpenChange, project, team, task, onSaved }: TaskDialogProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'todo' | 'in_progress' | 'review' | 'done'>('todo');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [assigneeId, setAssigneeId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
      setPriority(task.priority);
      setDueDate(task.dueDate.split('T')[0]);
      setAssigneeId(task.assigneeId || '');
    } else {
      setTitle('');
      setDescription('');
      setStatus('todo');
      setPriority('medium');
      setDueDate(new Date().toISOString().split('T')[0]);
      setAssigneeId('');
    }
  }, [task, open]);

  const handleSave = async () => {
    if (!user) return;
    if (!title.trim()) {
      toast.error('Please enter a task title');
      return;
    }

    setIsLoading(true);
    try {
      const taskData = {
        title,
        description,
        status,
        priority,
        dueDate: new Date(dueDate).toISOString(),
        assigneeId: assigneeId || null,
        projectId: project.id,
        userId: user.id,
      };

      if (task) {
        await blink.db.tasks.update(task.id, taskData);
        toast.success('Task updated successfully');
      } else {
        await blink.db.tasks.create(taskData);
        
        // Log activity
        await blink.db.activities.create({
          type: 'task_created',
          entityId: project.id,
          entityType: 'task',
          content: `Created task "${title}" in ${project.name}`,
          userId: user.id,
        });
        
        toast.success('Task created successfully');
      }
      onSaved();
    } catch (error) {
      console.error('Error saving task:', error);
      toast.error('Failed to save task');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 bg-muted/20 border-b">
          <DialogTitle className="text-xl font-heading font-bold">
            {task ? 'Edit Task' : 'Create New Task'}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-1">
            in <span className="font-semibold text-foreground">{project.name}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Title</Label>
            <Input 
              id="title" 
              placeholder="What needs to be done?" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 text-base font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Add some details..." 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none h-24"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</Label>
              <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Priority</Label>
              <Select value={priority} onValueChange={(v: any) => setPriority(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Due Date</Label>
              <Input 
                id="dueDate" 
                type="date" 
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Assignee</Label>
              <Select value={assigneeId} onValueChange={setAssigneeId}>
                <SelectTrigger>
                  <SelectValue placeholder="Unassigned" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Unassigned</SelectItem>
                  {team.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter className="p-6 bg-muted/20 border-t gap-2 sm:gap-0">
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading} className="shadow-lg shadow-primary/20 min-w-[120px]">
            {isLoading ? 'Saving...' : (task ? 'Update Task' : 'Create Task')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
