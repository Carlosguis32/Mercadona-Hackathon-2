import { MercadonaProduct } from "./menu-types";

export const MERCADONA_PRODUCTS: MercadonaProduct[] = [
    // Desayunos
    {
        id: "cereales-fitness",
        name: "Cereales Fitness Hacendado",
        price: 2.85,
        category: "breakfast",
        description:
            "Cereales integrales con frutos secos, perfecto para empezar el día",
        nutritionalInfo: {
            calories: 375,
            protein: 9.2,
            carbohydrates: 68.5,
            fat: 6.8,
        },
    },
    {
        id: "tostadas-integrales",
        name: "Pan Tostado Integral",
        price: 1.25,
        category: "breakfast",
        description: "Pan tostado integral, rico en fibra",
        nutritionalInfo: {
            calories: 247,
            protein: 13.0,
            carbohydrates: 41.0,
            fat: 4.2,
        },
    },
    {
        id: "mermelada-fresa",
        name: "Mermelada de Fresa Hacendado",
        price: 1.65,
        category: "breakfast",
        description: "Mermelada de fresa con trozos de fruta",
        nutritionalInfo: {
            calories: 278,
            protein: 0.4,
            carbohydrates: 69.0,
            fat: 0.1,
        },
    },
    {
        id: "yogur-griego",
        name: "Yogur Griego Natural",
        price: 2.45,
        category: "breakfast",
        description: "Yogur griego cremoso, alto en proteínas",
        nutritionalInfo: {
            calories: 97,
            protein: 9.0,
            carbohydrates: 4.0,
            fat: 5.0,
        },
    },
    {
        id: "croissant-mantequilla",
        name: "Croissant de Mantequilla",
        price: 1.85,
        category: "breakfast",
        description: "Croissants frescos de mantequilla",
        nutritionalInfo: {
            calories: 406,
            protein: 8.2,
            carbohydrates: 46.0,
            fat: 21.0,
        },
    },

    // Platos Principales
    {
        id: "paella-valenciana",
        name: "Paella Valenciana Hacendado",
        price: 4.95,
        category: "main-dishes",
        description: "Paella valenciana tradicional lista para calentar",
        nutritionalInfo: {
            calories: 158,
            protein: 8.5,
            carbohydrates: 24.2,
            fat: 3.8,
        },
    },
    {
        id: "lasaña-boloñesa",
        name: "Lasaña Boloñesa",
        price: 3.75,
        category: "main-dishes",
        description: "Lasaña con carne y bechamel, lista en 3 minutos",
        nutritionalInfo: {
            calories: 165,
            protein: 9.2,
            carbohydrates: 15.8,
            fat: 7.5,
        },
    },
    {
        id: "pizza-cuatro-quesos",
        name: "Pizza Cuatro Quesos",
        price: 2.95,
        category: "main-dishes",
        description: "Pizza congelada con cuatro variedades de queso",
        nutritionalInfo: {
            calories: 285,
            protein: 12.5,
            carbohydrates: 28.5,
            fat: 14.2,
        },
    },
    {
        id: "pollo-curry",
        name: "Pollo al Curry con Arroz",
        price: 4.25,
        category: "main-dishes",
        description: "Plato preparado de pollo al curry con arroz basmati",
        nutritionalInfo: {
            calories: 142,
            protein: 12.8,
            carbohydrates: 18.5,
            fat: 2.8,
        },
    },
    {
        id: "canelones-espinacas",
        name: "Canelones de Espinacas",
        price: 3.45,
        category: "main-dishes",
        description: "Canelones rellenos de espinacas y ricotta",
        nutritionalInfo: {
            calories: 156,
            protein: 7.2,
            carbohydrates: 18.5,
            fat: 6.8,
        },
    },
    {
        id: "salmón-plancha",
        name: "Salmón a la Plancha con Verduras",
        price: 5.95,
        category: "main-dishes",
        description: "Salmón a la plancha con guarnición de verduras",
        nutritionalInfo: {
            calories: 208,
            protein: 25.4,
            carbohydrates: 8.2,
            fat: 8.4,
        },
    },
    {
        id: "hamburguesa-pollo",
        name: "Hamburguesa de Pollo Empanado",
        price: 3.15,
        category: "main-dishes",
        description: "Hamburguesa de pollo empanado congelada",
        nutritionalInfo: {
            calories: 245,
            protein: 15.2,
            carbohydrates: 18.5,
            fat: 12.8,
        },
    },

    // Postres
    {
        id: "tiramisù",
        name: "Tiramisú Hacendado",
        price: 2.95,
        category: "desserts",
        description: "Tiramisú italiano tradicional con mascarpone",
        nutritionalInfo: {
            calories: 285,
            protein: 4.5,
            carbohydrates: 28.5,
            fat: 17.2,
        },
    },
    {
        id: "flan-huevo",
        name: "Flan de Huevo",
        price: 1.85,
        category: "desserts",
        description: "Flan de huevo tradicional con caramelo",
        nutritionalInfo: {
            calories: 142,
            protein: 4.2,
            carbohydrates: 22.8,
            fat: 4.5,
        },
    },
    {
        id: "helado-vainilla",
        name: "Helado de Vainilla Hacendado",
        price: 2.45,
        category: "desserts",
        description: "Helado cremoso de vainilla natural",
        nutritionalInfo: {
            calories: 207,
            protein: 3.5,
            carbohydrates: 23.6,
            fat: 11.0,
        },
    },
    {
        id: "mousse-chocolate",
        name: "Mousse de Chocolate",
        price: 2.25,
        category: "desserts",
        description: "Mousse de chocolate belga, suave y cremoso",
        nutritionalInfo: {
            calories: 198,
            protein: 3.8,
            carbohydrates: 18.5,
            fat: 12.5,
        },
    },
    {
        id: "cheesecake-frutos",
        name: "Cheesecake de Frutos Rojos",
        price: 3.75,
        category: "desserts",
        description: "Tarta de queso con mermelada de frutos rojos",
        nutritionalInfo: {
            calories: 285,
            protein: 5.2,
            carbohydrates: 28.5,
            fat: 17.8,
        },
    },

    // Snacks y Aperitivos
    {
        id: "patatas-bravas",
        name: "Patatas Bravas Congeladas",
        price: 2.15,
        category: "snacks",
        description: "Patatas bravas con salsa picante incluida",
        nutritionalInfo: {
            calories: 165,
            protein: 2.8,
            carbohydrates: 28.5,
            fat: 5.2,
        },
    },
    {
        id: "croquetas-jamón",
        name: "Croquetas de Jamón",
        price: 3.25,
        category: "snacks",
        description: "Croquetas de jamón ibérico, listas para freír",
        nutritionalInfo: {
            calories: 245,
            protein: 8.5,
            carbohydrates: 18.2,
            fat: 15.8,
        },
    },
    {
        id: "tortilla-patatas",
        name: "Tortilla de Patatas",
        price: 2.85,
        category: "snacks",
        description: "Tortilla española tradicional, lista para calentar",
        nutritionalInfo: {
            calories: 198,
            protein: 8.2,
            carbohydrates: 12.5,
            fat: 12.8,
        },
    },
    {
        id: "empanadillas-atún",
        name: "Empanadillas de Atún",
        price: 2.45,
        category: "snacks",
        description: "Empanadillas rellenas de atún y tomate",
        nutritionalInfo: {
            calories: 285,
            protein: 12.5,
            carbohydrates: 25.8,
            fat: 15.2,
        },
    },

    // Acompañamientos
    {
        id: "arroz-tres-delicias",
        name: "Arroz Tres Delicias",
        price: 2.95,
        category: "sides",
        description: "Arroz con jamón, tortilla y guisantes",
        nutritionalInfo: {
            calories: 142,
            protein: 5.8,
            carbohydrates: 24.5,
            fat: 2.8,
        },
    },
    {
        id: "puré-patatas",
        name: "Puré de Patatas Hacendado",
        price: 1.65,
        category: "sides",
        description: "Puré de patatas cremoso y suave",
        nutritionalInfo: {
            calories: 85,
            protein: 2.2,
            carbohydrates: 17.5,
            fat: 0.8,
        },
    },
    {
        id: "ensalada-mixta",
        name: "Ensalada Mixta Preparada",
        price: 2.25,
        category: "sides",
        description: "Ensalada mixta fresca lista para consumir",
        nutritionalInfo: {
            calories: 18,
            protein: 1.2,
            carbohydrates: 3.5,
            fat: 0.2,
        },
    },
    {
        id: "verduras-plancha",
        name: "Verduras a la Plancha",
        price: 2.75,
        category: "sides",
        description: "Mezcla de verduras mediterráneas a la plancha",
        nutritionalInfo: {
            calories: 35,
            protein: 2.8,
            carbohydrates: 6.5,
            fat: 0.4,
        },
    },

    // Bebidas
    {
        id: "zumo-naranja",
        name: "Zumo de Naranja Natural",
        price: 1.95,
        category: "beverages",
        description: "Zumo de naranja exprimida 100% natural",
        nutritionalInfo: {
            calories: 45,
            protein: 0.7,
            carbohydrates: 10.4,
            fat: 0.2,
        },
    },
    {
        id: "agua-mineral",
        name: "Agua Mineral Natural",
        price: 0.85,
        category: "beverages",
        description: "Agua mineral natural de manantial",
        nutritionalInfo: {
            calories: 0,
            protein: 0,
            carbohydrates: 0,
            fat: 0,
        },
    },
    {
        id: "refresco-cola",
        name: "Refresco de Cola Hacendado",
        price: 1.25,
        category: "beverages",
        description: "Refresco de cola con gas",
        nutritionalInfo: {
            calories: 42,
            protein: 0,
            carbohydrates: 10.6,
            fat: 0,
        },
    },
    {
        id: "café-cápsulas",
        name: "Café en Cápsulas Intenso",
        price: 3.45,
        category: "beverages",
        description: "Cápsulas de café intenso compatibles",
        nutritionalInfo: {
            calories: 2,
            protein: 0.1,
            carbohydrates: 0,
            fat: 0,
        },
    },

    // Comidas Preparadas
    {
        id: "gazpacho-andaluz",
        name: "Gazpacho Andaluz",
        price: 1.85,
        category: "ready-meals",
        description: "Gazpacho tradicional andaluz listo para tomar",
        nutritionalInfo: {
            calories: 35,
            protein: 1.2,
            carbohydrates: 6.8,
            fat: 0.8,
        },
    },
    {
        id: "sandwich-mixto",
        name: "Sandwich Mixto Preparado",
        price: 2.45,
        category: "ready-meals",
        description: "Sandwich de jamón y queso listo para consumir",
        nutritionalInfo: {
            calories: 285,
            protein: 15.2,
            carbohydrates: 28.5,
            fat: 12.8,
        },
    },
    {
        id: "sopa-verduras",
        name: "Sopa de Verduras",
        price: 1.65,
        category: "ready-meals",
        description: "Sopa casera de verduras frescas",
        nutritionalInfo: {
            calories: 45,
            protein: 2.1,
            carbohydrates: 8.5,
            fat: 0.8,
        },
    },
    {
        id: "ensalada-césar",
        name: "Ensalada César Completa",
        price: 3.25,
        category: "ready-meals",
        description: "Ensalada césar con pollo, crutones y salsa",
        nutritionalInfo: {
            calories: 185,
            protein: 12.5,
            carbohydrates: 8.2,
            fat: 12.8,
        },
    },

    // Más Desayunos
    {
        id: "avena-instantánea",
        name: "Avena Instantánea Hacendado",
        price: 1.45,
        category: "breakfast",
        description: "Copos de avena integral instantánea",
        nutritionalInfo: {
            calories: 389,
            protein: 16.9,
            carbohydrates: 66.3,
            fat: 6.9,
        },
    },
    {
        id: "magdalenas-limón",
        name: "Magdalenas de Limón",
        price: 1.95,
        category: "breakfast",
        description: "Magdalenas esponjosas con sabor a limón",
        nutritionalInfo: {
            calories: 445,
            protein: 6.5,
            carbohydrates: 58.2,
            fat: 21.5,
        },
    },
    {
        id: "batido-fresa",
        name: "Batido de Fresa",
        price: 1.75,
        category: "breakfast",
        description: "Batido cremoso de fresa con leche",
        nutritionalInfo: {
            calories: 68,
            protein: 3.1,
            carbohydrates: 10.2,
            fat: 1.8,
        },
    },
    {
        id: "miel-natural",
        name: "Miel Natural de Flores",
        price: 2.85,
        category: "breakfast",
        description: "Miel natural de flores multifloral",
        nutritionalInfo: {
            calories: 304,
            protein: 0.3,
            carbohydrates: 82.4,
            fat: 0,
        },
    },

    // Frutas y Productos Frescos
    {
        id: "plátanos-canarias",
        name: "Plátanos de Canarias",
        price: 2.15,
        category: "breakfast",
        description: "Plátanos frescos de Canarias, ricos en potasio",
        nutritionalInfo: {
            calories: 89,
            protein: 1.1,
            carbohydrates: 22.8,
            fat: 0.3,
        },
    },
    {
        id: "manzanas-golden",
        name: "Manzanas Golden",
        price: 1.95,
        category: "breakfast",
        description: "Manzanas Golden dulces y crujientes",
        nutritionalInfo: {
            calories: 52,
            protein: 0.3,
            carbohydrates: 13.8,
            fat: 0.2,
        },
    },
    {
        id: "fresas-frescas",
        name: "Fresas Frescas",
        price: 2.45,
        category: "desserts",
        description: "Fresas frescas dulces y jugosas",
        nutritionalInfo: {
            calories: 32,
            protein: 0.7,
            carbohydrates: 7.7,
            fat: 0.3,
        },
    },
    {
        id: "naranjas-valencia",
        name: "Naranjas de Valencia",
        price: 1.85,
        category: "beverages",
        description: "Naranjas valencianas perfectas para zumo",
        nutritionalInfo: {
            calories: 47,
            protein: 0.9,
            carbohydrates: 11.8,
            fat: 0.1,
        },
    },
    {
        id: "kiwis-verdes",
        name: "Kiwis Verdes",
        price: 2.25,
        category: "desserts",
        description: "Kiwis verdes ricos en vitamina C",
        nutritionalInfo: {
            calories: 61,
            protein: 1.1,
            carbohydrates: 14.7,
            fat: 0.5,
        },
    },
    {
        id: "uvas-blancas",
        name: "Uvas Blancas Sin Pepitas",
        price: 2.75,
        category: "desserts",
        description: "Uvas blancas dulces sin pepitas",
        nutritionalInfo: {
            calories: 69,
            protein: 0.7,
            carbohydrates: 17.2,
            fat: 0.2,
        },
    },

    // Más Platos Principales
    {
        id: "arroz-cubana",
        name: "Arroz a la Cubana",
        price: 3.45,
        category: "main-dishes",
        description: "Arroz con tomate, huevo frito y plátano",
        nutritionalInfo: {
            calories: 185,
            protein: 6.8,
            carbohydrates: 32.5,
            fat: 4.2,
        },
    },
    {
        id: "macarrones-carbonara",
        name: "Macarrones a la Carbonara",
        price: 3.85,
        category: "main-dishes",
        description: "Pasta con salsa carbonara cremosa",
        nutritionalInfo: {
            calories: 298,
            protein: 12.5,
            carbohydrates: 35.8,
            fat: 12.8,
        },
    },
    {
        id: "merluza-romana",
        name: "Merluza a la Romana",
        price: 4.75,
        category: "main-dishes",
        description: "Filetes de merluza rebozados congelados",
        nutritionalInfo: {
            calories: 198,
            protein: 18.5,
            carbohydrates: 12.8,
            fat: 8.5,
        },
    },
    {
        id: "lentejas-verduras",
        name: "Lentejas con Verduras",
        price: 2.95,
        category: "main-dishes",
        description: "Guiso de lentejas con verduras mediterráneas",
        nutritionalInfo: {
            calories: 116,
            protein: 8.9,
            carbohydrates: 20.1,
            fat: 0.4,
        },
    },
    {
        id: "pechuga-plancha",
        name: "Pechuga de Pollo a la Plancha",
        price: 4.25,
        category: "main-dishes",
        description: "Pechuga de pollo marinada lista para calentar",
        nutritionalInfo: {
            calories: 165,
            protein: 31.0,
            carbohydrates: 0,
            fat: 3.6,
        },
    },

    // Más Postres
    {
        id: "natillas-vainilla",
        name: "Natillas de Vainilla",
        price: 1.95,
        category: "desserts",
        description: "Natillas cremosas con sabor a vainilla",
        nutritionalInfo: {
            calories: 118,
            protein: 3.2,
            carbohydrates: 17.5,
            fat: 4.2,
        },
    },
    {
        id: "arroz-leche",
        name: "Arroz con Leche",
        price: 2.15,
        category: "desserts",
        description: "Arroz con leche tradicional con canela",
        nutritionalInfo: {
            calories: 92,
            protein: 3.1,
            carbohydrates: 17.2,
            fat: 1.8,
        },
    },
    {
        id: "yogur-frutos-rojos",
        name: "Yogur con Frutos Rojos",
        price: 2.25,
        category: "desserts",
        description: "Yogur cremoso con trozos de frutos rojos",
        nutritionalInfo: {
            calories: 89,
            protein: 4.2,
            carbohydrates: 15.8,
            fat: 1.5,
        },
    },
    {
        id: "tarta-santiago",
        name: "Tarta de Santiago",
        price: 4.95,
        category: "desserts",
        description: "Tarta de almendra tradicional gallega",
        nutritionalInfo: {
            calories: 485,
            protein: 12.5,
            carbohydrates: 45.2,
            fat: 28.5,
        },
    },

    // Más Snacks
    {
        id: "aceitunas-aliñadas",
        name: "Aceitunas Aliñadas",
        price: 1.45,
        category: "snacks",
        description: "Aceitunas verdes aliñadas con especias",
        nutritionalInfo: {
            calories: 125,
            protein: 0.8,
            carbohydrates: 3.3,
            fat: 11.5,
        },
    },
    {
        id: "hummus-clásico",
        name: "Hummus Clásico",
        price: 1.85,
        category: "snacks",
        description: "Hummus de garbanzos con tahini",
        nutritionalInfo: {
            calories: 166,
            protein: 8.0,
            carbohydrates: 14.3,
            fat: 9.6,
        },
    },
    {
        id: "palitos-zanahoria",
        name: "Palitos de Zanahoria",
        price: 1.25,
        category: "snacks",
        description: "Zanahorias baby listas para consumir",
        nutritionalInfo: {
            calories: 41,
            protein: 0.9,
            carbohydrates: 9.6,
            fat: 0.2,
        },
    },
    {
        id: "frutos-secos-mixtos",
        name: "Frutos Secos Mixtos",
        price: 3.45,
        category: "snacks",
        description: "Mezcla de nueces, almendras y avellanas",
        nutritionalInfo: {
            calories: 607,
            protein: 20.2,
            carbohydrates: 13.7,
            fat: 54.0,
        },
    },

    // Más Acompañamientos
    {
        id: "patatas-asadas",
        name: "Patatas Asadas al Romero",
        price: 2.45,
        category: "sides",
        description: "Patatas cortadas y sazonadas con romero",
        nutritionalInfo: {
            calories: 87,
            protein: 2.0,
            carbohydrates: 20.1,
            fat: 0.1,
        },
    },
    {
        id: "brócoli-vapor",
        name: "Brócoli al Vapor",
        price: 1.95,
        category: "sides",
        description: "Brócoli fresco listo para cocinar al vapor",
        nutritionalInfo: {
            calories: 34,
            protein: 2.8,
            carbohydrates: 6.6,
            fat: 0.4,
        },
    },
    {
        id: "quinoa-preparada",
        name: "Quinoa con Verduras",
        price: 3.25,
        category: "sides",
        description: "Quinoa cocida con verduras mediterráneas",
        nutritionalInfo: {
            calories: 120,
            protein: 4.4,
            carbohydrates: 21.3,
            fat: 1.9,
        },
    },
    {
        id: "pan-integral",
        name: "Pan Integral de Centeno",
        price: 1.75,
        category: "sides",
        description: "Pan integral de centeno con semillas",
        nutritionalInfo: {
            calories: 259,
            protein: 8.5,
            carbohydrates: 48.3,
            fat: 3.3,
        },
    },

    // Más Bebidas
    {
        id: "té-verde",
        name: "Té Verde en Bolsitas",
        price: 2.15,
        category: "beverages",
        description: "Té verde natural antioxidante",
        nutritionalInfo: {
            calories: 1,
            protein: 0,
            carbohydrates: 0,
            fat: 0,
        },
    },
    {
        id: "batido-chocolate",
        name: "Batido de Chocolate",
        price: 1.95,
        category: "beverages",
        description: "Batido cremoso de chocolate con leche",
        nutritionalInfo: {
            calories: 64,
            protein: 3.2,
            carbohydrates: 9.6,
            fat: 1.5,
        },
    },
    {
        id: "agua-con-gas",
        name: "Agua con Gas Natural",
        price: 0.95,
        category: "beverages",
        description: "Agua mineral con gas natural",
        nutritionalInfo: {
            calories: 0,
            protein: 0,
            carbohydrates: 0,
            fat: 0,
        },
    },
    {
        id: "zumo-manzana",
        name: "Zumo de Manzana Natural",
        price: 1.85,
        category: "beverages",
        description: "Zumo de manzana 100% natural sin azúcar añadido",
        nutritionalInfo: {
            calories: 46,
            protein: 0.1,
            carbohydrates: 11.4,
            fat: 0.1,
        },
    },

    // Más Comidas Preparadas
    {
        id: "wrap-pollo",
        name: "Wrap de Pollo y Verduras",
        price: 2.95,
        category: "ready-meals",
        description: "Wrap integral con pollo, lechuga y tomate",
        nutritionalInfo: {
            calories: 245,
            protein: 18.5,
            carbohydrates: 25.8,
            fat: 8.2,
        },
    },
    {
        id: "bowl-quinoa",
        name: "Bowl de Quinoa y Vegetales",
        price: 3.75,
        category: "ready-meals",
        description: "Bowl saludable con quinoa, aguacate y vegetales",
        nutritionalInfo: {
            calories: 285,
            protein: 12.5,
            carbohydrates: 35.8,
            fat: 12.0,
        },
    },
    {
        id: "crema-calabaza",
        name: "Crema de Calabaza",
        price: 1.95,
        category: "ready-meals",
        description: "Crema suave de calabaza con especias",
        nutritionalInfo: {
            calories: 38,
            protein: 1.2,
            carbohydrates: 7.8,
            fat: 0.8,
        },
    },
    {
        id: "pasta-pesto",
        name: "Pasta con Pesto",
        price: 3.45,
        category: "ready-meals",
        description: "Pasta con salsa pesto de albahaca fresca",
        nutritionalInfo: {
            calories: 285,
            protein: 9.8,
            carbohydrates: 35.2,
            fat: 12.5,
        },
    },
];

export const getProductsByCategory = (
    category: MercadonaProduct["category"]
) => {
    return MERCADONA_PRODUCTS.filter(
        (product) => product.category === category
    );
};

export const getProductById = (id: string) => {
    return MERCADONA_PRODUCTS.find((product) => product.id === id);
};

export const searchProducts = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return MERCADONA_PRODUCTS.filter(
        (product) =>
            product.name.toLowerCase().includes(lowercaseQuery) ||
            product.description?.toLowerCase().includes(lowercaseQuery)
    );
};
