# Feedbacks Section

Esta seção é responsável por exibir depoimentos e feedbacks de alunos no site LondonLink.

## Estrutura

```
src/domain/feedbacks/
├── components/
│   └── FeedbacksSection.tsx   # Componente principal da seção
├── constants/
│   └── images.ts             # Constantes de imagens dos feedbacks
├── hooks/
│   └── index.ts              # Hooks customizados (futuro)
├── styles/
│   ├── feedbacks.css         # Estilos específicos da seção
│   └── index.ts              # Exportações dos estilos
├── translations/
│   ├── en.ts                 # Traduções em inglês
│   ├── pt.ts                 # Traduções em português
│   └── index.ts              # Exportações das traduções
├── types/
│   └── index.ts              # Definições de tipos (futuro)
├── index.ts                  # Exportações principais
└── README.md                 # Este arquivo
```

## Conteúdo da Seção

A seção Feedbacks apresenta:

- **Título principal**: "What Our Students Say" (EN) / "O Que Nossos Alunos Dizem" (PT)
- **Carrossel de depoimentos**: 6 depoimentos de alunos reais
- **Sistema de avaliação**: Estrelas de 1 a 5
- **Estatísticas de sucesso**: 4 métricas principais
- **Call to Action**: Botão para iniciar aprendizado

## Componentes

### FeedbacksSection

Componente principal que renderiza toda a seção de feedbacks.

**Props:**
- `currentLanguage`: Idioma atual da aplicação (`Language`)

**Características:**
- Carrossel interativo de depoimentos
- Sistema de navegação com setas e indicadores
- Avaliação por estrelas
- Badges de verificação
- Estatísticas animadas
- Layout responsivo
- Suporte bilíngue completo

## Funcionalidades

### Carrossel de Depoimentos
- Navegação por setas (anterior/próximo)
- Indicadores de posição
- Transições suaves
- Controle por teclado (futuro)

### Sistema de Avaliação
- Exibição de estrelas (1-5)
- Animações hover
- Cores diferenciadas

### Estatísticas
- Contadores animados
- 4 métricas principais:
  - 500+ Alunos Satisfeitos
  - 95% Taxa de Sucesso
  - 4.9/5 Avaliação Média
  - 15+ Anos de Experiência

## Constantes

### FEEDBACKS_IMAGES

Objeto contendo todas as URLs das imagens dos feedbacks:

```typescript
export const FEEDBACKS_IMAGES = {
  testimonials: {
    student1: "/assets/images/feedbacks/testimonials/student-1.jpg",
    student2: "/assets/images/feedbacks/testimonials/student-2.jpg",
    // ... mais estudantes
  },
  backgrounds: {
    feedbacksHero: "/assets/images/feedbacks/backgrounds/feedbacks-hero.jpg",
    testimonialsBg: "/assets/images/feedbacks/backgrounds/testimonials-bg.jpg",
  },
  icons: {
    star: "/assets/images/feedbacks/icons/star.svg",
    quote: "/assets/images/feedbacks/icons/quote.svg",
    verified: "/assets/images/feedbacks/icons/verified.svg",
  },
};
```

### FEEDBACKS_IMAGE_ALTS

Textos alternativos para acessibilidade das imagens.

## Traduções

### Estrutura das Traduções

```typescript
export const feedbacksTranslationsEn = {
  title: "What Our Students Say",
  subtitle: "Real feedback from real students...",
  testimonials: [
    {
      id: "maria-silva",
      name: "Maria Silva",
      role: "Business Professional",
      location: "São Paulo, Brazil",
      rating: 5,
      text: "LondonLink transformed my English completely!",
      achievement: "Advanced Business English in 8 months",
    },
    // ... mais depoimentos
  ],
  stats: {
    title: "Our Success Numbers",
    items: [
      {
        number: "500+",
        label: "Satisfied Students",
        description: "Students who achieved their English goals",
      },
      // ... mais estatísticas
    ],
  },
  cta: {
    title: "Ready to Join Our Success Stories?",
    description: "Start your English journey today...",
    button: "Start Learning Now",
  },
};
```

## Estilos

A seção utiliza estilos específicos definidos em `src/domain/feedbacks/styles/feedbacks.css`:

```css
/* Testimonial card animations */
.testimonial-card {
  transition: all 0.3s ease-in-out;
}

.testimonial-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

/* Star rating animations */
.star-rating {
  display: flex;
  gap: 2px;
}

/* Statistics counter animation */
.stat-number {
  font-weight: 700;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: countUp 2s ease-out;
}

/* Carousel navigation */
.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}
```

### Arquitetura DDD dos Estilos

- **Isolamento**: Estilos específicos ficam dentro do domínio Feedbacks
- **Reutilização**: Classes exportadas via `FEEDBACKS_STYLE_CLASSES`
- **Manutenibilidade**: Estilos organizados por contexto
- **Escalabilidade**: Fácil adição de novos estilos sem afetar outros domínios

## Uso

```typescript
import { FeedbacksSection } from "@/domain/feedbacks";

// Em um componente
<FeedbacksSection currentLanguage="pt" />
```

## Futuras Implementações

- Integração com API de depoimentos
- Sistema de moderação de feedbacks
- Filtros por categoria/tipo de curso
- Animações mais avançadas
- Suporte a vídeo depoimentos
- Sistema de likes/dislikes
- Compartilhamento social
- Carregamento lazy das imagens
- Acessibilidade aprimorada (ARIA labels)
- Testes unitários e de integração
