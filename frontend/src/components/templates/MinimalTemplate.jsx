import { Mail, GitBranch, Link2, Globe, ExternalLink } from 'lucide-react';

export default function MinimalTemplate({ data }) {
  const { name, bio, skills, projects, experience, contact } = data;

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <header className="mb-12 border-b border-gray-200 pb-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-3">{name || 'Your Name'}</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
          {bio || 'Your professional bio goes here.'}
        </p>
        {contact && (
          <div className="flex flex-wrap gap-4 mt-4">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="flex items-center gap-1 text-gray-500 hover:text-gray-800 text-sm">
                <Mail size={14} /> {contact.email}
              </a>
            )}
            {contact.github && (
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-500 hover:text-gray-800 text-sm">
                <GitBranch size={14} /> GitHub
              </a>
            )}
            {contact.linkedin && (
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-500 hover:text-gray-800 text-sm">
                <Link2 size={14} /> LinkedIn
              </a>
            )}
            {contact.website && (
              <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-500 hover:text-gray-800 text-sm">
                <Globe size={14} /> Website
              </a>
            )}
          </div>
        )}
      </header>

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Projects</h2>
          <div className="grid gap-4">
            {projects.map((project, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 flex-shrink-0">
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <div key={i} className="border-l-2 border-gray-200 pl-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                    <p className="text-indigo-600 text-sm">{exp.company}</p>
                  </div>
                  <span className="text-gray-400 text-sm whitespace-nowrap">{exp.duration}</span>
                </div>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
