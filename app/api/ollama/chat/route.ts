import { OllamaChatRequest, OllamaChatResponse } from "@/lib/ollama-types";
import { NextRequest, NextResponse } from "next/server";

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || "http://localhost:11434";

export async function POST(request: NextRequest) {
    try {
        const body: OllamaChatRequest = await request.json();

        if (!body.model || !body.messages || body.messages.length === 0) {
            return NextResponse.json(
                { error: "Model and messages are required" },
                { status: 400 }
            );
        }

        const validRoles = ["user", "assistant", "system"];
        for (const message of body.messages) {
            if (!validRoles.includes(message.role) || !message.content) {
                return NextResponse.json(
                    {
                        error: "Invalid message format. Each message must have a valid role and content",
                    },
                    { status: 400 }
                );
            }
        }

        const ollamaChatRequest: OllamaChatRequest = {
            model: body.model,
            messages: body.messages,
            stream: false,
            options: {
                temperature: body.options?.temperature ?? 0.7,
                top_p: body.options?.top_p ?? 0.9,
                top_k: body.options?.top_k ?? 40,
                num_predict: body.options?.num_predict ?? -1,
                ...body.options,
            },
        };

        const response = await fetch(`${OLLAMA_API_URL}/api/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ollamaChatRequest),
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json(
                { error: `Ollama API error: ${errorText}` },
                { status: response.status }
            );
        }

        const data: OllamaChatResponse = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in chat endpoint:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
