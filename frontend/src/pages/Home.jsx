import { Link } from 'react-router-dom';
import { Sparkles, Layout, Globe } from 'lucide-react';
import Navbar from '../components/ui/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <Sparkles size={14} />
          AI-Powered Portfolio Creation
        </div>
        <h1 className="text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Build Your Portfolio{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            with AI
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Create a stunning professional portfolio in minutes. Let AI enhance your bio, projects,
          and experience descriptions to make you stand out.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/builder"
            className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            Start Building for Free →
          </Link>
          <a
            href="#features"
            className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-indigo-400 hover:text-indigo-600 transition-colors"
          >
            See Features
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Everything you need to shine online
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <Layout className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Template Selection</h3>
            <p className="text-gray-600">
              Choose from Minimal, Developer, or Creative templates. Each crafted for maximum impact.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="text-purple-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Enhancement</h3>
            <p className="text-gray-600">
              Let GPT-3.5 rewrite your bio, project descriptions, and experience to sound professional.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Globe className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Publish</h3>
            <p className="text-gray-600">
              Save your portfolio and get a shareable URL instantly. Export as PDF with one click.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to build your portfolio?</h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Join thousands of developers who have landed their dream jobs.
          </p>
          <Link
            to="/builder"
            className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-colors inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
