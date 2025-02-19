import React from "react";
import { motion } from "framer-motion";
import { Badge } from "../components/ui/badge";

const About: React.FC = () => {
  const skills = ["Node.js", "React", "MongoDB", "Prisma", "Docker", "AWS"];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center bg-muted/50 pt-20 md:pt-0"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <p className="text-lg mb-6">
          Im a passionate Full Stack Developer with extensive experience in
          building robust and scalable web applications. My expertise lies in
          developing RESTful APIs, implementing JWT authentication, and working
          with modern ORMs like Prisma.
        </p>
        <h3 className="text-2xl font-semibold mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {skills.map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
        <p className="text-lg">
          With a strong background in both Back-End and Full Stack development,
          I specialize in creating efficient and secure applications. My
          experience includes working with cloud environments for deployments
          and ensuring optimal performance of web applications.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
