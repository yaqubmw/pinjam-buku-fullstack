import Container from "src/components/Container";
import KembalikanSearch from "src/components/kembalikan/KembalikanSearch";

const KembalikanPage: React.FC = () => {
  return (
    <Container>
      <h1 className="mb-4">Kembalikan Buku</h1>
      <KembalikanSearch />
    </Container>
  );
};

export default KembalikanPage;
