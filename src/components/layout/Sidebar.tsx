import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Mail,
  FileText,
  MessageSquare,
  Users, 
  Settings, 
  LogOut,
  ChevronRight,
  PlusCircle,
  Hash,
  Sparkles,
  Zap
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { blink } from '@/lib/blink';
import { Project } from '@/types';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Mail, label: 'Email', href: '/email' },
  { icon: FileText, label: 'Documents', href: '/documents' },
  { icon: MessageSquare, label: 'Chat', href: '/chat' },
  { icon: Users, label: 'Team', href: '/team' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar() {
  const { user, signOut } = useAuth();
  const [favorites, setFavorites] = React.useState<Project[]>([]);

  React.useEffect(() => {
    if (user) {
      blink.db.projects.list({ where: { userId: user.id }, limit: 5 }).then(p => {
        setFavorites(p as Project[]);
      });
    }
  }, [user]);

  return (
    <aside className="w-64 h-screen flex flex-col z-50 bg-background border-r border-border/30">
      <div className="h-20 flex items-center px-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white shadow-lg">
            <Sparkles className="w-4 h-4 fill-current" />
          </div>
          <span className="font-black text-xl tracking-tighter">Office Brilliance</span>
        </div>
      </div>

      <div className="flex-1 py-8 px-4 space-y-12 overflow-y-auto scrollbar-hide">
        <div className="space-y-4">
          <p className="px-4 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Workspace</p>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) => cn(
                  "flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all duration-300",
                  isActive 
                    ? "bg-accent/10 text-accent" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-4">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Active Modules</p>
            <Button variant="ghost" size="icon" className="h-4 w-4 rounded-md p-0 hover:bg-transparent hover:text-accent">
              <PlusCircle className="h-3 w-3" />
            </Button>
          </div>
          <nav className="space-y-1">
            {favorites.map((project) => (
              <NavLink 
                key={project.id}
                to={`/projects/${project.id}`} 
                className={({ isActive }) => cn(
                  "flex items-center gap-4 px-4 py-2.5 rounded-xl transition-all duration-300",
                  isActive 
                    ? "text-primary bg-primary/5" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                <span className="text-sm font-bold tracking-tight truncate">{project.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group">
          <Avatar className="h-8 w-8 rounded-lg shadow-sm">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`} />
            <AvatarFallback className="bg-accent text-white font-black text-[10px]">{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate tracking-tight">{user?.email?.split('@')[0]}</p>
            <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest">Team Member</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 h-10 px-3 text-muted-foreground/60 hover:text-rose-500 hover:bg-rose-500/10 font-black text-[9px] uppercase tracking-widest rounded-xl transition-all"
          onClick={signOut}
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Disconnect</span>
        </Button>
      </div>
    </aside>
  );
}
