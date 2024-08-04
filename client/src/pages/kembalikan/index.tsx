import KembalikanSearch from "src/components/kembalikan/KembalikanSearch";

const KembalikanPage: React.FC = () => {
  return (
    <section className="w-full flex justify-center min-h-screen">
      <div className="flex flex-col items-center w-full max-w-7xl px-3 py-12">
        <h1>Kembalikan Buku</h1>
        <KembalikanSearch />
      </div>
    </section>
  );
};

export default KembalikanPage;
