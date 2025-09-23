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
import { ollama } from "@/lib/ollama-client";
import { OllamaModel } from "@/lib/ollama-types";
import { useEffect, useState } from "react";

interface SystemInfo {
    ollamaUrl: string;
    modelsCount: number;
    totalSize: number;
    lastCheck: Date | null;
    status: "connected" | "error" | "checking";
    error?: string;
}

export default function OllamaStatusPage() {
    const [systemInfo, setSystemInfo] = useState<SystemInfo>({
        ollamaUrl:
            process.env.NEXT_PUBLIC_OLLAMA_URL || "http://localhost:11434",
        modelsCount: 0,
        totalSize: 0,
        lastCheck: null,
        status: "checking",
    });
    const [models, setModels] = useState<OllamaModel[]>([]);
    const [autoRefresh, setAutoRefresh] = useState(false);

    const checkStatus = async () => {
        setSystemInfo((prev) => ({ ...prev, status: "checking" }));

        try {
            const modelList = await ollama.getModels();
            const totalSize = modelList.reduce(
                (sum, model) => sum + model.size,
                0
            );

            setModels(modelList);
            setSystemInfo((prev) => ({
                ...prev,
                status: "connected",
                modelsCount: modelList.length,
                totalSize,
                lastCheck: new Date(),
                error: undefined,
            }));
        } catch (error) {
            setSystemInfo((prev) => ({
                ...prev,
                status: "error",
                error:
                    error instanceof Error
                        ? error.message
                        : "Error desconocido",
                lastCheck: new Date(),
            }));
        }
    };

    useEffect(() => {
        checkStatus();
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (autoRefresh) {
            interval = setInterval(checkStatus, 30000); // 30 segundos
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [autoRefresh]);

    const formatFileSize = (bytes: number): string => {
        const units = ["B", "KB", "MB", "GB", "TB"];
        let size = bytes;
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return `${size.toFixed(2)} ${units[unitIndex]}`;
    };

    const getStatusBadge = () => {
        switch (systemInfo.status) {
            case "connected":
                return <Badge className="bg-green-500">Conectado</Badge>;
            case "error":
                return <Badge variant="destructive">Error</Badge>;
            case "checking":
                return <Badge variant="secondary">Verificando...</Badge>;
            default:
                return <Badge variant="outline">Desconocido</Badge>;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Estado de Ollama</h1>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setAutoRefresh(!autoRefresh)}
                        className={autoRefresh ? "bg-green-100" : ""}
                    >
                        {autoRefresh ? "Parar Auto-refresh" : "Auto-refresh"}
                    </Button>
                    <Button
                        onClick={checkStatus}
                        disabled={systemInfo.status === "checking"}
                    >
                        {systemInfo.status === "checking"
                            ? "Verificando..."
                            : "Actualizar"}
                    </Button>
                </div>
            </div>

            {/* Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Estado
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mb-1">
                            {getStatusBadge()}
                        </div>
                        {systemInfo.lastCheck && (
                            <p className="text-xs text-muted-foreground">
                                Última verificación:{" "}
                                {systemInfo.lastCheck.toLocaleTimeString()}
                            </p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Modelos
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {systemInfo.modelsCount}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            modelos disponibles
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Tamaño Total
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatFileSize(systemInfo.totalSize)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            espacio utilizado
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            URL
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm font-mono break-all">
                            {systemInfo.ollamaUrl}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            endpoint API
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Error Display */}
            {systemInfo.status === "error" && systemInfo.error && (
                <Card className="mb-6 border-red-200">
                    <CardHeader>
                        <CardTitle className="text-red-600">
                            Error de Conexión
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-red-600">
                            {systemInfo.error}
                        </p>
                        <div className="mt-4 p-3 bg-red-50 rounded-lg">
                            <p className="text-sm text-red-700 font-medium mb-2">
                                Posibles soluciones:
                            </p>
                            <ul className="text-sm text-red-600 list-disc list-inside space-y-1">
                                <li>
                                    Verifica que Ollama esté instalado y
                                    ejecutándose
                                </li>
                                <li>
                                    Ejecuta{" "}
                                    <code className="bg-red-100 px-1 rounded">
                                        ollama serve
                                    </code>{" "}
                                    en tu terminal
                                </li>
                                <li>
                                    Verifica que el puerto 11434 esté disponible
                                </li>
                                <li>
                                    Comprueba la configuración de CORS si estás
                                    ejecutando en producción
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Models List */}
            {models.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Modelos Disponibles</CardTitle>
                        <CardDescription>
                            Lista completa de modelos instalados en Ollama
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {models.map((model) => (
                                <div
                                    key={model.name}
                                    className="flex items-start justify-between p-4 border rounded-lg bg-muted/50"
                                >
                                    <div className="flex-1">
                                        <h3 className="font-medium text-lg">
                                            {model.name}
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-sm text-muted-foreground">
                                            <div>
                                                <span className="font-medium">
                                                    Tamaño:
                                                </span>{" "}
                                                {formatFileSize(model.size)}
                                            </div>
                                            <div>
                                                <span className="font-medium">
                                                    Familia:
                                                </span>{" "}
                                                {model.details.family}
                                            </div>
                                            <div>
                                                <span className="font-medium">
                                                    Formato:
                                                </span>{" "}
                                                {model.details.format}
                                            </div>
                                            <div>
                                                <span className="font-medium">
                                                    Parámetros:
                                                </span>{" "}
                                                {model.details.parameter_size}
                                            </div>
                                        </div>
                                        <div className="mt-2 text-xs text-muted-foreground">
                                            <span className="font-medium">
                                                Modificado:
                                            </span>{" "}
                                            {new Date(
                                                model.modified_at
                                            ).toLocaleString()}
                                        </div>
                                        <div className="mt-2 text-xs text-muted-foreground">
                                            <span className="font-medium">
                                                Digest:
                                            </span>{" "}
                                            <code className="bg-muted px-1 rounded">
                                                {model.digest.substring(0, 16)}
                                                ...
                                            </code>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <Badge variant="outline">
                                            {model.details.quantization_level}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Connection Instructions */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle>Instrucciones de Configuración</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-medium mb-2">1. Instalar Ollama</h4>
                        <p className="text-sm text-muted-foreground">
                            Descarga e instala Ollama desde{" "}
                            <a
                                href="https://ollama.ai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                ollama.ai
                            </a>
                        </p>
                    </div>

                    <div>
                        <h4 className="font-medium mb-2">2. Ejecutar Ollama</h4>
                        <div className="bg-muted p-2 rounded font-mono text-sm">
                            ollama serve
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium mb-2">
                            3. Descargar un modelo
                        </h4>
                        <div className="bg-muted p-2 rounded font-mono text-sm">
                            ollama pull llama2
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium mb-2">
                            4. Verificar instalación
                        </h4>
                        <div className="bg-muted p-2 rounded font-mono text-sm">
                            ollama list
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
