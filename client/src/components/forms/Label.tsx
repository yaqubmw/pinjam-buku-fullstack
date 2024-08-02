export type LabelProps = {
  id?: string;
  children: React.ReactNode;
};

export const Label: React.FC<LabelProps> = ({ id, children }) => {
  if (!id) {
    return (
      <div className="block text-sm font-medium text-gray-700 whitespace-nowrap">
        {children}
      </div>
    );
  }
  return (
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 whitespace-nowrap"
    >
      {children}
    </label>
  );
};
