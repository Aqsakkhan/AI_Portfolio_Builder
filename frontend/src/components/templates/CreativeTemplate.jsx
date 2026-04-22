import { Mail, GitBranch, Link2, Globe, ExternalLink, Sparkles } from 'lucide-react';

export default function CreativeTemplate({ data }) {
  const { name, bio, skills, projects, experience, contact } = data;

  const colors = [
    'bg-pink-100 text-pink-700',
    'bg-purple-100 text-purple-700',
    'bg-blue-100 text-blue-700',
    'bg-green-100 text-green-700',
    'bg-yellow-100 text-yellow-700',
    'bg-orange-100 text-orange-700',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Gradient Header */}
      <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles size={20} className="text-yellow-300" />
          </div>
          <h1 className="text-5xl font-extrabold mb-4">{name || 'Your Name'}</h1>
          <p className="text-purple-100 max-w-2xl mx-auto leading-relaxed text-lg">
            {bio || 'Your creative bio goes here.'}
          </p>
          {contact && (
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full text-sm transition-colors">
                  <Mail size={14} /> {contact.email}
                </a>
              )}
              {contact.github && (
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full text-sm transition-colors">
                  <GitBranch size={14} /> GitHub
                </a>
              )}
              {contact.linkedin && (
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full text-sm transition-colors">
                  <Link2 size={14} /> LinkedIn
                </a>
              )}
              {contact.website && (
                <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full text-sm transition-colors">
                  <Globe size={14} /> Website
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Skills */}
        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Skills & Expertise</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, i) => (
                <span key={i} className={`px-4 py-2 rounded-full text-sm font-semibold ${colors[i % colors.length]}`}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Featured Projects</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100 group"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {project.title}
                    </h3>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-600 flex-shrink-0 transition-colors">
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4">
                  <div className="w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{exp.role}</h3>
                        <p className="text-purple-600 font-medium text-sm">{exp.company}</p>
                      </div>
                      <span className="text-gray-400 text-sm">{exp.duration}</span>
                    </div>
                    <p className="text-gray-600 mt-2 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
