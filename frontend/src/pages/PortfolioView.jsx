import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPortfolio } from '../api';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import DeveloperTemplate from '../components/templates/DeveloperTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Code2, AlertCircle } from 'lucide-react';

export default function PortfolioView() {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data } = await getPortfolio(slug);
        setPortfolio(data);
      } catch (err) {
        setError(err.response?.data?.error || 'Portfolio not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <LoadingSpinner size="lg" />
          <p className="text-gray-500">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{error}</h2>
          <p className="text-gray-500 mb-6">This portfolio does not exist or has been removed.</p>
          <Link
            to="/"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const TemplateComponent =
    portfolio.template === 'developer'
      ? DeveloperTemplate
      : portfolio.template === 'creative'
      ? CreativeTemplate
      : MinimalTemplate;

  return (
    <div>
      <TemplateComponent data={portfolio} />
      <div className="fixed bottom-4 right-4">
        <Link
          to="/"
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-indigo-700 transition-colors"
        >
          <Code2 size={14} />
          Built with AI Portfolio Builder
        </Link>
      </div>
    </div>
  );
}
