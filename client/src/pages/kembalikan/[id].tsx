import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TxDetails from "src/components/kembalikan/TxDetails";
import { Book, Customer, Transaction } from "store/types";

const TxDetailsPage: React.FC = () => {
  const { id } = useRouter().query;
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionResponse = await fetch(`/api/transactions/${Number(id)}`);
        const transactionData = await transactionResponse.json();
        setTransaction(transactionData);

        const customerResponse = await fetch(
          `/api/customers/${transactionData.customer_id}`
        );
        const customerData = await customerResponse.json();
        setCustomer(customerData);

        const bookResponse = await fetch(
          `/api/books/${transactionData.book_id}`
        );
        const bookData = await bookResponse.json();
        setBook(bookData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="text-center font-bold flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <section className="w-full flex justify-center min-h-screen">
      <div className="flex flex-col items-center w-full max-w-3xl px-3 py-12">
        <h1>Detail Peminjaman</h1>
        {transaction && customer && book ? (
          <TxDetails
            transaction={transaction}
            customer={customer}
            book={book}
          />
        ) : (
          <div>Data not found</div>
        )}
      </div>
    </section>
  );
};

export default TxDetailsPage;
