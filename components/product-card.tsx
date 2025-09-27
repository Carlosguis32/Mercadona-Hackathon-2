"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { MercadonaProduct } from "@/lib/menu-types";
import { Minus, Plus, ShoppingCart } from "lucide-react";

interface ProductCardProps {
    product: MercadonaProduct;
    quantity?: number;
    onAdd: (product: MercadonaProduct) => void;
    onRemove: (productId: string) => void;
    showQuantity?: boolean;
}

export function ProductCard({
    product,
    quantity = 0,
    onAdd,
    onRemove,
    showQuantity = true,
}: ProductCardProps) {
    const categoryColors = {
        breakfast: "bg-yellow-100 text-yellow-800",
        "main-dishes": "bg-red-100 text-red-800",
        desserts: "bg-pink-100 text-pink-800",
        snacks: "bg-orange-100 text-orange-800",
        beverages: "bg-blue-100 text-blue-800",
        "ready-meals": "bg-green-100 text-green-800",
        sides: "bg-purple-100 text-purple-800",
    };

    const categoryNames = {
        breakfast: "Desayuno",
        "main-dishes": "Plato Principal",
        desserts: "Postre",
        snacks: "Aperitivo",
        beverages: "Bebida",
        "ready-meals": "Comida Lista",
        sides: "Acompañamiento",
    };

    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg font-semibold line-clamp-2">
                        {product.name}
                    </CardTitle>
                    <Badge
                        className={`text-xs ${
                            categoryColors[product.category]
                        } ml-2`}
                        variant="secondary"
                    >
                        {categoryNames[product.category]}
                    </Badge>
                </div>
                <div className="text-2xl font-bold text-green-600">
                    {product.price.toFixed(2)}€
                </div>
            </CardHeader>

            <CardContent className="pb-3">
                {product.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                    </p>
                )}

                {product.nutritionalInfo && (
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div>
                            Calorías: {product.nutritionalInfo.calories}kcal
                        </div>
                        <div>Proteínas: {product.nutritionalInfo.protein}g</div>
                        <div>
                            Carbohidratos:{" "}
                            {product.nutritionalInfo.carbohydrates}g
                        </div>
                        <div>Grasas: {product.nutritionalInfo.fat}g</div>
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex items-center justify-between pt-3">
                {showQuantity && quantity > 0 ? (
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onRemove(product.id)}
                            className="h-8 w-8 p-0"
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="min-w-[2rem] text-center font-medium">
                            {quantity}
                        </span>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onAdd(product)}
                            className="h-8 w-8 p-0"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <Button
                        size="sm"
                        onClick={() => onAdd(product)}
                        className="flex items-center gap-2"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        Añadir
                    </Button>
                )}

                {showQuantity && quantity > 0 && (
                    <div className="text-sm font-medium text-green-600">
                        {(product.price * quantity).toFixed(2)}€
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}

interface ProductGridProps {
    products: MercadonaProduct[];
    menuItems: Record<string, number>;
    onAddProduct: (product: MercadonaProduct) => void;
    onRemoveProduct: (productId: string) => void;
}

export function ProductGrid({
    products,
    menuItems,
    onAddProduct,
    onRemoveProduct,
}: ProductGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    quantity={menuItems[product.id] || 0}
                    onAdd={onAddProduct}
                    onRemove={onRemoveProduct}
                />
            ))}
        </div>
    );
}
