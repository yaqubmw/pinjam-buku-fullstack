import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TxDetails from "src/components/kembalikan/TxDetails";
import { Book, Customer, Transaction } from "store/types";
import Container from "src/components/Container";
import { Loading } from "src/components/loading";

const TxDetailsPage: React.FC = () => {
  const { id } = useRouter().query;
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionResponse = await fetch(
          `/api/transactions/${Number(id)}`
        );
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
    return (
      <div className="text-center font-medium flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <Container>
      <h1>Detail Peminjaman</h1>
      {transaction && customer && book ? (
        <TxDetails transaction={transaction} customer={customer} book={book} />
      ) : (
        <div>Data tidak ditemukan</div>
      )}
    </Container>
  );
};

export default TxDetailsPage;
