import Footer from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";
import { Lato, Space_Grotesk } from "next/font/google";
import "./globals.css";

const lato = Lato({
    variable: "--font-body",
    subsets: ["latin"],
    weight: ["300", "400", "700"],
});

const spaceGrotesk = Space_Grotesk({
    variable: "--font-heading",
    subsets: ["latin"],
    weight: ["400", "600"],
});

export const metadata: Metadata = {
    title: {
        default: "Mercadona",
        template: "%s | Mercadona",
    },
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body
                className={`${lato.variable} ${spaceGrotesk.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header />
                    <div className="flex min-h-screen flex-col">
                        <main className="flex-1 pt-20">{children}</main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
