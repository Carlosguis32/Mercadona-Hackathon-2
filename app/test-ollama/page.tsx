"use client";

import { Button } from "@/components/ui/button";
import { createUserMessage, ollama } from "@/lib/ollama-client";
import { OllamaModel } from "@/lib/ollama-types";
import { useState } from "react";

interface TestResult {
    test: string;
    status: "pending" | "success" | "error";
    message: string;
    duration?: number;
}

export default function TestOllamaPage() {
    const [results, setResults] = useState<TestResult[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [models, setModels] = useState<OllamaModel[]>([]);

    const updateTestResult = (index: number, result: Partial<TestResult>) => {
        setResults((prev) =>
            prev.map((test, i) => (i === index ? { ...test, ...result } : test))
        );
    };

    const runTests = async () => {
        setIsRunning(true);
        setResults([
            {
                test: "Conexión básica a Ollama",
                status: "pending",
                message: "Ejecutando...",
            },
            {
                test: "Obtener lista de modelos",
                status: "pending",
                message: "Esperando...",
            },
            {
                test: "Generar texto simple",
                status: "pending",
                message: "Esperando...",
            },
            {
                test: "Chat con modelo",
                status: "pending",
                message: "Esperando...",
            },
        ]);

        // Test 1: Conexión básica
        try {
            const startTime = Date.now();
            const testModels = await ollama.getModels();
            const duration = Date.now() - startTime;

            setModels(testModels);
            updateTestResult(0, {
                status: "success",
                message: `Conexión exitosa. Encontrados ${testModels.length} modelos.`,
                duration,
            });
        } catch (error) {
            updateTestResult(0, {
                status: "error",
                message: `Error: ${
                    error instanceof Error ? error.message : "Error desconocido"
                }`,
                duration: 0,
            });
        }

        // Test 2: Lista de modelos
        try {
            const startTime = Date.now();
            const modelList = await ollama.getModels();
            const duration = Date.now() - startTime;

            updateTestResult(1, {
                status: "success",
                message: `Modelos obtenidos: ${modelList
                    .map((m) => m.name)
                    .join(", ")}`,
                duration,
            });

            // Test 3: Generar texto (solo si hay modelos disponibles)
            if (modelList.length > 0) {
                try {
                    const startTime3 = Date.now();
                    const firstModel = modelList[0].name;
                    const response = await ollama.simpleGenerate(
                        firstModel,
                        "Hola, responde brevemente que eres un asistente de IA."
                    );
                    const duration3 = Date.now() - startTime3;

                    updateTestResult(2, {
                        status: "success",
                        message: `Generación exitosa con ${firstModel}: "${response.substring(
                            0,
                            100
                        )}${response.length > 100 ? "..." : ""}"`,
                        duration: duration3,
                    });
                } catch (error) {
                    updateTestResult(2, {
                        status: "error",
                        message: `Error en generación: ${
                            error instanceof Error
                                ? error.message
                                : "Error desconocido"
                        }`,
                        duration: 0,
                    });
                }

                // Test 4: Chat
                try {
                    const startTime4 = Date.now();
                    const firstModel = modelList[0].name;
                    const chatResponse = await ollama.simpleChat(firstModel, [
                        createUserMessage("Di hola en una palabra"),
                    ]);
                    const duration4 = Date.now() - startTime4;

                    updateTestResult(3, {
                        status: "success",
                        message: `Chat exitoso con ${firstModel}: "${chatResponse}"`,
                        duration: duration4,
                    });
                } catch (error) {
                    updateTestResult(3, {
                        status: "error",
                        message: `Error en chat: ${
                            error instanceof Error
                                ? error.message
                                : "Error desconocido"
                        }`,
                        duration: 0,
                    });
                }
            } else {
                updateTestResult(2, {
                    status: "error",
                    message:
                        "No hay modelos disponibles para probar la generación",
                    duration: 0,
                });
                updateTestResult(3, {
                    status: "error",
                    message: "No hay modelos disponibles para probar el chat",
                    duration: 0,
                });
            }
        } catch (error) {
            updateTestResult(1, {
                status: "error",
                message: `Error obteniendo modelos: ${
                    error instanceof Error ? error.message : "Error desconocido"
                }`,
                duration: 0,
            });
        }

        setIsRunning(false);
    };

    const getStatusColor = (status: TestResult["status"]) => {
        switch (status) {
            case "success":
                return "text-green-600";
            case "error":
                return "text-red-600";
            case "pending":
                return "text-yellow-600";
            default:
                return "text-gray-600";
        }
    };

    const getStatusIcon = (status: TestResult["status"]) => {
        switch (status) {
            case "success":
                return "✅";
            case "error":
                return "❌";
            case "pending":
                return "⏳";
            default:
                return "⚪";
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Test de Conexión Ollama</h1>

            <div className="mb-8">
                <Button
                    onClick={runTests}
                    disabled={isRunning}
                    className="mb-4"
                >
                    {isRunning ? "Ejecutando Tests..." : "Ejecutar Tests"}
                </Button>

                {results.length > 0 && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">
                            Resultados de Tests
                        </h2>
                        {results.map((result, index) => (
                            <div
                                key={index}
                                className="border rounded-lg p-4 bg-card"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg">
                                        {getStatusIcon(result.status)}
                                    </span>
                                    <h3 className="font-medium">
                                        {result.test}
                                    </h3>
                                    {result.duration && (
                                        <span className="text-sm text-muted-foreground">
                                            ({result.duration}ms)
                                        </span>
                                    )}
                                </div>
                                <p
                                    className={`${getStatusColor(
                                        result.status
                                    )} text-sm`}
                                >
                                    {result.message}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {models.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Modelos Disponibles
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {models.map((model, index) => (
                            <div
                                key={index}
                                className="border rounded-lg p-4 bg-card"
                            >
                                <h3 className="font-medium mb-2">
                                    {model.name}
                                </h3>
                                <div className="text-sm text-muted-foreground space-y-1">
                                    <p>
                                        Tamaño:{" "}
                                        {(
                                            model.size /
                                            (1024 * 1024 * 1024)
                                        ).toFixed(2)}{" "}
                                        GB
                                    </p>
                                    <p>Formato: {model.details.format}</p>
                                    <p>Familia: {model.details.family}</p>
                                    <p>
                                        Parámetros:{" "}
                                        {model.details.parameter_size}
                                    </p>
                                    <p>
                                        Modificado:{" "}
                                        {new Date(
                                            model.modified_at
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-8 p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Información del Test</h3>
                <p className="text-sm text-muted-foreground">
                    Este test verifica la conectividad con Ollama ejecutando las
                    siguientes pruebas:
                </p>
                <ul className="text-sm text-muted-foreground mt-2 list-disc list-inside">
                    <li>Conexión básica al servicio Ollama</li>
                    <li>Obtención de la lista de modelos disponibles</li>
                    <li>
                        Generación de texto simple usando el primer modelo
                        disponible
                    </li>
                    <li>
                        Funcionamiento del chat usando el primer modelo
                        disponible
                    </li>
                </ul>
            </div>
        </div>
    );
}
