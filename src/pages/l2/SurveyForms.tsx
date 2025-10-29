import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, FileText, Trash2, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface SurveyForm {
  id: string;
  name: string;
  createdAt: string;
  questions: number;
  assignedACs: number[];
}

const initialForms: SurveyForm[] = [
  { 
    id: '1', 
    name: 'Voter Intake Form 2025', 
    createdAt: '2025-01-15',
    questions: 12,
    assignedACs: [118, 119, 120] // Assign to multiple ACs for better visibility
  },
  { 
    id: '2', 
    name: 'Local Issues Survey', 
    createdAt: '2025-01-20',
    questions: 8,
    assignedACs: [118, 120, 121] // Assign to multiple ACs for better visibility
  },
  { 
    id: '3', 
    name: 'Feedback Collection Form', 
    createdAt: '2025-02-01',
    questions: 5,
    assignedACs: [118, 119, 120, 121, 122] // Assign to multiple ACs for better visibility
  },
];

// In a real app, this would be stored in a proper state management solution
const getStoredForms = (): SurveyForm[] => {
  const stored = localStorage.getItem('surveyFormsL2');
  if (!stored) return initialForms;
  
  try {
    const parsed = JSON.parse(stored);
    // Ensure assignedACs is always an array
    return parsed.map((form: any) => ({
      ...form,
      assignedACs: Array.isArray(form.assignedACs) ? form.assignedACs : []
    }));
  } catch (e) {
    console.error('Error parsing stored forms:', e);
    return initialForms;
  }
};

const storeForms = (forms: SurveyForm[]) => {
  localStorage.setItem('surveyFormsL2', JSON.stringify(forms));
};

// Get form data for editing
const getFormData = (formId: string) => {
  const stored = localStorage.getItem('surveyFormsDataL2');
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
  const { user } = useAuth();
  const { toast } = useToast();
  const [forms, setForms] = useState<SurveyForm[]>(getStoredForms());

  useEffect(() => {
    // Update localStorage whenever forms change
    storeForms(forms);
  }, [forms]);
  
  // Filter forms assigned to this moderator's AC
  const filteredForms = forms.filter(form => {
    // If user has no assigned AC (for testing), show all forms
    if (!user?.assignedAC) {
      return true;
    }
    
    // Ensure assignedACs is an array before using includes
    const assignedACs = Array.isArray(form.assignedACs) ? form.assignedACs : [];
    // Show forms assigned to the user's AC
    return assignedACs.includes(user.assignedAC);
  });

  const handleEditForm = (formId: string) => {
    // Store form data in localStorage for the builder to access
    const formData = getFormData(formId);
    if (formData) {
      localStorage.setItem('currentEditingFormL2', JSON.stringify(formData));
    }
    navigate(`/l2/surveys/builder/${formId}`);
  };

  const handleViewForm = (formId: string) => {
    navigate(`/l2/surveys/preview/${formId}`);
  };

  const handleDeleteForm = (formId: string, formName: string) => {
    setForms(forms.filter(form => form.id !== formId));
    
    // Also remove form data
    const storedData = localStorage.getItem('surveyFormsDataL2');
    if (storedData) {
      try {
        const formsData = JSON.parse(storedData);
        const updatedData = formsData.filter((form: any) => form.id !== formId);
        localStorage.setItem('surveyFormsDataL2', JSON.stringify(updatedData));
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
            <h1 className="text-4xl font-bold mb-2">Survey Forms</h1>
            <p className="text-muted-foreground">
              Manage survey forms assigned to AC {user?.assignedAC || 'Not assigned'}
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
                  <th className="px-4 py-3 text-left text-sm font-semibold">Assigned ACs</th>
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
                      <td className="px-4 py-3 text-sm">
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(form.assignedACs) && form.assignedACs.length > 0 ? (
                            form.assignedACs.map(ac => (
                              <span key={ac} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                                {ac}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted-foreground text-xs">No ACs assigned</span>
                          )}
                        </div>
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
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