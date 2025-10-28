import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { Card } from '@/components/ui/card';
import { Users, Home, FileCheck, TrendingUp, TrendingDown } from 'lucide-react';

const acPerformance = [
  { ac: '118 - Thondamuthur', voters: 1247, completion: 12.5, activity: 'Medium' },
  { ac: '119 - Coimbatore North', voters: 2340, completion: 18.1, activity: 'High' },
  { ac: '120 - Coimbatore South', voters: 1890, completion: 15.3, activity: 'High' },
  { ac: '121 - Singanallur', voters: 1678, completion: 8.2, activity: 'Low' },
  { ac: '122 - Sulur', voters: 1534, completion: 14.7, activity: 'Medium' },
];

export const GlobalAnalytics = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Global Analytics Dashboard</h1>
          <p className="text-muted-foreground">Overall performance across all 21 Assembly Constituencies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Voters" value="26,247" icon={Users} variant="primary" />
          <StatCard title="Total Families" value="7,182" icon={Home} variant="primary" />
          <StatCard title="Surveys Completed" value="3,289" icon={FileCheck} variant="success" />
          <StatCard title="Avg Completion" value="12.5%" icon={TrendingUp} variant="warning" />
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">AC Performance Insights</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Assembly Constituency</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Total Voters</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Completion %</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Activity Level</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {acPerformance.map((row, idx) => (
                  <tr key={idx} className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm font-medium">{row.ac}</td>
                    <td className="px-4 py-3 text-sm">{row.voters.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <span>{row.completion}%</span>
                        {row.completion > 15 ? (
                          <TrendingUp className="h-4 w-4 text-success" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        row.activity === 'High' ? 'bg-success/10 text-success' :
                        row.activity === 'Medium' ? 'bg-warning/10 text-warning' :
                        'bg-destructive/10 text-destructive'
                      }`}>
                        {row.activity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-success" />
              Highest Activity AC
            </h3>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">119 - Coimbatore North</p>
              <p className="text-sm text-muted-foreground">18.1% completion rate</p>
              <p className="text-sm text-muted-foreground">423 surveys completed</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingDown className="mr-2 h-5 w-5 text-destructive" />
              Lowest Activity AC
            </h3>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-primary">121 - Singanallur</p>
              <p className="text-sm text-muted-foreground">8.2% completion rate</p>
              <p className="text-sm text-muted-foreground">138 surveys completed</p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
