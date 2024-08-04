import Link from "next/link";
import { Book, Customer, Transaction } from "store/types";

interface TxCardProps {
  transaction: Transaction;
  customer: Customer | undefined;
  book: Book | undefined;
}

const TxCard = ({ transaction, customer, book }: TxCardProps) => {
  const { price, rent_date, return_date, is_returned } = transaction;
  const { name, membership_number, birth_date } = customer || {};
  const { title, publisher, page_count, stock } = book || {};

  const formatDate = (date?: string) => {
    if (!date) {
      return <span className="italic text-red-500">Belum dikembalikan</span>;
    }
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // console.log("book", book);
  // console.log("customer", customer);

  return (
    <Link href={`/kembalikan/${transaction.id}`}>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col">
          <div className="flex flex-col gap-1">
            <span className="font-semibold">Peminjam: </span>
            <span>{name}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold italic">{membership_number}</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-semibold">Judul Buku: </span>
            <span>{title}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <span className="font-semibold">Harga: </span>
              <span>Rp {price}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Tanggal Pinjam: </span>
              <span>{formatDate(rent_date)}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Dikembalikan: </span>
              <span
                className={`font-semibold ${
                  is_returned ? "text-green-500" : "text-red-500"
                }`}
              >
                {is_returned ? "Sudah" : "Belum"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TxCard;
