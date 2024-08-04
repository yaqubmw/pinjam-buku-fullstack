import Container from "src/components/Container";
import PinjamForm from "src/components/pinjam/PinjamForm";

const PinjamPage: React.FC = () => {
  return (
    <Container>
      <h1 className="mb-4">Pinjam Buku</h1>
      <PinjamForm />
    </Container>
  );
};

export default PinjamPage;
