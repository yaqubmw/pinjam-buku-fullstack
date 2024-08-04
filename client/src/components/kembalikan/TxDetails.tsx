import { Book, Customer, Transaction } from "store/types";
import Button from "../Button";
import { useState } from "react";
import axios from "axios";

interface TxDetailsProps {
  transaction: Transaction;
  customer: Customer | undefined;
  book: Book | undefined;
}

const TxDetails = ({ transaction, customer, book }: TxDetailsProps) => {
  const [isReturning, setIsReturning] = useState(false);
  const { customer_id, book_id, price, rent_date, return_date, is_returned } =
    transaction;
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

  const handleReturn = async () => {
    setIsReturning(true);

    try {
      const resTx = await axios.put(`/api/transactions/${transaction.id}`, {
        customer_id,
        book_id,
        price,
        rent_date,
        return_date: new Date().toISOString(),
        is_returned: true,
      });

      const resBook = await axios.put(`/api/books/${book?.id}`, {
        title,
        publisher,
        page_count,
        stock: book?.stock ? book?.stock + 1 : 0,
      });

      const updatedTransaction: Transaction = resTx.data;
      const updatedBook: Book = resBook.data;

      book?.stock && (book.stock = updatedBook.stock);
      transaction.return_date = updatedTransaction.return_date;
      transaction.is_returned = updatedTransaction.is_returned;
    } catch (error) {
      console.error("Error updating transaction:", error);
    } finally {
      setIsReturning(false);
    }
  };

  return (
    <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-12 rounded-md bg-white shadow">
      <div className="col-span-1 flex flex-col gap-4 border border-indigo-300 p-4">
        <div className="flex flex-col">
          <span className="font-semibold">Nomor Anggota: </span>
          <span>{membership_number?.toString()}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Nama: </span>
          <span>{name}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Tanggal Lahir: </span>
          <span>{formatDate(birth_date)}</span>
        </div>
      </div>
      <div className="col-span-1 flex flex-col gap-2 border border-indigo-300 p-4">
        <div className="flex flex-col">
          <span className="font-semibold">Judul Buku: </span>
          <span>{title}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Penerbit: </span>
          <span>{publisher}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Jumlah Halamaan: </span>
          <span>{page_count}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Stok Buku: </span>
          <span>{stock}</span>
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 flex flex-col gap-3 border border-indigo-300 p-4">
        <div className="flex flex-wrap justify-evenly items-center">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="font-semibold">Tanggal Pinjam: </span>
              <span>{formatDate(rent_date)}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Harga: </span>
              <span>Rp {price}</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <span className="font-semibold">Tanggal Pengembalian: </span>
              <span>{formatDate(return_date)}</span>
            </div>
            <div className="flex flex-col">
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
      <div className="col-span-1 md:col-span-2 flex items-center justify-center">
        <Button
          className={`w-full ${
            is_returned ? "opacity-60 cursor-not-allowed text-gray-800" : ""
          }`}
          disabled={is_returned || isReturning}
          onClick={handleReturn}
        >
          {is_returned ? (
            <span>Buku Sudah dikembalikan</span>
          ) : isReturning ? (
            <span>Memproses...</span>
          ) : (
            <span>Setujui Pengembalian</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default TxDetails;
