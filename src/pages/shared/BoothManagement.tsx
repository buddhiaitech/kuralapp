import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Edit2, Trash2, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const mockBooths = [
  { id: 1, boothId: 'BID-001', name: 'Government School, Main Road', ac: 118, address: 'Main Road, Thondamuthur', voters: 854, agents: 2 },
  { id: 2, boothId: 'BID-002', name: 'Community Hall, West Street', ac: 118, address: 'West Street, Thondamuthur', voters: 723, agents: 3 },
  { id: 3, boothId: 'BID-003', name: 'Primary School, East Area', ac: 119, address: 'East Area, Coimbatore', voters: 912, agents: 1 },
];

export const BoothManagement = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  // Filter booths based on role
  const filteredBooths = user?.role === 'L2' 
    ? mockBooths.filter(booth => booth.ac === user.assignedAC)
    : mockBooths;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Booth Management</h1>
            <p className="text-muted-foreground">
              {user?.role === 'L2' 
                ? `Manage booths for AC ${user.assignedAC}`
                : 'Manage booths across all constituencies'}
            </p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Building2 className="mr-2 h-4 w-4" />
                Create New Booth
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Booth</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="boothId">Booth ID</Label>
                  <Input id="boothId" placeholder="BID-XXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="boothName">Booth Name</Label>
                  <Input id="boothName" placeholder="e.g., Government School, Main Road" />
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
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter full address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="voters">Total Registered Voters</Label>
                  <Input id="voters" type="number" placeholder="0" />
                </div>
                <Button className="w-full" onClick={() => setIsOpen(false)}>
                  Create Booth
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
                  <th className="px-4 py-3 text-left text-sm font-semibold">Booth ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                  {user?.role !== 'L2' && (
                    <th className="px-4 py-3 text-left text-sm font-semibold">AC</th>
                  )}
                  <th className="px-4 py-3 text-left text-sm font-semibold">Address</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Voters</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Agents</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredBooths.map((booth) => (
                  <tr key={booth.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm font-medium">{booth.boothId}</td>
                    <td className="px-4 py-3 text-sm">{booth.name}</td>
                    {user?.role !== 'L2' && (
                      <td className="px-4 py-3 text-sm">{booth.ac}</td>
                    )}
                    <td className="px-4 py-3 text-sm max-w-xs truncate">{booth.address}</td>
                    <td className="px-4 py-3 text-sm">{booth.voters}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {booth.agents} Agent{booth.agents !== 1 ? 's' : ''}
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