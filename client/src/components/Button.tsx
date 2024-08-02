interface ButtonProps {
  id?: string;
  name?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  id,
  name,
  onClick,
  className,
  type,
  disabled,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      id={id}
      name={name}
      className={`block w-full duration-300 rounded-md bg-indigo-800 hover:bg-indigo-700 text-white font-semibold py-2 px-4 ${className} ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;