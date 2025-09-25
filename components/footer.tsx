import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-header mt-24 text-sm" role="contentinfo">
            <div className="max-w-[90rem] mx-auto px-6 py-10 md:py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-10">
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

                <div className="flex flex-col items-start md:items-end gap-3">
                    <div className="flex items-center gap-4">
                        <a
                            href="mailto:atencionalcliente@mercadona.es"
                            className="text-primary hover:underline"
                        >
                            atencionalcliente@mercadona.es
                        </a>
                        <span className="hidden md:inline text-muted-foreground">
                            ·
                        </span>
                        <a
                            href="tel:+34800500220"
                            className="text-primary hover:underline"
                        >
                            +34 800 500 220
                        </a>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="https://www.facebook.com/mercadona/?locale=es_ES"
                            aria-label="Facebook"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Facebook size={18} />
                        </Link>
                        <Link
                            href="https://x.com/Mercadona"
                            aria-label="Twitter"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Twitter size={18} />
                        </Link>
                        <Link
                            href="https://www.instagram.com/mercadona/?hl=en"
                            aria-label="Instagram"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Instagram size={18} />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="border-t border-border/60">
                <div className="max-w-[90rem] mx-auto px-6 py-4 text-xs text-muted-foreground flex flex-col md:flex-row items-center justify-between">
                    <span>
                        © {new Date().getFullYear()} Mercadona. Todos los
                        derechos reservados.
                    </span>
                    <div className="flex gap-4 mt-2 md:mt-0">
                        <Link
                            href="https://info.mercadona.es/es/politica-de-privacidad"
                            className="text-muted-foreground hover:underline"
                        >
                            Política de privacidad
                        </Link>
                        <Link
                            href="https://info.mercadona.es/es/terminos-y-condiciones"
                            className="text-muted-foreground hover:underline"
                        >
                            Términos y Condiciones
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
