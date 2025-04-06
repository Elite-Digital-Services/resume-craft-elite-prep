
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleAuthClick = () => {
    toast({
      title: "Authentication Coming Soon",
      description: "Sign in functionality will be available in the next update!",
    });
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-eliteblue dark:text-eliteblue-light">
                Elite Test Prep
              </Link>
            </div>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/resume" className="border-eliteblue dark:border-eliteblue-light text-eliteblue dark:text-eliteblue-light hover:text-eliteblue-light inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Resume Builder
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button onClick={handleAuthClick} variant="outline">Sign in</Button>
            <Button onClick={handleAuthClick}>Sign up</Button>
          </div>
          <div className="flex items-center sm:hidden">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full mr-2">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300">
              Home
            </Link>
            <Link to="/resume" className="block pl-3 pr-4 py-2 border-l-4 border-eliteblue text-base font-medium text-eliteblue hover:text-eliteblue-light hover:bg-gray-50 hover:border-eliteblue-light">
              Resume Builder
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4 space-x-2">
              <Button onClick={handleAuthClick} className="w-full" variant="outline">Sign in</Button>
              <Button onClick={handleAuthClick} className="w-full">Sign up</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
