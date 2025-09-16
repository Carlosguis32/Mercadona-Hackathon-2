import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ui/theme-toggle";

export function Header() {
    return (
        <header className="relative flex items-center justify-between h-20 px-8 bg-header w-full">
            <div className="flex items-center z-10">
                <Image
                    src={"/mercadona.svg"}
                    alt="Logo de Mercadona"
                    width={250}
                    height={40}
                    priority
                />
            </div>

            <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex gap-8 text-lg">
                    <Link className="text-primary" href={"/"}>
                        Inicio
                    </Link>
                    <Link className="text-primary" href={"/"}>
                        Productos
                    </Link>
                    <Link className="text-primary" href={"/"}>
                        Supermercados
                    </Link>
                    <Link className="text-primary" href={"/"}>
                        Contáctanos
                    </Link>
                </div>
            </nav>

            <div className="flex items-center z-10 gap-4">
                <Button variant={"ghost"} size={"icon"}>
                    <ShoppingCart size={32} />
                </Button>
                <ThemeToggle />
            </div>
        </header>
    );
}
