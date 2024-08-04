export const Loading: React.FC = () => {
    return (
      <div className="text-center text-gray-500 font-medium py-4 px-2 w-full flex items-center justify-center gap-2 duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5 text-indigo-500 duration-300 animate-spin"
        >
          <path d="M18.364 5.63604L16.9497 7.05025C15.683 5.7835 13.933 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12H21C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C14.4853 3 16.7353 4.00736 18.364 5.63604Z"></path>
        </svg>
        <div>Loading...</div>
      </div>
    );
}