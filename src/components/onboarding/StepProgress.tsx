
interface StepProgressProps {
  steps: number;
  currentStep: number;
}

const StepProgress = ({ steps, currentStep }: StepProgressProps) => {
  return (
    <div className="flex gap-2 mb-8">
      {Array.from({ length: steps }).map((_, index) => (
        <div
          key={index}
          className={`h-1 rounded-full w-10 ${
            index <= currentStep ? "bg-terracotta" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

export default StepProgress;
