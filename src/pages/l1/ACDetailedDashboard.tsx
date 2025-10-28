import { useParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { ActionButton } from '@/components/ActionButton';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Home, FileCheck, MapPin, UserCircle, Activity, Clock, UserPlus, TrendingUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data
const acData: Record<string, { name: string; voters: number; families: number; surveys: number; booths: number }> = {
  '118': { name: 'Thondamuthur', voters: 1247, families: 342, surveys: 156, booths: 89 },
  '119': { name: 'Coimbatore North', voters: 2340, families: 678, surveys: 423, booths: 112 },
  '120': { name: 'Coimbatore South', voters: 1890, families: 534, surveys: 289, booths: 95 },
};

const recentActivities = [
  { id: 1, text: 'Survey completed for Family #142', time: '5 minutes ago', type: 'survey' },
  { id: 2, text: 'Updated voter details: Rajesh Kumar', time: '12 minutes ago', type: 'voter' },
  { id: 3, text: 'New family registered: Family #143', time: '23 minutes ago', type: 'family' },
  { id: 4, text: 'Booth Agent assigned to Booth #45', time: '1 hour ago', type: 'booth' },
  { id: 5, text: 'Survey completed for Family #138', time: '2 hours ago', type: 'survey' },
];

const boothPerformanceData = [
  { booth: 'Booth 1', completion: 85, voters: 450 },
  { booth: 'Booth 2', completion: 72, voters: 520 },
  { booth: 'Booth 3', completion: 91, voters: 380 },
  { booth: 'Booth 4', completion: 68, voters: 490 },
  { booth: 'Booth 5', completion: 79, voters: 410 },
];

const agentPerformanceData = [
  { name: 'High Performers', value: 45, color: 'hsl(var(--success))' },
  { name: 'Medium Performers', value: 35, color: 'hsl(var(--warning))' },
  { name: 'Low Performers', value: 20, color: 'hsl(var(--destructive))' },
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

        {/* Tabbed View with Detailed Analytics */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="booths">Booths</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="surveys">Surveys</TabsTrigger>
            <TabsTrigger value="families">Families</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
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

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity Feed
              </h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b last:border-0">
                    <div className={`mt-1 rounded-full p-1 ${
                      activity.type === 'voter' ? 'bg-primary/10' :
                      activity.type === 'booth' ? 'bg-warning/10' :
                      activity.type === 'family' ? 'bg-success/10' :
                      'bg-accent/10'
                    }`}>
                      {activity.type === 'voter' && <Users className="h-4 w-4 text-primary" />}
                      {activity.type === 'booth' && <MapPin className="h-4 w-4 text-warning" />}
                      {activity.type === 'family' && <Home className="h-4 w-4 text-success" />}
                      {activity.type === 'survey' && <FileCheck className="h-4 w-4 text-accent" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.text}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="booths" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Booth Performance Breakdown</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={boothPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="booth" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completion" fill="hsl(var(--primary))" name="Completion %" />
                  <Bar dataKey="voters" fill="hsl(var(--success))" name="Total Voters" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Agent Performance Distribution</h3>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={agentPerformanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {agentPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="surveys" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Survey Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Voter Preferences 2024</span>
                    <span className="text-sm text-muted-foreground">78%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Community Issues Survey</span>
                    <span className="text-sm text-muted-foreground">65%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Family Demographics</span>
                    <span className="text-sm text-muted-foreground">45%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="families" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Family Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">{data?.families || 0}</p>
                  <p className="text-sm text-muted-foreground">Total Families</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-success">3.2</p>
                  <p className="text-sm text-muted-foreground">Avg Family Size</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-warning">1,247</p>
                  <p className="text-sm text-muted-foreground">Single Members</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-accent">892</p>
                  <p className="text-sm text-muted-foreground">Large Families (5+)</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};
