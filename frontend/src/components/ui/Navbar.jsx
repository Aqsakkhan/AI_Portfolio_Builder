import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-indigo-600 font-bold text-lg">
            <Code2 size={24} />
            AI Portfolio Builder
          </Link>
          <div className="flex gap-4">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <Link
              to="/builder"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Build Portfolio
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
