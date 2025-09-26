import { Language } from "@/types";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { CONTACT_INFO } from "@/domain/shared/constants/contacts";
import { contactTranslations } from "@/domain/contact/translations";

interface ContactSectionProps {
  currentLanguage: Language;
}

export function ContactSection({ currentLanguage }: ContactSectionProps) {
  const t = contactTranslations[currentLanguage];

  return (
    <section id="contact" className="section-bg-hero py-16 flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              {t.title}
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto">
              {t.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Google Maps Iframe */}
            <div className="w-full">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                <iframe
                  src={CONTACT_INFO.address.googleMapsEmbedUrl}
                  width="100%"
                  height="600"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t.mapTitle}
                  className="w-full h-[600px]"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="w-full">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-12">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
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
                      <p className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {t.whatsapp}
                      </p>
                      <a
                        href={`${
                          CONTACT_INFO.phone.whatsappUrl
                        }?text=${encodeURIComponent(t.whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors font-semibold"
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
                      <p className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {t.instagram}
                      </p>
                      <a
                        href={CONTACT_INFO.social.instagram.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 transition-colors font-semibold"
                      >
                        {CONTACT_INFO.social.instagram.handle}
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0 mt-2">
                      <MapPin className="h-12 w-12 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {t.address}
                      </p>
                      <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        {CONTACT_INFO.address.street}
                        <br />
                        {CONTACT_INFO.address.city}
                      </p>
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
