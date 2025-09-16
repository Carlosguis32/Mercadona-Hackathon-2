# Instrucciones para GitHub Copilot

## Contexto del Proyecto

Este es un proyecto de hackathón de Mercadona desarrollado con Next.js, React y TypeScript.

## Estructura del Proyecto

-   `/app` - Aplicación Next.js con App Router
-   `/components` - Componentes reutilizables de React
-   `/lib` - Utilidades y funciones auxiliares
-   `/public` - Archivos estáticos

## Tecnologías Utilizadas

-   Next.js 14+
-   React 18+
-   TypeScript
-   Tailwind CSS
-   shadcn/ui components

## Convenciones de Código

-   Usar TypeScript para todos los archivos
-   Componentes en PascalCase
-   Archivos en kebab-case
-   Usar hooks de React cuando sea apropiado
-   Preferir componentes funcionales
-   Usar siempre las mejores prácticas posibles, dividiendo los archivos cuando sea necesario, y no haciendo archivos extremadamente largos
-   No uses comentarios

## Patrones a Seguir

-   Componentes server-side por defecto
-   Client components solo cuando sea necesario (`'use client'`)
-   Tipos TypeScript explícitos
-   Props interfaces bien definidas
-   Usa siempre que puedas componentes shadcn. Si no existen en el directorio, pero shadcn cuenta con el mismo, propón su comando de instalación
-   Usa siempre los componentes Image y Link de next, antes que los por defecto de html

## Objetivos del Proyecto

[Describe aquí los objetivos específicos de tu hackathón de Mercadona]

## Contexto Específico

[Añade cualquier información específica sobre el dominio del problema, APIs que usas, etc.]
