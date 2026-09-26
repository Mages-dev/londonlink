'use client';

import { Language } from '@/types';
import { OptimizedImage } from '@/domain/shared';
import { BOOKS_IMAGES, BOOKS_IMAGE_ALTS } from '../constants/images';

interface BooksSectionProps {
  currentLanguage: Language;
}

export function BooksSection({ currentLanguage }: BooksSectionProps) {
  return (
    <section
      id="books"
      aria-labelledby="books-heading"
      className="section-bg-contact relative overflow-hidden"
    >
      {/* Uses parent background - no additional gradient needed */}

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Left side - Text content */}
          <div className="text-center lg:col-span-2">
            <h2
              id="books-heading"
              className="mb-4 text-3xl leading-tight font-bold text-gray-900 md:text-4xl lg:mb-6 lg:text-5xl xl:text-6xl dark:text-white"
            >
              {currentLanguage === 'en' ? 'Three Lions English' : 'Three Lions English'}
            </h2>
            <p className="text-lg font-light text-gray-700 md:text-xl lg:text-2xl dark:text-blue-100">
              {currentLanguage === 'en' ? 'The trilogy is complete' : 'A trilogia está completa'}
            </p>
          </div>

          {/* Right side - Books image (larger space) */}
          <div className="relative flex justify-center lg:col-span-3">
            <div className="relative w-full max-w-2xl">
              {/* Main books image with frame effect - same style as author */}
              <div className="relative rounded-2xl bg-white/10 p-2 shadow-2xl backdrop-blur-sm">
                <div className="relative overflow-hidden rounded-xl border-4 border-red-500">
                  <OptimizedImage
                    src={BOOKS_IMAGES.previews.threeLionsTrilogy}
                    alt={BOOKS_IMAGE_ALTS.previews.threeLionsTrilogy}
                    width={800}
                    height={600}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Author Section */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-12">
        <div className="grid items-center gap-8 lg:grid-cols-[4fr_6fr] lg:gap-16">
          {/* Left side - Author image */}
          <div className="relative w-full">
            {/* Author image with decorative border - reduced size */}
            <div className="relative w-full rounded-2xl bg-white/10 p-2 shadow-2xl backdrop-blur-sm max-lg:mx-auto max-lg:w-[65%]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border-4 border-red-500">
                <OptimizedImage
                  src={BOOKS_IMAGES.previews.author}
                  alt={BOOKS_IMAGE_ALTS.previews.author}
                  width={400}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right side - Author story text */}
          <div className="space-y-6 text-gray-900 dark:text-white">
            <p className="text-lg leading-relaxed md:text-xl">
              {currentLanguage === 'en' ? (
                <>
                  While working as a coordinator at an English school in Recife, I noticed that the
                  textbooks provided to teach our students weren&apos;t making our lives as teachers
                  easier.
                </>
              ) : (
                <>
                  Enquanto trabalhava como coordenador em uma escola de inglês no Recife, percebi
                  que os livros didáticos fornecidos para ensinar nossos alunos não estavam
                  facilitando nossas vidas como professores.
                </>
              )}
            </p>

            <p className="text-lg leading-relaxed md:text-xl">
              {currentLanguage === 'en' ? (
                <>
                  The dialogues or &lsquo;stories&rsquo; used to demonstrate grammar areas were
                  <span className="font-semibold text-amber-700 dark:text-yellow-300">
                    {' '}
                    very boring
                  </span>
                  , and often the language didn&apos;t reflect how we actually
                  <span className="font-semibold text-amber-700 dark:text-yellow-300">
                    {' '}
                    speak
                  </span>{' '}
                  English. The exercises were repetitive and didn&apos;t challenge
                  <span className="font-semibold text-amber-700 dark:text-yellow-300">
                    {' '}
                    students
                  </span>{' '}
                  in any way.
                </>
              ) : (
                <>
                  Os diálogos ou &lsquo;histórias&rsquo; usados para demonstrar áreas gramaticais
                  eram
                  <span className="font-semibold text-amber-700 dark:text-yellow-300">
                    {' '}
                    muito chatos
                  </span>
                  , e frequentemente a linguagem não refletia como realmente
                  <span className="font-semibold text-amber-700 dark:text-yellow-300">
                    {' '}
                    falamos
                  </span>{' '}
                  inglês. Os exercícios eram repetitivos e não desafiavam os
                  <span className="font-semibold text-amber-700 dark:text-yellow-300">
                    {' '}
                    alunos
                  </span>{' '}
                  de forma alguma.
                </>
              )}
            </p>

            <p className="text-lg leading-relaxed md:text-xl">
              {currentLanguage === 'en' ? (
                <>
                  When I shared my concerns with the owner, he said &lsquo;Do you think
                  <span className="font-semibold text-amber-700 dark:text-yellow-300">
                    {' '}
                    you could write something better?
                  </span>
                  &rsquo;. I think he was surprised when I
                  <span className="font-semibold text-amber-700 dark:text-yellow-300">
                    {' '}
                    said yes
                  </span>
                  , but he asked me to do exactly that – but in the same format
                  <span className="font-semibold text-amber-700 dark:text-yellow-300">
                    {' '}
                    as the old books
                  </span>
                  .
                </>
              ) : (
                <>
                  Quando compartilhei minhas preocupações com o proprietário, ele disse &lsquo;Você
                  acha que
                  <span className="font-semibold text-amber-700 dark:text-yellow-300">
                    {' '}
                    poderia escrever algo melhor?
                  </span>
                  &rsquo;. Acho que ele ficou surpreso quando eu
                  <span className="font-semibold text-amber-700 dark:text-yellow-300">
                    {' '}
                    disse que sim
                  </span>
                  , mas ele me pediu para fazer exatamente isso – mas no mesmo formato
                  <span className="font-semibold text-amber-700 dark:text-yellow-300">
                    {' '}
                    dos livros antigos
                  </span>
                  .
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Students Section */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[6fr_4fr] lg:gap-16">
          {/* Left side - Students story text */}
          <div className="order-2 text-left lg:order-1">
            <div className="space-y-6 text-gray-900 dark:text-white">
              <p className="text-lg leading-relaxed md:text-xl">
                {currentLanguage === 'en' ? (
                  <>
                    So when I stopped working for other schools and started my own –
                    <span className="font-semibold text-amber-700 dark:text-yellow-300">
                      {' '}
                      LondonLink
                    </span>{' '}
                    – it seemed like a natural progression to write a new set of books, but using my
                    own formulas based on the teaching experiences and methods I&apos;d cultivated
                    during my years teaching in
                    <span className="font-semibold text-amber-700 dark:text-yellow-300">
                      {' '}
                      Minas Gerais, Brasília and Recife
                    </span>
                    .
                  </>
                ) : (
                  <>
                    Então, quando parei de trabalhar para outras escolas e comecei a minha própria –
                    <span className="font-semibold text-amber-700 dark:text-yellow-300">
                      {' '}
                      LondonLink
                    </span>{' '}
                    – parecia uma progressão natural escrever um novo conjunto de livros, mas usando
                    minhas próprias fórmulas baseadas nas experiências de ensino e métodos que
                    cultivei durante meus anos ensinando em
                    <span className="font-semibold text-amber-700 dark:text-yellow-300">
                      {' '}
                      Minas Gerais, Brasília e Recife
                    </span>
                    .
                  </>
                )}
              </p>

              <p className="text-lg leading-relaxed md:text-xl">
                {currentLanguage === 'en' ? (
                  <>
                    They&apos;re designed to be used not just by
                    <span className="font-semibold text-amber-700 dark:text-yellow-300">
                      {' '}
                      beginners
                    </span>
                    , but also by students with greater English understanding who need to
                    <span className="font-semibold text-amber-700 dark:text-yellow-300">
                      {' '}
                      review the basics
                    </span>{' '}
                    to further improve their fluency at a
                    <span className="font-semibold text-amber-700 dark:text-yellow-300">
                      {' '}
                      higher level
                    </span>
                    .
                  </>
                ) : (
                  <>
                    Eles foram projetados para serem usados não apenas por
                    <span className="font-semibold text-amber-700 dark:text-yellow-300">
                      {' '}
                      iniciantes
                    </span>
                    , mas também por alunos com maior compreensão do inglês que precisam
                    <span className="font-semibold text-amber-700 dark:text-yellow-300">
                      {' '}
                      revisar o básico
                    </span>{' '}
                    para melhorar ainda mais sua fluência em um
                    <span className="font-semibold text-amber-700 dark:text-yellow-300">
                      {' '}
                      nível mais alto
                    </span>
                    .
                  </>
                )}
              </p>

              <p className="text-lg leading-relaxed md:text-xl">
                {currentLanguage === 'en' ? (
                  <>
                    I called the 3 books &lsquo;
                    <span className="font-semibold text-amber-700 dark:text-yellow-300">
                      Three Lions English
                    </span>
                    &rsquo; – based on the emblem used by the
                    <span className="font-semibold text-amber-700 dark:text-yellow-300">
                      {' '}
                      English football team
                    </span>
                    .
                  </>
                ) : (
                  <>
                    Chamei os 3 livros de &lsquo;
                    <span className="font-semibold text-amber-700 dark:text-yellow-300">
                      Three Lions English
                    </span>
                    &rsquo; – baseado no emblema usado pela
                    <span className="font-semibold text-amber-700 dark:text-yellow-300">
                      {' '}
                      seleção inglesa de futebol
                    </span>
                    .
                  </>
                )}
              </p>

              <p className="text-lg leading-relaxed md:text-xl">
                {currentLanguage === 'en' ? (
                  <>
                    Since then, the books have been taught daily to a
                    <span className="font-semibold text-amber-700 dark:text-yellow-300">
                      {' '}
                      wide variety of students
                    </span>{' '}
                    by a diverse team of
                    <span className="font-semibold text-amber-700 dark:text-yellow-300">
                      {' '}
                      brilliant teachers
                    </span>{' '}
                    who provide feedback and monitor student progress. This has allowed me to make
                    <span className="font-semibold text-amber-700 dark:text-yellow-300">
                      {' '}
                      small changes and improvements
                    </span>{' '}
                    when needed over time. After many years, I believe we finally have the
                    <span className="font-semibold text-amber-700 dark:text-yellow-300">
                      {' '}
                      finished product
                    </span>
                    .
                  </>
                ) : (
                  <>
                    Desde então, os livros têm sido ensinados diariamente para uma
                    <span className="font-semibold text-amber-700 dark:text-yellow-300">
                      {' '}
                      grande variedade de alunos
                    </span>{' '}
                    por uma equipe diversa de
                    <span className="font-semibold text-amber-700 dark:text-yellow-300">
                      {' '}
                      professores brilhantes
                    </span>{' '}
                    que fornecem feedback e monitoram o progresso dos alunos. Isso me permitiu fazer
                    <span className="font-semibold text-amber-700 dark:text-yellow-300">
                      {' '}
                      pequenas mudanças e melhorias
                    </span>{' '}
                    quando necessário ao longo do tempo. Após muitos anos, acredito que finalmente
                    temos o
                    <span className="font-semibold text-amber-700 dark:text-yellow-300">
                      {' '}
                      produto finalizado
                    </span>
                    .
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Right side - Students image */}
          <div className="relative order-1 h-full w-full lg:order-2">
            <div className="relative">
              {/* Students image with decorative border */}
              <div className="relative rounded-2xl bg-white/10 p-2 shadow-2xl backdrop-blur-sm max-lg:mx-auto max-lg:w-[65%]">
                <div className="relative overflow-hidden rounded-xl border-4 border-red-500">
                  <OptimizedImage
                    src={BOOKS_IMAGES.previews.students}
                    alt={BOOKS_IMAGE_ALTS.previews.students}
                    width={400}
                    height={500}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
