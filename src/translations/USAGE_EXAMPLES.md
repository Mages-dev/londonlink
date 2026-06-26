# Translation Usage Examples

Este arquivo mostra exemplos práticos de como usar a nova estrutura de traduções separadas por idioma.

## 📝 Uso Básico

### 1. **Importar traduções de um domínio específico**

```typescript
// Método tradicional (ainda funciona)
import { heroTranslations } from '@/domain/hero/translations';
const t = heroTranslations[currentLanguage];

// Método direto por idioma (novo)
import {
  heroTranslationsEn,
  heroTranslationsPt,
} from '@/domain/hero/translations';
const t = currentLanguage === 'en' ? heroTranslationsEn : heroTranslationsPt;
```

### 2. **Usar no componente React**

```typescript
// src/domain/hero/components/HeroSection.tsx
import { heroTranslations } from "../translations";

export function HeroSection({ currentLanguage }: HeroSectionProps) {
  const t = heroTranslations[currentLanguage];

  return (
    <div>
      <h1>{t.title}</h1>
      <p>{t.subtitle}</p>
      <button>{t.ctaButton}</button>
    </div>
  );
}
```

## 🔧 Manutenção de Traduções

### **Adicionando nova chave de tradução**

1. **Adicione em todos os arquivos de idioma:**

```typescript
// src/pages/hero/translations/en.ts
export const heroTranslationsEn = {
  // ... traduções existentes
  newFeature: 'New amazing feature!', // ← Nova chave
} as const;

// src/domain/hero/translations/pt.ts
export const heroTranslationsPt = {
  // ... traduções existentes
  newFeature: 'Nova funcionalidade incrível!', // ← Nova chave
} as const;
```

2. **Use no componente:**

```typescript
<p>{t.newFeature}</p>
```

### **Verificando consistência**

```typescript
import { validateTranslationKeys } from '@/translations/utils';
import {
  heroTranslationsEn,
  heroTranslationsPt,
} from '@/domain/hero/translations';

// Verificar se PT tem todas as chaves do EN
const isValid = validateTranslationKeys(heroTranslationsEn, heroTranslationsPt);
if (!isValid) {
  console.warn('Portuguese translations are missing some keys!');
}
```

## 🌍 Adicionando Novo Idioma (Espanhol)

### **Passo a passo completo:**

1. **Atualizar configuração:**

```typescript
// src/translations/config.ts
export const SUPPORTED_LANGUAGES = ['en', 'pt', 'es'] as const;

export const LANGUAGE_CONFIG = {
  // ... existentes
  es: {
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    direction: 'ltr' as const,
  },
};
```

2. **Criar arquivo de tradução:**

```typescript
// src/pages/hero/translations/es.ts
export const heroTranslationsEs = {
  title: '¿Quieres aprender inglés?',
  subtitle: '¡Dinos qué necesitas y crearemos un curso solo para ti!',
  ctaButton: 'Preinscripción',
  // ... resto das traduções
} as const;
```

3. **Atualizar index do domínio:**

```typescript
// src/pages/hero/translations/index.ts
import { heroTranslationsEs } from './es';

export const heroTranslations = {
  en: heroTranslationsEn,
  pt: heroTranslationsPt,
  es: heroTranslationsEs, // ← Adicionar
} as const;

export { heroTranslationsEs } from './es'; // ← Exportar
```

4. **Atualizar tipos globais (se necessário):**

```typescript
// src/types/index.ts - já está configurado para usar config centralizada
export type { Language } from '@/translations/config';
```

## 🎯 Benefícios da Nova Estrutura

### **✅ Antes (arquivo único):**

```typescript
// Arquivo grande com todos os idiomas misturados
export const heroTranslations = {
  en: {
    /* 50+ linhas */
  },
  pt: {
    /* 50+ linhas */
  },
  es: {
    /* 50+ linhas */
  },
  fr: {
    /* 50+ linhas */
  },
  // ... arquivo com 200+ linhas
};
```

### **✅ Agora (arquivos separados):**

```typescript
// src/pages/hero/translations/en.ts (25 linhas)
export const heroTranslationsEn = {
  /* traduções EN */
};

// src/pages/hero/translations/pt.ts (25 linhas)
export const heroTranslationsPt = {
  /* traduções PT */
};

// src/pages/hero/translations/es.ts (25 linhas)
export const heroTranslationsEs = {
  /* traduções ES */
};
```

### **🚀 Vantagens:**

- **Manutenibilidade:** Cada idioma em arquivo separado
- **Colaboração:** Tradutores podem trabalhar em paralelo
- **Performance:** Importação seletiva por idioma
- **Organização:** Estrutura clara e escalável
- **Git:** Conflitos reduzidos em merges
