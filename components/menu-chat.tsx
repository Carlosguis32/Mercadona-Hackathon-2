"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChatMessage, MenuSuggestion } from "@/lib/menu-types";
import { searchProducts } from "@/lib/mercadona-products";
import { OllamaChatMessage, OllamaChatRequest } from "@/lib/ollama-types";
import { Bot, Loader2, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
    SuggestedMenu,
    SuggestedMenuItem,
    SuggestedMenu as SuggestedMenuType,
} from "./suggested-menu";

interface MenuChatProps {
    currentMenu: Record<string, number>;
    menuContext: string;
    onApplySuggestion: (suggestion: MenuSuggestion) => void;
}

export function MenuChat({
    currentMenu,
    menuContext,
    onApplySuggestion,
}: MenuChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "1",
            role: "assistant",
            content:
                "¡Hola! Soy tu asistente de menús completos de Mercadona 🍽️. Te ayudo a crear menús equilibrados con platos precocinados, postres y productos listos para consumir.\n\nDime qué tipo de comida necesitas (desayuno, almuerzo, comida, cena) o qué ocasión tienes en mente, ¡y te sugiero un menú completo!",
            timestamp: new Date(),
        },
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [recentlyAdded, setRecentlyAdded] = useState<string[]>([]);
    const [suggestedMenus, setSuggestedMenus] = useState<SuggestedMenuType[]>(
        []
    );
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const buildSystemPrompt = () => {
        const menuItems = Object.entries(currentMenu)
            .filter(([, quantity]) => quantity > 0)
            .map(([productId, quantity]) => `${productId}: ${quantity}`)
            .join(", ");

        return `Eres un experto en menús completos de Mercadona. Tu trabajo es ayudar a los usuarios a crear menús equilibrados usando platos precocinados, postres y productos listos de Mercadona.

Productos actualmente seleccionados: ${menuItems || "Ninguno seleccionado"}

Productos disponibles en Mercadona: ${menuContext}

Instrucciones:
1. Ayuda a crear menús completos para diferentes ocasiones (desayuno, almuerzo, comida, cena)
2. Sugiere combinaciones equilibradas de platos principales + acompañamientos + postres + bebidas
3. Considera aspectos nutricionales y variedad de sabores
4. Adapta las sugerencias según preferencias (vegano, sin gluten, etc.)
5. Incluye productos listos para consumir y platos precocinados de Mercadona
6. Propón menús para diferentes ocasiones (familiar, romántica, rápida, saludable)

Cuando el usuario mencione una ocasión o tipo de comida, responde con:
"Para [OCASIÓN/COMIDA] te sugiero este menú de Mercadona:

🍽️ **Plato Principal**: [producto exacto de Mercadona]
🥗 **Acompañamiento**: [producto exacto de Mercadona] 
🍰 **Postre**: [producto exacto de Mercadona]
🥤 **Bebida**: [producto exacto de Mercadona]

Los productos se añadirán automáticamente a tu lista de compras."

IMPORTANTE: Usa los nombres EXACTOS de productos disponibles en Mercadona para que se puedan añadir automáticamente. Por ejemplo: "Paella Valenciana Hacendado", "Tiramisú Hacendado", "Zumo de Naranja Natural", etc.

Mantén un tono amigable y profesional en español, enfocándote en la comodidad de tener comidas completas listas.`;
    };

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: "user",
            content: inputMessage,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputMessage("");
        setIsLoading(true);

        try {
            const chatMessages: OllamaChatMessage[] = [
                {
                    role: "system",
                    content: buildSystemPrompt(),
                },
                ...messages.slice(-10).map((msg) => ({
                    role:
                        msg.role === "user"
                            ? ("user" as const)
                            : ("assistant" as const),
                    content: msg.content,
                })),
                {
                    role: "user",
                    content: inputMessage,
                },
            ];

            const requestBody: OllamaChatRequest = {
                model: "gemma3:4b",
                messages: chatMessages,
                stream: false,
                options: {
                    temperature: 0.7,
                    top_p: 0.9,
                },
            };

            const response = await fetch("/api/ollama/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Ollama API Error:", errorText);
                throw new Error(
                    `Error de conexión con Ollama (${response.status}): ${errorText}`
                );
            }

            const data = await response.json();

            if (data.error) {
                console.error("Ollama Response Error:", data.error);
                throw new Error(`Error de Ollama: ${data.error}`);
            }

            if (!data.message || !data.message.content) {
                console.error("Invalid Ollama Response:", data);
                throw new Error("Respuesta inválida de Ollama");
            }

            const assistantMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.message.content,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);

            // Crear menú editable si detectamos sugerencias estructuradas
            createEditableMenu(data.message.content, assistantMessage.id);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content:
                    "Lo siento, ha ocurrido un error al procesar tu mensaje. Asegúrate de que Ollama esté funcionando correctamente.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const createEditableMenu = (content: string, messageId: string) => {
        // Detectar si es un menú estructurado
        if (
            !content.includes("🍽️") &&
            !content.includes("🥗") &&
            !content.includes("🍰") &&
            !content.includes("🥤")
        ) {
            return; // No es un menú estructurado
        }

        const menuItems: SuggestedMenuItem[] = [];

        // Patrones para detectar productos mencionados con sus categorías
        const patterns = [
            {
                regex: /🍽️.*?(?:Principal|Plato).*?:\s*\*?\*?([^\n🥗🍰🥤*]+)\*?\*?/gi,
                category: "main-dishes" as const,
            },
            {
                regex: /🥗.*?(?:Acompañamiento|Guarnición).*?:\s*\*?\*?([^\n🍽️🍰🥤*]+)\*?\*?/gi,
                category: "sides" as const,
            },
            {
                regex: /🍰.*?(?:Postre|Dulce).*?:\s*\*?\*?([^\n🍽️🥗🥤*]+)\*?\*?/gi,
                category: "desserts" as const,
            },
            {
                regex: /🥤.*?(?:Bebida|Líquido).*?:\s*\*?\*?([^\n🍽️🥗🍰*]+)\*?\*?/gi,
                category: "beverages" as const,
            },
        ];

        patterns.forEach(({ regex, category }) => {
            let match;
            while ((match = regex.exec(content)) !== null) {
                if (match[1]) {
                    const cleanName = match[1]
                        .trim()
                        .replace(/\*+/g, "") // Quitar asteriscos
                        .replace(/[:.!?]/g, "") // Quitar puntuación
                        .trim();

                    // Buscar producto en el catálogo
                    const matchingProducts = searchProducts(cleanName);
                    if (matchingProducts.length > 0) {
                        const product = matchingProducts[0];
                        menuItems.push({
                            id: `${messageId}-${category}-${Date.now()}`,
                            product,
                            category,
                            quantity: 1,
                            reason: `Sugerido por IA: "${cleanName}"`,
                            isOriginalSuggestion: true,
                        });
                    }
                }
            }
        });

        // Si encontramos productos, crear el menú
        if (menuItems.length > 0) {
            const newMenu: SuggestedMenuType = {
                id: `menu-${messageId}`,
                title: extractMenuTitle(content) || "Menú Sugerido",
                description:
                    extractMenuDescription(content) ||
                    "Menú personalizado creado por IA",
                items: menuItems,
                timestamp: new Date(),
            };

            setSuggestedMenus((prev) => [...prev, newMenu]);
        }
    };

    const extractMenuTitle = (content: string): string | null => {
        // Buscar patrones como "Para [ocasión] te sugiero"
        const titleMatch = content.match(
            /Para\s+([^:]+)(?:\s+te sugiero|\s+recomiendo)/i
        );
        if (titleMatch) {
            return `Menú para ${titleMatch[1].trim()}`;
        }
        return null;
    };

    const extractMenuDescription = (content: string): string | null => {
        // Extraer la primera línea como descripción
        const lines = content
            .split("\n")
            .filter((line) => line.trim().length > 0);
        if (lines.length > 0) {
            return lines[0].trim();
        }
        return null;
    };

    const handleUpdateMenu = (updatedMenu: SuggestedMenuType) => {
        setSuggestedMenus((prev) =>
            prev.map((menu) =>
                menu.id === updatedMenu.id ? updatedMenu : menu
            )
        );
    };

    const handleDismissMenu = (menuId: string) => {
        setSuggestedMenus((prev) => prev.filter((menu) => menu.id !== menuId));
    };

    const handleAddMenuToCart = (productId: string, quantity: number) => {
        const suggestion: MenuSuggestion = {
            action: "add",
            productId,
            productName:
                searchProducts("").find((p) => p.id === productId)?.name || "",
            reason: "Añadido desde menú sugerido",
            quantity,
        };
        onApplySuggestion(suggestion);

        // Mostrar notificación
        const productName =
            searchProducts("").find((p) => p.id === productId)?.name || "";
        setRecentlyAdded((prev) => [...prev, `${productName} (${quantity})`]);
        setTimeout(() => {
            setRecentlyAdded((prev) =>
                prev.filter((name) => !name.startsWith(productName))
            );
        }, 3000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    Chef de Menús Completos
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
                {/* Área de mensajes */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex gap-3 ${message.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                                }`}
                        >
                            {message.role === "assistant" && (
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                    <Bot className="h-4 w-4 text-green-600" />
                                </div>
                            )}

                            <div
                                className={`max-w-[80%] rounded-lg px-4 py-2 ${message.role === "user"
                                        ? "bg-blue-500 text-white ml-auto"
                                        : "bg-gray-100"
                                    }`}
                            >
                                <p className="text-sm whitespace-pre-wrap">
                                    {message.content}
                                </p>
                                <div className="text-xs opacity-70 mt-1">
                                    {message.timestamp.toLocaleTimeString()}
                                </div>
                            </div>

                            {message.role === "user" && (
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <User className="h-4 w-4 text-blue-600" />
                                </div>
                            )}
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex gap-3 justify-start">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <Bot className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="bg-gray-100 rounded-lg px-4 py-2">
                                <div className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span className="text-sm">Pensando...</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Menús sugeridos editables */}
                {suggestedMenus.length > 0 && (
                    <div className="space-y-3">
                        {suggestedMenus.map((menu) => (
                            <SuggestedMenu
                                key={menu.id}
                                menu={menu}
                                onAddToCart={handleAddMenuToCart}
                                onUpdateMenu={handleUpdateMenu}
                                onDismiss={() => handleDismissMenu(menu.id)}
                            />
                        ))}
                    </div>
                )}

                {/* Notificaciones de productos añadidos automáticamente */}
                {recentlyAdded.length > 0 && (
                    <div className="px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                        <div className="text-sm text-green-800 font-medium mb-1">
                            ✅ Se añadieron automáticamente:
                        </div>
                        <div className="space-y-1">
                            {recentlyAdded.map((productName, index) => (
                                <div
                                    key={index}
                                    className="text-xs text-green-700 flex items-center gap-1"
                                >
                                    <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                                    {productName}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input área */}
                <div className="flex gap-2 pt-3 border-t">
                    <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="¿Qué menú necesitas? (ej: desayuno saludable, cena rápida, comida familiar...)"
                        disabled={isLoading}
                        className="flex-1"
                    />
                    <Button
                        onClick={sendMessage}
                        disabled={!inputMessage.trim() || isLoading}
                        size="sm"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
