export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-600 dark:text-gray-300 text-lg font-bold drop-shadow-sm">
          © {currentYear} LondonLink.
        </p>
      </div>
    </footer>
  );
}
