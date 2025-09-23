# Goals Section - LondonLink

Esta seção apresenta as diferentes necessidades e objetivos dos alunos com o idioma inglês, permitindo que escolham seu caminho de aprendizado.

## Estrutura

```
src/pages/goals/
├── components/
│   └── GoalsSection.tsx    # Componente principal da seção
├── constants/
│   └── images.ts          # Constantes de ícones
├── hooks/
│   └── index.ts           # Hooks customizados
├── styles/
│   ├── goals.css          # Estilos específicos da seção
│   └── index.ts           # Exportações dos estilos
├── translations/
│   ├── en.ts              # Traduções em inglês
│   ├── pt.ts              # Traduções em português
│   └── index.ts           # Exportações das traduções
├── types/
│   └── index.ts           # Definições de tipos
├── index.ts               # Exportações principais
└── README.md              # Este arquivo
```

## Conteúdo da Seção

A seção Goals é dividida em 2 partes principais:

### Parte 1: Cartões de Objetivos

Apresenta 6 cartões com diferentes objetivos de aprendizado:

### 1. 🛫 Travel (Viagem)

- Viagens inesperadas para países de língua inglesa
- Inglês prático para situações do mundo real

### 2. 💼 Business (Negócios)

- Viagens de negócios para Londres, Nova York, Sydney, Cidade do Cabo
- Inglês profissional para comunicações empresariais

### 3. 📚 Exam (Exames)

- Preparação para IELTS, TOEFL, FCE, CAE, CPE
- Preparação especializada para exames de proficiência

### 4. 💬 Conversation (Conversação)

- Para quem já sabe inglês mas precisa de prática
- Melhoria de fluência e confiança

### 5. 🎯 Career (Carreira)

- Inglês para negócios adaptado à carreira
- Treinamento específico para avanço profissional

### 6. ⏰ Deadline (Prazo)

- Começar do zero com prazo apertado
- Cursos intensivos para iniciantes

### Parte 2: Promessa de Conquista

Seção com imagem e call-to-action que apresenta:

- **Título**: "We will help you achieve all your goals!" / "Nós vamos te ajudar a alcançar todos os seus objetivos!"
- **Descrição**: Texto explicativo sobre como o LondonLink ajuda em diferentes situações
- **Imagem**: Foto de estudante em Londres (goal-1.jpg)
- **Botão CTA**: "I want to enroll" / "Quero me inscrever" (link para WhatsApp)
- **Layout**: Texto alinhado ao topo para melhor hierarquia visual

## Design e Layout

- **Background**: Gradiente azul consistente com o tema LondonLink
- **Cards**: Grid responsivo (1 coluna mobile, 2 tablet, 3 desktop)
- **Estilo**: Cards escuros com bordas, efeitos hover e ícones estilizados
- **Ícones**: Frame de 60x60px com background cinza (#818181) e borda branca
- **Cores**: Títulos em amarelo, texto em cinza claro, ícones brancos
- **Layout Responsivo**:
  - **Mobile**: Ícone e texto lado a lado (flexbox horizontal com gap-6)
  - **Desktop**: Ícone acima do texto (layout vertical)
- **Acessibilidade**: Suporte completo a screen readers
- **Animações**: Hover effects nos cards com transições suaves

## Imagens e Ícones Necessários

Para que a seção funcione completamente, adicione os seguintes arquivos:

### Ícones SVG (Parte 1):

```
public/assets/images/goals/icons/
├── travel.svg       # Ícone de viagem/avião
├── business.svg     # Ícone de negócios/maleta
├── exam.svg         # Ícone de exame/certificado
├── conversation.svg # Ícone de conversação/balões
├── career.svg       # Ícone de carreira/gráfico
└── deadline.svg     # Ícone de prazo/relógio
```

### Imagens (Parte 2):

```
public/assets/images/goals/previews/
└── goal-1.jpg       # Foto do estudante em Londres
```

## Uso

```typescript
import { GoalsSection } from "@/domain/goals";

<GoalsSection currentLanguage={currentLanguage} />;
```

## Navegação

A seção está integrada ao menu de navegação principal:

- **Português**: "Objetivos"
- **Inglês**: "Goals"
- **ID da seção**: `#goals`

## Estilos CSS Customizados

A seção utiliza estilos específicos definidos em `src/pages/goals/styles/goals.css` seguindo os princípios do DDD:

```css
/* Variáveis específicas da seção Goals */
:root {
  --goals-card-icon-bg-color: #374151;
  --goals-card-borders-color: #4b5563;
  --goals-card-hover-border-color: #fbbf24;
}

/* Modo escuro */
.dark {
  --goals-card-icon-bg-color: #4b5563;
  --goals-card-borders-color: #6b7280;
}

/* Classe do frame dos ícones */
.goals-icon-frame {
  width: 50px;
  height: 50px;
  background-color: var(--goals-card-icon-bg-color);
  border-radius: 10px;
  border: 4px solid var(--goals-card-borders-color);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.goals-icon-frame:hover {
  transform: scale(1.05);
  border-color: var(--goals-card-hover-border-color);
}
```

### Arquitetura DDD dos Estilos

- **Isolamento**: Estilos específicos ficam dentro do domínio Goals
- **Reutilização**: Classes exportadas via `GOALS_STYLE_CLASSES`
- **Manutenibilidade**: Variáveis CSS organizadas por contexto
- **Escalabilidade**: Fácil adição de novos estilos sem afetar outros domínios

## Integração com WhatsApp

O botão CTA da segunda seção está integrado com o WhatsApp:

```typescript
import { CONTACT_INFO } from "@/domain/shared/constants/contacts";

// Botão que abre WhatsApp
<a
  href={CONTACT_INFO.phone.whatsappUrl}
  target="_blank"
  rel="noopener noreferrer"
>
  {t.section2.ctaButton}
</a>;
```

**Funcionalidades:**

- ✅ **Link direto** para WhatsApp (+55 81 99644-4501)
- ✅ **Nova aba** para não interromper navegação
- ✅ **Segurança** com `rel="noopener noreferrer"`
- ✅ **Acessibilidade** mantida com texto do botão

## Funcionalidades Implementadas

- ✅ **Grid responsivo** de cartões de objetivos
- ✅ **Efeitos hover** com escala e sombra
- ✅ **Ícones SVG** com frames estilizados e bordas
- ✅ **Traduções bilíngues** completas
- ✅ **Acessibilidade** com alt texts e ARIA labels
- ✅ **Design consistente** com o tema LondonLink
- ✅ **Variáveis CSS** para fácil customização
- ✅ **Suporte a modo escuro** com variáveis adaptáveis
- ✅ **Integração WhatsApp** no botão CTA
- ✅ **Layout otimizado** com texto alinhado ao topo

## Funcionalidades Futuras

Os hooks e tipos já estão preparados para futuras funcionalidades:

- Métricas em tempo real de interesse por objetivo
- Animações baseadas em scroll
- Links para páginas específicas de cada objetivo
- Formulário de contato integrado por objetivo
- Integração com analytics para tracking de cliques
