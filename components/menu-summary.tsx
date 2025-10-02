"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MenuItem } from "@/lib/menu-types";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

interface MenuSummaryProps {
    menuItems: MenuItem[];
    totalPrice: number;
    totalItems: number;
    onAddProduct: (productId: string) => void;
    onRemoveProduct: (productId: string) => void;
    onClearProduct: (productId: string) => void;
    onClearMenu: () => void;
}

export function MenuSummary({
    menuItems,
    totalPrice,
    totalItems,
    onAddProduct,
    onRemoveProduct,
    onClearProduct,
    onClearMenu,
}: MenuSummaryProps) {
    if (menuItems.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        Mi Plan Alimenticio Completo
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>Tu plan alimenticio está vacío</p>
                        <p className="text-sm">
                            Pregunta al Chef qué tipo de plan alimenticio necesitas
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        Mi Plan Alimenticio Completo
                        <Badge variant="secondary" className="ml-2">
                            {totalItems}{" "}
                            {totalItems === 1 ? "producto" : "productos"}
                        </Badge>
                    </CardTitle>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onClearMenu}
                        className="text-red-600 hover:text-red-700"
                    >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Limpiar
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-3">
                <div className="space-y-2 max-h-96 overflow-y-auto">
                    {menuItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate">
                                    {item.product.name}
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                    {item.product.price.toFixed(2)}€ ×{" "}
                                    {item.quantity} ={" "}
                                    {(
                                        item.product.price * item.quantity
                                    ).toFixed(2)}
                                    €
                                </p>
                            </div>

                            <div className="flex items-center gap-2 ml-3">
                                <div className="flex items-center gap-1">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                            onRemoveProduct(item.product.id)
                                        }
                                        className="h-7 w-7 p-0"
                                    >
                                        <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="min-w-[1.5rem] text-center text-sm font-medium">
                                        {item.quantity}
                                    </span>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() =>
                                            onAddProduct(item.product.id)
                                        }
                                        className="h-7 w-7 p-0"
                                    >
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>

                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() =>
                                        onClearProduct(item.product.id)
                                    }
                                    className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Total:</span>
                        <span className="text-lg font-bold text-green-600">
                            {totalPrice.toFixed(2)}€
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
