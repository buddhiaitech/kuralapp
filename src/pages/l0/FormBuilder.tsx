import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, GripVertical, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const constituencies = [
  { number: 118, name: 'Thondamuthur' },
  { number: 119, name: 'Coimbatore North' },
  { number: 120, name: 'Coimbatore South' },
  { number: 121, name: 'Singanallur' },
  { number: 122, name: 'Sulur' },
  { number: 123, name: 'Kavundampalayam' },
  { number: 124, name: 'Kaundampalayam' },
  { number: 125, name: 'Pollachi' },
  { number: 126, name: 'Valparai' },
  { number: 127, name: 'Udumalaipettai' },
  { number: 128, name: 'Madathukulam' },
  { number: 129, name: 'Palladam' },
  { number: 130, name: 'Dharapuram' },
  { number: 131, name: 'Kangayam' },
  { number: 132, name: 'Perundurai' },
  { number: 133, name: 'Bhavani' },
  { number: 134, name: 'Anthiyur' },
  { number: 135, name: 'Gobichettipalayam' },
  { number: 136, name: 'Erode East' },
  { number: 137, name: 'Erode West' },
  { number: 138, name: 'Modakurichi' },
];

type QuestionType = 'short-text' | 'paragraph' | 'yes-no' | 'multiple-choice' | 'checkboxes' | 'dropdown' | 'date' | 'number';

interface Question {
  id: string;
  text: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
}

interface FormData {
  title: string;
  description: string;
  questions: Question[];
  assignedACs: number[];
}

export const FormBuilder = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const isNewForm = formId === 'new';
  const isL0 = user?.role === 'L0';
  const isL1 = user?.role === 'L1';

  // Get form data from localStorage based on formId
  const getFormById = (id: string) => {
    if (id === 'new') return null;
    
    // Try to get from temporary storage first (for editing)
    const tempStorageKey = isL0 ? 'currentEditingForm' : isL1 ? 'currentEditingFormL1' : 'currentEditingFormL2';
    const tempStored = localStorage.getItem(tempStorageKey);
    if (tempStored) {
      try {
        const tempForm = JSON.parse(tempStored);
        if (tempForm.id.toString() === id) {
          return tempForm;
        }
      } catch (e) {
        // If parsing fails, continue to regular storage
      }
    }
    
    // Otherwise get from regular data storage
    const storageKey = isL0 ? 'surveyFormsData' : isL1 ? 'surveyFormsDataL1' : 'surveyFormsDataL2';
    const storedForms = localStorage.getItem(storageKey);
    if (!storedForms) return null;
    
    try {
      const forms = JSON.parse(storedForms);
      return forms.find((form: any) => form.id.toString() === id);
    } catch (e) {
      return null;
    }
  };

  // Initialize form data based on whether it's a new form or editing existing
  const initialFormData = () => {
    if (isNewForm) {
      return {
        title: '',
        description: '',
        assignedACs: [],
        questions: [],
      };
    }
    
    // Try to load existing form data
    const existingForm = getFormById(formId || '');
    if (existingForm) {
      return {
        title: existingForm.title || '',
        description: existingForm.description || '',
        assignedACs: existingForm.assignedACs || [],
        questions: existingForm.questions || [],
      };
    }
    
    // Fallback to default data if form not found
    return {
      title: 'Voter Intake Form 2025',
      description: 'Collect voter information and preferences',
      assignedACs: [118, 119],
      questions: [
        {
          id: '1',
          text: 'What is your name?',
          type: 'short-text',
          required: true,
        },
        {
          id: '2',
          text: 'Which party will you vote for?',
          type: 'multiple-choice',
          required: true,
          options: ['Party A', 'Party B', 'Party C', 'Undecided'],
        },
      ],
    };
  };

  const [formData, setFormData] = useState<FormData>(initialFormData());

  // Clean up temporary storage when component unmounts
  useEffect(() => {
    return () => {
      const tempStorageKey = isL0 ? 'currentEditingForm' : isL1 ? 'currentEditingFormL1' : 'currentEditingFormL2';
      localStorage.removeItem(tempStorageKey);
    };
  }, [isL0, isL1]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: '',
      type: 'short-text',
      required: false,
    };
    setFormData({
      ...formData,
      questions: [...formData.questions, newQuestion],
    });
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setFormData({
      ...formData,
      questions: formData.questions.map(q => 
        q.id === id ? { ...q, ...updates } : q
      ),
    });
  };

  const deleteQuestion = (id: string) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter(q => q.id !== id),
    });
  };

  const addOption = (questionId: string) => {
    const question = formData.questions.find(q => q.id === questionId);
    if (!question) return;
    
    const newOptions = [...(question.options || []), ''];
    updateQuestion(questionId, { options: newOptions });
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    const question = formData.questions.find(q => q.id === questionId);
    if (!question || !question.options) return;
    
    const newOptions = [...question.options];
    newOptions[optionIndex] = value;
    updateQuestion(questionId, { options: newOptions });
  };

  const deleteOption = (questionId: string, optionIndex: number) => {
    const question = formData.questions.find(q => q.id === questionId);
    if (!question || !question.options) return;
    
    const newOptions = question.options.filter((_, i) => i !== optionIndex);
    updateQuestion(questionId, { options: newOptions });
  };

  const needsOptions = (type: QuestionType) => {
    return ['multiple-choice', 'checkboxes', 'dropdown'].includes(type);
  };

  const toggleAC = (acNumber: number) => {
    setFormData(prev => ({
      ...prev,
      assignedACs: prev.assignedACs.includes(acNumber)
        ? prev.assignedACs.filter(n => n !== acNumber)
        : [...prev.assignedACs, acNumber]
    }));
  };

  const handleSave = () => {
    console.log('Saving form:', formData);
    
    // Determine which storage keys to use based on user role
    const metadataStorageKey = isL0 ? 'surveyForms' : isL1 ? 'surveyFormsL1' : 'surveyFormsL2';
    const dataStorageKey = isL0 ? 'surveyFormsData' : isL1 ? 'surveyFormsDataL1' : 'surveyFormsDataL2';
    
    // Get existing forms metadata
    const storedMetadata = localStorage.getItem(metadataStorageKey);
    let formsMetadata = storedMetadata ? JSON.parse(storedMetadata) : (
      isL0 ? [
        { id: 1, name: 'Voter Intake Form 2025', questions: 4, status: 'Active', created: '2024-01-15' },
        { id: 2, name: 'Local Issues Survey', questions: 3, status: 'Active', created: '2024-02-01' },
        { id: 3, name: 'Post-Election Feedback', questions: 2, status: 'Draft', created: '2024-03-10' },
      ] : isL1 ? [
        { id: 1, name: 'Voter Intake Form 2025', questions: 4, assignedACs: 5, status: 'Active', created: '2024-01-15' },
        { id: 2, name: 'Local Issues Survey', questions: 3, assignedACs: 12, status: 'Active', created: '2024-02-01' },
        { id: 3, name: 'Post-Election Feedback', questions: 2, assignedACs: 0, status: 'Draft', created: '2024-03-10' },
      ] : []
    );
    
    // Get existing forms data
    const storedData = localStorage.getItem(dataStorageKey);
    let formsData = storedData ? JSON.parse(storedData) : [];
    
    if (isNewForm) {
      // Add new form
      const newId = Math.max(0, ...formsMetadata.map((f: any) => f.id)) + 1;
      
      const newMetadata = isL0 ? {
        id: newId,
        name: formData.title || 'Untitled Form',
        questions: formData.questions.length,
        status: 'Draft' as const,
        created: new Date().toISOString().split('T')[0],
      } : {
        id: newId,
        name: formData.title || 'Untitled Form',
        questions: formData.questions.length,
        assignedACs: formData.assignedACs.length,
        status: 'Draft' as const,
        created: new Date().toISOString().split('T')[0],
      };
      
      const newData = {
        id: newId,
        title: formData.title || 'Untitled Form',
        description: formData.description,
        assignedACs: formData.assignedACs,
        questions: formData.questions,
      };
      
      formsMetadata.push(newMetadata);
      formsData.push(newData);
      
      toast({
        title: 'Form Created',
        description: `"${newMetadata.name}" has been created successfully.`
      });
    } else {
      // Update existing form
      const formIdNum = parseInt(formId || '0');
      const metadataIndex = formsMetadata.findIndex((f: any) => f.id === formIdNum);
      const dataIndex = formsData.findIndex((f: any) => f.id === formIdNum);
      
      if (metadataIndex !== -1) {
        const updatedMetadata = isL0 ? {
          ...formsMetadata[metadataIndex],
          name: formData.title || formsMetadata[metadataIndex].name,
          questions: formData.questions.length,
        } : {
          ...formsMetadata[metadataIndex],
          name: formData.title || formsMetadata[metadataIndex].name,
          questions: formData.questions.length,
          assignedACs: formData.assignedACs.length,
        };
        
        formsMetadata[metadataIndex] = updatedMetadata;
        
        toast({
          title: 'Form Updated',
          description: `"${updatedMetadata.name}" has been updated successfully.`
        });
      }
      
      // Update form data
      const updatedData = {
        id: formIdNum,
        title: formData.title,
        description: formData.description,
        assignedACs: formData.assignedACs,
        questions: formData.questions,
      };
      
      if (dataIndex !== -1) {
        formsData[dataIndex] = updatedData;
      } else {
        formsData.push(updatedData);
      }
    }
    
    // Save updated forms lists
    localStorage.setItem(metadataStorageKey, JSON.stringify(formsMetadata));
    localStorage.setItem(dataStorageKey, JSON.stringify(formsData));
    
    const redirectPath = isL0 ? '/l0/surveys' : isL1 ? '/l1/surveys' : '/l2/surveys';
    navigate(redirectPath);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              {isNewForm ? 'Create New Form' : 'Edit Form'}
            </h1>
            <p className="text-muted-foreground">Build your survey form</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(isL0 ? '/l0/surveys' : '/l1/surveys')}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Form
            </Button>
          </div>
        </div>

        {/* Form Details */}
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="formTitle">Form Title</Label>
            <Input
              id="formTitle"
              placeholder="e.g., Voter Intake Form 2025"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="text-lg font-semibold"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="formDescription">Form Description</Label>
            <Textarea
              id="formDescription"
              placeholder="Describe the purpose of this form..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
        </Card>

        {/* AC Assignment */}
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label>Assign to Assembly Constituencies</Label>
            <p className="text-sm text-muted-foreground">
              Select which constituencies will have access to this form
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-4 border rounded-md">
            {constituencies.map((ac) => (
              <div key={ac.number} className="flex items-center space-x-2">
                <Checkbox
                  id={`ac-${ac.number}`}
                  checked={formData.assignedACs.includes(ac.number)}
                  onCheckedChange={() => toggleAC(ac.number)}
                />
                <label
                  htmlFor={`ac-${ac.number}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {ac.number} - {ac.name}
                </label>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {formData.assignedACs.length} constituency(ies) selected
          </p>
        </Card>

        {/* Questions */}
        <div className="space-y-4">
          {formData.questions.map((question, index) => (
            <Card key={question.id} className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-3 cursor-move">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-2">
                      <Label>Question {index + 1}</Label>
                      <Input
                        placeholder="Enter your question"
                        value={question.text}
                        onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
                      />
                    </div>
                    <div className="w-48 space-y-2">
                      <Label>Question Type</Label>
                      <Select
                        value={question.type}
                        onValueChange={(value: QuestionType) => {
                          const updates: Partial<Question> = { type: value };
                          if (needsOptions(value) && !question.options) {
                            updates.options = ['Option 1'];
                          } else if (!needsOptions(value)) {
                            updates.options = undefined;
                          }
                          updateQuestion(question.id, updates);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short-text">Short Text</SelectItem>
                          <SelectItem value="paragraph">Paragraph</SelectItem>
                          <SelectItem value="yes-no">Yes / No</SelectItem>
                          <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                          <SelectItem value="checkboxes">Checkboxes</SelectItem>
                          <SelectItem value="dropdown">Dropdown</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Options for Multiple Choice, Checkboxes, Dropdown */}
                  {needsOptions(question.type) && (
                    <div className="space-y-3 pl-4 border-l-2 border-muted">
                      <Label className="text-sm text-muted-foreground">Options</Label>
                      {question.options?.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex gap-2">
                          <Input
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option}
                            onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteOption(question.id, optionIndex)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addOption(question.id)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Option
                      </Button>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`required-${question.id}`}
                        checked={question.required}
                        onCheckedChange={(checked) => updateQuestion(question.id, { required: checked })}
                      />
                      <Label htmlFor={`required-${question.id}`} className="text-sm">
                        Required
                      </Label>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteQuestion(question.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Add Question Button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={addQuestion}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </div>
    </DashboardLayout>
  );
};
