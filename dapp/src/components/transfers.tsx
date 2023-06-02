import { listenToTransferEvent } from "@/utils/provider";
import { useEffect, useState } from "react";

export interface Transfer {
  from: string;
  to: string;
  amount: string;
  id: string;
}

export default function Transfers() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!listening) {
      listenToTransferEvent(
        (from: string, to: string, amount: number, id: string) => {
          setTransfers((ts) => [
            { from, to, amount: String(amount), id },
            ...ts,
          ]);
        }
      );
      setListening(true);
    }
  }, [listening]);

  return (
    <section className="flex flex-col gap-4 flex-1">
      <h2>Transfers</h2>

      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                From
              </th>
              <th scope="col" className="px-6 py-3">
                To
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((t) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  key={t.id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {t.from}
                  </th>
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {t.to}
                  </td>
                  <td className="px-6 py-4 flex gap-1">
                    <span>{t.amount}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
