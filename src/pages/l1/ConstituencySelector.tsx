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
      <div className="space-y-10 p-6">
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
  <div className="space-y-3">
    <h1 className="text-5xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
      Assembly Constituencies
    </h1>
    <p className="text-lg text-muted-foreground">
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
  <div className="relative max-w-xl">
    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
    <Input
      placeholder="Search by constituency name or number..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="pl-12 h-12 text-base shadow-md border-2 focus:border-primary focus:shadow-lg transition-all"
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
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    className="p-8 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-2 hover:border-primary/50 group relative overflow-hidden bg-card"
    onClick={onClick}
  >
    {/* Hover gradient overlay */}
    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
    
    {/* Card content */}
    <div className="flex items-center space-x-5 relative z-10">
      {/* Icon */}
      <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
        <MapPin className="h-7 w-7" />
      </div>
      
      {/* Constituency info */}
      <div className="flex-1">
        <p className="text-3xl font-bold text-primary mb-1">
          {constituency.number}
        </p>
        <p className="text-sm font-semibold text-foreground/80 group-hover:text-primary transition-colors leading-tight">
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
