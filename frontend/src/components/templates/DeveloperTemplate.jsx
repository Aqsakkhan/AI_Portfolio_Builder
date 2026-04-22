import { Mail, GitBranch, Link2, Globe, Terminal, ExternalLink } from 'lucide-react';

export default function DeveloperTemplate({ data }) {
  const { name, bio, skills, projects, experience, contact } = data;

  return (
    <div className="min-h-screen bg-gray-950 text-green-400 font-mono">
      {/* Terminal Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4 text-gray-500 text-sm">
            <Terminal size={14} />
            <span>~/portfolio</span>
            <span className="text-green-500">$</span>
            <span className="text-white">whoami</span>
          </div>
          <h1 className="text-4xl font-bold text-green-400 mb-2">{name || 'developer_name'}</h1>
          <p className="text-gray-300 leading-relaxed max-w-2xl text-sm">{bio || '// Your bio here'}</p>
          {contact && (
            <div className="flex flex-wrap gap-4 mt-4">
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="flex items-center gap-1 text-gray-400 hover:text-green-400 text-xs transition-colors">
                  <Mail size={12} /> {contact.email}
                </a>
              )}
              {contact.github && (
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-400 hover:text-green-400 text-xs transition-colors">
                  <GitBranch size={12} /> GitHub
                </a>
              )}
              {contact.linkedin && (
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-400 hover:text-green-400 text-xs transition-colors">
                  <Link2 size={12} /> LinkedIn
                </a>
              )}
              {contact.website && (
                <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-400 hover:text-green-400 text-xs transition-colors">
                  <Globe size={12} /> Website
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-12">
        {/* Skills */}
        {skills && skills.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-green-500 text-sm">const</span>
              <span className="text-blue-400 text-sm">skills</span>
              <span className="text-white text-sm">=</span>
              <span className="text-yellow-400 text-sm">[</span>
            </div>
            <div className="flex flex-wrap gap-2 ml-4">
              {skills.map((skill, i) => (
                <span key={i} className="bg-gray-800 border border-gray-700 text-green-300 px-3 py-1 rounded text-xs">
                  "{skill}"
                </span>
              ))}
            </div>
            <span className="text-yellow-400 text-sm">];</span>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-green-500 text-sm">// Projects</span>
            </div>
            <div className="grid gap-4">
              {projects.map((project, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-green-800 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-white font-bold">{project.title}</h3>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-400 flex-shrink-0 transition-colors">
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-400 mt-2 text-sm leading-relaxed">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section>
            <div className="mb-4 text-green-500 text-sm">// Experience</div>
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <div key={i} className="border-l-2 border-green-900 pl-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-white font-semibold">{exp.role}</h3>
                      <p className="text-green-400 text-sm">{exp.company}</p>
                    </div>
                    <span className="text-gray-500 text-xs">{exp.duration}</span>
                  </div>
                  <p className="text-gray-400 mt-2 text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
