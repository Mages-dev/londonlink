"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { CONTACT_INFO } from "@/domain/shared/constants/contacts";
import { contactTranslations } from "@/domain/contact/translations";
import "./WhatsAppFloat.css";

interface WhatsAppFloatProps {
  currentLanguage: "en" | "pt";
}

export function WhatsAppFloat({ currentLanguage }: WhatsAppFloatProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const contactT = contactTranslations[currentLanguage];

  // WhatsApp URL with message
  const whatsappUrl = `${
    CONTACT_INFO.phone.whatsappUrl
  }?text=${encodeURIComponent(contactT.whatsappMessage)}`;

  // Show button after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Show tooltip after button appears
  useEffect(() => {
    if (isVisible) {
      const tooltipTimer = setTimeout(() => {
        setShowTooltip(true);
        // Hide tooltip after 5 seconds
        setTimeout(() => setShowTooltip(false), 5000);
      }, 1000);

      return () => clearTimeout(tooltipTimer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="whatsapp-float">
      {/* Tooltip */}
      {showTooltip && (
        <div className="whatsapp-float__tooltip">
          {currentLanguage === "pt"
            ? "Fale conosco no WhatsApp!"
            : "Chat with us on WhatsApp!"}
          <button
            onClick={() => setShowTooltip(false)}
            className="whatsapp-float__tooltip-close"
          >
            <X size={14} />
          </button>
          {/* Arrow */}
          <div className="whatsapp-float__tooltip-arrow"></div>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float__button"
        aria-label={
          currentLanguage === "pt"
            ? "Contato via WhatsApp"
            : "Contact via WhatsApp"
        }
      >
        <Image
          src="/icons/whatsApp.svg"
          alt="WhatsApp"
          width={40}
          height={40}
          className="whatsapp-float__icon"
        />

        {/* Pulse animation */}
        <div className="whatsapp-float__pulse"></div>
      </a>
    </div>
  );
}
