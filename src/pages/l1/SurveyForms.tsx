import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit2, Trash2, FileText, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface SurveyForm {
  id: number;
  name: string;
  questions: number;
  assignedACs: number;
  status: 'Active' | 'Draft';
  created: string;
}

const initialForms: SurveyForm[] = [
  { id: 1, name: 'Voter Intake Form 2025', questions: 4, assignedACs: 5, status: 'Active', created: '2024-01-15' },
  { id: 2, name: 'Local Issues Survey', questions: 3, assignedACs: 12, status: 'Active', created: '2024-02-01' },
  { id: 3, name: 'Post-Election Feedback', questions: 2, assignedACs: 0, status: 'Draft', created: '2024-03-10' },
];

// In a real app, this would be stored in a proper state management solution
const getStoredForms = (): SurveyForm[] => {
  const stored = localStorage.getItem('surveyFormsL1');
  return stored ? JSON.parse(stored) : initialForms;
};

const storeForms = (forms: SurveyForm[]) => {
  localStorage.setItem('surveyFormsL1', JSON.stringify(forms));
};

// Get form data for editing
const getFormData = (formId: number) => {
  const stored = localStorage.getItem('surveyFormsDataL1');
  if (!stored) return null;
  
  try {
    const forms = JSON.parse(stored);
    return forms.find((form: any) => form.id === formId);
  } catch (e) {
    return null;
  }
};

export const SurveyForms = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [forms, setForms] = useState<SurveyForm[]>(getStoredForms());

  useEffect(() => {
    // Update localStorage whenever forms change
    storeForms(forms);
  }, [forms]);

  const handleCreateNewForm = () => {
    navigate('/l1/surveys/builder/new');
  };

  const handleEditForm = (formId: number) => {
    // Store form data in localStorage for the builder to access
    const formData = getFormData(formId);
    if (formData) {
      localStorage.setItem('currentEditingFormL1', JSON.stringify(formData));
    }
    navigate(`/l1/surveys/builder/${formId}`);
  };

  const handleViewForm = (formId: number) => {
    navigate(`/l1/surveys/preview/${formId}`);
  };

  const handleDeleteForm = (formId: number, formName: string) => {
    setForms(forms.filter(form => form.id !== formId));
    
    // Also remove form data
    const storedData = localStorage.getItem('surveyFormsDataL1');
    if (storedData) {
      try {
        const formsData = JSON.parse(storedData);
        const updatedData = formsData.filter((form: any) => form.id !== formId);
        localStorage.setItem('surveyFormsDataL1', JSON.stringify(updatedData));
      } catch (e) {
        console.error('Error removing form data:', e);
      }
    }
    
    toast({
      title: 'Form Deleted',
      description: `"${formName}" has been deleted successfully.`
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Survey Forms Management</h1>
            <p className="text-muted-foreground">Create and manage survey forms for all constituencies</p>
          </div>
          <Button onClick={handleCreateNewForm}>
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
                {forms.map((form) => (
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
                          onClick={() => handleEditForm(form.id)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewForm(form.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteForm(form.id, form.name)}
                        >
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