import { title } from "@/components";
import DefaultLayout from "@/layouts/default";
import { askOpenAI, ChatMessage } from "@/api/aiApi";

type Message = { role: "assistant" | "user"; content: string };

export default function BlogPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "¡Hola! Soy tu asistente. ¿En qué puedo ayudarte hoy?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Tipar el ref para que TypeScript sepa que es un div y tenga scrollIntoView
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Preparar mensajes incluyendo un mensaje del sistema para que la IA actúe como guía
      const systemMessage: ChatMessage = {
        role: "system",
        content:
          "Soy un asistente inteligente que te ayudará en tus preguntas sobre el mundo de la programación.",
      };

      const history: ChatMessage[] = messages.map((m) => ({ role: m.role, content: m.content }));
      const messagesForApi: ChatMessage[] = [...history, { role: "user", content: userMessage.content }];

      // Insertar systemMessage al inicio
      messagesForApi.unshift(systemMessage);

      const reply = await askOpenAI(messagesForApi, { temperature: 0.4, max_tokens: 800 });
      const assistant: Message = { role: "assistant", content: reply || "Lo siento, no obtuve respuesta." };
      setMessages((prev) => [...prev, assistant]);
    } catch (err: any) {
      console.error('askOpenAI error', err);
      // Show a friendlier, non-technical message in the UI and log details to console
      const assistant: Message = {
        role: 'assistant',
        content:
          'Lo siento, no fue posible conectar. Revisa tu configuración e intenta nuevamente.',
      };
      setMessages((prev) => [...prev, assistant]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <DefaultLayout>
          <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-2xl md:max-w-4xl w-full text-center justify-center px-4">
              <h1 className="text-4xl font-bold mb-8">MiChats</h1>

              <div
                className="bg-white dark:bg-default-100 rounded-lg shadow-lg border border-divider flex flex-col h-[60vh] md:h-[55vh] lg:h-[50vh] max-h-[80vh] min-h-[300px]"
              >
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-2 items-start ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}

                      <div
                        className={`max-w-[75%] rounded-lg px-3 py-2 ${
                          message.role === "user" ? "bg-primary text-white" : "bg-default-100 text-foreground"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>

                      {message.role === "user" && (
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-2 items-start justify-start">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-default-100 rounded-lg px-3 py-2">
                        <Loader2 className="w-4 h-4 text-primary animate-spin" />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <div className="p-3 border-t border-divider">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Escribe tu mensaje..."
                      disabled={isLoading}
                      className="flex-1 bg-default-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                    />
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading || !input.trim()}
                      className="bg-primary text-white rounded-lg px-4 py-2 disabled:opacity-50 hover:opacity-90 transition-opacity"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
    </DefaultLayout>
  );
}
