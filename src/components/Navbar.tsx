import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "./ModeToggle";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        setIsMenuOpen(false);
      }, 500);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b border-border/40">
      <div className="container flex justify-between items-center h-14 max-w-screen-2xl">
        <a className="flex items-center space-x-2 ml-4" href="/">
          <span className="font-bold text-lg">Meu Portfólio</span>
        </a>
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium mr-4">
          <Button variant="ghost" onClick={() => scrollToSection("home")}>
            Home
          </Button>
          <Button variant="ghost" onClick={() => scrollToSection("about")}>
            Sobre
          </Button>
          <Button variant="ghost" onClick={() => scrollToSection("projects")}>
            Projetos
          </Button>
          <Button variant="ghost" onClick={() => scrollToSection("contact")}>
            Contato
          </Button>
          <ModeToggle />
        </div>
        <div className="md:hidden flex items-center space-x-2">
          <ModeToggle />
          <Button variant="ghost" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border/40"
          >
            <div className="container py-4 flex flex-col space-y-4">
              <Button variant="ghost" onClick={() => scrollToSection("home")}>
                Home
              </Button>
              <Button variant="ghost" onClick={() => scrollToSection("about")}>
                Sobre
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("projects")}
              >
                Projetos
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("contact")}
              >
                Contato
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
