import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-10 gap-4">
      <header className="flex justify-between">
        <h1 className="text-2xl">Crypto Cheque</h1>
        <button className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Connect
        </button>
      </header>
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

      <div className="flex gap-4">
        <section className="flex flex-col gap-4">
          <h2>Balances</h2>

          <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Balance
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    0xae749AE248d9c7014b6a2E951542cdAa619e14C1
                  </th>
                  <td className="px-6 py-4">1,000,000,000,000,000,000</td>
                  <td className="px-6 py-4 flex gap-1">
                    <Image
                      src="/images/arrowupgreen.svg"
                      height={12}
                      width={12}
                      alt="up"
                    />
                    <span>50</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="flex-1 bg-white border border-gray-200 rounded-lg shadow p-4 dark:bg-gray-800 dark:border-gray-700">
          <h2>Sign & deposit cheque</h2>
        </section>
      </div>
    </main>
  );
}
