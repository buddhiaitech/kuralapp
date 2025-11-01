import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CONSTITUENCIES, type Constituency } from '@/constants/constituencies';

/**
 * ConstituencySelector Component
 * 
 * Displays a searchable grid of all Assembly Constituencies (AC).
 * Users can:
 * - Search by constituency name or number
 * - Click on any constituency card to view detailed information
 * 
 * @returns A dashboard layout with searchable constituency cards
 */
export const ConstituencySelector = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  /**
   * Filters constituencies based on search term
   * Matches against both constituency name (case-insensitive) and number
   */
  const filteredConstituencies = filterConstituencies(CONSTITUENCIES, searchTerm);

  /**
   * Handles constituency card click
   * Navigates to the detailed view for the selected constituency
   */
  const handleConstituencyClick = (acNumber: number) => {
    navigate(`/l1/ac/${acNumber}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-12 p-8">
        {/* Page Header */}
        <PageHeader />

        {/* Search Input */}
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        {/* Constituency Grid */}
        <ConstituencyGrid 
          constituencies={filteredConstituencies}
          onSelect={handleConstituencyClick}
        />
      </div>
    </DashboardLayout>
  );
};

/**
 * Page header with title and description
 */
const PageHeader = () => (
  <div className="space-y-4">
    <h1 className="text-6xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
      Assembly Constituencies
    </h1>
    <p className="text-xl text-muted-foreground font-medium">
      Select a constituency to view detailed information and analytics
    </p>
  </div>
);

/**
 * Search bar component for filtering constituencies
 */
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <div className="relative max-w-2xl">
    <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
    <Input
      placeholder="Search by constituency name or number..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="pl-14 h-14 text-base shadow-lg border-2 focus:border-primary focus:shadow-xl transition-all rounded-2xl"
    />
  </div>
);

/**
 * Grid of constituency cards
 */
interface ConstituencyGridProps {
  constituencies: Constituency[];
  onSelect: (acNumber: number) => void;
}

const ConstituencyGrid = ({ constituencies, onSelect }: ConstituencyGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {constituencies.map((ac) => (
      <ConstituencyCard 
        key={ac.number}
        constituency={ac}
        onClick={() => onSelect(ac.number)}
      />
    ))}
  </div>
);

/**
 * Individual constituency card with hover effects
 */
interface ConstituencyCardProps {
  constituency: Constituency;
  onClick: () => void;
}

const ConstituencyCard = ({ constituency, onClick }: ConstituencyCardProps) => (
  <Card
    className="p-10 cursor-pointer hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 border-2 hover:border-primary/60 group relative overflow-hidden bg-card hover-glow"
    onClick={onClick}
  >
    {/* Hover gradient overlay */}
    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-8 transition-opacity duration-500" />
    
    {/* Card content */}
    <div className="flex items-center space-x-6 relative z-10">
      {/* Icon */}
      <div className="p-5 rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-md group-hover:shadow-xl group-hover:scale-110">
        <MapPin className="h-8 w-8" />
      </div>
      
      {/* Constituency info */}
      <div className="flex-1">
        <p className="text-4xl font-bold text-primary mb-2 group-hover:scale-105 transition-transform">
          {constituency.number}
        </p>
        <p className="text-base font-semibold text-foreground/80 group-hover:text-primary transition-colors leading-tight">
          {constituency.name}
        </p>
      </div>
    </div>
  </Card>
);

/**
 * Utility function to filter constituencies by search term
 * Searches both name (case-insensitive) and number
 */
const filterConstituencies = (
  constituencies: Constituency[],
  searchTerm: string
): Constituency[] => {
  if (!searchTerm.trim()) {
    return constituencies;
  }

  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return constituencies.filter((ac) => 
    ac.name.toLowerCase().includes(lowerSearchTerm) ||
    ac.number.toString().includes(searchTerm)
  );
};
