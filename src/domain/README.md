# Pages Structure - Domain-Driven Architecture

Esta estrutura organiza cada seção da aplicação como um domínio independente, permitindo melhor escalabilidade e manutenibilidade.

## Estrutura por Domínio

```
src/domain/
├── hero/           # Seção Hero/Principal
├── about/          # Seção Sobre
├── books/          # Seção Livros
├── gallery/        # Seção Galeria
├── contact/        # Seção Contato
└── shared/         # Componentes compartilhados
```

## Estrutura Interna de Cada Domínio

Cada domínio segue a mesma estrutura:

```
domain/
├── components/     # Componentes React específicos
├── hooks/          # Hooks customizados
├── types/          # Tipos TypeScript
├── constants/      # Constantes e configurações
├── translations/   # Textos e traduções
└── index.ts        # Exportações principais
```

## Exemplos de Uso

### Adicionando uma nova funcionalidade ao Hero

1. **Componente**: `src/domain/hero/components/HeroButton.tsx`
2. **Hook**: `src/domain/hero/hooks/useHeroAnimations.ts`
3. **Tipos**: `src/domain/hero/types/index.ts`
4. **Constantes**: `src/domain/hero/constants/index.ts`
5. **Traduções**: `src/domain/hero/translations/index.ts`

### Importando em outros arquivos

```typescript
// Importar componente principal
import { HeroSection } from "@/domain/hero";

// Importar recursos específicos
import { useHeroAnimations } from "@/domain/hero/hooks/useHeroAnimations";
import { HERO_FEATURES } from "@/domain/hero/constants";
import { heroTranslations } from "@/domain/hero/translations";
```

## Benefícios

- **Isolamento**: Cada domínio é independente
- **Escalabilidade**: Fácil adicionar novas funcionalidades
- **Manutenibilidade**: Código organizado por contexto
- **Reutilização**: Hooks e utilitários específicos
- **Colaboração**: Times podem trabalhar em domínios diferentes
