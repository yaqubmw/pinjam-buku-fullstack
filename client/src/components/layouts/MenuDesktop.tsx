import Link from "next/link";

export const MenuDesktop: React.FC = () => {
    return (
      <div className="hidden md:flex items-center justify-end gap-2">
        <Link
          href="/rent"
          className="p-2 cursor-pointer flex items-center justify-center duration-300 hover:text-indigo-700"
        >
          Pinjam
        </Link>
        <Link
          href="/return"
          className="p-2 cursor-pointer flex items-center justify-center duration-300 hover:text-indigo-700"
        >
          Kembalikan
        </Link>
        <Link
          href="/history"
          className="p-2 cursor-pointer flex items-center justify-center duration-300 hover:text-indigo-700"
        >
          Riwayat
        </Link>
      </div>
    );
}