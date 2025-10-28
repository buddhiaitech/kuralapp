import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Edit2, Trash2, FileText } from 'lucide-react';
import { useState } from 'react';

const mockQuestions = [
  { id: 1, text: 'Which party will you vote for?', type: 'Multiple Choice', status: 'Active', created: '2024-01-15' },
  { id: 2, text: 'What is your primary concern?', type: 'Multiple Choice', status: 'Active', created: '2024-01-20' },
  { id: 3, text: 'Rate government performance', type: 'Rating Scale', status: 'Active', created: '2024-02-01' },
  { id: 4, text: 'Additional comments', type: 'Text', status: 'Inactive', created: '2024-02-10' },
];

const mockForms = [
  { id: 1, name: 'Voter Intake Form 2025', questions: 4, status: 'Active', created: '2024-01-15' },
  { id: 2, name: 'Local Issues Survey', questions: 3, status: 'Active', created: '2024-02-01' },
  { id: 3, name: 'Post-Election Feedback', questions: 2, status: 'Draft', created: '2024-03-10' },
];

export const SurveyBank = () => {
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Survey Form & Question Management</h1>
          <p className="text-muted-foreground">Create survey forms and manage question bank</p>
        </div>

        <Tabs defaultValue="questions" className="space-y-6">
          <TabsList>
            <TabsTrigger value="questions">Question Bank</TabsTrigger>
            <TabsTrigger value="forms">Form Builder</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Question Bank</h2>
              <Dialog open={isQuestionDialogOpen} onOpenChange={setIsQuestionDialogOpen}>
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
                    <Button className="w-full" onClick={() => setIsQuestionDialogOpen(false)}>
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
          </TabsContent>

          <TabsContent value="forms" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Survey Forms</h2>
              <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Form
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Survey Form</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="formName">Form Name</Label>
                      <Input id="formName" placeholder="e.g., Voter Intake Form 2025" />
                    </div>
                    <div className="space-y-3">
                      <Label>Select Questions from Question Bank</Label>
                      <Card className="p-4 space-y-2 max-h-96 overflow-y-auto">
                        {mockQuestions.map((question) => (
                          <div key={question.id} className="flex items-start space-x-3 p-2 hover:bg-muted/50 rounded">
                            <Checkbox
                              id={`q-${question.id}`}
                              checked={selectedQuestions.includes(question.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedQuestions([...selectedQuestions, question.id]);
                                } else {
                                  setSelectedQuestions(selectedQuestions.filter(id => id !== question.id));
                                }
                              }}
                            />
                            <div className="flex-1">
                              <label htmlFor={`q-${question.id}`} className="text-sm font-medium cursor-pointer">
                                {question.text}
                              </label>
                              <p className="text-xs text-muted-foreground">{question.type}</p>
                            </div>
                          </div>
                        ))}
                      </Card>
                      <p className="text-sm text-muted-foreground">
                        {selectedQuestions.length} question(s) selected
                      </p>
                    </div>
                    <Button className="w-full" onClick={() => {
                      setIsFormDialogOpen(false);
                      setSelectedQuestions([]);
                    }}>
                      Create Form
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
                      <th className="px-4 py-3 text-left text-sm font-semibold">Form Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Questions</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Created</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {mockForms.map((form) => (
                      <tr key={form.id} className="hover:bg-muted/50">
                        <td className="px-4 py-3 text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <span>{form.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{form.questions} questions</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            form.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                          }`}>
                            {form.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">{form.created}</td>
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
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};
