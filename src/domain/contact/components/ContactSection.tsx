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
    <section id="contact" className="py-16 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Google Maps Iframe */}
          <div className="w-full">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden">
              <iframe
                src={CONTACT_INFO.address.googleMapsEmbedUrl}
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t.mapTitle}
                className="w-full h-[500px]"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="w-full">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                {t.getInTouch}
              </h3>

              <div className="space-y-6">
                {/* WhatsApp */}
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={CONTACT_INFO.icons.whatsapp}
                      alt="WhatsApp"
                      width={32}
                      height={32}
                      className="h-8 w-8"
                    />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {t.whatsapp}
                    </p>
                    <a
                      href={`${
                        CONTACT_INFO.phone.whatsappUrl
                      }?text=${encodeURIComponent(t.whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors font-medium"
                    >
                      {CONTACT_INFO.phone.formatted}
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={CONTACT_INFO.icons.instagram}
                      alt="Instagram"
                      width={32}
                      height={32}
                      className="h-8 w-8"
                    />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {t.instagram}
                    </p>
                    <a
                      href={CONTACT_INFO.social.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 transition-colors font-medium"
                    >
                      {CONTACT_INFO.social.instagram.handle}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <MapPin className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {t.address}
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
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
    </section>
  );
}
