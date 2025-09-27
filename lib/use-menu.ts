"use client";

import { MenuItem, MercadonaProduct } from "@/lib/menu-types";
import { getProductById } from "@/lib/mercadona-products";
import { useCallback, useMemo, useState } from "react";

export interface UseMenuReturn {
    menu: Record<string, number>;
    totalItems: number;
    totalPrice: number;
    menuItems: MenuItem[];
    addProduct: (product: MercadonaProduct, quantity?: number) => void;
    removeProduct: (productId: string, quantity?: number) => void;
    clearProduct: (productId: string) => void;
    clearMenu: () => void;
    getMenuSummary: () => string;
}

export function useMenu(): UseMenuReturn {
    const [menu, setMenu] = useState<Record<string, number>>({});

    const addProduct = useCallback(
        (product: MercadonaProduct, quantity: number = 1) => {
            setMenu((prev) => ({
                ...prev,
                [product.id]: (prev[product.id] || 0) + quantity,
            }));
        },
        []
    );

    const removeProduct = useCallback(
        (productId: string, quantity: number = 1) => {
            setMenu((prev) => {
                const currentQuantity = prev[productId] || 0;
                const newQuantity = Math.max(0, currentQuantity - quantity);

                if (newQuantity === 0) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { [productId]: _, ...rest } = prev;
                    return rest;
                }

                return {
                    ...prev,
                    [productId]: newQuantity,
                };
            });
        },
        []
    );

    const clearProduct = useCallback((productId: string) => {
        setMenu((prev) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [productId]: _, ...rest } = prev;
            return rest;
        });
    }, []);

    const clearMenu = useCallback(() => {
        setMenu({});
    }, []);

    const menuItems = useMemo(() => {
        return Object.entries(menu)
            .filter(([, quantity]) => quantity > 0)
            .map(([productId, quantity]) => {
                const product = getProductById(productId);
                if (!product) return null;

                return {
                    id: `${productId}-${Date.now()}`,
                    product,
                    quantity,
                } as MenuItem;
            })
            .filter(Boolean) as MenuItem[];
    }, [menu]);

    const totalItems = useMemo(() => {
        return Object.values(menu).reduce((sum, quantity) => sum + quantity, 0);
    }, [menu]);

    const totalPrice = useMemo(() => {
        return menuItems.reduce((sum, item) => {
            return sum + item.product.price * item.quantity;
        }, 0);
    }, [menuItems]);

    const getMenuSummary = useCallback(() => {
        if (menuItems.length === 0) {
            return "El menú está vacío";
        }

        const summary = menuItems
            .map(
                (item) =>
                    `${item.product.name} (${item.quantity} ${
                        item.quantity === 1 ? "unidad" : "unidades"
                    })`
            )
            .join(", ");

        return `Menú actual: ${summary}. Total: ${totalPrice.toFixed(
            2
        )}€ (${totalItems} ${totalItems === 1 ? "producto" : "productos"})`;
    }, [menuItems, totalPrice, totalItems]);

    return {
        menu,
        totalItems,
        totalPrice,
        menuItems,
        addProduct,
        removeProduct,
        clearProduct,
        clearMenu,
        getMenuSummary,
    };
}
