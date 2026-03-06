export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  userId: string;
  createdAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assigneeId?: string;
  userId: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatarUrl: string;
  userId: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  type: string;
  entityId: string;
  entityType: 'project' | 'task' | 'team';
  content: string;
  userId: string;
  createdAt: string;
}
