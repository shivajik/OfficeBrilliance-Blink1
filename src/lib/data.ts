import { blink } from './blink';
import { Project, Task, TeamMember, Activity } from '@/types';

export const SEED_DATA = {
  projects: [
    { name: 'Email Workspace', description: 'Unified inbox and SMTP/IMAP integration.', color: '#0d9488' },
    { name: 'Document Hub', description: 'ONLYOFFICE powered collaborative document editing.', color: '#3b82f6' },
    { name: 'Team Communication', description: 'Internal team chat, channels, and video meetings.', color: '#8b5cf6' },
    { name: 'Secure Storage', description: 'S3 compatible file storage and sharing.', color: '#f59e0b' },
  ],
  team: [
    { name: 'Alex Rivera', role: 'Operations Manager', email: 'alex@officebrilliance.com', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
    { name: 'Jordan Smith', role: 'Support Specialist', email: 'jordan@officebrilliance.com', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan' },
    { name: 'Sam Wilson', role: 'Solutions Architect', email: 'sam@officebrilliance.com', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam' },
    { name: 'Taylor Reed', role: 'Infrastructure Engineer', email: 'taylor@officebrilliance.com', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor' },
  ],
};

export async function seedDemoData(userId: string) {
  // Check if data already exists
  const existingProjects = await blink.db.projects.list({ where: { userId }, limit: 1 });
  if (existingProjects.length > 0) return;

  // Create Team Members
  const createdTeam = await Promise.all(SEED_DATA.team.map(m => 
    blink.db.team_members.create({ ...m, userId })
  ));

  // Create Projects
  const createdProjects = await Promise.all(SEED_DATA.projects.map(p => 
    blink.db.projects.create({ ...p, userId })
  ));

  // Create Tasks for each module (representing features/setup items)
  for (const project of createdProjects) {
    let tasks: any[] = [];
    
    if (project.name === 'Email Workspace') {
      tasks = [
        { title: 'Connect primary IMAP', description: 'Configure main business email account.', status: 'done', priority: 'high', dueDate: new Date().toISOString(), assigneeId: createdTeam[0].id },
        { title: 'Set up unified folders', description: 'Organize inboxes from multiple providers.', status: 'in_progress', priority: 'medium', dueDate: new Date(Date.now() + 86400000).toISOString(), assigneeId: createdTeam[0].id },
      ];
    } else if (project.name === 'Document Hub') {
      tasks = [
        { title: 'Import Q1 Report', description: 'Migrate existing .docx files to ONLYOFFICE.', status: 'done', priority: 'high', dueDate: new Date().toISOString(), assigneeId: createdTeam[2].id },
        { title: 'Enable collaborative editing', description: 'Invite stakeholders to edit document.', status: 'todo', priority: 'medium', dueDate: new Date(Date.now() + 172800000).toISOString(), assigneeId: createdTeam[2].id },
      ];
    } else {
      tasks = [
        { title: 'Initialize module', description: 'Configure basic settings for the module.', status: 'done', priority: 'low', dueDate: new Date().toISOString(), assigneeId: createdTeam[1].id },
        { title: 'User onboarding', description: 'Guide team through the new workspace features.', status: 'todo', priority: 'medium', dueDate: new Date(Date.now() + 259200000).toISOString(), assigneeId: createdTeam[1].id },
      ];
    }

    await Promise.all(tasks.map(t => 
      blink.db.tasks.create({ ...t, projectId: project.id, userId })
    ));

    // Create some activity
    await blink.db.activities.create({
      type: 'project_created',
      entityId: project.id,
      entityType: 'project',
      content: `Workspace Module "${project.name}" was initialized.`,
      userId,
    });
  }
}
