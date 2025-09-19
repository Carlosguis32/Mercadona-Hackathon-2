import {
    OllamaGenerateRequest,
    OllamaGenerateResponse,
} from "@/lib/ollama-types";
import { NextRequest, NextResponse } from "next/server";

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || "http://localhost:11434";

export async function POST(request: NextRequest) {
    try {
        const body: OllamaGenerateRequest = await request.json();

        // Validación básica
        if (!body.model || !body.prompt) {
            return NextResponse.json(
                { error: "Model and prompt are required" },
                { status: 400 }
            );
        }

        const ollamaRequest: OllamaGenerateRequest = {
            model: body.model,
            prompt: body.prompt,
            stream: false,
            options: {
                temperature: body.options?.temperature ?? 0.7,
                top_p: body.options?.top_p ?? 0.9,
                top_k: body.options?.top_k ?? 40,
                num_predict: body.options?.num_predict ?? -1,
                ...body.options,
            },
        };

        const response = await fetch(`${OLLAMA_API_URL}/api/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ollamaRequest),
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json(
                { error: `Ollama API error: ${errorText}` },
                { status: response.status }
            );
        }

        const data: OllamaGenerateResponse = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in generate endpoint:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
