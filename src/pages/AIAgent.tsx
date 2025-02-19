import React, { useState, useEffect, useRef } from "react";
import { OpenAI } from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/index";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Configuração da API da OpenAI
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface Message {
  text: string;
  sender: "user" | "ai";
}

type ChatMessage = ChatCompletionMessageParam & {
  role: "user" | "assistant" | "system";
  content: string;
};

const AIAgent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "Olá! Sou sua assistente virtual, especializada no currículo de Gustavo Reis Souza Lima. Estou aqui para fornecer respostas claras e objetivas sobre as habilidades e experiências de Gustavo, incluindo seu trabalho com Node.js, React, Angular, AWS, Docker, Prisma e muito mais. Se precisar de informações sobre seu perfil ou tiver dúvidas sobre suas competências, estou à disposição para ajudar!",
          sender: "ai",
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    const messagesToSend: ChatMessage[] = [
      {
        role: "system",
        content:
          "Você é um assistente virtual especializado no currículo de Gustavo Reis Souza Lima, um desenvolvedor Full Stack e estudante de Sistemas de Informação na UFLA. Sua tarefa é responder de forma clara e objetiva sobre as experiências, habilidades e competências de Gustavo. Ele tem experiência com desenvolvimento de aplicações web, utilizando Node.js no back-end, e Angular/React no front-end, além de conhecimentos em Tailwind CSS, ShadCN/UI, Docker, Prisma, Postgres e AWS. Ele trabalha com metodologias ágeis como Scrum e Kanban, aplica boas práticas como SOLID e Clean Code, e tem experiência em documentação de APIs com Swagger, CI/CD e versionamento de código com Git. Também possui inglês intermediário (B1) e é proativo e comunicativo.",
      },
      ...messages.map(
        (m): ChatMessage => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        })
      ),
      { role: "user", content: input },
    ];

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Modelos gratuitos, como o GPT-3.5, são bastante poderosos.
        messages: messagesToSend,
        temperature: 0.7,
      });

      const aiResponse = response.choices[0]?.message?.content;

      if (!aiResponse) {
        throw new Error("Resposta da IA vazia ou inválida.");
      }

      const aiMessage: Message = { text: aiResponse, sender: "ai" };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Erro ao se comunicar com a IA:", error);

      const errorMessage =
        (error as Error)?.message ||
        "Erro desconhecido ao processar sua mensagem.";

      setMessages((prev) => [
        ...prev,
        { text: `Erro: ${errorMessage}`, sender: "ai" },
      ]);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setHasNotification(false);
  };

  return (
    <div className="fixed bottom-8 right-4 z-100">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-80 h-[26rem] flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>AI Assistant</CardTitle>
                <Button variant="ghost" size="icon" onClick={toggleChat}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-grow">
                <ScrollArea className="h-64 w-full pr-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-2 ${
                        message.sender === "ai" ? "text-left" : "text-right"
                      }`}
                    >
                      <span
                        className={`inline-block p-2 rounded-lg ${
                          message.sender === "ai"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {message.text}
                      </span>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <div className="flex w-full">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Digite uma mensagem..."
                    className="mr-2"
                  />
                  <Button onClick={handleSend}>Enviar</Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              size="icon"
              className="fixed bottom-4 right-4 z-1000 rounded-full w-12 h-12"
              onClick={toggleChat}
            >
              <MessageCircle className="h-6 w-6" />
              {hasNotification && (
                <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full" />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAgent;
