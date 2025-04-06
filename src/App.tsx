
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ResumeProvider } from "./context/ResumeContext";
import { AuthProvider } from "./context/AuthContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import ResumeBuilder from "./pages/ResumeBuilder";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

// Get base URL from Vite config
const baseUrl = import.meta.env.BASE_URL || '/';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check local storage or user preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return saved !== null ? JSON.parse(saved) : userPrefersDark;
    }
    return false;
  });

  useEffect(() => {
    // Update document class when theme changes
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ResumeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename={baseUrl}>
              <div className="flex flex-col min-h-screen">
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/resume" element={<ResumeBuilder />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </ResumeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
