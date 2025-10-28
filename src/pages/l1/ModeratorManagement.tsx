import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Edit2, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';

const mockModerators = [
  { id: 1, name: 'ACI Moderator', email: 'aci@ac118.com', assignedAC: '118 - Thondamuthur', status: 'Active' },
  { id: 2, name: 'Priya Sharma', email: 'priya@ac119.com', assignedAC: '119 - Coimbatore North', status: 'Active' },
  { id: 3, name: 'Arun Patel', email: 'arun@ac120.com', assignedAC: '120 - Coimbatore South', status: 'Active' },
  { id: 4, name: 'Deepa Singh', email: 'deepa@ac121.com', assignedAC: '121 - Singanallur', status: 'Inactive' },
];

export const ModeratorManagement = () => {
  const [isOpen, setIsOpen] = useState(false);

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
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter moderator name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ac">Assign to Assembly Constituency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select AC" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="118">118 - Thondamuthur</SelectItem>
                      <SelectItem value="119">119 - Coimbatore North</SelectItem>
                      <SelectItem value="120">120 - Coimbatore South</SelectItem>
                      <SelectItem value="121">121 - Singanallur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter password" />
                </div>
                <Button className="w-full" onClick={() => setIsOpen(false)}>
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
                {mockModerators.map((moderator) => (
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
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
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
