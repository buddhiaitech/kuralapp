import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Activity, Clock } from 'lucide-react';

const liveSurveys = [
  { id: 1, voter: 'Rajesh Kumar', booth: 'Booth 1', ac: '118 - Thondamuthur', agent: 'Rajesh Kumar', timestamp: '2 mins ago', question: 'Which party will you vote for?', answer: 'Party A' },
  { id: 2, voter: 'Priya Sharma', booth: 'Booth 2', ac: '118 - Thondamuthur', agent: 'Priya Sharma', timestamp: '5 mins ago', question: 'What is your primary concern?', answer: 'Healthcare' },
  { id: 3, voter: 'Arun Patel', booth: 'Booth 1', ac: '119 - Coimbatore North', agent: 'Arun Patel', timestamp: '8 mins ago', question: 'Rate government performance', answer: '7/10' },
  { id: 4, voter: 'Meena Devi', booth: 'Booth 3', ac: '120 - Coimbatore South', agent: 'Deepa Singh', timestamp: '12 mins ago', question: 'Which party will you vote for?', answer: 'Party B' },
  { id: 5, voter: 'Suresh Babu', booth: 'Booth 1', ac: '118 - Thondamuthur', agent: 'Rajesh Kumar', timestamp: '15 mins ago', question: 'What is your primary concern?', answer: 'Employment' },
];

export const LiveSurveyMonitor = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <Activity className="mr-3 h-8 w-8 text-success animate-pulse" />
            Live Survey Monitor
          </h1>
          <p className="text-muted-foreground">Real-time survey submissions from all 21 Assembly Constituencies</p>
        </div>

        <Card className="p-4">
          <div className="flex space-x-4">
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by AC" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All ACs</SelectItem>
                <SelectItem value="118">118 - Thondamuthur</SelectItem>
                <SelectItem value="119">119 - Coimbatore North</SelectItem>
                <SelectItem value="120">120 - Coimbatore South</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by Question" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Questions</SelectItem>
                <SelectItem value="q1">Which party will you vote for?</SelectItem>
                <SelectItem value="q2">What is your primary concern?</SelectItem>
                <SelectItem value="q3">Rate government performance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        <div className="space-y-4">
          {liveSurveys.map((survey) => (
            <Card key={survey.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                      New
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {survey.timestamp}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{survey.voter}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">AC:</span>
                      <span className="ml-2 font-medium">{survey.ac}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Booth:</span>
                      <span className="ml-2 font-medium">{survey.booth}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Agent:</span>
                      <span className="ml-2 font-medium">{survey.agent}</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground mb-1">{survey.question}</p>
                    <p className="text-sm font-semibold">{survey.answer}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
