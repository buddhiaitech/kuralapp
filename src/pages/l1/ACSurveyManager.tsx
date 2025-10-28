import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileCheck } from 'lucide-react';
import { useState } from 'react';

const mockSurveys = [
  { id: 1, voter: 'Rajesh Kumar', booth: 'B-101', date: '2024-01-15', question: 'Which party do you prefer?', answer: 'Party A' },
  { id: 2, voter: 'Priya Sharma', booth: 'B-102', date: '2024-01-16', question: 'Main issues in your area?', answer: 'Infrastructure development' },
  { id: 3, voter: 'Arun Patel', booth: 'B-101', date: '2024-01-16', question: 'Which party do you prefer?', answer: 'Party B' },
  { id: 4, voter: 'Suresh Reddy', booth: 'B-102', date: '2024-01-17', question: 'Main issues in your area?', answer: 'Water supply' },
  { id: 5, voter: 'Meena Devi', booth: 'B-103', date: '2024-01-17', question: 'Which party do you prefer?', answer: 'Undecided' },
];

export const ACSurveyManager = () => {
  const { acNumber } = useParams();
  const navigate = useNavigate();
  const [formFilter, setFormFilter] = useState('all');
  const [boothFilter, setBoothFilter] = useState('all');

  const filteredSurveys = mockSurveys.filter(survey => {
    const matchesBooth = boothFilter === 'all' || survey.booth === boothFilter;
    return matchesBooth;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/l1/ac/${acNumber}`)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold">Survey Manager</h1>
            <p className="text-muted-foreground">AC {acNumber} - Review survey responses</p>
          </div>
        </div>

        <Card className="p-4">
          <div className="flex flex-wrap gap-4">
            <Select value={formFilter} onValueChange={setFormFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select survey form" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Forms</SelectItem>
                <SelectItem value="form1">Voter Preference Survey</SelectItem>
                <SelectItem value="form2">Issues Survey</SelectItem>
              </SelectContent>
            </Select>

            <Select value={boothFilter} onValueChange={setBoothFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by booth" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Booths</SelectItem>
                <SelectItem value="B-101">Booth B-101</SelectItem>
                <SelectItem value="B-102">Booth B-102</SelectItem>
                <SelectItem value="B-103">Booth B-103</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2">
              <FileCheck className="h-4 w-4" />
              Export Results
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          {filteredSurveys.map((survey) => (
            <Card key={survey.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{survey.voter}</h3>
                    <Badge variant="outline">{survey.booth}</Badge>
                    <span className="text-sm text-muted-foreground">{survey.date}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Q: {survey.question}</p>
                    <p className="text-sm">A: {survey.answer}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">View Full Response</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
