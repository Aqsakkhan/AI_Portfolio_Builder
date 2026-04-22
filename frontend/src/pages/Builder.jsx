import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  Sparkles,
  Save,
  Globe,
  Printer,
} from 'lucide-react';
import Navbar from '../components/ui/Navbar';
import StepIndicator from '../components/ui/StepIndicator';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import SkillTag from '../components/ui/SkillTag';
import MinimalTemplate from '../components/templates/MinimalTemplate';
import DeveloperTemplate from '../components/templates/DeveloperTemplate';
import CreativeTemplate from '../components/templates/CreativeTemplate';
import {
  createPortfolio,
  updatePortfolio,
  publishPortfolio,
  enhanceBio,
  enhanceProject,
  suggestSkills,
  enhanceExperience,
} from '../api';

const TOTAL_STEPS = 6;

const TEMPLATES = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean white design, perfect for professionals',
    color: 'bg-gray-100',
    accent: 'text-gray-700',
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Dark theme with code aesthetics, great for engineers',
    color: 'bg-gray-900',
    accent: 'text-green-400',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Colorful gradient design for designers and creatives',
    color: 'bg-gradient-to-br from-purple-500 to-pink-500',
    accent: 'text-white',
  },
];

const defaultProject = () => ({ title: '', description: '', link: '' });
const defaultExperience = () => ({ company: '', role: '', duration: '', description: '' });

export default function Builder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [savedSlug, setSavedSlug] = useState(null);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [aiLoading, setAiLoading] = useState({});

  const [formData, setFormData] = useState({
    template: 'minimal',
    name: '',
    bio: '',
    contact: { email: '', github: '', linkedin: '', website: '' },
    skills: [],
    projects: [defaultProject()],
    experience: [defaultExperience()],
  });
  const [skillInput, setSkillInput] = useState('');

  const updateField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const updateContact = (field, value) =>
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    if (!formData.skills.includes(trimmed)) {
      updateField('skills', [...formData.skills, trimmed]);
    }
    setSkillInput('');
  };

  const removeSkill = (skill) =>
    updateField(
      'skills',
      formData.skills.filter((s) => s !== skill)
    );

  const updateProject = (index, field, value) => {
    const updated = [...formData.projects];
    updated[index] = { ...updated[index], [field]: value };
    updateField('projects', updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...formData.experience];
    updated[index] = { ...updated[index], [field]: value };
    updateField('experience', updated);
  };

  const setAiLoadingKey = (key, val) =>
    setAiLoading((prev) => ({ ...prev, [key]: val }));

  const handleEnhanceBio = async () => {
    if (!formData.bio) return toast.error('Please write a bio first');
    setAiLoadingKey('bio', true);
    try {
      const { data } = await enhanceBio(formData.bio);
      updateField('bio', data.enhanced);
      if (data.note) toast(data.note, { icon: 'ℹ️' });
      else toast.success('Bio enhanced!');
    } catch {
      toast.error('Failed to enhance bio');
    } finally {
      setAiLoadingKey('bio', false);
    }
  };

  const handleSuggestSkills = async () => {
    setAiLoadingKey('skills', true);
    try {
      const { data } = await suggestSkills(formData.bio, formData.projects);
      const newSkills = data.skills.filter((s) => !formData.skills.includes(s));
      if (newSkills.length > 0) {
        updateField('skills', [...formData.skills, ...newSkills]);
        toast.success(`Added ${newSkills.length} skills!`);
      } else {
        toast('No new skills to add.', { icon: 'ℹ️' });
      }
    } catch {
      toast.error('Failed to suggest skills');
    } finally {
      setAiLoadingKey('skills', false);
    }
  };

  const handleEnhanceProject = async (index) => {
    const desc = formData.projects[index]?.description;
    if (!desc) return toast.error('Please add a description first');
    setAiLoadingKey(`project_${index}`, true);
    try {
      const { data } = await enhanceProject(desc);
      updateProject(index, 'description', data.enhanced);
      if (data.note) toast(data.note, { icon: 'ℹ️' });
      else toast.success('Description enhanced!');
    } catch {
      toast.error('Failed to enhance project');
    } finally {
      setAiLoadingKey(`project_${index}`, false);
    }
  };

  const handleEnhanceExperience = async (index) => {
    const desc = formData.experience[index]?.description;
    if (!desc) return toast.error('Please add a description first');
    setAiLoadingKey(`exp_${index}`, true);
    try {
      const { data } = await enhanceExperience(desc);
      updateExperience(index, 'description', data.enhanced);
      if (data.note) toast(data.note, { icon: 'ℹ️' });
      else toast.success('Description enhanced!');
    } catch {
      toast.error('Failed to enhance experience');
    } finally {
      setAiLoadingKey(`exp_${index}`, false);
    }
  };

  const handleSave = async () => {
    if (!formData.name) return toast.error('Please enter your name');
    setSaving(true);
    try {
      if (savedSlug) {
        await updatePortfolio(savedSlug, formData);
        toast.success('Portfolio updated!');
      } else {
        const { data } = await createPortfolio(formData);
        setSavedSlug(data.slug);
        toast.success('Portfolio saved!');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save portfolio');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!savedSlug) {
      toast.error('Please save your portfolio first');
      return;
    }
    setPublishing(true);
    try {
      await publishPortfolio(savedSlug);
      const url = `${window.location.origin}/portfolio/${savedSlug}`;
      toast.success('Portfolio published! Copying link...', { duration: 4000 });
      navigator.clipboard?.writeText(url).catch(() => {});
      navigate(`/portfolio/${savedSlug}`);
    } catch {
      toast.error('Failed to publish');
    } finally {
      setPublishing(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const TemplateComponent =
    formData.template === 'developer'
      ? DeveloperTemplate
      : formData.template === 'creative'
      ? CreativeTemplate
      : MinimalTemplate;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="no-print">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-6">
          <StepIndicator currentStep={step} />
        </div>
      </div>

      {/* Print view */}
      <div className="print-only hidden print:block">
        <TemplateComponent data={formData} />
      </div>

      {/* Builder form */}
      <div className="no-print max-w-4xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          {/* Step 1: Template */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose a Template</h2>
              <p className="text-gray-500 mb-6">Select the style that best represents you.</p>
              <div className="grid sm:grid-cols-3 gap-4">
                {TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => updateField('template', tmpl.id)}
                    className={`relative rounded-2xl overflow-hidden border-2 transition-all text-left hover:shadow-md ${
                      formData.template === tmpl.id
                        ? 'border-indigo-600 ring-2 ring-indigo-200'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className={`h-32 ${tmpl.color} flex items-center justify-center`}>
                      <span className={`text-xl font-bold ${tmpl.accent}`}>{tmpl.name}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{tmpl.name}</h3>
                      <p className="text-gray-500 text-xs">{tmpl.description}</p>
                    </div>
                    {formData.template === tmpl.id && (
                      <div className="absolute top-2 right-2 bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                        ✓
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Personal Info */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
              <p className="text-gray-500 mb-6">Tell us about yourself.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="John Doe"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                    <button
                      type="button"
                      onClick={handleEnhanceBio}
                      disabled={aiLoading.bio}
                      className="ml-3 inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 disabled:opacity-50 font-medium"
                    >
                      {aiLoading.bio ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <Sparkles size={12} />
                      )}
                      Enhance with AI
                    </button>
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => updateField('bio', e.target.value)}
                    placeholder="Write a short professional bio about yourself..."
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition resize-none"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {['email', 'github', 'linkedin', 'website'].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {field}
                      </label>
                      <input
                        type="text"
                        value={formData.contact[field]}
                        onChange={(e) => updateContact(field, e.target.value)}
                        placeholder={
                          field === 'email'
                            ? 'you@example.com'
                            : field === 'github'
                            ? 'https://github.com/username'
                            : field === 'linkedin'
                            ? 'https://linkedin.com/in/username'
                            : 'https://yourwebsite.com'
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Skills */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills</h2>
              <p className="text-gray-500 mb-6">Add your technical and soft skills.</p>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="e.g., React, Node.js, Python"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1"
                >
                  <Plus size={16} /> Add
                </button>
              </div>
              <button
                type="button"
                onClick={handleSuggestSkills}
                disabled={aiLoading.skills}
                className="mb-4 inline-flex items-center gap-2 bg-purple-50 text-purple-700 border border-purple-200 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-50 text-sm font-medium"
              >
                {aiLoading.skills ? <LoadingSpinner size="sm" /> : '🤖'}
                Suggest Skills with AI
              </button>
              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.skills.map((skill) => (
                    <SkillTag key={skill} skill={skill} onRemove={removeSkill} />
                  ))}
                </div>
              )}
              {formData.skills.length === 0 && (
                <p className="text-gray-400 text-sm">No skills added yet.</p>
              )}
            </div>
          )}

          {/* Step 4: Projects */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Projects</h2>
              <p className="text-gray-500 mb-6">Showcase your best work.</p>
              <div className="space-y-6">
                {formData.projects.map((project, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-700">Project {index + 1}</h3>
                      {formData.projects.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            updateField(
                              'projects',
                              formData.projects.filter((_, i) => i !== index)
                            )
                          }
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => updateProject(index, 'title', e.target.value)}
                        placeholder="Project title"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition bg-white"
                      />
                      <div className="relative">
                        <textarea
                          value={project.description}
                          onChange={(e) => updateProject(index, 'description', e.target.value)}
                          placeholder="Describe what you built and its impact..."
                          rows={3}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition resize-none bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleEnhanceProject(index)}
                          disabled={aiLoading[`project_${index}`]}
                          className="mt-1 inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 disabled:opacity-50 font-medium"
                        >
                          {aiLoading[`project_${index}`] ? (
                            <LoadingSpinner size="sm" />
                          ) : (
                            <Sparkles size={12} />
                          )}
                          Enhance Description
                        </button>
                      </div>
                      <input
                        type="url"
                        value={project.link}
                        onChange={(e) => updateProject(index, 'link', e.target.value)}
                        placeholder="https://github.com/you/project"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition bg-white text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => updateField('projects', [...formData.projects, defaultProject()])}
                className="mt-4 inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm"
              >
                <Plus size={16} /> Add Another Project
              </button>
            </div>
          )}

          {/* Step 5: Experience */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Experience</h2>
              <p className="text-gray-500 mb-6">Add your professional experience.</p>
              <div className="space-y-6">
                {formData.experience.map((exp, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-700">Position {index + 1}</h3>
                      {formData.experience.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            updateField(
                              'experience',
                              formData.experience.filter((_, i) => i !== index)
                            )
                          }
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExperience(index, 'role', e.target.value)}
                        placeholder="Job title / Role"
                        className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition bg-white"
                      />
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        placeholder="Company name"
                        className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition bg-white"
                      />
                    </div>
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                      placeholder="e.g., Jan 2022 - Present"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition bg-white mb-3"
                    />
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      placeholder="Describe your responsibilities and achievements..."
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition resize-none bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleEnhanceExperience(index)}
                      disabled={aiLoading[`exp_${index}`]}
                      className="mt-1 inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 disabled:opacity-50 font-medium"
                    >
                      {aiLoading[`exp_${index}`] ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <Sparkles size={12} />
                      )}
                      Enhance Description
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  updateField('experience', [...formData.experience, defaultExperience()])
                }
                className="mt-4 inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm"
              >
                <Plus size={16} /> Add Another Position
              </button>
            </div>
          )}

          {/* Step 6: Preview and Publish */}
          {step === 6 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Preview and Publish</h2>
                  <p className="text-gray-500">Review your portfolio and publish it.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 text-sm font-medium"
                  >
                    {saving ? <LoadingSpinner size="sm" /> : <Save size={14} />}
                    {savedSlug ? 'Update' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={handlePublish}
                    disabled={publishing || !savedSlug}
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 text-sm font-medium"
                  >
                    {publishing ? <LoadingSpinner size="sm" /> : <Globe size={14} />}
                    Publish
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                  >
                    <Printer size={14} /> PDF
                  </button>
                </div>
              </div>
              {savedSlug && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                  Portfolio saved at:{' '}
                  <a
                    href={`/portfolio/${savedSlug}`}
                    className="underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    /portfolio/{savedSlug}
                  </a>
                </div>
              )}
              {/* Live Preview */}
              <div className="border border-gray-200 rounded-xl overflow-hidden shadow-inner mt-4">
                <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-xs text-gray-500 ml-2">Portfolio Preview</span>
                </div>
                <div className="overflow-auto max-h-[70vh]">
                  <TemplateComponent data={formData} />
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 disabled:opacity-30 font-medium transition-colors"
            >
              <ChevronLeft size={18} /> Back
            </button>
            <span className="text-gray-400 text-sm">
              Step {step} of {TOTAL_STEPS}
            </span>
            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Next <ChevronRight size={18} />
              </button>
            ) : (
              <div className="w-20" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
