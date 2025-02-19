import React from "react";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-xl mb-6">
          Im a Full Stack Developer passionate about creating amazing web
          applications.
        </p>
        <Button onClick={scrollToAbout}>Learn More</Button>
      </motion.div>
    </section>
  );
};

export default Home;
