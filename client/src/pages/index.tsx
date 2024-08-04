import Link from "next/link";
import Container from "src/components/Container";
import { MenuHome } from "src/components/home/MenuHome";
import { TitleHome } from "src/components/home/TitleHome";

const Home: React.FC = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center h-full w-full gap-6 lg:gap-8">
        <TitleHome />
        <MenuHome />
      </div>
    </Container>
  );
};

export default Home;
