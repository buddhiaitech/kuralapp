import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit2, Trash2, FileText, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockForms = [
  { id: 1, name: 'Voter Intake Form 2025', questions: 4, status: 'Active', created: '2024-01-15', assignedACs: 5 },
  { id: 2, name: 'Local Issues Survey', questions: 3, status: 'Active', created: '2024-02-01', assignedACs: 12 },
  { id: 3, name: 'Post-Election Feedback', questions: 2, status: 'Draft', created: '2024-03-10', assignedACs: 0 },
];

export const SurveyForms = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Survey Forms Management</h1>
            <p className="text-muted-foreground">Create and manage survey forms for all constituencies</p>
          </div>
          <Button onClick={() => navigate('/l1/surveys/builder/new')}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Form
          </Button>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Form Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Questions</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Assigned ACs</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Date Created</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
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
                    <td className="px-4 py-3 text-sm">{form.assignedACs} ACs</td>
                    <td className="px-4 py-3 text-sm">{form.created}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        form.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                      }`}>
                        {form.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigate(`/l1/surveys/builder/${form.id}`)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
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
