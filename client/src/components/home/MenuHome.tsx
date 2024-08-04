import Link from "next/link";

export const MenuHome: React.FC = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <Link
          href={"/rent"}
          className="col-span-1 duration-300 border border-indigo-300 hover:bg-white bg-indigo-50 flex items-center justify-center p-12 text-center font-medium"
        >
          Pinjam Buku
        </Link>
        <Link
          href={"/return"}
          className="col-span-1 duration-300 border border-indigo-300 hover:bg-white bg-indigo-50 flex items-center justify-center p-12 text-center font-medium"
        >
          Kembalikan Buku
        </Link>
        <Link
          href={"/history"}
          className="col-span-1 md:col-span-2 place-self-center duration-300 border border-indigo-300 hover:bg-white bg-indigo-50 flex items-center justify-center p-12 text-center font-medium"
        >
          History Peminjaman
        </Link>
      </div>
    );
}