import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "src/components/Container";
import { Loading } from "src/components/loading";
import TxCard from "src/components/TxCard";
import { AppDispatch, RootState } from "store";
import { fetchBooks } from "store/slices/bookSlice";
import { fetchCustomers } from "store/slices/customerSlice";
import { Book, Customer, Transaction } from "store/types";

const HistoryTxPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const itemPerPage = 6;

  const customers = useSelector(
    (state: RootState) => state.customers
  ) as Customer[];
  const books = useSelector((state: RootState) => state.books) as Book[];

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchBooks());
  }, [dispatch]);

  const getCustomerById = (customerId: number) => {
    const customer = customers.find((customer) => customer.id === customerId);
    return customer;
  };

  const getBookById = (bookId: number) => {
    const book = books.find((book) => book.id === bookId);
    return book;
  };

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/transactions?page=${page}&limit=${itemPerPage}&sort=desc`
        );
        const newTransactions = response.data;

        setTransactions((prev) => [...prev, ...newTransactions]);
        setHasMore(newTransactions.length === itemPerPage);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore]);

  return (
    <Container>
      <h1 className="mb-4">History Peminjaman</h1>
      <div
        id="history-section"
        className="py-12 grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-4 w-full px-4 rounded-lg bg-white shadow"
      >
        {transactions.map((transaction) => (
          <Link
            href={`/kembalikan/${transaction.id}`}
            key={transaction.id}
            className={`col-span-1 border border-indigo-300 w-full duration-300 ${
              transaction.is_returned
                ? "bg-gray-50 text-gray-500 hover:bg-indigo-100"
                : "bg-white hover:bg-indigo-50"
            }`}
          >
            <div id="transaction-item">
              <TxCard
                key={transaction.id}
                transaction={transaction}
                customer={getCustomerById(transaction.customer_id)}
                book={getBookById(transaction.book_id)}
              />
            </div>
          </Link>
        ))}
      </div>
      {loading && (
        <Loading />
      )}
    </Container>
  );
};

export default HistoryTxPage;
