import Image from "next/image";

export function Footer() {
  return (
    <footer className="mt-auto bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center items-center">
          <Image
            src="/assets/images/shared/logos/mages-dev-logo.webp"
            alt="Mages Dev Logo"
            width={138}
            height={46}
            className="drop-shadow-sm"
          />
        </div>
      </div>
    </footer>
  );
}
