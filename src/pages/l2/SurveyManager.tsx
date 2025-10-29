import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FileCheck, Filter } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useMemo } from 'react';

interface Survey {
  id: number;
  voter: string;
  voterId: string;
  booth: string;
  question: string;
  answer: string;
  date: string;
  agent: string;
}

interface Form {
  id: number;
  name: string;
}

const initialSurveys: Survey[] = [
  { id: 1, voter: 'Rajesh Kumar', voterId: 'TND1234567', booth: 'Booth 1', question: 'Which party will you vote for?', answer: 'Party A', date: '2024-03-15', agent: 'Rajesh Kumar' },
  { id: 2, voter: 'Priya Sharma', voterId: 'TND1234568', booth: 'Booth 1', question: 'What is your primary concern?', answer: 'Healthcare', date: '2024-03-15', agent: 'Rajesh Kumar' },
  { id: 3, voter: 'Suresh Babu', voterId: 'TND1234571', booth: 'Booth 3', question: 'Rate government performance', answer: '7/10', date: '2024-03-14', agent: 'Priya Sharma' },
  { id: 4, voter: 'Arun Patel', voterId: 'TND1234569', booth: 'Booth 2', question: 'Which party will you vote for?', answer: 'Party B', date: '2024-03-14', agent: 'Arun Patel' },
];

const assignedForms: Form[] = [
  { id: 1, name: 'Voter Intake Form 2025' },
  { id: 2, name: 'Local Issues Survey' },
];

export const SurveyManager = () => {
  const { user } = useAuth();
  const acNumber = user?.assignedAC || 118;
  const [selectedForm, setSelectedForm] = useState<string>('all');
  const [filterBooth, setFilterBooth] = useState<string>('all');

  const filteredSurveys = useMemo(() => {
    return initialSurveys.filter(survey => {
      // Form filter (in a real app, this would filter by actual form)
      if (selectedForm !== 'all') {
        // For demo purposes, we'll just filter by form ID
        // In a real implementation, this would filter by actual form data
      }
      
      // Booth filter
      if (filterBooth !== 'all' && survey.booth !== `Booth ${filterBooth}`) {
        return false;
      }
      
      return true;
    });
  }, [selectedForm, filterBooth]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Survey Manager</h1>
          <p className="text-muted-foreground">Review survey responses for AC {acNumber} - Thondamuthur</p>
        </div>

        <Card className="p-4">
          <div className="flex flex-wrap gap-4">
            <Select value={selectedForm} onValueChange={setSelectedForm}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select Survey Form to View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Forms</SelectItem>
                {assignedForms.map((form) => (
                  <SelectItem key={form.id} value={form.id.toString()}>
                    {form.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterBooth} onValueChange={setFilterBooth}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Booth" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Booths</SelectItem>
                <SelectItem value="1">Booth 1</SelectItem>
                <SelectItem value="2">Booth 2</SelectItem>
                <SelectItem value="3">Booth 3</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          {filteredSurveys.map((survey) => (
            <Card key={survey.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <FileCheck className="h-5 w-5 text-success" />
                    <h3 className="text-lg font-semibold">{survey.voter}</h3>
                    <span className="text-sm text-muted-foreground">({survey.voterId})</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Booth:</span>
                      <span className="ml-2 font-medium">{survey.booth}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Date:</span>
                      <span className="ml-2 font-medium">{survey.date}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Agent:</span>
                      <span className="ml-2 font-medium">{survey.agent}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground mb-2">{survey.question}</p>
                    <p className="text-base font-semibold">{survey.answer}</p>
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