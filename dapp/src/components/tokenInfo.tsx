export default function TokenInfo() {
  return (
    <section className="bg-white border border-gray-200 rounded-lg shadow p-4 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col gap-4 text-center">
        <header className="flex font-bold">
          <div className="flex-1">Name</div>
          <div className="flex-1">Symbol</div>
          <div className="flex-1">Supply</div>
        </header>
        <div className="flex">
          <div className="flex-1">Token</div>
          <div className="flex-1">CC</div>
          <div className="flex-1">100</div>
        </div>
      </div>
    </section>
  );
}
