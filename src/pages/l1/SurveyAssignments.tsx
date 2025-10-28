import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Plus } from 'lucide-react';
import { useState } from 'react';

const mockForms = [
  { id: 1, name: 'Voter Intake Form 2025' },
  { id: 2, name: 'Local Issues Survey' },
  { id: 3, name: 'Post-Election Feedback' },
];

const mockACs = Array.from({ length: 21 }, (_, i) => ({
  id: i + 1,
  number: 100 + i,
  name: i === 18 ? 'Thondamuthur' : `AC ${100 + i}`
}));

const mockAssignments = [
  { id: 1, formName: 'Voter Intake Form 2025', acNumber: 118, acName: 'Thondamuthur', dateAssigned: '2024-03-15' },
  { id: 2, formName: 'Local Issues Survey', acNumber: 118, acName: 'Thondamuthur', dateAssigned: '2024-03-14' },
  { id: 3, formName: 'Voter Intake Form 2025', acNumber: 101, acName: 'AC 101', dateAssigned: '2024-03-13' },
  { id: 4, formName: 'Post-Election Feedback', acNumber: 105, acName: 'AC 105', dateAssigned: '2024-03-12' },
];

export const SurveyAssignments = () => {
  const [selectedForm, setSelectedForm] = useState<string>('');
  const [selectedAC, setSelectedAC] = useState<string>('');

  const handleAssign = () => {
    if (selectedForm && selectedAC) {
      console.log('Assigning form:', selectedForm, 'to AC:', selectedAC);
      setSelectedForm('');
      setSelectedAC('');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Survey Form Assignments</h1>
          <p className="text-muted-foreground">Assign survey forms to Assembly Constituencies</p>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Create New Assignment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="formSelect">Select Survey Form</Label>
              <Select value={selectedForm} onValueChange={setSelectedForm}>
                <SelectTrigger id="formSelect">
                  <SelectValue placeholder="Choose a form" />
                </SelectTrigger>
                <SelectContent>
                  {mockForms.map((form) => (
                    <SelectItem key={form.id} value={form.id.toString()}>
                      {form.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="acSelect">Select Assembly Constituency</Label>
              <Select value={selectedAC} onValueChange={setSelectedAC}>
                <SelectTrigger id="acSelect">
                  <SelectValue placeholder="Choose an AC" />
                </SelectTrigger>
                <SelectContent>
                  {mockACs.map((ac) => (
                    <SelectItem key={ac.id} value={ac.id.toString()}>
                      {ac.number} - {ac.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                className="w-full" 
                onClick={handleAssign}
                disabled={!selectedForm || !selectedAC}
              >
                <Plus className="mr-2 h-4 w-4" />
                Assign Form
              </Button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Current Assignments</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Survey Form Name</TableHead>
                  <TableHead>Assigned AC</TableHead>
                  <TableHead>Date Assigned</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAssignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell className="font-medium">{assignment.formName}</TableCell>
                    <TableCell>{assignment.acNumber} - {assignment.acName}</TableCell>
                    <TableCell>{assignment.dateAssigned}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
