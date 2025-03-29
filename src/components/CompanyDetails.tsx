import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

// Define the Company type with all possible fields
interface Company {
  id: string;
  name: string;
  website: string | null;
  products: string[] | null;
  created_at: string | null;
  updated_at: string | null;
  competitive_advantage: string | null;
  hero_tagline: string | null;
  offers_inference: boolean;
  offers_gpus: boolean;
  offers_web3: boolean;
  offers_finetuning: boolean;
  sub_tagline: string | null;
}

// Define types for related tables
interface Customer {
  id: string;
  company_id: string;
  customer: string;
  created_at: string;
}

interface Product {
  id: string;
  company_id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

interface PricingModel {
  id: string;
  company_id: string;
  name: string;
  price: string;
  details: string | null;
  created_at: string;
  updated_at: string;
}

export function CompanyDetails() {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [pricingModels, setPricingModels] = useState<PricingModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCompanyData() {
      if (!id) return;

      try {
        setLoading(true);
        
        // Fetch company details
        const { data: companyData, error: companyError } = await supabase
          .from('ai_companies')
          .select('*')
          .eq('id', id)
          .single();
          
        if (companyError) {
          throw companyError;
        }
        
        setCompany(companyData);

        // Fetch company customers
        const { data: customerData, error: customerError } = await supabase
          .from('company_customers')
          .select('*')
          .eq('company_id', id);

        if (customerError) {
          console.error('Error fetching customers:', customerError);
        } else {
          setCustomers(customerData || []);
        }

        // Fetch company products
        const { data: productData, error: productError } = await supabase
          .from('company_products')
          .select('*')
          .eq('company_id', id);

        if (productError) {
          console.error('Error fetching products:', productError);
        } else {
          setProducts(productData || []);
        }

        // Fetch company pricing models
        const { data: pricingData, error: pricingError } = await supabase
          .from('company_pricing_models')
          .select('*')
          .eq('company_id', id);

        if (pricingError) {
          console.error('Error fetching pricing models:', pricingError);
        } else {
          setPricingModels(pricingData || []);
        }
      } catch (err) {
        console.error('Error fetching company details:', err);
        setError('Failed to load company details. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchCompanyData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-xl font-semibold">Loading company details...</div>
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-xl font-semibold text-red-500">
            {error || 'Company not found'}
          </div>
          <Link to="/" className="mt-4 inline-block text-blue-500 hover:underline">
            &larr; Back to companies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <Link to="/" className="inline-block mb-6 text-blue-500 hover:underline">
        &larr; Back to companies
      </Link>
      
      {/* Company Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
        
        {company.hero_tagline && (
          <p className="text-xl font-semibold text-gray-700 mb-4">
            {company.hero_tagline}
          </p>
        )}
        
        {company.sub_tagline && (
          <p className="text-lg text-gray-600 mb-6">
            {company.sub_tagline}
          </p>
        )}
        
        <div className="flex flex-wrap gap-2 mb-6">
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
        
        {company.website && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-1">Website</h2>
            <a 
              href={company.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {company.website}
            </a>
          </div>
        )}
        
        {company.competitive_advantage && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-1">Competitive Advantage</h2>
            <p className="text-gray-700">{company.competitive_advantage}</p>
          </div>
        )}
        
        {company.products && company.products.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-1">Products (from main table)</h2>
            <ul className="list-disc list-inside text-gray-700">
              {company.products.map((product, index) => (
                <li key={index}>{product}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Products Section */}
      {products.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <div className="space-y-4">
            {products.map(product => (
              <div key={product.id} className="border-b pb-4 last:border-0 last:pb-0">
                <h3 className="font-medium text-lg">{product.name}</h3>
                {product.description && (
                  <p className="text-gray-700 mt-1">{product.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Pricing Models Section */}
      {pricingModels.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Pricing Models</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pricingModels.map(model => (
                  <tr key={model.id}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{model.name}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{model.price}</td>
                    <td className="px-4 py-2 whitespace-pre-wrap text-sm text-gray-500">{model.details || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Customers Section */}
      {customers.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Notable Customers</h2>
          <div className="flex flex-wrap gap-2">
            {customers.map(customer => (
              <span key={customer.id} className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-md">
                {customer.customer}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
