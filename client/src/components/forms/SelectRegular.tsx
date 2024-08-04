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
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
};

export const SelectRegular: React.FC<SelectProps> = ({
  id,
  name,
  options,
  width = "w-full",
  placeholder = "Select",
  onChange,
  disabled = false,
}) => {
  return (
    <select
      id={id}
      name={name}
      className={`${width} block form-select duration-300 border-gray-300 bg-white text-sm text-gray-700 rounded-md shadow no-outline no-scrollbar focus:shadow-indigo-300`}
      onChange={onChange}
      disabled={disabled}
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
