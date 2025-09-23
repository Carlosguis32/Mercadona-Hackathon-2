"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createUserMessage, ollama } from "@/lib/ollama-client";
import { OllamaModel } from "@/lib/ollama-types";
import { useState } from "react";

export default function OllamaPlaygroundPage() {
    const [models, setModels] = useState<OllamaModel[]>([]);
    const [selectedModel, setSelectedModel] = useState<string>("");
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<
        "unknown" | "connected" | "error"
    >("unknown");
    const [chatHistory, setChatHistory] = useState<
        Array<{ role: "user" | "assistant"; content: string }>
    >([]);

    const checkConnection = async () => {
        setIsLoading(true);
        try {
            const modelList = await ollama.getModels();
            setModels(modelList);
            setConnectionStatus("connected");
            if (modelList.length > 0 && !selectedModel) {
                setSelectedModel(modelList[0].name);
            }
        } catch (error) {
            setConnectionStatus("error");
            console.error("Error connecting to Ollama:", error);
        }
        setIsLoading(false);
    };

    const generateResponse = async () => {
        if (!selectedModel || !prompt.trim()) return;

        setIsLoading(true);
        setResponse("");

        try {
            const result = await ollama.simpleGenerate(selectedModel, prompt);
            setResponse(result);
        } catch (error) {
            setResponse(
                `Error: ${
                    error instanceof Error ? error.message : "Error desconocido"
                }`
            );
        }

        setIsLoading(false);
    };

    const sendChatMessage = async () => {
        if (!selectedModel || !prompt.trim()) return;

        const userMessage = { role: "user" as const, content: prompt };
        const newHistory = [...chatHistory, userMessage];
        setChatHistory(newHistory);

        setIsLoading(true);
        setPrompt("");

        try {
            const messages = newHistory.map((msg) =>
                createUserMessage(msg.content)
            );
            const result = await ollama.simpleChat(selectedModel, messages);

            setChatHistory([
                ...newHistory,
                { role: "assistant", content: result },
            ]);
        } catch (error) {
            setChatHistory([
                ...newHistory,
                {
                    role: "assistant",
                    content: `Error: ${
                        error instanceof Error
                            ? error.message
                            : "Error desconocido"
                    }`,
                },
            ]);
        }

        setIsLoading(false);
    };

    const clearChat = () => {
        setChatHistory([]);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-3xl font-bold mb-8">Ollama Playground</h1>

            {/* Connection Status */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        Estado de Conexión
                        <Badge
                            variant={
                                connectionStatus === "connected"
                                    ? "default"
                                    : connectionStatus === "error"
                                    ? "destructive"
                                    : "secondary"
                            }
                        >
                            {connectionStatus === "connected"
                                ? "Conectado"
                                : connectionStatus === "error"
                                ? "Error"
                                : "Desconocido"}
                        </Badge>
                    </CardTitle>
                    <CardDescription>
                        Verifica la conexión con Ollama y obtén la lista de
                        modelos disponibles
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={checkConnection} disabled={isLoading}>
                        {isLoading ? "Verificando..." : "Verificar Conexión"}
                    </Button>

                    {models.length > 0 && (
                        <div className="mt-4">
                            <p className="text-sm text-muted-foreground mb-2">
                                Modelos disponibles: {models.length}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {models.map((model) => (
                                    <Badge key={model.name} variant="outline">
                                        {model.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Text Generation */}
                <Card>
                    <CardHeader>
                        <CardTitle>Generación de Texto</CardTitle>
                        <CardDescription>
                            Genera texto usando un prompt simple
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Select
                            value={selectedModel}
                            onValueChange={setSelectedModel}
                            disabled={models.length === 0}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un modelo" />
                            </SelectTrigger>
                            <SelectContent>
                                {models.map((model) => (
                                    <SelectItem
                                        key={model.name}
                                        value={model.name}
                                    >
                                        {model.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Textarea
                            placeholder="Escribe tu prompt aquí..."
                            value={prompt}
                            onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>
                            ) => setPrompt(e.target.value)}
                            rows={4}
                        />

                        <Button
                            onClick={generateResponse}
                            disabled={
                                isLoading || !selectedModel || !prompt.trim()
                            }
                            className="w-full"
                        >
                            {isLoading ? "Generando..." : "Generar"}
                        </Button>

                        {response && (
                            <div className="border rounded-lg p-4 bg-muted">
                                <h4 className="font-medium mb-2">Respuesta:</h4>
                                <p className="text-sm whitespace-pre-wrap">
                                    {response}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Chat Interface */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            Chat
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={clearChat}
                            >
                                Limpiar
                            </Button>
                        </CardTitle>
                        <CardDescription>
                            Mantén una conversación con el modelo
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="border rounded-lg p-4 h-64 overflow-y-auto bg-muted/50">
                            {chatHistory.length === 0 ? (
                                <p className="text-muted-foreground text-sm">
                                    No hay mensajes aún. Comienza una
                                    conversación.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {chatHistory.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`p-2 rounded-lg ${
                                                msg.role === "user"
                                                    ? "bg-blue-100 ml-4"
                                                    : "bg-gray-100 mr-4"
                                            }`}
                                        >
                                            <div className="text-xs font-medium mb-1">
                                                {msg.role === "user"
                                                    ? "Tú"
                                                    : "Asistente"}
                                            </div>
                                            <div className="text-sm whitespace-pre-wrap">
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <Input
                                placeholder="Escribe tu mensaje..."
                                value={prompt}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setPrompt(e.target.value)}
                                onKeyPress={(
                                    e: React.KeyboardEvent<HTMLInputElement>
                                ) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        sendChatMessage();
                                    }
                                }}
                            />
                            <Button
                                onClick={sendChatMessage}
                                disabled={
                                    isLoading ||
                                    !selectedModel ||
                                    !prompt.trim()
                                }
                            >
                                {isLoading ? "⏳" : "Enviar"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
