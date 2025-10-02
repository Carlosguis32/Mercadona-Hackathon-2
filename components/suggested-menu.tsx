"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MenuCategory, MercadonaProduct } from "@/lib/menu-types";
import { MERCADONA_PRODUCTS } from "@/lib/mercadona-products";
import { Edit2, Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useState } from "react";

export interface SuggestedMenuItem {
    id: string;
    product: MercadonaProduct;
    category: MenuCategory;
    quantity: number;
    reason?: string;
    isOriginalSuggestion: boolean;
}

export interface SuggestedMenu {
    id: string;
    title: string;
    description: string;
    items: SuggestedMenuItem[];
    timestamp: Date;
}

interface SuggestedMenuProps {
    menu: SuggestedMenu;
    onAddToCart: (productId: string, quantity: number) => void;
    onUpdateMenu: (updatedMenu: SuggestedMenu) => void;
    onDismiss: () => void;
}

export function SuggestedMenu({
    menu,
    onAddToCart,
    onUpdateMenu,
    onDismiss,
}: SuggestedMenuProps) {
    const [showAlternatives, setShowAlternatives] = useState<string | null>(
        null
    );

    const getCategoryEmoji = (category: MenuCategory): string => {
        const emojiMap: Record<MenuCategory, string> = {
            "main-dishes": "🍽️",
            sides: "🥗",
            desserts: "🍰",
            beverages: "🥤",
            breakfast: "🥐",
            snacks: "🍿",
            "ready-meals": "🍱",
        };
        return emojiMap[category] || "🍽️";
    };

    const getCategoryName = (category: MenuCategory): string => {
        const nameMap: Record<MenuCategory, string> = {
            "main-dishes": "Plato Principal",
            sides: "Acompañamiento",
            desserts: "Postre",
            beverages: "Bebida",
            breakfast: "Desayuno",
            snacks: "Aperitivo",
            "ready-meals": "Comida Lista",
        };
        return nameMap[category] || category;
    };

    const updateItemQuantity = (itemId: string, newQuantity: number) => {
        if (newQuantity < 0) return;

        const updatedItems = menu.items
            .map((item) =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
            .filter((item) => item.quantity > 0); // Eliminar items con cantidad 0

        const updatedMenu = { ...menu, items: updatedItems };
        onUpdateMenu(updatedMenu);
    };

    const removeItem = (itemId: string) => {
        const updatedItems = menu.items.filter((item) => item.id !== itemId);
        const updatedMenu = { ...menu, items: updatedItems };
        onUpdateMenu(updatedMenu);
    };

    const getAlternativeProducts = (
        category: MenuCategory,
        currentProductId: string
    ) => {
        return MERCADONA_PRODUCTS.filter(
            (product) =>
                product.category === category && product.id !== currentProductId
        ).slice(0, 5); // Mostrar máximo 5 alternativas
    };

    const replaceItem = (itemId: string, newProduct: MercadonaProduct) => {
        const updatedItems = menu.items.map((item) =>
            item.id === itemId
                ? {
                    ...item,
                    product: newProduct,
                    isOriginalSuggestion: false,
                    reason: `Cambiado por el usuario`,
                }
                : item
        );

        const updatedMenu = { ...menu, items: updatedItems };
        onUpdateMenu(updatedMenu);
        setShowAlternatives(null);
    };

    const addAllToCart = () => {
        menu.items.forEach((item) => {
            onAddToCart(item.product.id, item.quantity);
        });

        onDismiss();
    };

    const totalPrice = menu.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const totalItems = menu.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Card className="w-full border-2 border-green-200 bg-green-50/50 max-h-[500px] flex flex-col">
            <CardHeader className="pb-3 flex-shrink-0">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                            <Edit2 className="h-5 w-5" />
                            {menu.title}
                        </CardTitle>
                        <p className="text-sm text-green-600 mt-1">
                            {menu.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-green-700">
                            <span>{totalItems} productos</span>
                            <span className="font-semibold">
                                {totalPrice.toFixed(2)}€
                            </span>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onDismiss}
                        className="text-gray-500 hover:text-red-500"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-3 flex-1 overflow-y-auto min-h-0">
                {/* Lista de productos del menú */}
                <div className="space-y-2">
                    {menu.items.map((item) => (
                        <div key={item.id} className="space-y-2">
                            {/* Item principal */}
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200">
                                <div className="text-2xl">
                                    {getCategoryEmoji(item.category)}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs text-gray-500 font-medium">
                                            {getCategoryName(item.category)}
                                        </span>
                                        {!item.isOriginalSuggestion && (
                                            <Badge
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                Modificado
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="font-medium text-sm">
                                        {item.product.name}
                                    </div>
                                    <div className="text-xs text-gray-600">
                                        {item.product.price.toFixed(2)}€ ·{" "}
                                        {item.product.category}
                                    </div>
                                    {item.reason && (
                                        <div className="text-xs text-green-600 italic mt-1">
                                            {item.reason}
                                        </div>
                                    )}
                                </div>

                                {/* Controles de cantidad */}
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            updateItemQuantity(
                                                item.id,
                                                item.quantity - 1
                                            )
                                        }
                                        className="h-8 w-8 p-0"
                                    >
                                        <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="w-8 text-center text-sm font-medium">
                                        {item.quantity}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            updateItemQuantity(
                                                item.id,
                                                item.quantity + 1
                                            )
                                        }
                                        className="h-8 w-8 p-0"
                                    >
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>

                                {/* Botones de acción */}
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            setShowAlternatives(
                                                showAlternatives === item.id
                                                    ? null
                                                    : item.id
                                            )
                                        }
                                        className="text-xs px-2 py-1 h-auto"
                                    >
                                        Cambiar
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>

                            {/* Alternativas */}
                            {showAlternatives === item.id && (
                                <div className="ml-8 p-3 bg-gray-50 rounded-lg border">
                                    <div className="text-xs font-medium text-gray-700 mb-2">
                                        Productos alternativos:
                                    </div>
                                    <div className="space-y-1">
                                        {getAlternativeProducts(
                                            item.category,
                                            item.product.id
                                        ).map((altProduct) => (
                                            <div
                                                key={altProduct.id}
                                                className="flex items-center justify-between p-2 hover:bg-white rounded cursor-pointer"
                                                onClick={() =>
                                                    replaceItem(
                                                        item.id,
                                                        altProduct
                                                    )
                                                }
                                            >
                                                <div className="flex-1">
                                                    <div className="text-sm font-medium">
                                                        {altProduct.name}
                                                    </div>
                                                    <div className="text-xs text-gray-600">
                                                        {altProduct.price.toFixed(
                                                            2
                                                        )}
                                                        €
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-xs"
                                                >
                                                    Usar este
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>

            {/* Botones de acción del menú - Footer siempre visible */}
            <div className="flex items-center justify-between p-4 pt-3 border-t border-green-200 bg-green-50/50 flex-shrink-0">
                <div className="text-sm text-green-700">
                    Total:{" "}
                    <span className="font-bold">{totalPrice.toFixed(2)}€</span>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={onDismiss}>
                        Descartar plan alimenticio
                    </Button>
                    <Button
                        onClick={addAllToCart}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                    >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Añadir todo al carrito
                    </Button>
                </div>
            </div>
        </Card>
    );
}
