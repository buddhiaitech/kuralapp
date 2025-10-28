import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  UserCog,
  LogOut,
  Home,
  UserCircle,
  Activity,
  FileText,
} from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface DashboardLayoutProps {
  children: ReactNode;
}

const roleLabels = {
  L0: 'Super Admin',
  L1: 'Admin (ACIM)',
  L2: 'Moderator (ACI)',
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getMenuItems = () => {
    switch (user?.role) {
      case 'L0':
        return [
          { icon: LayoutDashboard, label: 'System Dashboard', path: '/l0/dashboard' },
          { icon: UserCog, label: 'Admin Management', path: '/l0/admins' },
          { icon: Users, label: 'Voter Data', path: '/l0/voters' },
          { icon: FileText, label: 'Survey Question Bank', path: '/l0/surveys' },
          { icon: Settings, label: 'App Settings', path: '/l0/settings' },
        ];
      case 'L1':
        return [
          { icon: Home, label: 'Constituencies', path: '/l1/constituencies' },
          { icon: BarChart3, label: 'Analytics Dashboard', path: '/l1/analytics' },
          { icon: FileText, label: 'Survey Form Assignments', path: '/l1/survey-assignments' },
          { icon: UserCog, label: 'Moderator Management', path: '/l1/moderators' },
          { icon: Users, label: 'Booth Agent Management', path: '/l1/agents' },
          { icon: Activity, label: 'Live Survey Monitor', path: '/l1/live-surveys' },
        ];
      case 'L2':
        return [
          { icon: LayoutDashboard, label: 'My Dashboard', path: '/l2/dashboard' },
          { icon: Users, label: 'Voter Manager', path: '/l2/voters' },
          { icon: Home, label: 'Family Manager', path: '/l2/families' },
          { icon: FileText, label: 'Survey Manager', path: '/l2/surveys' },
          { icon: UserCircle, label: 'Booth Agent Management', path: '/l2/agents' },
          { icon: Activity, label: 'Live Booth Updates', path: '/l2/live-updates' },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">AC Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Management System</p>
        </div>
        
        <Separator />
        
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </nav>

        <Separator />

        <div className="p-4">
          <div className="mb-4 p-3 bg-accent rounded-lg">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{roleLabels[user?.role || 'L0']}</p>
            {user?.assignedAC && (
              <p className="text-xs text-muted-foreground mt-1">AC {user.assignedAC}</p>
            )}
          </div>
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
