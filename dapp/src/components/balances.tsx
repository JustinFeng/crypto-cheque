import Image from "next/image";

export default function Balances() {
  return (
    <section className="flex flex-col gap-4 flex-1">
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
  );
}
