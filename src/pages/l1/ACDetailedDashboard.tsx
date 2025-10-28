import { useParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { ActionButton } from '@/components/ActionButton';
import { Card } from '@/components/ui/card';
import { Users, Home, FileCheck, MapPin, UserCircle, Activity } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Mock data
const acData: Record<string, { name: string; voters: number; families: number; surveys: number; booths: number }> = {
  '118': { name: 'Thondamuthur', voters: 1247, families: 342, surveys: 156, booths: 89 },
  '119': { name: 'Coimbatore North', voters: 2340, families: 678, surveys: 423, booths: 112 },
  '120': { name: 'Coimbatore South', voters: 1890, families: 534, surveys: 289, booths: 95 },
};

const recentActivities = [
  { id: 1, text: 'Survey completed for Family #142', time: '5 minutes ago', type: 'survey' },
  { id: 2, text: 'Updated voter details: Rajesh Kumar', time: '12 minutes ago', type: 'update' },
  { id: 3, text: 'New family registered: Family #143', time: '23 minutes ago', type: 'family' },
  { id: 4, text: 'Booth Agent assigned to Booth #45', time: '1 hour ago', type: 'agent' },
  { id: 5, text: 'Survey completed for Family #138', time: '2 hours ago', type: 'survey' },
];

export const ACDetailedDashboard = () => {
  const { acNumber } = useParams<{ acNumber: string }>();
  const data = acData[acNumber || '118'] || acData['118'];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Assembly Constituency {acNumber}</h1>
          <p className="text-xl text-muted-foreground">{data.name}</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Voters"
            value={data.voters.toLocaleString()}
            icon={Users}
            variant="primary"
          />
          <StatCard
            title="Total Families"
            value={data.families.toLocaleString()}
            icon={Home}
            variant="primary"
          />
          <StatCard
            title="Surveys Completed"
            value={data.surveys.toLocaleString()}
            icon={FileCheck}
            variant="success"
          />
          <StatCard
            title="Total Booths"
            value={data.booths.toLocaleString()}
            icon={MapPin}
            variant="warning"
          />
        </div>

        <Separator />

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ActionButton
              icon={Users}
              title="Voter Manager"
              description="View & update voter details"
              href={`/l1/ac/${acNumber}/voters`}
            />
            <ActionButton
              icon={Home}
              title="Family Manager"
              description="Manage family records"
              href={`/l1/ac/${acNumber}/families`}
            />
            <ActionButton
              icon={FileCheck}
              title="Survey Manager"
              description="Complete or review surveys"
              href={`/l1/ac/${acNumber}/surveys`}
            />
            <ActionButton
              icon={Activity}
              title="Reports"
              description="View performance and statistics"
              href={`/l1/ac/${acNumber}/reports`}
            />
          </div>
        </div>

        <Separator />

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <Card className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="p-2 rounded-full bg-accent">
                    {activity.type === 'survey' && <FileCheck className="h-4 w-4 text-success" />}
                    {activity.type === 'update' && <Users className="h-4 w-4 text-primary" />}
                    {activity.type === 'family' && <Home className="h-4 w-4 text-primary" />}
                    {activity.type === 'agent' && <UserCircle className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
