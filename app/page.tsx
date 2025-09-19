export default function Home() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <section className="bg-card rounded-lg p-8 shadow-sm">
                <h1 className="text-2xl font-semibold mb-4">
                    Bienvenido a Mercadona
                </h1>
                <p className="text-muted-foreground mb-4">
                    Explora nuestros productos y encuentra ofertas increíbles.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-background rounded">
                        Producto de ejemplo 1
                    </div>
                    <div className="p-4 bg-background rounded">
                        Producto de ejemplo 2
                    </div>
                    <div className="p-4 bg-background rounded">
                        Producto de ejemplo 3
                    </div>
                </div>
            </section>
        </div>
    );
}
