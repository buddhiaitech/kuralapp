import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Edit2, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface Moderator {
  id: number;
  name: string;
  email: string;
  assignedAC: string;
  status: 'Active' | 'Inactive';
}

const initialModerators: Moderator[] = [
  { id: 1, name: 'ACI Moderator', email: 'aci@ac118.com', assignedAC: '118 - Thondamuthur', status: 'Active' },
  { id: 2, name: 'Priya Sharma', email: 'priya@ac119.com', assignedAC: '119 - Coimbatore North', status: 'Active' },
  { id: 3, name: 'Arun Patel', email: 'arun@ac120.com', assignedAC: '120 - Coimbatore South', status: 'Active' },
  { id: 4, name: 'Deepa Singh', email: 'deepa@ac121.com', assignedAC: '121 - Singanallur', status: 'Inactive' },
];

const acOptions = [
  { value: '118', label: '118 - Thondamuthur' },
  { value: '119', label: '119 - Coimbatore North' },
  { value: '120', label: '120 - Coimbatore South' },
  { value: '121', label: '121 - Singanallur' },
  { value: '122', label: '122 - Sulur' },
  { value: '123', label: '123 - Kavundampalayam' },
];

export const ModeratorManagement = () => {
  const { toast } = useToast();
  const [moderators, setModerators] = useState<Moderator[]>(initialModerators);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [viewingModerator, setViewingModerator] = useState<Moderator | null>(null);
  const [editingModerator, setEditingModerator] = useState<Moderator | null>(null);
  
  // Form states
  const [newModerator, setNewModerator] = useState({
    name: '',
    email: '',
    assignedAC: '',
    password: '',
  });
  
  const [editModerator, setEditModerator] = useState({
    name: '',
    email: '',
    assignedAC: '',
    status: 'Active' as 'Active' | 'Inactive',
  });

  const handleAddModerator = () => {
    if (newModerator.name && newModerator.email && newModerator.assignedAC && newModerator.password) {
      const acLabel = acOptions.find(ac => ac.value === newModerator.assignedAC)?.label || `AC ${newModerator.assignedAC}`;
      
      const moderatorToAdd: Moderator = {
        id: Math.max(0, ...moderators.map(m => m.id)) + 1,
        name: newModerator.name,
        email: newModerator.email,
        assignedAC: acLabel,
        status: 'Active',
      };
      
      setModerators([...moderators, moderatorToAdd]);
      setNewModerator({ name: '', email: '', assignedAC: '', password: '' });
      setIsOpen(false);
      
      toast({
        title: 'Moderator Added',
        description: `"${moderatorToAdd.name}" has been added successfully.`
      });
    } else {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
    }
  };

  const handleViewClick = (moderator: Moderator) => {
    setViewingModerator(moderator);
  };

  const handleEditClick = (moderator: Moderator) => {
    setEditingModerator(moderator);
    // Extract AC value from assignedAC string (e.g., "118 - Thondamuthur" -> "118")
    const acValue = moderator.assignedAC.split(' - ')[0];
    setEditModerator({
      name: moderator.name,
      email: moderator.email,
      assignedAC: acValue,
      status: moderator.status,
    });
    setIsEditOpen(true);
  };

  const handleUpdateModerator = () => {
    if (editingModerator && editModerator.name && editModerator.email && editModerator.assignedAC) {
      const acLabel = acOptions.find(ac => ac.value === editModerator.assignedAC)?.label || `AC ${editModerator.assignedAC}`;
      
      setModerators(moderators.map(moderator => 
        moderator.id === editingModerator.id 
          ? { ...moderator, ...editModerator, assignedAC: acLabel } 
          : moderator
      ));
      setIsEditOpen(false);
      setEditingModerator(null);
      
      toast({
        title: 'Moderator Updated',
        description: `"${editModerator.name}" has been updated successfully.`
      });
    } else {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteModerator = (id: number, name: string) => {
    setModerators(moderators.filter(moderator => moderator.id !== id));
    toast({
      title: 'Moderator Deleted',
      description: `"${name}" has been deleted successfully.`
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Moderator Management</h1>
            <p className="text-muted-foreground">Manage Layer 2 (ACI) Moderators across all constituencies</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Moderator
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Moderator (ACI)</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                  <Input 
                    id="name" 
                    placeholder="Enter moderator name" 
                    value={newModerator.name}
                    onChange={(e) => setNewModerator({...newModerator, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter email address" 
                    value={newModerator.email}
                    onChange={(e) => setNewModerator({...newModerator, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ac">Assign to Assembly Constituency <span className="text-destructive">*</span></Label>
                  <Select 
                    value={newModerator.assignedAC} 
                    onValueChange={(value) => setNewModerator({...newModerator, assignedAC: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select AC" />
                    </SelectTrigger>
                    <SelectContent>
                      {acOptions.map((ac) => (
                        <SelectItem key={ac.value} value={ac.value}>
                          {ac.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password <span className="text-destructive">*</span></Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter password" 
                    value={newModerator.password}
                    onChange={(e) => setNewModerator({...newModerator, password: e.target.value})}
                  />
                </div>
                <Button className="w-full" onClick={handleAddModerator}>
                  Create Moderator
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
                  <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Assigned AC</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {moderators.map((moderator) => (
                  <tr key={moderator.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm font-medium">{moderator.name}</td>
                    <td className="px-4 py-3 text-sm">{moderator.email}</td>
                    <td className="px-4 py-3 text-sm">{moderator.assignedAC}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        moderator.status === 'Active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                      }`}>
                        {moderator.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewClick(moderator)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditClick(moderator)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteModerator(moderator.id, moderator.name)}
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

        {/* View Moderator Dialog */}
        <Dialog open={!!viewingModerator} onOpenChange={(open) => !open && setViewingModerator(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Moderator Details</DialogTitle>
            </DialogHeader>
            {viewingModerator && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <p className="text-sm">{viewingModerator.name}</p>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <p className="text-sm">{viewingModerator.email}</p>
                </div>
                <div className="space-y-2">
                  <Label>Assigned AC</Label>
                  <p className="text-sm">{viewingModerator.assignedAC}</p>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <p className="text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      viewingModerator.status === 'Active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                    }`}>
                      {viewingModerator.status}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Moderator Dialog */}
        <Dialog open={isEditOpen} onOpenChange={(open) => {
          setIsEditOpen(open);
          if (!open) setEditingModerator(null);
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Moderator</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="editName">Full Name <span className="text-destructive">*</span></Label>
                <Input 
                  id="editName" 
                  placeholder="Enter moderator name" 
                  value={editModerator.name}
                  onChange={(e) => setEditModerator({...editModerator, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editEmail">Email <span className="text-destructive">*</span></Label>
                <Input 
                  id="editEmail" 
                  type="email" 
                  placeholder="Enter email address" 
                  value={editModerator.email}
                  onChange={(e) => setEditModerator({...editModerator, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editAc">Assign to Assembly Constituency <span className="text-destructive">*</span></Label>
                <Select 
                  value={editModerator.assignedAC} 
                  onValueChange={(value) => setEditModerator({...editModerator, assignedAC: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select AC" />
                  </SelectTrigger>
                  <SelectContent>
                    {acOptions.map((ac) => (
                      <SelectItem key={ac.value} value={ac.value}>
                        {ac.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editStatus">Status</Label>
                <Select 
                  value={editModerator.status} 
                  onValueChange={(value) => setEditModerator({...editModerator, status: value as 'Active' | 'Inactive'})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={handleUpdateModerator}>
                Update Moderator
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};