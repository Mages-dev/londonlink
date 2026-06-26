# Translations Structure

Esta pasta centraliza o sistema de traduções do LondonLink, facilitando a expansão para novos idiomas.

## 📁 Estrutura

```
src/translations/
├── index.ts          # Exportações centrais de todas as traduções
├── config.ts         # Configuração de idiomas e utilitários
└── README.md         # Esta documentação

src/domain/[domain]/translations/
├── index.ts          # Combina todas as traduções do domínio
├── en.ts             # Traduções em inglês
├── pt.ts             # Traduções em português
├── es.ts             # Traduções em espanhol (quando adicionado)
└── [lang].example.ts # Templates para novos idiomas
```

## 🌐 Idiomas Suportados

Atualmente suportamos:

- **English (en)** - Idioma padrão
- **Português (pt)** - Português brasileiro

## 📝 Como Usar

### 1. Importar traduções de um domínio específico

```typescript
import { heroTranslations } from '@/domain/hero/translations';

// Usar no componente
const t = heroTranslations[currentLanguage];
console.log(t.title); // "Do you want to learn English?" ou "Você quer aprender inglês?"
```

### 2. Importar todas as traduções centralizadas

```typescript
import { getTranslations } from '@/translations';

// Obter todas as traduções para um idioma
const translations = getTranslations('pt');
console.log(translations.hero.title); // "Você quer aprender inglês?"
```

### 3. Usar configurações de idioma

```typescript
import { LANGUAGE_CONFIG, isValidLanguage } from '@/translations/config';

// Verificar se um idioma é válido
if (isValidLanguage('pt')) {
  const config = LANGUAGE_CONFIG.pt;
  console.log(config.nativeName); // "Português"
}
```

## 🔧 Estrutura de Domínio

Cada domínio (hero, about, books, etc.) mantém suas próprias traduções:

```
src/domain/hero/translations/index.ts
src/domain/about/translations/index.ts
src/domain/books/translations/index.ts
```

### Exemplo de estrutura de tradução:

```typescript
export const heroTranslations = {
  en: {
    title: 'Do you want to learn English?',
    subtitle: 'Tell us what you need...',
    ctaButton: 'Preregistration',
  },
  pt: {
    title: 'Você quer aprender inglês?',
    subtitle: 'Nos diga o que você precisa...',
    ctaButton: 'Pré-cadastro',
  },
} as const;
```

## ➕ Adicionando Novos Idiomas

Para adicionar um novo idioma (ex: espanhol):

1. **Atualizar configuração:**

```typescript
// src/translations/config.ts
export const SUPPORTED_LANGUAGES = ['en', 'pt', 'es'] as const;

export const LANGUAGE_CONFIG = {
  // ... idiomas existentes
  es: {
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    direction: 'ltr' as const,
  },
};
```

### 2. **Criar arquivo de tradução para cada domínio:**

```typescript
// src/domain/hero/translations/es.ts
export const heroTranslationsEs = {
  title: '¿Quieres aprender inglés?',
  subtitle: 'Dinos qué necesitas...',
  ctaButton: 'Preinscripción',
  // ... resto das traduções
} as const;
```

### 3. **Atualizar o index do domínio:**

```typescript
// src/domain/hero/translations/index.ts
import { heroTranslationsEs } from './es';

export const heroTranslations = {
  en: heroTranslationsEn,
  pt: heroTranslationsPt,
  es: heroTranslationsEs, // Adicionar aqui
} as const;

export { heroTranslationsEs } from './es'; // Exportar também
```

### 4. **Usar templates existentes:**

- Copie `es.example.ts` para `es.ts`
- Ajuste as traduções conforme necessário
- Remova o arquivo `.example.ts`

## 🎯 Benefícios

- **Centralização**: Todas as traduções organizadas por domínio
- **Escalabilidade**: Fácil adição de novos idiomas
- **Type Safety**: TypeScript garante consistência
- **Manutenibilidade**: Estrutura clara e documentada
- **Performance**: Importações específicas por domínio
