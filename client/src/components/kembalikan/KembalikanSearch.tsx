import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "store/slices/transactionSlice";
import { fetchCustomers } from "store/slices/customerSlice";
import { fetchBooks } from "store/slices/bookSlice";
import { Select } from "../forms/Select";
import { AppDispatch, RootState } from "store";
import { Book, Customer, Transaction } from "store/types";
import { useForm, FormProvider } from "react-hook-form";
import TxCard from "./TxCard";
import Link from "next/link";

const KembalikanSearch = () => {
  const dispatch: AppDispatch = useDispatch();
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  ) as Transaction[];
  const customers = useSelector(
    (state: RootState) => state.customers
  ) as Customer[];
  const books = useSelector((state: RootState) => state.books) as Book[];
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const methods = useForm();
  const { watch, setValue } = methods;
  const selectedCustomerId = watch("customer_id");
  const selectedBookId = watch("book_id");

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCustomers());
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    let filtered = transactions;

    if (selectedCustomerId) {
      filtered = filtered.filter(
        (transaction) => transaction.customer_id === Number(selectedCustomerId)
      );
    }

    if (selectedBookId) {
      filtered = filtered.filter(
        (transaction) => transaction.book_id === Number(selectedBookId)
      );
    }

    setFilteredTransactions(filtered);
  }, [selectedCustomerId, selectedBookId, transactions]);

  const getCustomerById = (customerId: number) => {
    const customer = customers.find((customer) => customer.id === customerId);
    return customer;
  };

  const getBookById = (bookId: number) => {
    const book = books.find((book) => book.id === bookId);
    return book;
  };

  //   console.log("filteredTransactions", filteredTransactions);
  //   console.log("selectedCustomerId", selectedCustomerId);
  //   console.log("selectedBookId", selectedBookId);

  return (
    <div className="w-full min-w-[24rem] max-w-5xl p-8 bg-white flex flex-col items-center justify-center rounded-lg shadow-xl">
      <FormProvider {...methods}>
        <form className="w-full min-w-80 max-w-5xl py-4 flex items-center justify-center">
          <div
            id="filter-section"
            className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-xl"
          >
            <h5 className="whitespace-nowrap">Search Filter</h5>
            <Select
              id="customer_id"
              name="customer_id"
              options={customers.map((customer) => ({
                key: customer.id,
                value: customer.id,
                optionLabel: customer.name,
              }))}
              placeholder="Pilih Anggota"
              rules={{ required: "Nama Anggota harus diisi" }}
              onChange={(e) => setValue("customer_id", e.target.value)}
            />
            <Select
              id="book_id"
              name="book_id"
              options={books.map((book) => ({
                key: book.id,
                value: book.id,
                optionLabel: book.title,
              }))}
              placeholder="Pilih Buku"
              rules={{ required: "Buku harus diisi" }}
              onChange={(e) => setValue("book_id", e.target.value)}
            />
          </div>
        </form>
        <div id="horizontal-line" className="w-full h-0.5 bg-indigo-300"></div>
        <div
          id="transaction-section"
          className="py-4 grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-4"
        >
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <Link
                href={`/kembalikan/${transaction.id}`}
                key={transaction.id}
                className="col-span-1 shadow-md border border-indigo-300"
              >
                <div id="transaction-item">
                  <TxCard
                    transaction={transaction}
                    customer={getCustomerById(transaction.customer_id)}
                    book={getBookById(transaction.book_id)}
                  />
                </div>
              </Link>
            ))
          ) : (
            <div>Tidak ada peminjaman ditemukan.</div>
          )}
        </div>
      </FormProvider>
    </div>
  );
};

export default KembalikanSearch;
