import { Footer } from "./Footer";
import { Nav } from "./Nav";

interface LayoutDefaultProps {
  children: React.ReactNode;
}

export const LayoutDefault: React.FC<LayoutDefaultProps> = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
};
