import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, Home, Users } from 'lucide-react';
import { useState } from 'react';

const mockFamilies = [
  { id: 'F-234', headName: 'Rajesh Kumar', members: 4, booth: 'B-101', surveyed: 3, address: '12/5, MG Road, Sector 5' },
  { id: 'F-235', headName: 'Arun Patel', members: 5, booth: 'B-102', surveyed: 2, address: '45/7, Park Street, Sector 3' },
  { id: 'F-236', headName: 'Suresh Reddy', members: 3, booth: 'B-101', surveyed: 3, address: '78/9, Lake View, Sector 7' },
  { id: 'F-237', headName: 'Vikram Singh', members: 6, booth: 'B-103', surveyed: 4, address: '23/4, Gandhi Nagar, Sector 2' },
  { id: 'F-238', headName: 'Ramesh Gupta', members: 4, booth: 'B-102', surveyed: 1, address: '67/8, Temple Road, Sector 6' },
];

export const ACFamilyManager = () => {
  const { acNumber } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFamilies = mockFamilies.filter(family =>
    family.headName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    family.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(`/l1/ac/${acNumber}`)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold">Family Manager</h1>
            <p className="text-muted-foreground">AC {acNumber} - Manage family records</p>
          </div>
        </div>

        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by family ID or head of household..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFamilies.map((family) => (
            <Card key={family.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Home className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{family.id}</h3>
                      <p className="text-sm text-muted-foreground">{family.headName}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{family.address}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{family.members} members</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Home className="h-4 w-4" />
                      <span>{family.booth}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Survey Progress</span>
                    <span className="font-medium">{family.surveyed}/{family.members}</span>
                  </div>
                  <Progress value={(family.surveyed / family.members) * 100} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
