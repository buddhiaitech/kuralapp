import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { Users, UserCircle, Shield, CheckCircle } from 'lucide-react';

export const L0Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">System Dashboard</h1>
          <p className="text-muted-foreground">High-level overview of the entire system</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total L1 Admins"
            value="12"
            icon={Shield}
            variant="primary"
          />
          <StatCard
            title="Total L2 Moderators"
            value="45"
            icon={UserCircle}
            variant="primary"
          />
          <StatCard
            title="Total L3 Booth Agents"
            value="234"
            icon={Users}
            variant="success"
          />
          <StatCard
            title="Total Voters (All ACs)"
            value="42,567"
            icon={CheckCircle}
            variant="default"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};
