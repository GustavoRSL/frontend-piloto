import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import AIAgent from "./pages/AIAgent";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toaster } from "./components/ui/toaster";
import EmployeeCRUD from "./components/EmployeeCRUD";

const MainContent: React.FC = () => (
  <>
    <Home />
    <About />
    <Projects />
    <Contact />
  </>
);

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/employee-crud" element={<EmployeeCRUD />} />
            </Routes>
          </main>
          <AIAgent />
        </div>
      </ThemeProvider>
      <Toaster />
    </Router>
  );
};

export default App;
