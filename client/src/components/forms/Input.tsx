import { useFormContext } from "react-hook-form";

export type InputProps = {
  id: string;
  name: string;
  type:
    | "text"
    | "email"
    | "url"
    | "password"
    | "date"
    | "datetime-local"
    | "month"
    | "search"
    | "tel"
    | "time"
    | "week";
  rules?: Record<string, any>;
  width?: string;
  placeholder?: string;
};

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  rules = {},
  width = "w-full",
  placeholder = "",
}) => {
  const { register } = useFormContext();
  return (
    <input
      {...register(name, rules)}
      placeholder={placeholder}
      type={type}
      name={name}
      id={id}
      className={`form-input block ${width} duration-300 border-gray-300 bg-white text-sm text-gray-700 rounded-md shadow no-outline no-scrollbar focus:shadow-indigo-300`}
    />
  );
};
