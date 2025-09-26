import { ExpandableGrid } from "@/components/expandable-grid";

export default function Home() {
    const gridItems = [
        {
            id: '1',
            title: 'Mediterranean Plan',
            imageUrl: '/api/placeholder/200/200',
            expandedContent: 'A healthy Mediterranean diet plan with fresh vegetables, olive oil, and lean proteins. Perfect for a balanced lifestyle.'
        },
        {
            id: '2',
            title: 'Vegetarian Delights',
            imageUrl: '/api/placeholder/200/200',
            expandedContent: 'Plant-based meals packed with nutrients and flavor. Great for environmental consciousness and health.'
        },
        {
            id: '3',
            title: 'Quick & Easy',
            imageUrl: '/api/placeholder/200/200',
            expandedContent: 'Fast meals for busy lifestyles. Ready in 30 minutes or less without compromising on taste.'
        },
        {
            id: '4',
            title: 'Family Favorites',
            imageUrl: '/api/placeholder/200/200',
            expandedContent: 'Kid-friendly meals that the whole family will love. Nutritious and delicious options for everyone.'
        },
        {
            id: '5',
            title: 'Gourmet Experience',
            imageUrl: '/api/placeholder/200/200',
            expandedContent: 'Elevated dining experiences with premium ingredients and sophisticated flavors.'
        },
        {
            id: '6',
            title: 'Seasonal Specials',
            imageUrl: '/api/placeholder/200/200',
            expandedContent: 'Fresh seasonal ingredients celebrating the best of each time of year.'
        }
    ];

    return (
        <div className="max-w-6xl mx-auto py-12 px-6">
            <section className="bg-card rounded-lg p-8 shadow-sm">
                <h1 className="text-2xl font-semibold mb-4">
                    Bienvenido a Mercadona Meal Plan
                </h1>
                <p className="text-muted-foreground mb-8">
                    ¡Explora nuestros planes para encontrar el que funciona para tí, o crea el tuyo!
                </p>
                
                <ExpandableGrid items={gridItems} />
            </section>
        </div>
    );
}
