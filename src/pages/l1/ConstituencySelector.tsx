import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search } from 'lucide-react';

// Mock data for 26 constituencies (101-126)
const constituencies = [
  { number: 101, name: 'Dharapuram (SC)' },
  { number: 102, name: 'Kangayam' },
  { number: 108, name: 'Udhagamandalam' },
  { number: 109, name: 'Gudalur (SC)' },
  { number: 110, name: 'Coonoor' },
  { number: 111, name: 'Mettupalayam' },
  { number: 112, name: 'Avanashi (SC)' },
  { number: 113, name: 'Tiruppur North' },
  { number: 114, name: 'Tiruppur South' },
  { number: 115, name: 'Palladam' },
  { number: 116, name: 'Sulur' },
  { number: 117, name: 'Kavundampalayam' },
  { number: 118, name: 'Coimbatore North' },
  { number: 119, name: 'Thondamuthur' },
  { number: 120, name: 'Coimbatore South' },
  { number: 121, name: 'Singanallur' },
  { number: 122, name: 'Kinathukadavu' },
  { number: 123, name: 'Pollachi' },
  { number: 124, name: 'Valparai (SC)' },
  { number: 125, name: 'Udumalaipettai' },
  { number: 126, name: 'Madathukulam' },
];

export const ConstituencySelector = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredConstituencies = constituencies.filter(
    (ac) =>
      ac.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ac.number.toString().includes(searchTerm)
  );

  return (
    <DashboardLayout>
      <div className="space-y-10 p-6">
        <div className="space-y-3">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
            Assembly Constituencies
          </h1>
          <p className="text-lg text-muted-foreground">
            Select a constituency to view detailed information and analytics
          </p>
        </div>

        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by constituency name or number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 text-base shadow-md border-2 focus:border-primary focus:shadow-lg transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredConstituencies.map((ac) => (
            <Card
              key={ac.number}
              className="p-8 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-2 hover:border-primary/50 group relative overflow-hidden bg-card"
              onClick={() => navigate(`/l1/ac/${ac.number}`)}
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
              <div className="flex items-center space-x-5 relative z-10">
                <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                  <MapPin className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <p className="text-3xl font-bold text-primary mb-1">{ac.number}</p>
                  <p className="text-sm font-semibold text-foreground/80 group-hover:text-primary transition-colors leading-tight">
                    {ac.name}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
