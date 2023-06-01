export default function Header() {
  return (
    <header className="flex justify-between">
      <h1 className="text-2xl">Crypto Cheque</h1>
      <button className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Connect
      </button>
    </header>
  );
}
