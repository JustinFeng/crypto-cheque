import { MouseEventHandler } from "react";

interface Props {
  message: string;
  linkText: string;
  linkHref?: string;
  onClick?: MouseEventHandler;
}

export default function Banner({
  message,
  linkText,
  linkHref = "#",
  onClick,
}: Props) {
  return (
    <div
      id="marketing-banner"
      tabIndex={-1}
      className="fixed z-50 flex flex-col md:flex-row justify-between w-[calc(100%-2rem)] p-4 -translate-x-1/2 bg-white border border-gray-100 rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-6 dark:bg-gray-700 dark:border-gray-600"
    >
      <div className="flex flex-col items-start mb-3 mr-4 md:items-center md:flex-row md:mb-0">
        <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
          {message}
        </p>
      </div>
      <div className="flex items-center flex-shrink-0">
        <a
          onClick={onClick}
          href={linkHref}
          className="px-5 py-2 mr-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {linkText}
        </a>
      </div>
    </div>
  );
}
