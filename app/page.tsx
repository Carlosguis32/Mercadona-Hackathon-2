import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Clock,
    Mail,
    MapPin,
    Package,
    ShoppingCart,
    Star,
    Store,
    Truck,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-mercadona-green/10 to-mercadona-green/20 py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <Badge className="bg-mercadona-green hover:bg-mercadona-green/90 text-white">
                                    ¡Nuevas ofertas disponibles!
                                </Badge>
                                <h1 className="text-5xl lg:text-6xl font-bold font-heading text-gray-900 leading-tight">
                                    Tu súper de
                                    <span className="text-mercadona-green">
                                        {" "}
                                        confianza
                                    </span>
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    Descubre la mejor calidad al mejor precio.
                                    Más de 1.600 tiendas a tu servicio con
                                    productos frescos y la mejor atención.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    className="bg-mercadona-green hover:bg-mercadona-green/90 text-lg px-8"
                                >
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    Comprar online
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="text-lg px-8"
                                >
                                    <MapPin className="mr-2 h-5 w-5" />
                                    Encontrar tienda
                                </Button>
                            </div>

                            <div className="flex items-center gap-8 pt-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"
                                            ></div>
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        +5M clientes confían en nosotros
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <div className="bg-gradient-to-br from-mercadona-green/80 to-mercadona-green h-96 flex items-center justify-center">
                                    <div className="text-center text-white space-y-4">
                                        <Package className="h-20 w-20 mx-auto opacity-80" />
                                        <p className="text-lg font-semibold">
                                            Imagen de productos frescos
                                        </p>
                                        <p className="text-sm opacity-80">
                                            Frutas, verduras y productos de
                                            calidad
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating cards */}
                            <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 border">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-mercadona-green" />
                                    <span className="text-sm font-medium">
                                        Entrega en 1h
                                    </span>
                                </div>
                            </div>

                            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 border">
                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                    <span className="text-sm font-medium">
                                        4.8/5 valoración
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-4xl font-bold font-heading text-gray-900">
                            Productos destacados
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Descubre nuestros productos más populares con la
                            mejor calidad garantizada
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                name: "Frutas frescas",
                                price: "desde 0,99€",
                                category: "Frutas",
                            },
                            {
                                name: "Verduras de temporada",
                                price: "desde 1,20€",
                                category: "Verduras",
                            },
                            {
                                name: "Carne premium",
                                price: "desde 8,99€",
                                category: "Carnicería",
                            },
                            {
                                name: "Pescado fresco",
                                price: "desde 12,50€",
                                category: "Pescadería",
                            },
                        ].map((product, index) => (
                            <Card
                                key={index}
                                className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                            >
                                <CardContent className="p-0">
                                    <div className="bg-gray-100 h-48 flex items-center justify-center rounded-t-lg">
                                        <Package className="h-16 w-16 text-gray-400" />
                                    </div>
                                    <div className="p-6 space-y-3">
                                        <Badge
                                            variant="secondary"
                                            className="text-xs"
                                        >
                                            {product.category}
                                        </Badge>
                                        <h3 className="font-semibold text-lg">
                                            {product.name}
                                        </h3>
                                        <p className="text-mercadona-green font-bold text-xl">
                                            {product.price}
                                        </p>
                                        <Button className="w-full bg-mercadona-green hover:bg-mercadona-green/90">
                                            <ShoppingCart className="mr-2 h-4 w-4" />
                                            Añadir al carro
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/products">
                            <Button
                                variant="outline"
                                size="lg"
                                className="px-8"
                            >
                                Ver todos los productos
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-4xl font-bold font-heading text-gray-900">
                            Nuestros servicios
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Te ofrecemos múltiples formas de hacer tu compra más
                            cómoda y conveniente
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Truck className="h-12 w-12" />,
                                title: "Entrega a domicilio",
                                description:
                                    "Recibe tu pedido en casa en menos de 1 hora",
                                link: "/products",
                            },
                            {
                                icon: <Store className="h-12 w-12" />,
                                title: "Compra en tienda",
                                description:
                                    "Visita cualquiera de nuestras +1.600 tiendas",
                                link: "/supermarkets",
                            },
                            {
                                icon: <MapPin className="h-12 w-12" />,
                                title: "Mercadona sobre ruedas",
                                description:
                                    "El supermercado móvil llega hasta tu barrio",
                                link: "/mercadona-sobre-ruedas",
                            },
                        ].map((service, index) => (
                            <Card
                                key={index}
                                className="text-center p-8 hover:shadow-lg transition-all duration-300"
                            >
                                <CardContent className="space-y-4">
                                    <div className="text-mercadona-green flex justify-center">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {service.description}
                                    </p>
                                    <Link href={service.link}>
                                        <Button
                                            variant="outline"
                                            className="mt-4"
                                        >
                                            Más información
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-6 bg-mercadona-green text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {[
                            { number: "+1.600", label: "Tiendas en España" },
                            {
                                number: "+25.000",
                                label: "Productos disponibles",
                            },
                            { number: "+5M", label: "Clientes satisfechos" },
                            { number: "50+", label: "Años de experiencia" },
                        ].map((stat, index) => (
                            <div key={index} className="space-y-2">
                                <div className="text-4xl lg:text-5xl font-bold font-heading">
                                    {stat.number}
                                </div>
                                <div className="text-lg">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-4xl font-bold font-heading text-gray-900">
                            Lo que dicen nuestros clientes
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Miles de familias confían en nosotros cada día
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "María González",
                                location: "Madrid",
                                rating: 5,
                                comment:
                                    "La calidad de los productos es excelente y el servicio de entrega muy rápido. ¡Recomendado!",
                            },
                            {
                                name: "Carlos Ruiz",
                                location: "Barcelona",
                                rating: 5,
                                comment:
                                    "Llevo años comprando en Mercadona. Los precios son justos y la atención al cliente excepcional.",
                            },
                            {
                                name: "Ana Martín",
                                location: "Valencia",
                                rating: 5,
                                comment:
                                    "Me encanta poder hacer la compra online y recibirla en casa. ¡Muy conveniente!",
                            },
                        ].map((testimonial, index) => (
                            <Card key={index} className="p-6">
                                <CardContent className="space-y-4">
                                    <div className="flex justify-center space-x-1">
                                        {[...Array(testimonial.rating)].map(
                                            (_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-5 w-5 text-yellow-500 fill-current"
                                                />
                                            )
                                        )}
                                    </div>
                                    <p className="text-gray-600 italic">
                                        &ldquo;{testimonial.comment}&rdquo;
                                    </p>
                                    <div className="text-center">
                                        <div className="font-semibold">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {testimonial.location}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 px-6 bg-gradient-to-r from-mercadona-green/90 to-mercadona-green text-white">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold font-heading">
                            ¡No te pierdas nuestras ofertas!
                        </h2>
                        <p className="text-xl">
                            Suscríbete a nuestro newsletter y sé el primero en
                            conocer las mejores promociones
                        </p>
                    </div>

                    <div className="max-w-md mx-auto">
                        <div className="flex gap-4">
                            <Input
                                type="email"
                                placeholder="Tu email"
                                className="bg-white text-gray-900"
                            />
                            <Button className="bg-white text-mercadona-green hover:bg-gray-100">
                                <Mail className="mr-2 h-4 w-4" />
                                Suscribirse
                            </Button>
                        </div>
                        <p className="text-sm text-mercadona-green/30 mt-2">
                            Al suscribirte aceptas recibir comunicaciones
                            comerciales de Mercadona
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
