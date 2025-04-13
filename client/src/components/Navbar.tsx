import React, { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { Button } from "@/components/ui/button";
import { Menu, X, UserRound } from "lucide-react";
import logoDesktop from "@/assets/landing/NextRep.png";
import logoMobile from "@/assets/landing/NextRepLogo.png";
import { ScrollFadeIn } from "./ScrollFadeIn";

const Navbar = ({ handleGetStarted, handleLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [ref, isInView] = useInView<HTMLDivElement>();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <ScrollFadeIn duration={0.4} className="w-full md:px-12 px-2 md:py-8 py-4 flex justify-center fixed top-0 left-0 z-50 bg-transparent">

      <nav className="w-full max-w-7xl bg-gradient-to-r from-gray-50 to-gray-100 rounded-full md:py-3 py-2 md:px-8 px-4 flex items-center justify-between shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-[1.01]">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <div className="font-bold text-lg flex items-center">
            <NavLink href="/">
              <img
                src={logoDesktop}
                alt="Logo"
                className="hidden md:block w-24 h-auto"
              />
              <img
                src={logoMobile}
                alt="Logo"
                className="md:hidden w-8 h-auto ml-2"
              />
            </NavLink>
          </div>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex space-x-8">
          <NavLink href="/product">Product</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={handleLogin}
            className="text-gym-black hover:text-gym-darkgray font-medium"
          >
            Log In
          </button>
          <Button
            onClick={handleGetStarted}
            className="bg-gym-blue hover:bg-gym-lightblue text-white font-medium rounded-full px-8 py-2"
          >
            Start now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button
            onClick={handleGetStarted}
            className="bg-gym-lightblue hover:bg-gym-blue text-black font-medium rounded-full px-4 mr-3"
          >
            Start now
          </Button>

          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 mr-2">
            <UserRound className="w-5 h-5 text-gym-black" />
          </div>

          <button onClick={toggleMenu} className="text-gym-black p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 mx-3 bg-white rounded-lg shadow-lg p-4 z-50 md:hidden">
          <div className="flex flex-col space-y-4">
            <NavLink href="/product">Product</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>
        </div>
      )}
    </ScrollFadeIn>
  );
};

// Helper component for nav links
const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      className="text-gym-black hover:text-gym-darkgray font-medium"
    >
      {children}
    </a>
  );
};

export default Navbar;
