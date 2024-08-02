import { useFormContext } from "react-hook-form";

export interface OptionProps {
  key: any;
  value: any;
  optionLabel?: any;
}

export type SelectProps = {
  id: string;
  name: string;
  options: OptionProps[];
  width?: string;
  rules?: Record<string, any>;
  placeholder?: string;
};

export const Select: React.FC<SelectProps> = ({
  id,
  name,
  options,
  rules = {},
  width = "w-full",
  placeholder = "Select",
}) => {
  const { register } = useFormContext();
  return (
    <select
      {...register(name, rules)}
      id={id}
      className={`${width} block form-select duration-300 border-gray-300 bg-white text-sm text-gray-700 rounded-md shadow no-outline no-scrollbar focus:shadow-indigo-300`}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.key} value={option.key}>
          {option.optionLabel || option.value}
        </option>
      ))}
    </select>
  );
};
