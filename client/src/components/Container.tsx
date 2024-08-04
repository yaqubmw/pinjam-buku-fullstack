interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <section className="w-full flex justify-center min-h-screen">
      <div className="flex flex-col items-center w-full max-w-3xl px-3 py-12">
        {children}
      </div>
    </section>
  );
};

export default Container;
