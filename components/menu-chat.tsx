"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    ChatMessage,
    MenuSuggestion,
    MercadonaProduct,
} from "@/lib/menu-types";
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
    onApplySuggestion: (suggestion: MenuSuggestion) => void;
}

export function MenuChat({ onApplySuggestion }: MenuChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "1",
            role: "assistant",
            content:
                "¡Hola! Te ayudo a crear menús de Mercadona 🍽️\n\nEscribe qué tipo de menú necesitas:\n• Desayuno saludable\n• Comida rápida\n• Cena familiar\n• Merienda\n\nTe responderé con productos específicos de Mercadona en este formato exacto:\n\n🍽️ Plato Principal: [producto]\n🥗 Acompañamiento: [producto]\n🍰 Postre: [producto]\n🥤 Bebida: [producto]",
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

    // Función para validar si el formato del menú es correcto
    const isValidMenuFormat = (content: string): boolean => {
        const requiredEmojis = ["🍽️", "🥗", "🍰", "🥤"];
        const hasAllEmojis = requiredEmojis.every((emoji) =>
            content.includes(emoji)
        );

        // Verificar que tenga exactamente 4 líneas con emojis
        const lines = content
            .split("\n")
            .filter((line) => line.trim().length > 0);
        const emojiLines = lines.filter((line) =>
            requiredEmojis.some((emoji) => line.includes(emoji))
        );

        return hasAllEmojis && emojiLines.length >= 4;
    };

    // Función para intentar corregir el formato de la respuesta
    const attemptFormatCorrection = (content: string): string => {
        const allProducts = searchProducts("");
        const correctedLines: string[] = [];

        // Buscar productos mencionados y organizarlos por categoría
        const foundProducts = {
            main: allProducts.filter(
                (p) =>
                    (p.category === "main-dishes" ||
                        p.category === "ready-meals") &&
                    content.toLowerCase().includes(p.name.toLowerCase())
            ),
            sides: allProducts.filter(
                (p) =>
                    p.category === "sides" &&
                    content.toLowerCase().includes(p.name.toLowerCase())
            ),
            desserts: allProducts.filter(
                (p) =>
                    p.category === "desserts" &&
                    content.toLowerCase().includes(p.name.toLowerCase())
            ),
            beverages: allProducts.filter(
                (p) =>
                    p.category === "beverages" &&
                    content.toLowerCase().includes(p.name.toLowerCase())
            ),
            breakfast: allProducts.filter(
                (p) =>
                    p.category === "breakfast" &&
                    content.toLowerCase().includes(p.name.toLowerCase())
            ),
        };

        // Construir formato correcto
        const mainProduct = foundProducts.main[0] || foundProducts.breakfast[0];
        const sideProduct =
            foundProducts.sides[0] || foundProducts.breakfast[1];
        const dessertProduct =
            foundProducts.desserts[0] || foundProducts.breakfast[2];
        const beverageProduct = foundProducts.beverages[0];

        if (mainProduct || sideProduct || dessertProduct || beverageProduct) {
            correctedLines.push(
                `🍽️ Plato Principal: ${mainProduct?.name || "No disponible"}`
            );
            correctedLines.push(
                `🥗 Acompañamiento: ${sideProduct?.name || "No disponible"}`
            );
            correctedLines.push(
                `🍰 Postre: ${dessertProduct?.name || "No disponible"}`
            );
            correctedLines.push(
                `🥤 Bebida: ${beverageProduct?.name || "Agua Mineral Natural"}`
            );

            return correctedLines.join("\n");
        }

        return content; // Si no podemos corregir, devolver original
    };

    const buildSystemPrompt = () => {
        // Obtener todos los productos del catálogo organizados por categoría
        const allProducts = searchProducts(""); // Esto devuelve todos los productos

        const productsByCategory = {
            "main-dishes": allProducts.filter(
                (p) => p.category === "main-dishes"
            ),
            sides: allProducts.filter((p) => p.category === "sides"),
            desserts: allProducts.filter((p) => p.category === "desserts"),
            beverages: allProducts.filter((p) => p.category === "beverages"),
            breakfast: allProducts.filter((p) => p.category === "breakfast"),
            snacks: allProducts.filter((p) => p.category === "snacks"),
            "ready-meals": allProducts.filter(
                (p) => p.category === "ready-meals"
            ),
        };

        const formatProductList = (products: MercadonaProduct[]) =>
            products.map((p) => `- ${p.name}`).join("\n");

        return `Tu única tarea es responder con EXACTAMENTE 4 líneas usando SOLO estos productos de Mercadona:

PRODUCTOS DISPONIBLES:
${formatProductList(productsByCategory["main-dishes"])}
${formatProductList(productsByCategory["ready-meals"])}
${formatProductList(productsByCategory["sides"])}
${formatProductList(productsByCategory["desserts"])}
${formatProductList(productsByCategory["beverages"])}
${formatProductList(productsByCategory["breakfast"])}
${formatProductList(productsByCategory["snacks"])}

RESPONDE ÚNICAMENTE CON ESTAS 4 LÍNEAS (sin texto adicional):

🍽️ Plato Principal: [producto exacto de la lista]
🥗 Acompañamiento: [producto exacto de la lista]  
🍰 Postre: [producto exacto de la lista]
🥤 Bebida: [producto exacto de la lista]

NO añadas explicaciones. NO uses otros formatos. COPIA los nombres exactos.`;
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
            // Añadir ejemplos de formato correcto al historial para entrenar el modelo
            const trainingExamples: OllamaChatMessage[] = [
                {
                    role: "user",
                    content: "menú saludable",
                },
                {
                    role: "assistant",
                    content:
                        "🍽️ Plato Principal: Salmón a la Plancha con Verduras\n🥗 Acompañamiento: Ensalada Mixta Preparada\n🍰 Postre: Yogur Griego Natural\n🥤 Bebida: Agua Mineral Natural",
                },
                {
                    role: "user",
                    content: "desayuno",
                },
                {
                    role: "assistant",
                    content:
                        "🍽️ Plato Principal: Tostadas Integrales\n🥗 Acompañamiento: Mermelada de Fresa Hacendado\n🍰 Postre: Plátanos de Canarias\n🥤 Bebida: Zumo de Naranja Natural",
                },
            ];

            const chatMessages: OllamaChatMessage[] = [
                {
                    role: "system",
                    content: buildSystemPrompt(),
                },
                ...trainingExamples,
                ...messages.slice(-6).map((msg) => ({
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
                model: "gemma3:1b",
                messages: chatMessages,
                stream: false,
                options: {
                    temperature: 0.1,
                    top_p: 0.3,
                    num_predict: 150,
                    stop: ["\n\n", "Ejemplo", "EJEMPLO", "---"],
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

            // Post-procesar la respuesta para corregir formatos incorrectos
            let processedContent = data.message.content;

            // Si la respuesta no tiene el formato correcto, intentar corregirla
            if (!isValidMenuFormat(processedContent)) {
                console.log(
                    "Formato incorrecto detectado, intentando corregir..."
                );
                processedContent = attemptFormatCorrection(processedContent);
            }

            const assistantMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: processedContent,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);

            // Crear menú editable si detectamos sugerencias estructuradas
            createEditableMenu(processedContent, assistantMessage.id);
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
        const menuItems: SuggestedMenuItem[] = [];
        const allProducts = searchProducts(""); // Obtener todos los productos

        // Función para encontrar producto exacto por nombre
        const findExactProduct = (
            productName: string
        ): MercadonaProduct | null => {
            const cleanName = productName
                .trim()
                .replace(/\*+/g, "")
                .replace(/[:.!?]/g, "")
                .replace(/^-\s*/, "") // Quitar guiones al inicio
                .replace(/^\s*[\*\-]\s*/, "") // Quitar asteriscos y guiones con espacios
                .trim();

            console.log(`Buscando producto: "${cleanName}"`);

            // Buscar coincidencia exacta primero
            let product = allProducts.find((p) => p.name === cleanName);
            if (product) {
                console.log(`Encontrado exacto: ${product.name}`);
                return product;
            }

            // Buscar coincidencia parcial más estricta
            product = allProducts.find(
                (p) => p.name.toLowerCase() === cleanName.toLowerCase()
            );
            if (product) {
                console.log(`Encontrado por case insensitive: ${product.name}`);
                return product;
            }

            // Buscar por palabras clave importantes
            const searchWords = cleanName.toLowerCase().split(" ");
            product = allProducts.find((p) => {
                const productWords = p.name.toLowerCase().split(" ");
                // Debe coincidir al menos 60% de las palabras importantes
                const matches = searchWords.filter(
                    (word) =>
                        word.length > 3 && // Solo palabras importantes
                        productWords.some(
                            (pWord) =>
                                pWord.includes(word) || word.includes(pWord)
                        )
                );
                return matches.length >= Math.ceil(searchWords.length * 0.6);
            });

            if (product) {
                console.log(
                    `Encontrado por palabras clave: ${product.name} para "${cleanName}"`
                );
            } else {
                console.warn(`NO encontrado: "${cleanName}"`);
            }

            return product || null;
        };

        // Patrones mejorados para detectar productos en diferentes formatos
        const patterns = [
            // Formato correcto con emoji de plato principal
            {
                regex: /🍽️.*?(?:Principal|Plato).*?:\s*([^\n🥗🍰🥤]+?)(?:\n|$)/gi,
                category: "main-dishes" as const,
            },
            // Formato correcto con emoji de acompañamiento
            {
                regex: /🥗.*?(?:Acompañamiento|Guarnición).*?:\s*([^\n🍽️🍰🥤]+?)(?:\n|$)/gi,
                category: "sides" as const,
            },
            // Formato correcto con emoji de postre
            {
                regex: /🍰.*?(?:Postre|Dulce).*?:\s*([^\n🍽️🥗🥤]+?)(?:\n|$)/gi,
                category: "desserts" as const,
            },
            // Formato correcto con emoji de bebida
            {
                regex: /🥤.*?(?:Bebida|Líquido).*?:\s*([^\n🍽️🥗🍰]+?)(?:\n|$)/gi,
                category: "beverages" as const,
            },
            // Patrones adicionales para formato incorrecto pero detectable
            // Desayuno con emoji de plato principal
            {
                regex: /🍽️.*?(?:Desayuno).*?:\s*([^\n🥗🍰🥤]+?)(?:\n|$)/gi,
                category: "breakfast" as const,
            },
            // Comida con emoji de plato principal
            {
                regex: /🍽️.*?(?:Comida|Almuerzo).*?:\s*([^\n🥗🍰🥤]+?)(?:\n|$)/gi,
                category: "main-dishes" as const,
            },
        ];

        let foundAnyMatch = false;

        patterns.forEach(({ regex, category }) => {
            let match;
            while ((match = regex.exec(content)) !== null) {
                if (match[1]) {
                    foundAnyMatch = true;
                    const rawText = match[1].trim();
                    console.log(`Patrón ${category} encontró: "${rawText}"`);

                    // Si el texto contiene listas con asteriscos o guiones, separar elementos
                    const items =
                        rawText.includes("*") || rawText.includes("-")
                            ? rawText
                                  .split(/[\*\-]/)
                                  .filter((item) => item.trim().length > 0)
                            : [rawText];

                    items.forEach((item) => {
                        const product = findExactProduct(item);

                        if (product) {
                            // Verificar que la categoría coincida o sea compatible
                            const compatibleCategories = {
                                "main-dishes": ["main-dishes", "ready-meals"],
                                sides: ["sides", "breakfast"],
                                desserts: ["desserts", "breakfast"],
                                beverages: ["beverages"],
                                breakfast: ["breakfast", "desserts", "sides"],
                            };

                            if (
                                compatibleCategories[category]?.includes(
                                    product.category
                                ) ||
                                product.category === category
                            ) {
                                menuItems.push({
                                    id: `${messageId}-${category}-${Date.now()}-${Math.random()}`,
                                    product,
                                    category,
                                    quantity: 1,
                                    reason: `Sugerido por IA: "${item.trim()}"`,
                                    isOriginalSuggestion: true,
                                });
                                console.log(
                                    `✅ Añadido: ${product.name} (${category})`
                                );
                            } else {
                                console.warn(
                                    `❌ Categoría incompatible: ${product.name} es ${product.category}, esperaba ${category}`
                                );
                            }
                        }
                    });
                }
            }
        });

        // Si no encontramos nada con los patrones principales, intentar buscar productos mencionados en el texto
        if (!foundAnyMatch) {
            console.log(
                "No se encontraron patrones, buscando productos mencionados en el texto..."
            );
            allProducts.forEach((product) => {
                if (
                    content.toLowerCase().includes(product.name.toLowerCase())
                ) {
                    console.log(
                        `Producto encontrado en texto: ${product.name}`
                    );
                    menuItems.push({
                        id: `${messageId}-${
                            product.category
                        }-${Date.now()}-${Math.random()}`,
                        product,
                        category: product.category,
                        quantity: 1,
                        reason: `Detectado en texto: "${product.name}"`,
                        isOriginalSuggestion: true,
                    });
                }
            });
        }

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
            console.log(`✅ Menú creado con ${menuItems.length} productos`);
        } else {
            console.warn(
                "No se encontraron productos válidos en la respuesta de la IA"
            );
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
                            className={`flex gap-3 ${
                                message.role === "user"
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
                                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                    message.role === "user"
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
                        placeholder="Ej: desayuno, cena familiar, comida rápida..."
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
