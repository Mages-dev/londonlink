"use client";

import Image from "next/image";
import { getVersionString } from "@/lib/version";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const version = getVersionString();

  return (
    <footer className="mt-auto bg-gray-800 border-t border-gray-700 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="flex justify-center items-center">
          <a
            href="https://mages.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            <Image
              src="/assets/images/shared/logos/mages-dev-logo.webp"
              alt="Mages Dev Logo"
              width={138}
              height={46}
              className="drop-shadow-sm"
            />
          </a>
        </div>
        <div className="text-gray-400 text-md space-y-1">
          <p>© {currentYear} LondonLink. All rights reserved.</p>
          <p className="text-gray-500 text-sm">{version}</p>
        </div>
      </div>
    </footer>
  );
}
