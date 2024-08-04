import Link from "next/link";
import { Logo } from "../logo";
import { MenuDesktop } from "./MenuDesktop";
import { useState } from "react";
import { MenuMobile } from "./MenuMobile";

export const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-indigo-100 w-full h-[60px] shadow relative">
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto lg:px-4 px-2">
        <div className="flex items-center justify-start">
          <Link href="/">
            <div>
              <Logo />
            </div>
          </Link>
        </div>
        <MenuDesktop />
        <MenuMobile toggleMenu={toggleMenu} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </nav>
  );
};
