# Books Section

Esta seção é responsável por exibir informações sobre os livros "Three Lions English" no site LondonLink.

## Estrutura

```
src/pages/books/
├── components/
│   └── BooksSection.tsx    # Componente principal da seção
├── constants/
│   └── images.ts          # Constantes de imagens dos livros
├── hooks/
│   └── index.ts           # Hooks customizados (futuro)
├── styles/
│   ├── books.css          # Estilos específicos da seção
│   └── index.ts           # Exportações dos estilos
├── translations/
│   └── index.ts           # Traduções (futuro)
├── types/
│   └── index.ts           # Definições de tipos (futuro)
├── index.ts               # Exportações principais
└── README.md              # Este arquivo
```

## Conteúdo da Seção

A seção Books apresenta a trilogia "Three Lions English" com:

- **Título principal**: "Three Lions English"
- **Subtítulo**: "A trilogia está completa" (PT) / "The trilogy is complete" (EN)
- **Imagem**: Preview da trilogia completa
- **Design**: Fundo gradiente azul com elementos decorativos

## Componentes

### BooksSection

Componente principal que renderiza toda a seção de livros.

**Props:**
- `currentLanguage`: Idioma atual da aplicação (`Language`)

**Características:**
- Layout responsivo com grid
- Fundo gradiente azul
- Elementos decorativos animados
- Suporte bilíngue (português/inglês)

## Constantes

### BOOKS_IMAGES

Objeto contendo todas as URLs das imagens dos livros:

```typescript
export const BOOKS_IMAGES = {
  covers: {
    threeLionsPart1: "/assets/images/books/covers/three-lions-part-1.jpg",
    threeLionsPart2: "/assets/images/books/covers/three-lions-part-2.jpg",
    threeLionsPart3: "/assets/images/books/covers/three-lions-part-3.jpg",
  },
  previews: {
    threeLionsTrilogy: "/assets/images/books/previews/three-lions-trilogy.jpg",
  },
  thumbnails: {
    threeLionsPart1Thumb: "/assets/images/books/thumbnails/three-lions-part-1-thumb.jpg",
    threeLionsPart2Thumb: "/assets/images/books/thumbnails/three-lions-part-2-thumb.jpg",
    threeLionsPart3Thumb: "/assets/images/books/thumbnails/three-lions-part-3-thumb.jpg",
  },
};
```

### BOOKS_IMAGE_ALTS

Textos alternativos para acessibilidade das imagens.

## Estilos

A seção utiliza estilos específicos definidos em `src/pages/books/styles/books.css`:

```css
/* 3D Transform utilities for books section */
.perspective-1000 {
  perspective: 1000px;
}

.rotate-y-12 {
  transform: rotateY(12deg);
}

.rotate-y-\[-12deg\] {
  transform: rotateY(-12deg);
}

.transform-gpu {
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Enhanced shadow for 3D effect */
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}
```

### Arquitetura DDD dos Estilos

- **Isolamento**: Estilos específicos ficam dentro do domínio Books
- **Reutilização**: Classes exportadas via `BOOKS_STYLE_CLASSES`
- **Manutenibilidade**: Estilos organizados por contexto
- **Escalabilidade**: Fácil adição de novos estilos sem afetar outros domínios

## Uso

```typescript
import { BooksSection } from "@/pages/books";

// Em um componente
<BooksSection currentLanguage="pt" />
```

## Futuras Implementações

- Traduções específicas da seção
- Hooks para animações 3D
- Tipos TypeScript específicos
- Integração com sistema de compras
- Modal com detalhes dos livros
