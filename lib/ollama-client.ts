import {
    OllamaApiResponse,
    OllamaChatRequest,
    OllamaChatResponse,
    OllamaGenerateRequest,
    OllamaGenerateResponse,
    OllamaListResponse,
    OllamaModel,
} from "./ollama-types";

class OllamaClient {
    private baseUrl: string;

    constructor(baseUrl: string = "/api/ollama") {
        this.baseUrl = baseUrl;
    }

    async getModels(): Promise<OllamaModel[]> {
        const response = await fetch(`${this.baseUrl}/models`);

        if (!response.ok) {
            throw new Error(`Failed to get models: ${response.statusText}`);
        }

        const data: OllamaApiResponse<OllamaListResponse> =
            await response.json();

        if ("error" in data) {
            throw new Error(data.error);
        }

        return data.models;
    }

    async generate(
        request: OllamaGenerateRequest
    ): Promise<OllamaGenerateResponse> {
        const response = await fetch(`${this.baseUrl}/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error(`Failed to generate: ${response.statusText}`);
        }

        const data: OllamaApiResponse<OllamaGenerateResponse> =
            await response.json();

        if ("error" in data) {
            throw new Error(data.error);
        }

        return data;
    }

    async chat(request: OllamaChatRequest): Promise<OllamaChatResponse> {
        const response = await fetch(`${this.baseUrl}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error(`Failed to chat: ${response.statusText}`);
        }

        const data: OllamaApiResponse<OllamaChatResponse> =
            await response.json();

        if ("error" in data) {
            throw new Error(data.error);
        }

        return data;
    }

    async simpleGenerate(
        model: string,
        prompt: string,
        options?: OllamaGenerateRequest["options"]
    ): Promise<string> {
        const response = await this.generate({
            model,
            prompt,
            options,
        });

        return response.response;
    }

    async simpleChat(
        model: string,
        messages: OllamaChatRequest["messages"],
        options?: OllamaChatRequest["options"]
    ): Promise<string> {
        const response = await this.chat({
            model,
            messages,
            options,
        });

        return response.message.content;
    }
}

export const ollama = new OllamaClient();

export { OllamaClient };

export const createChatMessage = (
    role: "user" | "assistant" | "system",
    content: string
) => ({
    role,
    content,
});

export const createSystemMessage = (content: string) =>
    createChatMessage("system", content);

export const createUserMessage = (content: string) =>
    createChatMessage("user", content);

export const createAssistantMessage = (content: string) =>
    createChatMessage("assistant", content);
