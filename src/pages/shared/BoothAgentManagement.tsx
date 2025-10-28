import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Edit2, Trash2, Filter } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Checkbox } from '@/components/ui/checkbox';

const mockBooths = [
  { id: '1', name: 'Government School, Main Road', ac: 118 },
  { id: '2', name: 'Community Hall, West Street', ac: 118 },
  { id: '3', name: 'Primary School, East Area', ac: 119 },
];

const mockAgents = [
  { id: 1, name: 'Rajesh Kumar', phone: '+91 98765 43210', booths: ['1'], ac: 118, status: 'Active' },
  { id: 2, name: 'Priya Sharma', phone: '+91 98765 43211', booths: ['2'], ac: 118, status: 'Active' },
  { id: 3, name: 'Arun Patel', phone: '+91 98765 43212', booths: ['1', '2'], ac: 118, status: 'Active' },
  { id: 4, name: 'Meena Devi', phone: '+91 98765 43213', booths: ['3'], ac: 119, status: 'Inactive' },
];

export const BoothAgentManagement = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBooths, setSelectedBooths] = useState<string[]>([]);

  // Filter data based on role
  const availableBooths = user?.role === 'L2' 
    ? mockBooths.filter(booth => booth.ac === user.assignedAC)
    : mockBooths;

  const filteredAgents = user?.role === 'L2' 
    ? mockAgents.filter(agent => agent.ac === user.assignedAC)
    : mockAgents;

  const getBoothNames = (boothIds: string[]) => {
    return boothIds.map(id => {
      const booth = mockBooths.find(b => b.id === id);
      return booth?.name || `Booth ${id}`;
    }).join(', ');
  };

  const toggleBooth = (boothId: string) => {
    setSelectedBooths(prev => 
      prev.includes(boothId) 
        ? prev.filter(id => id !== boothId)
        : [...prev, boothId]
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Booth Agent Management</h1>
            <p className="text-muted-foreground">
              {user?.role === 'L2' 
                ? `Manage booth agents for AC ${user.assignedAC}`
                : 'Manage booth agents across all constituencies'}
            </p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Booth Agent
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Booth Agent</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter agent name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+91 XXXXX XXXXX" />
                </div>
                {user?.role !== 'L2' && (
                  <div className="space-y-2">
                    <Label htmlFor="ac">Assembly Constituency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select AC" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="118">118 - Thondamuthur</SelectItem>
                        <SelectItem value="119">119 - Coimbatore North</SelectItem>
                        <SelectItem value="120">120 - Coimbatore South</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Assign to Booths (Multiple Selection)</Label>
                  <Card className="p-4 max-h-48 overflow-y-auto">
                    <div className="space-y-3">
                      {availableBooths.map((booth) => (
                        <div key={booth.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`booth-${booth.id}`}
                            checked={selectedBooths.includes(booth.id)}
                            onCheckedChange={() => toggleBooth(booth.id)}
                          />
                          <Label
                            htmlFor={`booth-${booth.id}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {booth.name} {user?.role !== 'L2' && `(AC ${booth.ac})`}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </Card>
                  <p className="text-sm text-muted-foreground">
                    {selectedBooths.length} booth{selectedBooths.length !== 1 ? 's' : ''} selected
                  </p>
                </div>
                <Button className="w-full" onClick={() => setIsOpen(false)}>
                  Create Agent
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {user?.role !== 'L2' && (
          <Card className="p-4">
            <div className="flex space-x-4">
              <Select>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by AC" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All ACs</SelectItem>
                  <SelectItem value="118">118 - Thondamuthur</SelectItem>
                  <SelectItem value="119">119 - Coimbatore North</SelectItem>
                  <SelectItem value="120">120 - Coimbatore South</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
            </div>
          </Card>
        )}

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Assigned Booths</th>
                  {user?.role !== 'L2' && (
                    <th className="px-4 py-3 text-left text-sm font-semibold">AC</th>
                  )}
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredAgents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm font-medium">{agent.name}</td>
                    <td className="px-4 py-3 text-sm">{agent.phone}</td>
                    <td className="px-4 py-3 text-sm max-w-md">
                      <div className="flex flex-wrap gap-1">
                        {agent.booths.map((boothId) => (
                          <span key={boothId} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                            Booth {boothId}
                          </span>
                        ))}
                      </div>
                    </td>
                    {user?.role !== 'L2' && (
                      <td className="px-4 py-3 text-sm">{agent.ac}</td>
                    )}
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        agent.status === 'Active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                      }`}>
                        {agent.status}
                      </span>
                    </td>
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