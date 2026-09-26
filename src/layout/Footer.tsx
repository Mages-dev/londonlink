'use client';

import Image from 'next/image';
import { getVersionString } from '@/lib/version';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const version = getVersionString();

  return (
    <footer className="mt-auto border-t border-gray-700 bg-gray-800 py-8">
      <div className="mx-auto max-w-7xl space-y-3 px-4 text-center sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <a
            href="https://mages.dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mages Dev (opens in a new tab)"
            className="transition-opacity hover:opacity-80"
          >
            <Image
              src="/assets/images/shared/logos/mages-dev-logo.webp"
              alt="Mages Dev"
              width={138}
              height={32}
              className="drop-shadow-sm"
              style={{ height: 'auto' }}
            />
          </a>
        </div>
        <div className="text-md space-y-1 text-gray-400">
          <p>© {currentYear} LondonLink. All rights reserved.</p>
          <p className="text-sm text-gray-400">{version}</p>
        </div>
      </div>
    </footer>
  );
}
