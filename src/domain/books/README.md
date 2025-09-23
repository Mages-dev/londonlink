# Books Domain

Este domínio é responsável por exibir informações sobre os livros "Three Lions English" no site LondonLink, seguindo os princípios de Domain-Driven Design (DDD).

## Estrutura

```
src/domain/books/
├── components/
│   └── BooksSection.tsx    # Componente principal da seção
├── constants/
│   └── images.ts          # Constantes de imagens dos livros
├── styles/
│   ├── books.css          # Estilos específicos do domínio
│   └── index.ts           # Exportações dos estilos
├── index.ts               # Exportações principais do domínio
└── README.md              # Este arquivo
```

## Conteúdo do Domínio

O domínio Books apresenta a história do autor e a trilogia "Three Lions English" com:

### Seção do Autor

- **História pessoal**: Experiência como coordenador em escola de inglês
- **Motivação**: Problemas identificados nos livros didáticos existentes
- **Imagem do autor**: Foto com borda decorativa vermelha
- **Layout responsivo**: Grid adaptável com texto e imagem

### Seção dos Estudantes

- **Desenvolvimento**: Como os livros foram criados para resolver problemas reais
- **Características**: Livros projetados para professores e estudantes
- **Nome da trilogia**: "Three Lions English"
- **Impacto**: Uso diário por centenas de estudantes

## Componentes

### BooksSection

Componente principal que renderiza todo o domínio de livros.

**Props:**

- `currentLanguage`: Idioma atual da aplicação (`Language`)

**Características:**

- Layout responsivo com múltiplas seções
- Fundo gradiente azul com elementos decorativos
- Imagens otimizadas com lazy loading
- Suporte completo a português e inglês
- Grid adaptável para diferentes resoluções

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
    author: "/assets/images/books/previews/author.jpg",
    threeLionsTrilogy: "/assets/images/books/previews/three-lions-trilogy.jpg",
    students: "/assets/images/books/previews/students.jpg",
  },
  thumbnails: {
    threeLionsPart1Thumb:
      "/assets/images/books/thumbnails/three-lions-part-1-thumb.jpg",
    threeLionsPart2Thumb:
      "/assets/images/books/thumbnails/three-lions-part-2-thumb.jpg",
    threeLionsPart3Thumb:
      "/assets/images/books/thumbnails/three-lions-part-3-thumb.jpg",
  },
};
```

### BOOKS_IMAGE_ALTS

Textos alternativos para acessibilidade das imagens.

## Estilos

O domínio utiliza estilos específicos definidos em `src/domain/books/styles/books.css`:

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
import { BooksSection } from "@/domain/books";

// Em um componente
<BooksSection currentLanguage="pt" />;
```

## Arquitetura DDD

Este domínio segue os princípios de Domain-Driven Design:

- **Isolamento**: Lógica específica de livros encapsulada no domínio
- **Coesão**: Componentes, estilos e constantes relacionados agrupados
- **Reutilização**: Exportações organizadas para fácil importação
- **Manutenibilidade**: Estrutura clara e responsabilidades bem definidas

## Futuras Implementações

- Traduções específicas do domínio
- Hooks para animações e interações
- Tipos TypeScript específicos do domínio
- Integração com sistema de compras
- Modal com detalhes dos livros
- Testes unitários e de integração
