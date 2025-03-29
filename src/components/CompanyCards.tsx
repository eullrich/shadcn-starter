import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from '@/lib/supabase';

// Define the Company type based on the database schema
interface Company {
  id: string;
  name: string;
  hero_tagline: string | null;
  sub_tagline: string | null;
  offers_inference: boolean;
  offers_gpus: boolean;
  offers_web3: boolean;
  offers_finetuning: boolean;
}

// Define filter types
type FilterType = 'inference' | 'gpus' | 'web3' | 'finetuning' | 'all';

export function CompanyCards() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const { data, error } = await supabase
          .from('ai_companies')
          .select('id, name, hero_tagline, sub_tagline, offers_inference, offers_gpus, offers_web3, offers_finetuning')
          .order('name');
          
        if (error) {
          throw error;
        }
        
        setCompanies(data || []);
        setFilteredCompanies(data || []);
      } catch (err) {
        console.error('Error fetching companies:', err);
        setError('Failed to load companies. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchCompanies();
  }, []);

  // Apply filter when activeFilter changes
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredCompanies(companies);
      return;
    }
    
    const filtered = companies.filter(company => {
      switch (activeFilter) {
        case 'inference':
          return company.offers_inference;
        case 'gpus':
          return company.offers_gpus;
        case 'web3':
          return company.offers_web3;
        case 'finetuning':
          return company.offers_finetuning;
        default:
          return true;
      }
    });
    
    setFilteredCompanies(filtered);
  }, [activeFilter, companies]);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  if (loading) {
    return <div className="text-center py-8">Loading companies...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => handleFilterChange('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted hover:bg-muted/80'
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange('inference')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === 'inference'
              ? 'bg-blue-500 text-white'
              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
          }`}
        >
          Inference
        </button>
        <button
          onClick={() => handleFilterChange('gpus')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === 'gpus'
              ? 'bg-green-500 text-white'
              : 'bg-green-100 text-green-800 hover:bg-green-200'
          }`}
        >
          GPUs
        </button>
        <button
          onClick={() => handleFilterChange('web3')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === 'web3'
              ? 'bg-purple-500 text-white'
              : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
          }`}
        >
          Web3
        </button>
        <button
          onClick={() => handleFilterChange('finetuning')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === 'finetuning'
              ? 'bg-amber-500 text-white'
              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
          }`}
        >
          Fine-tuning
        </button>
      </div>

      {/* Results count */}
      <div className="text-center text-sm text-muted-foreground">
        Showing {filteredCompanies.length} of {companies.length} companies
      </div>

      {/* Company cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.length === 0 ? (
          <div className="col-span-full text-center py-8">No companies match the selected filter</div>
        ) : (
          filteredCompanies.map((company) => (
            <Link to={`/company/${company.id}`} key={company.id} className="block h-full transition-transform hover:scale-[1.02]">
              <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>{company.name}</CardTitle>
                  <CardDescription className="font-medium text-base">
                    {company.hero_tagline || ""}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-sm text-muted-foreground">
                    {company.sub_tagline || ""}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {company.offers_inference && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Inference
                      </span>
                    )}
                    {company.offers_gpus && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        GPUs
                      </span>
                    )}
                    {company.offers_web3 && (
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Web3
                      </span>
                    )}
                    {company.offers_finetuning && (
                      <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Fine-tuning
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
