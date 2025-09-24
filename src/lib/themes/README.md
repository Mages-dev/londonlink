# Sistema de Temas Comemorativos - LondonLink

Este documento descreve o sistema de temas comemorativos implementado no projeto LondonLink, começando com o tema de Halloween.

## 🎨 Visão Geral

O sistema permite alternar entre diferentes temas visuais baseados em datas comemorativas, mantendo a identidade visual do projeto enquanto adiciona elementos temáticos especiais.

### Características Principais

- **Temas Sazonais**: Temas automáticos baseados em datas
- **Sugestões Inteligentes**: Notificações para ativar temas na época apropriada
- **Efeitos Especiais**: Animações e elementos visuais únicos para cada tema
- **Acessibilidade**: Respeita preferências de movimento reduzido
- **Performance**: Carregamento condicional de estilos e efeitos

## 🏗️ Arquitetura

### Estrutura de Arquivos

```
src/lib/themes/
├── configs.ts          # Configurações dos temas
├── halloween.css       # Estilos específicos do Halloween
├── README.md          # Esta documentação
└── [futuro-tema].css  # Outros temas

src/contexts/
└── ThemeContext.tsx   # Context Provider para gerenciar temas

src/components/ui/
├── ThemeSelector.tsx      # Seletor de temas
├── ThemeSuggestion.tsx    # Notificação de sugestão
└── HalloweenEffects.tsx   # Efeitos especiais do Halloween
```

### Fluxo de Funcionamento

1. **Inicialização**: ThemeProvider carrega preferências salvas
2. **Detecção Sazonal**: Sistema verifica se há temas sugeridos para a data atual
3. **Aplicação**: CSS Variables são aplicadas dinamicamente
4. **Efeitos**: Componentes condicionais renderizam animações especiais

## 🎃 Tema Halloween

### Paleta de Cores

#### Modo Claro

- **Background**: `#fef7ed` (Orange-50)
- **Primary**: `#ea580c` (Orange-600)
- **Accent**: `#7c2d12` (Red-900)
- **Special**: `#a855f7` (Purple-500)
- **Special Accent**: `#fbbf24` (Amber-400)

#### Modo Escuro

- **Background**: `#0c0a09` (Stone-950)
- **Primary**: `#fb923c` (Orange-400)
- **Accent**: `#dc2626` (Red-600)
- **Special**: `#c084fc` (Purple-400)
- **Special Accent**: `#fcd34d` (Amber-300)

### Efeitos Especiais

#### Classes CSS Disponíveis

- `.halloween-glow`: Efeito de brilho pulsante
- `.halloween-float`: Animação flutuante
- `.halloween-pulse`: Pulsação suave
- `.halloween-shadow`: Sombras temáticas
- `.halloween-card`: Estilo especial para cards
- `.halloween-button`: Botões com efeitos especiais
- `.halloween-text-glow`: Texto com brilho

#### Animações

- **halloween-float**: Movimento flutuante com rotação sutil
- **halloween-pulse**: Pulsação de opacidade e escala
- **halloween-flicker**: Efeito de tremulação

### Componentes Afetados

- **HeroSection**: Títulos com brilho, cards flutuantes, botões especiais
- **Header**: Navegação com efeitos hover temáticos
- **Cards**: Transformações e sombras especiais
- **Efeitos de Fundo**: Elementos flutuantes e padrões

## 🔧 Como Usar

### 🚀 Funcionamento Automático

O sistema aplica temas automaticamente baseado na data atual:

#### **Ativação Automática:**

- Os temas são **ativados automaticamente** durante seus períodos específicos
- **Halloween**: 24 a 31 de outubro
- **Natal**: 15 a 25 de dezembro
- Não requer intervenção do usuário
- Sistema verifica diariamente e aplica/remove temas conforme necessário

#### **Para Desenvolvedores - Testes:**

1. Abra o console do navegador
2. Execute: `testDateBasedThemes()` - para testar diferentes datas
3. Execute: `forceHalloweenTheme()` - para forçar tema Halloween
4. Execute: `forceChristmasTheme()` - para forçar tema Natal
5. Execute: `removeSeasonalThemes()` - para remover todos os temas

#### **Seleção Manual (Apenas Desenvolvimento):**

- Seletor de temas visível apenas em modo desenvolvimento
- Permite testar diferentes temas e modos manualmente
- Não aparece para usuários finais em produção

### Aplicando Tema em Componentes

```tsx
import { useTheme } from "@/contexts";

function MeuComponente() {
  const { commemorativeTheme } = useTheme();
  const isHalloween = commemorativeTheme === "halloween";

  return (
    <div
      className={`meu-componente ${
        isHalloween ? "halloween-card halloween-glow" : ""
      }`}
    >
      <h2 className={isHalloween ? "halloween-text-glow" : ""}>Título</h2>
    </div>
  );
}
```

### Verificando Tema Ativo

```tsx
import { useTheme } from "@/contexts";

function ComponenteCondicional() {
  const { isCommemorativeThemeActive, commemorativeTheme } = useTheme();

  if (!isCommemorativeThemeActive) {
    return <ComponentePadrao />;
  }

  return <ComponenteTemático theme={commemorativeTheme} />;
}
```

### Acessando Cores do Tema

```tsx
import { useThemeColors } from "@/contexts";

function ComponenteComCores() {
  const colors = useThemeColors();

  return (
    <div style={{ backgroundColor: colors.primary }}>
      Conteúdo com cor do tema ativo
    </div>
  );
}
```

## 📅 Ativação Automática por Datas

Os temas comemorativos são **ativados automaticamente** durante seus períodos:

### 🎃 **Halloween**

- **Início**: 24 de outubro (1 semana antes do Halloween)
- **Fim**: 31 de outubro (dia do Halloween)

```typescript
dateRange: {
  start: { month: 10, day: 24 }, // October 24th
  end: { month: 10, day: 31 }    // October 31st (Halloween day)
}
```

### 🎄 **Natal**

- **Início**: 15 de dezembro (10 dias antes do Natal)
- **Fim**: 25 de dezembro (dia do Natal)

```typescript
dateRange: {
  start: { month: 12, day: 15 }, // December 15th
  end: { month: 12, day: 25 }    // December 25th (Christmas day)
}
```

### Como Funciona a Ativação Automática

1. **Verificação Inicial**: Ao carregar a página, o sistema verifica a data atual
2. **Aplicação Automática**: Se estiver no período do tema, aplica automaticamente
3. **Verificação Diária**: Sistema verifica mudanças a cada meia-noite
4. **Transição Automática**: Temas são ativados/desativados sem intervenção do usuário

## 🚀 Adicionando Novos Temas

### 1. Criar Configuração

```typescript
// Em src/lib/themes/configs.ts
const novoTema: ThemeConfig = {
  name: 'novo-tema',
  displayName: { pt: 'Novo Tema', en: 'New Theme' },
  description: { pt: 'Descrição', en: 'Description' },
  colors: { light: {...}, dark: {...} },
  dateRange: { start: {...}, end: {...} },
  icon: '🎉'
};
```

### 2. Criar Arquivo CSS

```css
/* src/lib/themes/novo-tema.css */
.theme-novo-tema {
  --primary: #cor-primaria;
  /* outras variáveis */
}

.novo-tema-efeito {
  /* estilos especiais */
}
```

### 3. Importar no Layout

```tsx
// src/app/layout.tsx
import "../lib/themes/novo-tema.css";
```

### 4. Adicionar ao Seletor

```typescript
// src/components/ui/ThemeSelector.tsx
const availableThemes: CommemorativeTheme[] = [
  "default",
  "halloween",
  "novo-tema",
];
```

## ♿ Acessibilidade

- **Movimento Reduzido**: Animações são desabilitadas com `prefers-reduced-motion`
- **Contraste**: Cores mantêm contraste adequado em ambos os modos
- **Semântica**: Elementos mantêm estrutura semântica
- **Navegação**: Seletor de temas é navegável por teclado

## 🎯 Próximos Passos

1. **Tema de Natal** (dezembro)
2. **Tema de Ano Novo** (dezembro/janeiro)
3. **Tema de Dia dos Namorados** (fevereiro)
4. **Tema de Páscoa** (março/abril)
5. **Sistema de Temas Personalizados**

## 📝 Notas Técnicas

- **Performance**: Estilos são carregados apenas quando necessários
- **SSR**: Compatible com renderização server-side do Next.js
- **Hidratação**: Evita problemas de hidratação com verificação de montagem
- **LocalStorage**: Preferências são persistidas localmente
- **TypeScript**: Totalmente tipado para melhor DX
