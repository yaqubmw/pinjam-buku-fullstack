import Container from "src/components/Container";
import TxList from "src/components/history/TxList";

const HistoryTxPage: React.FC = () => {
  return (
    <Container>
      <h1 className="mb-4">History Peminjaman</h1>
      <TxList />
    </Container>
  );
};

export default HistoryTxPage;
