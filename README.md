# **PinjamBuku App**

---

This project is built with Laravel 10 as the backend and Next.js 14 (Pages Router) as the frontend.

## Dependencies

- PostgreSQL for the database
- react-hook-form for client input validation
- TypeScript
- Tailwind CSS
- @tailwindcss/forms
- Redux Toolkit and Persist for state management
- Axios for managing data from API

## Installation

### Backend

1. Navigate to the server directory:
    ```bash
    cd server
    ```

2. Install the dependencies:
    ```bash
    composer install
    ```

3. Copy the example environment file and modify it for your environment:
    - Windows:
        ```bash
        copy .env.example .env
        ```
    - Ubuntu:
        ```bash
        cp .env.example .env
        ```

4. Edit the `.env` file with your database credentials:
    ```env
    DB_CONNECTION=pgsql
    DB_HOST={HOST}
    DB_PORT={PORT}
    DB_DATABASE={DBNAME}
    DB_USERNAME={USER}
    DB_PASSWORD={PASSWRD}
    ```

5. Generate the application key:
    ```bash
    php artisan key:generate
    ```

6. Run the migrations:
    ```bash
    php artisan migrate
    ```

7. Serve the application:
    ```bash
    php artisan serve
    ```

8. Go to [http://localhost:8000/](http://localhost:8000/) (default)

### Frontend

1. Navigate to the client directory:
    ```bash
    cd client
    ```

2. Install the dependencies:
    ```bash
    npm i
    # or
    npm install
    ```

3. Copy the example environment file and modify it for your environment:
    - Windows:
        ```bash
        copy .env.example .env
        ```
    - Ubuntu:
        ```bash
        cp .env.example .env
        ```

4. Edit the `.env` file with your server URL:
    ```env
    SERVER_URL=http://localhost:8000
    # or
    SERVER_URL=https://yourapi.com
    ```

5. Run the development server:
    ```bash
    npm run dev
    ```

## Endpoints

### Backend

- `/api/books` to add and show all books (ordered by id asc/desc)
- `/api/books/:id` to update, delete, and show details of a specific book

- `/api/customers` to add and show all customers (ordered by id asc/desc)
- `/api/customers/:id` to update, delete, and show details of a specific customer

- `/api/transactions` to add and show all transactions (with paging: page, limit, skip, and order by id asc/desc)
- `/api/transactions/:id` to update, delete, and show details of a specific transaction

### Client URLs

- `/rent` for inputting rent data, such as customer_id, book_id, price, and rent date (auto-generated with current time), with the selected book's stock auto-decremented
- `/return` to show all rent transactions that are not yet returned (is_returned=false)
- `/return/:id` for inputting return data. All inputs are auto-generated with one button (return date with current time, change is_returned to 'true', and auto-increment book's stock)
- `/history` to show all transactions with infinite scroll features for paging

## Additional Information

### Why use `/api/path` instead of `http://localhost:8000/api/path` or `https://yourapi.com/api/path`?

In the `next.config.mjs`, there is a rewrite rule that automatically rewrites every `/api/path` to `${SERVER_URL}/api/path`:

```javascript
rewrites: async () => {
  return {
    fallback: [
      {
        source: "/api/:path*",
        destination: `${String(process.env.SERVER_URL) || "http://localhost:8000"}/api/:path*`
      },
    ],
  };
},
