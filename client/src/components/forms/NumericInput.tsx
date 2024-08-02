import { useFormContext } from "react-hook-form";

export type NumericInputProps = {
  id: string;
  name: string;
  rules?: Record<string, any>;
  step?: number;
  width?: string;
  placeholder?: string;
};

export const NumericInput: React.FC<NumericInputProps> = ({
  id,
  name,
  rules,
  step = 0.01,
  width = "w-full",
  placeholder = "",
}) => {
  const { register } = useFormContext();
  return (
    <input
      {...register(name, rules)}
      type="number"
      name={name}
      id={id}
      step={step}
      placeholder={placeholder}
      className={`form-input block ${width} duration-300 border-gray-300 bg-white text-sm text-gray-700 rounded-md shadow no-outline no-scrollbar focus:shadow-indigo-300`}
    />
  );
};
