export type MenuCategory =
    | "breakfast"
    | "main-dishes"
    | "desserts"
    | "snacks"
    | "beverages"
    | "ready-meals"
    | "sides";

export interface MercadonaProduct {
    id: string;
    name: string;
    price: number;
    category: MenuCategory;
    image?: string;
    description?: string;
    nutritionalInfo?: {
        calories: number;
        protein: number;
        carbohydrates: number;
        fat: number;
    };
}

export interface MenuItem {
    id: string;
    product: MercadonaProduct;
    quantity: number;
    notes?: string;
}

export interface MenuSection {
    id: string;
    name: string;
    items: MenuItem[];
}

export interface PersonalizedMenu {
    id: string;
    name: string;
    sections: MenuSection[];
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    menuAction?: {
        type: "add" | "remove" | "modify";
        productId: string;
        quantity?: number;
        notes?: string;
    };
}

export interface MenuSuggestion {
    action: "add" | "remove" | "replace";
    productId: string;
    productName: string;
    reason: string;
    quantity?: number;
    section?: string;
}

export interface AIMenuResponse {
    message: string;
    suggestions?: MenuSuggestion[];
    nutritionTips?: string[];
    totalEstimatedPrice?: number;
}
