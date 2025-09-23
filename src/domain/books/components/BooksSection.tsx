"use client";

import { Language } from "@/types";
import { OptimizedImage } from "@/domain/shared";
import { BOOKS_IMAGES, BOOKS_IMAGE_ALTS } from "../constants/images";

interface BooksSectionProps {
  currentLanguage: Language;
}

export function BooksSection({ currentLanguage }: BooksSectionProps) {
  return (
    <section id="books" className="relative overflow-hidden">
      {/* Uses parent background - no additional gradient needed */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <div className="lg:col-span-2 text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 lg:mb-6 leading-tight">
              {currentLanguage === "en"
                ? "Three Lions English"
                : "Three Lions English"}
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-blue-100 font-light">
              {currentLanguage === "en"
                ? "The trilogy is complete"
                : "A trilogia está completa"}
            </p>
          </div>

          {/* Right side - Books image (larger space) */}
          <div className="lg:col-span-3 relative flex justify-center">
            <div className="relative w-full max-w-2xl">
              {/* Main books image with frame effect - same style as author */}
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-2 shadow-2xl">
                <div className="relative border-4 border-red-500 rounded-xl overflow-hidden">
                  <OptimizedImage
                    src={BOOKS_IMAGES.previews.threeLionsTrilogy}
                    alt={BOOKS_IMAGE_ALTS.previews.threeLionsTrilogy}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Author Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 max-lg:px-[15%]">
        <div className="grid lg:grid-cols-[3fr_7fr] gap-8 lg:gap-16 items-center">
          {/* Left side - Author image */}
          <div className="relative w-full h-full">
            {/* Author image with decorative border - reduced size */}
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-2 shadow-2xl w-full h-full max-lg:w-[65%] max-lg:mx-auto">
              <div className="relative border-4 border-red-500 rounded-xl overflow-hidden w-full h-full">
                <OptimizedImage
                  src={BOOKS_IMAGES.previews.author}
                  alt={BOOKS_IMAGE_ALTS.previews.author}
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right side - Author story text */}
          <div className="space-y-6 text-white">
            <p className="text-lg md:text-xl leading-relaxed">
              {currentLanguage === "en" ? (
                <>
                  While working as a coordinator at an English school in Recife,
                  I noticed that the textbooks provided to teach our students
                  weren&apos;t making our lives as teachers easier.
                </>
              ) : (
                <>
                  Enquanto trabalhava como coordenador em uma escola de inglês
                  no Recife, percebi que os livros didáticos fornecidos para
                  ensinar nossos alunos não estavam facilitando nossas vidas
                  como professores.
                </>
              )}
            </p>

            <p className="text-lg md:text-xl leading-relaxed">
              {currentLanguage === "en" ? (
                <>
                  The dialogues or &lsquo;stories&rsquo; used to demonstrate
                  grammar areas were
                  <span className="text-yellow-300 font-semibold">
                    {" "}
                    very boring
                  </span>
                  , and often the language didn&apos;t reflect how we actually
                  <span className="text-yellow-300 font-semibold">
                    {" "}
                    speak
                  </span>{" "}
                  English. The exercises were repetitive and didn&apos;t
                  challenge
                  <span className="text-yellow-300 font-semibold">
                    {" "}
                    students
                  </span>{" "}
                  in any way.
                </>
              ) : (
                <>
                  Os diálogos ou &lsquo;histórias&rsquo; usados para demonstrar
                  áreas gramaticais eram
                  <span className="text-yellow-300 font-semibold">
                    {" "}
                    muito chatos
                  </span>
                  , e frequentemente a linguagem não refletia como realmente
                  <span className="text-yellow-300 font-semibold">
                    {" "}
                    falamos
                  </span>{" "}
                  inglês. Os exercícios eram repetitivos e não desafiavam os
                  <span className="text-yellow-300 font-semibold">
                    {" "}
                    alunos
                  </span>{" "}
                  de forma alguma.
                </>
              )}
            </p>

            <p className="text-lg md:text-xl leading-relaxed">
              {currentLanguage === "en" ? (
                <>
                  When I shared my concerns with the owner, he said &lsquo;Do
                  you think
                  <span className="text-yellow-300 font-semibold">
                    {" "}
                    you could write something better?
                  </span>
                  &rsquo;. I think he was surprised when I
                  <span className="text-yellow-300 font-semibold">
                    {" "}
                    said yes
                  </span>
                  , but he asked me to do exactly that – but in the same format
                  <span className="text-yellow-300 font-semibold">
                    {" "}
                    as the old books
                  </span>
                  .
                </>
              ) : (
                <>
                  Quando compartilhei minhas preocupações com o proprietário,
                  ele disse &lsquo;Você acha que
                  <span className="text-yellow-300 font-semibold">
                    {" "}
                    poderia escrever algo melhor?
                  </span>
                  &rsquo;. Acho que ele ficou surpreso quando eu
                  <span className="text-yellow-300 font-semibold">
                    {" "}
                    disse que sim
                  </span>
                  , mas ele me pediu para fazer exatamente isso – mas no mesmo
                  formato
                  <span className="text-yellow-300 font-semibold">
                    {" "}
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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left side - Students story text */}
          <div className="text-left">
            <div className="space-y-6 text-white">
              <p className="text-lg md:text-xl leading-relaxed">
                {currentLanguage === "en" ? (
                  <>
                    So when I stopped working for other schools and started my
                    own –
                    <span className="text-yellow-300 font-semibold">
                      {" "}
                      LondonLink
                    </span>{" "}
                    – it seemed like a natural progression to write a new set of
                    books, but using my own formulas based on the teaching
                    experiences and methods I&apos;d cultivated during my years
                    teaching in
                    <span className="text-yellow-300 font-semibold">
                      {" "}
                      Minas Gerais, Brasília and Recife
                    </span>
                    .
                  </>
                ) : (
                  <>
                    Então, quando parei de trabalhar para outras escolas e
                    comecei a minha própria –
                    <span className="text-yellow-300 font-semibold">
                      {" "}
                      LondonLink
                    </span>{" "}
                    – parecia uma progressão natural escrever um novo conjunto
                    de livros, mas usando minhas próprias fórmulas baseadas nas
                    experiências de ensino e métodos que cultivei durante meus
                    anos ensinando em
                    <span className="text-yellow-300 font-semibold">
                      {" "}
                      Minas Gerais, Brasília e Recife
                    </span>
                    .
                  </>
                )}
              </p>

              <p className="text-lg md:text-xl leading-relaxed">
                {currentLanguage === "en" ? (
                  <>
                    They&apos;re designed to be used not just by
                    <span className="text-yellow-300 font-semibold">
                      {" "}
                      beginners
                    </span>
                    , but also by students with greater English understanding
                    who need to
                    <span className="text-yellow-300 font-semibold">
                      {" "}
                      review the basics
                    </span>{" "}
                    to further improve their fluency at a
                    <span className="text-yellow-300 font-semibold">
                      {" "}
                      higher level
                    </span>
                    .
                  </>
                ) : (
                  <>
                    Eles foram projetados para serem usados não apenas por
                    <span className="text-yellow-300 font-semibold">
                      {" "}
                      iniciantes
                    </span>
                    , mas também por alunos com maior compreensão do inglês que
                    precisam
                    <span className="text-yellow-300 font-semibold">
                      {" "}
                      revisar o básico
                    </span>{" "}
                    para melhorar ainda mais sua fluência em um
                    <span className="text-yellow-300 font-semibold">
                      {" "}
                      nível mais alto
                    </span>
                    .
                  </>
                )}
              </p>

              <p className="text-lg md:text-xl leading-relaxed">
                {currentLanguage === "en" ? (
                  <>
                    I called the 3 books &lsquo;
                    <span className="text-yellow-300 font-semibold">
                      Three Lions English
                    </span>
                    &rsquo; – based on the emblem used by the
                    <span className="text-yellow-300 font-semibold">
                      {" "}
                      English football team
                    </span>
                    .
                  </>
                ) : (
                  <>
                    Chamei os 3 livros de &lsquo;
                    <span className="text-yellow-300 font-semibold">
                      Three Lions English
                    </span>
                    &rsquo; – baseado no emblema usado pela
                    <span className="text-yellow-300 font-semibold">
                      {" "}
                      seleção inglesa de futebol
                    </span>
                    .
                  </>
                )}
              </p>

              <p className="text-lg md:text-xl leading-relaxed">
                {currentLanguage === "en" ? (
                  <>
                    Since then, the books have been taught daily to a
                    <span className="text-yellow-300 font-semibold">
                      {" "}
                      wide variety of students
                    </span>{" "}
                    by a diverse team of
                    <span className="text-yellow-300 font-semibold">
                      {" "}
                      brilliant teachers
                    </span>{" "}
                    who provide feedback and monitor student progress. This has
                    allowed me to make
                    <span className="text-yellow-300 font-semibold">
                      {" "}
                      small changes and improvements
                    </span>{" "}
                    when needed over time. After many years, I believe we
                    finally have the
                    <span className="text-yellow-300 font-semibold">
                      {" "}
                      finished product
                    </span>
                    .
                  </>
                ) : (
                  <>
                    Desde então, os livros têm sido ensinados diariamente para
                    uma
                    <span className="text-yellow-300 font-semibold">
                      {" "}
                      grande variedade de alunos
                    </span>{" "}
                    por uma equipe diversa de
                    <span className="text-yellow-300 font-semibold">
                      {" "}
                      professores brilhantes
                    </span>{" "}
                    que fornecem feedback e monitoram o progresso dos alunos.
                    Isso me permitiu fazer
                    <span className="text-yellow-300 font-semibold">
                      {" "}
                      pequenas mudanças e melhorias
                    </span>{" "}
                    quando necessário ao longo do tempo. Após muitos anos,
                    acredito que finalmente temos o
                    <span className="text-yellow-300 font-semibold">
                      {" "}
                      produto finalizado
                    </span>
                    .
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Right side - Students image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Students image with decorative border */}
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-2 shadow-2xl">
                <div className="relative border-4 border-red-500 rounded-xl overflow-hidden">
                  <OptimizedImage
                    src={BOOKS_IMAGES.previews.students}
                    alt={BOOKS_IMAGE_ALTS.previews.students}
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
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
