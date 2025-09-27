"use client";

import { Menu, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ui/theme-toggle";

const links = [
    { href: "/", label: "Inicio" },
    { href: "/products", label: "Productos" },
    { href: "/supermarkets", label: "Supermercados" },
    { href: "/mercadona-sobre-ruedas", label: "Mercadona sobre ruedas" },
    { href: "/test-ollama", label: "Test Ollama" },
];

export function Header() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 right-0 flex items-center justify-between h-20 px-6 md:px-8 bg-header w-full shadow-sm z-50">
            <div className="flex items-center gap-4 z-10">
                <Link
                    href="/"
                    aria-label="Ir al inicio"
                    className="inline-flex items-center"
                >
                    <Image
                        src={"/mercadona.svg"}
                        alt={"Logo de Mercadona"}
                        width={180}
                        height={40}
                        priority
                    />
                </Link>
            </div>

            <nav aria-label="Main navigation" className="hidden md:block">
                <ul className="flex gap-8 text-lg">
                    {links.map((l) => {
                        const active = pathname === l.href;
                        return (
                            <li key={l.href}>
                                <Link
                                    href={l.href}
                                    className={`text-primary transition-colors ${
                                        active
                                            ? "font-semibold underline-offset-4 underline"
                                            : "opacity-90 hover:opacity-100"
                                    }`}
                                    aria-current={active ? "page" : undefined}
                                >
                                    {l.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="flex items-center z-10 gap-2">
                <div className="hidden md:flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Ver carrito"
                        asChild
                    >
                        <Link href="/cart">
                            <ShoppingCart size={22} />
                        </Link>
                    </Button>
                    <ThemeToggle />
                </div>

                <div className="md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label={open ? "Cerrar menú" : "Abrir menú"}
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? <X size={20} /> : <Menu size={20} />}
                    </Button>
                </div>
            </div>

            {open && (
                <div className="absolute inset-x-4 top-full mt-2 z-20 bg-card/90 backdrop-blur-md rounded-lg p-4 shadow-lg md:hidden">
                    <ul className="flex flex-col gap-3">
                        {links.map((l) => {
                            const active = pathname === l.href;
                            return (
                                <li key={l.href}>
                                    <Link
                                        href={l.href}
                                        className={`block py-2 px-3 rounded-md text-primary ${
                                            active
                                                ? "bg-muted font-semibold"
                                                : "hover:bg-muted/70"
                                        }`}
                                        onClick={() => setOpen(false)}
                                        aria-current={
                                            active ? "page" : undefined
                                        }
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            );
                        })}
                        <li className="pt-2 border-t border-border mt-2 flex items-center justify-between">
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Ver carrito"
                            >
                                <Link href="/cart">
                                    <ShoppingCart size={18} />
                                </Link>
                            </Button>
                            <ThemeToggle />
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}
