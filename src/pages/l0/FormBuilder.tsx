import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, GripVertical, Save } from 'lucide-react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
}

export const FormBuilder = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const isNewForm = formId === 'new';

  const [formData, setFormData] = useState<FormData>({
    title: isNewForm ? '' : 'Voter Intake Form 2025',
    description: isNewForm ? '' : 'Collect voter information and preferences',
    questions: isNewForm ? [] : [
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
  });

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

  const handleSave = () => {
    console.log('Saving form:', formData);
    navigate('/l0/surveys');
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
            <Button variant="outline" onClick={() => navigate('/l0/surveys')}>
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
