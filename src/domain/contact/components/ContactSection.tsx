import { Language } from '@/types';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import { CONTACT_INFO } from '@/domain/shared/constants/contacts';
import { contactTranslations } from '@/domain/contact/translations';

interface ContactSectionProps {
  currentLanguage: Language;
}

export function ContactSection({ currentLanguage }: ContactSectionProps) {
  const t = contactTranslations[currentLanguage];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-bg-hero flex flex-col py-16"
    >
      <div className="flex flex-1 flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-16 text-center">
            <h2 id="contact-heading" className="mb-8 text-4xl font-bold text-white md:text-5xl">
              {t.title}
            </h2>
            <p className="mx-auto max-w-4xl text-xl text-gray-200">{t.description}</p>
          </div>

          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Google Maps Iframe */}
            <div className="w-full">
              <div className="overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-800">
                <iframe
                  src={CONTACT_INFO.address.googleMapsEmbedUrl}
                  width="100%"
                  height="600"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  title={t.mapTitle}
                  className="h-[600px] w-full"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="w-full">
              <div className="rounded-2xl bg-white p-6 shadow-2xl md:p-12 dark:bg-slate-800">
                <h3 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-left dark:text-white">
                  {t.getInTouch}
                </h3>

                <div className="space-y-10">
                  {/* WhatsApp */}
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <Image
                        src={CONTACT_INFO.icons.whatsapp}
                        alt="WhatsApp"
                        width={48}
                        height={48}
                        className="h-12 w-12"
                      />
                    </div>
                    <div>
                      <p className="mb-2 text-lg font-bold text-gray-900 md:text-xl dark:text-white">
                        {t.whatsapp}
                      </p>
                      <a
                        href={`${
                          CONTACT_INFO.phone.whatsappUrl
                        }?text=${encodeURIComponent(t.whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-semibold text-green-600 transition-colors hover:text-green-700 md:text-2xl dark:text-green-400 dark:hover:text-green-300"
                      >
                        {CONTACT_INFO.phone.formatted}
                      </a>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <Image
                        src={CONTACT_INFO.icons.instagram}
                        alt="Instagram"
                        width={48}
                        height={48}
                        className="h-12 w-12"
                      />
                    </div>
                    <div>
                      <p className="mb-2 text-lg font-bold text-gray-900 md:text-xl dark:text-white">
                        {t.instagram}
                      </p>
                      <a
                        href={CONTACT_INFO.social.instagram.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-semibold text-pink-600 transition-colors hover:text-pink-700 md:text-2xl dark:text-pink-400 dark:hover:text-pink-300"
                      >
                        {CONTACT_INFO.social.instagram.handle}
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start space-x-6">
                    <div className="mt-2 flex-shrink-0">
                      <MapPin aria-hidden="true" className="h-12 w-12 text-blue-600" />
                    </div>
                    <div>
                      <p className="mb-2 text-lg font-bold text-gray-900 md:text-xl dark:text-white">
                        {t.address}
                      </p>
                      <address className="text-lg leading-relaxed text-gray-600 not-italic md:text-xl dark:text-gray-300">
                        {CONTACT_INFO.address.street}
                        <br />
                        {CONTACT_INFO.address.city}
                      </address>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
