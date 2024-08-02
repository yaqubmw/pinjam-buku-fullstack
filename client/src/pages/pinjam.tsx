import PinjamForm from "src/components/pinjam/PinjamForm";

const PinjamPage: React.FC = () => {
  return (
    <section className="w-full flex justify-center min-h-screen">
      <div className="flex flex-col items-center w-full max-w-7xl px-3 py-12">
        <h1>Pinjam Buku</h1>
        <PinjamForm />
      </div>
    </section>
  );
};

export default PinjamPage;
