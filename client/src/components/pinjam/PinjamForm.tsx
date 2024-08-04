import axios from "axios";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { fetchBooks } from "store/slices/bookSlice";
import { fetchCustomers } from "store/slices/customerSlice";
import { Book, Customer } from "store/types";
import { InputWrapper } from "../forms/InputWrapper";
import { Label } from "../forms/Label";
import { Select } from "../forms/Select";
import { ErrorMessage } from "../forms/ErrorMessage";
import { NumericInput } from "../forms/NumericInput";
import Button from "../Button";

export type FormData = {
  customer_id: number | null;
  book_id: number | null;
  price: number | null;
  rent_date: string;
};

const PinjamForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Fetching customers and books from the store
  const customers = useSelector(
    (state: RootState) => state.customers
  ) as Customer[];
  const books = useSelector((state: RootState) => state.books) as Book[];

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD
    setCurrentDate(today);
    dispatch(fetchCustomers());
    dispatch(fetchBooks());
  }, [dispatch]);

  const displayCurrentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Setting up useForm hook
  const methods = useForm<FormData>({
    defaultValues: {
      customer_id: null,
      book_id: null,
      price: null,
      rent_date: currentDate,
    },
    mode: "all",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = methods;

  // Loading state check
  if (!customers || !books) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post("/api/transactions", {
        customer_id: data.customer_id,
        book_id: data.book_id,
        price: data.price,
        rent_date: currentDate,
      });

      const book = books.find((book) => book.id === data.book_id);
      if (book) {
        book.stock -= 1;
        await axios.put(`/api/books/${data.book_id}`, { stock: book.stock });
      }

      reset({
        customer_id: null,
        book_id: null,
        price: null,
        rent_date: currentDate,
      });
    } catch (error) {
      console.error("Failed to submit the form", error);
    }
  };

  return (
    <div className="w-full max-w-[24rem] p-8 bg-white flex items-center justify-center rounded-lg shadow-xl">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-80">
          <div className="flex flex-col gap-4">
            {/* Input customer */}
            <InputWrapper outerClassName="flex-col">
              <Label id="customer_id">Nama Peminjam</Label>
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
              />
              {errors.customer_id?.message && (
                <ErrorMessage>{errors.customer_id.message}</ErrorMessage>
              )}
            </InputWrapper>

            {/* Input book */}
            <InputWrapper outerClassName="flex-col">
              <Label id="book_id">Judul Buku</Label>
              <Select
                id="book_id"
                name="book_id"
                options={books.map((book) => ({
                  key: book.id,
                  value: book.id,
                  optionLabel: book.title,
                }))}
                placeholder="Pilih Buku"
                rules={{ required: "Judul Buku harus diisi" }}
              />
              {errors.book_id?.message && (
                <ErrorMessage>{errors.book_id.message}</ErrorMessage>
              )}
            </InputWrapper>

            {/* Input price */}
            <InputWrapper outerClassName="flex-col">
              <Label id="price">Harga</Label>
              <NumericInput
                id="price"
                name="price"
                placeholder="Enter price"
                rules={{
                  required: "Harga harus diisi",
                  min: { value: 1000, message: "Harga harus lebih dari 1000" },
                }}
              />
              {errors.price?.message && (
                <ErrorMessage>{errors.price?.message}</ErrorMessage>
              )}
            </InputWrapper>

            {/* Display current date */}
            <InputWrapper outerClassName="flex-col">
              <Label id="rent_date">Tanggal Pinjam</Label>
              <p>
                <span>{displayCurrentDate}</span> (Hari ini)
              </p>
            </InputWrapper>

            {/* Submit button */}
            <Button type="submit" disabled={!isValid}>
              Pinjam Buku
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default PinjamForm;
