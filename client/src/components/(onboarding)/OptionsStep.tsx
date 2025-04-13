
interface OptionsStepProps {
  title: string;
  category: string;
  values: { label: string; image?: string }[]; // Image is optional
  selectedValue: any;
  handleSelectChange: (category: string, value: string) => void;
}

const OptionsStep: React.FC<OptionsStepProps> = ({
  title,
  category,
  values,
  selectedValue,
  handleSelectChange,
}) => {
  if (!values[0].image) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {values.map((option, index) => (
          <div
            key={index}
            className={`p-4 border rounded-lg cursor-pointer transition w-full ${
              selectedValue === option.label
                ? "border-gym-blue bg-gym-blue text-white"
                : "border-gray-300 hover:border-gym-blue"
            }`}
            onClick={() => handleSelectChange(category, option.label)}
          >
            <div className="text-lg font-medium">{option.label}</div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>

      <div className="grid grid-cols-2 gap-4">
        {values.map((option, index) => (
          <div
            key={index}
            className={`p-4 border rounded-lg cursor-pointer transition ${
              selectedValue === option.label
                ? "border-gym-blue bg-gym-blue text-white"
                : "border-gray-300 hover:border-gym-blue"
            }`}
            onClick={() => handleSelectChange(category, option.label)}
          >
            <img
              src={option.image}
              alt={option.label}
              className="w-full h-48 object-cover rounded-md mb-2"
            />

            <div className="text-lg font-medium">{option.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionsStep;
