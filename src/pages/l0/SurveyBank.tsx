import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useState } from 'react';

const mockQuestions = [
  { id: 1, text: 'Which party will you vote for?', type: 'Multiple Choice', status: 'Active', created: '2024-01-15' },
  { id: 2, text: 'What is your primary concern?', type: 'Multiple Choice', status: 'Active', created: '2024-01-20' },
  { id: 3, text: 'Rate government performance', type: 'Rating Scale', status: 'Active', created: '2024-02-01' },
  { id: 4, text: 'Additional comments', type: 'Text', status: 'Inactive', created: '2024-02-10' },
];

export const SurveyBank = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Survey Question Bank</h1>
            <p className="text-muted-foreground">Create and manage survey questions for all constituencies</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Question
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Survey Question</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="question">Question Text</Label>
                  <Input id="question" placeholder="Enter your question" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Question Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multiple">Multiple Choice</SelectItem>
                      <SelectItem value="rating">Rating Scale</SelectItem>
                      <SelectItem value="text">Text Input</SelectItem>
                      <SelectItem value="yesno">Yes/No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="options">Options (for Multiple Choice)</Label>
                  <Input id="options" placeholder="Option 1, Option 2, Option 3" />
                </div>
                <Button className="w-full" onClick={() => setIsOpen(false)}>
                  Create Question
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Question</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Created</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockQuestions.map((question) => (
                  <tr key={question.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm font-medium max-w-md">{question.text}</td>
                    <td className="px-4 py-3 text-sm">{question.type}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        question.status === 'Active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                      }`}>
                        {question.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{question.created}</td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
