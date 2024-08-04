import Link from "next/link";
import { Logo } from "../logo";

interface MenuMobileProps {
  toggleMenu: () => void;
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

export const MenuMobile: React.FC<MenuMobileProps> = ({
  toggleMenu,
  isOpen,
  setIsOpen,
}) => {
  const handleClick = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="block md:hidden">
        <button
          onClick={toggleMenu}
          className="lg:hidden duration-300 hover:text-indigo-700 p-2 cursor-pointer"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path d="M16 18V20H5V18H16ZM21 11V13H3V11H21ZM19 4V6H8V4H19Z"></path>
            </svg>
          )}
        </button>
      </div>
      <div
        className={`duration-300 fixed z-20 left-0 right-0 top-0 flex flex-col items-center justify-center
          ${
            isOpen
              ? "h-screen w-full bg-indigo-100 opacity-100"
              : "h-0 w-0 opacity-100 overflow-hidden"
          }
        `}
      >
        <div className="absolute top-0 right-0 p-4">
          <button
            onClick={handleClick}
            className="lg:hidden duration-300 hover:text-indigo-700 p-2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path>
            </svg>
          </button>
        </div>
        <Link onClick={handleClick} href="/">
          <div>
            <Logo />
          </div>
        </Link>
        <Link onClick={handleClick}
          href="/rent"
          className="p-2 cursor-pointer flex items-center justify-center duration-300 hover:text-indigo-700"
        >
          Pinjam
        </Link>
        <Link onClick={handleClick}
          href="/return"
          className="p-2 cursor-pointer flex items-center justify-center duration-300 hover:text-indigo-700"
        >
          Kembalikan
        </Link>
        <Link onClick={handleClick}
          href="/history"
          className="p-2 cursor-pointer flex items-center justify-center duration-300 hover:text-indigo-700"
        >
          Riwayat
        </Link>
      </div>
    </>
  );
};
