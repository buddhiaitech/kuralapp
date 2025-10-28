import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, FileText, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const mockForms = [
  { 
    id: '1', 
    name: 'Voter Intake Form 2025', 
    createdAt: '2025-01-15',
    questions: 12,
    assignedACs: [118, 119]
  },
  { 
    id: '2', 
    name: 'Local Issues Survey', 
    createdAt: '2025-01-20',
    questions: 8,
    assignedACs: [118, 120]
  },
];

export const SurveyForms = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Filter forms assigned to this moderator's AC
  const filteredForms = mockForms.filter(form => 
    user?.assignedAC && form.assignedACs.includes(user.assignedAC)
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Survey Forms</h1>
            <p className="text-muted-foreground">
              Manage survey forms assigned to AC {user?.assignedAC}
            </p>
          </div>
          <Button onClick={() => navigate('/l2/surveys/builder/new')}>
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
                  <th className="px-4 py-3 text-left text-sm font-semibold">Date Created</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Questions</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredForms.length > 0 ? (
                  filteredForms.map((form) => (
                    <tr key={form.id} className="hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm font-medium">{form.name}</td>
                      <td className="px-4 py-3 text-sm">{form.createdAt}</td>
                      <td className="px-4 py-3 text-sm">{form.questions}</td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => navigate(`/l2/surveys/builder/${form.id}`)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                      No forms assigned to your AC yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};