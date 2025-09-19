import { OllamaListResponse } from "@/lib/ollama-types";
import { NextResponse } from "next/server";

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || "http://localhost:11434";

export async function GET() {
    try {
        const response = await fetch(`${OLLAMA_API_URL}/api/tags`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Ollama API error: ${response.statusText}` },
                { status: response.status }
            );
        }

        const data: OllamaListResponse = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error connecting to Ollama:", error);
        return NextResponse.json(
            { error: "Failed to connect to Ollama service" },
            { status: 500 }
        );
    }
}
