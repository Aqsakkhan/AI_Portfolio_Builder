import { useLocation, Link } from 'react-router-dom';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import DeveloperTemplate from '../components/templates/DeveloperTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import { ArrowLeft, Printer } from 'lucide-react';

export default function Preview() {
  const { state } = useLocation();

  if (!state || !state.formData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No preview data</h2>
          <Link
            to="/builder"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go to Builder
          </Link>
        </div>
      </div>
    );
  }

  const { formData } = state;
  const TemplateComponent =
    formData.template === 'developer'
      ? DeveloperTemplate
      : formData.template === 'creative'
      ? CreativeTemplate
      : MinimalTemplate;

  return (
    <div>
      <div className="no-print fixed top-4 left-4 right-4 z-50 flex justify-between items-center bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow border border-gray-200">
        <Link
          to="/builder"
          className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 text-sm font-medium"
        >
          <ArrowLeft size={16} /> Back to Builder
        </Link>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          <Printer size={14} /> Download PDF
        </button>
      </div>
      <TemplateComponent data={formData} />
    </div>
  );
}
