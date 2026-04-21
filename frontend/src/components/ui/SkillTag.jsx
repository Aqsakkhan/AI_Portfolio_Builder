import { X } from 'lucide-react';

export default function SkillTag({ skill, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
      {skill}
      {onRemove && (
        <button
          onClick={() => onRemove(skill)}
          className="hover:text-indigo-900 transition-colors"
          type="button"
        >
          <X size={12} />
        </button>
      )}
    </span>
  );
}
