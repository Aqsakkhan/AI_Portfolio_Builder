import { Check } from 'lucide-react';

const steps = [
  'Template',
  'Personal Info',
  'Skills',
  'Projects',
  'Experience',
  'Preview',
];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-gray-200 z-0" />
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          return (
            <div key={step} className="flex flex-col items-center z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all ${
                  isCompleted
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : isCurrent
                    ? 'bg-white border-indigo-600 text-indigo-600'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                {isCompleted ? <Check size={14} /> : stepNum}
              </div>
              <span
                className={`mt-1 text-xs font-medium hidden sm:block ${
                  isCurrent ? 'text-indigo-600' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
