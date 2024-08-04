import { useRouter } from "next/router";
import { LayoutDefault } from "./LayoutDefault";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;

  switch (pathname) {
    case "/":
      return <>{children}</>;
    default:
      return <LayoutDefault>{children}</LayoutDefault>;
  }
};
