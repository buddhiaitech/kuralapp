import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Activity, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const liveUpdates = [
  { id: 1, voter: 'Rajesh Kumar', booth: 'Booth 1', agent: 'Rajesh Kumar', timestamp: '2 mins ago', activity: 'Survey completed', question: 'Which party will you vote for?' },
  { id: 2, voter: 'Priya Sharma', booth: 'Booth 1', agent: 'Rajesh Kumar', timestamp: '5 mins ago', activity: 'Survey completed', question: 'What is your primary concern?' },
  { id: 3, voter: 'Suresh Babu', booth: 'Booth 3', agent: 'Priya Sharma', timestamp: '8 mins ago', activity: 'Voter details updated', question: null },
  { id: 4, voter: 'Meena Devi', booth: 'Booth 2', agent: 'Arun Patel', timestamp: '12 mins ago', activity: 'Survey completed', question: 'Rate government performance' },
];

export const LiveBoothUpdates = () => {
  const { user } = useAuth();
  const acNumber = user?.assignedAC || 118;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <Activity className="mr-3 h-8 w-8 text-success animate-pulse" />
            Live Booth Updates
          </h1>
          <p className="text-muted-foreground">Real-time activity from AC {acNumber} - Thondamuthur</p>
        </div>

        <Card className="p-4">
          <div className="flex space-x-4">
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by Booth" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Booths</SelectItem>
                <SelectItem value="1">Booth 1</SelectItem>
                <SelectItem value="2">Booth 2</SelectItem>
                <SelectItem value="3">Booth 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        <div className="space-y-4">
          {liveUpdates.map((update) => (
            <Card key={update.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                      Live
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {update.timestamp}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{update.activity}</h3>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-muted-foreground">Voter:</span>
                      <span className="ml-2 font-medium">{update.voter}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Booth:</span>
                      <span className="ml-2 font-medium">{update.booth}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Agent:</span>
                      <span className="ml-2 font-medium">{update.agent}</span>
                    </div>
                  </div>

                  {update.question && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">{update.question}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
