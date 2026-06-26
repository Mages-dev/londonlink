# Gallery Section - L-Shape Innovation 🎨

Esta seção implementa uma galeria inovadora em formato de **L** que representa visualmente a marca **LondonLink**.

## 🎯 Conceito Inovador

### **L-Shape Gallery**

- **Formato L:** Representa a letra "L" de "LondonLink"
- **Layout Dinâmico:** 12 imagens organizadas em formato L
- **Responsivo:** Adapta-se a diferentes tamanhos de tela
- **Interativo:** Hover effects e animações suaves

## 📐 Estrutura do Layout

### **Grid Completo 4x5:**

A galeria utiliza um grid de **4 colunas × 5 linhas** que ocupa toda a viewport:

```
┌─────┬─────┬─────┬─────┐
│  1  │  2  │     │     │  ← Linha 1
├─────┼─────┼─────┼─────┤
│  3  │  4  │     │     │  ← Linha 2
├─────┼─────┼─────┼─────┤
│  5  │  6  │     │     │  ← Linha 3
├─────┼─────┼─────┼─────┤
│  7  │  8  │     │     │  ← Linha 4
├─────┼─────┼─────┼─────┤
│  9  │ 10  │ 11  │ 12  │  ← Linha 5 (Linha completa)
└─────┴─────┴─────┴─────┘
```

### **Distribuição das Imagens:**

- **8 imagens principais:** Ocupam as 2 primeiras colunas (linhas 1-4)
- **4 imagens da base:** Ocupam todas as 4 colunas na linha 5
- **Espaços vazios:** Colunas 3-4 nas linhas 1-4 (para manter o formato L)

## 🎨 Características Visuais

### **Layout Uniforme:**

- **Todas as imagens:** Tamanho uniforme (1x1) no grid
- **Proporção:** Mantida através do `object-cover`
- **Espaçamento:** Gap responsivo (0.5rem mobile, 1rem desktop)
- **Altura:** Ocupa toda a viewport (`h-screen`) menos o header

### **Efeitos Interativos:**

- **Hover Scale:** Zoom suave nas imagens
- **Overlay:** Escurecimento com informações
- **Animações:** Entrada escalonada com delays
- **Transições:** Suaves e fluidas

## 🔧 Implementação Técnica

### **Grid CSS:**

```css
grid-cols-8 grid-rows-6  /* 8 colunas x 6 linhas */
```

### **Responsividade:**

- **Mobile:** Layout adaptado para telas pequenas
- **Tablet:** Ajustes de espaçamento e tamanhos
- **Desktop:** Layout completo em L

### **Performance:**

- **Next.js Image:** Otimização automática
- **Lazy Loading:** Carregamento sob demanda
- **Sizes:** Responsive image sizing

## 📁 Estrutura de Arquivos

```
src/domain/gallery/
├── components/
│   ├── GallerySection.tsx     # Componente principal
│   ├── LShapeGallery.tsx      # Layout em L (separado)
│   └── GalleryModal.tsx       # Modal para visualização
├── constants/
│   └── images.ts              # Configuração das imagens
├── hooks/
│   └── useGallery.ts          # Hook para estado da galeria
├── styles/
│   ├── gallery.css            # Estilos específicos da galeria
│   └── index.ts               # Exportações e constantes de estilo
├── translations/
│   ├── en.ts                  # Traduções em inglês
│   ├── pt.ts                  # Traduções em português
│   └── index.ts               # Exportações centrais
├── index.ts                   # Exportações do domínio
└── README.md                  # Esta documentação
```

## 🎨 Estilos

A galeria possui seus próprios estilos organizados seguindo os princípios do DDD:

### **Animações:**

- `animate-fade-in`: Fade in simples (0.3s)
- `animate-fade-in-up`: Fade in com movimento para cima (0.6s)
- `animate-scale-in`: Scale in com fade (0.3s)

### **Classes Utilitárias:**

- `gallery-grid`: Grid 4x5 responsivo
- `gallery-image-container`: Container com hover effects
- `gallery-modal-backdrop`: Backdrop do modal com blur
- `gallery-modal-content`: Conteúdo do modal responsivo

### **Constantes Disponíveis:**

```typescript
import {
  GALLERY_STYLE_CLASSES,
  GALLERY_ANIMATIONS,
  GALLERY_GRID_CONFIG,
} from '@/domain/gallery';

// Classes CSS
GALLERY_STYLE_CLASSES.grid;
GALLERY_STYLE_CLASSES.imageContainer;
GALLERY_STYLE_CLASSES.fadeInUp;

// Durações de animação
GALLERY_ANIMATIONS.fadeIn; // '0.3s'
GALLERY_ANIMATIONS.hover; // '0.3s'

// Configuração do grid
GALLERY_GRID_CONFIG.columns; // 4
GALLERY_GRID_CONFIG.rows; // 5
```

## 🌐 Traduções

### **Suporte Bilíngue:**

- **Inglês:** "L-Shape Gallery"
- **Português:** "Galeria em Formato L"

### **Elementos Traduzidos:**

- Título e subtítulo da seção
- Textos de hover e interação
- Estados de loading e erro
- Navegação do modal

## 🎯 Funcionalidades

### **Galeria Principal:**

- ✅ Layout em formato L
- ✅ 12 imagens dinâmicas
- ✅ Hover effects interativos
- ✅ Animações de entrada
- ✅ Indicador da marca "LondonLink"

### **Modal (Futuro):**

- 🔄 Visualização em tela cheia
- 🔄 Navegação entre imagens
- 🔄 Informações detalhadas
- 🔄 Controles de teclado

## 🚀 Expansibilidade

### **Novos Idiomas:**

Facilmente extensível seguindo o padrão:

```typescript
// gallery/translations/es.ts
export const galleryTranslationsEs = {
  title: 'Galería',
  subtitle: 'Explora nuestro contenido visual...',
  // ...
};
```

### **Mais Imagens:**

Ajustar constantes em `images.ts`:

```typescript
const generateImagePaths = () => {
  const images = [];
  for (let i = 1; i <= 20; i++) {
    // Aumentar quantidade
    // ...
  }
};
```

## 💡 Inovação Destacada

### **Representação da Marca:**

- **Visual:** Formato L representa "LondonLink"
- **Funcional:** Layout único e memorável
- **Técnico:** CSS Grid avançado
- **UX:** Interação intuitiva e envolvente

Esta implementação combina **criatividade visual** com **excelência técnica**, criando uma experiência única que reforça a identidade da marca LondonLink! 🌟
