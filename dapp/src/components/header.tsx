import { connect } from "@/utils/provider";
import { useState } from "react";

export default function Header() {
  const [address, setAddress] = useState("");

  const onClick = async () => {
    const account = await connect();
    setAddress(account.slice(-7));
  };

  return (
    <header className="flex justify-between">
      <h1 className="text-2xl">Crypto Cheque</h1>
      {address ? (
        <div className="bg-white border border-gray-200 rounded-lg shadow py-1 px-2 dark:bg-gray-800 dark:border-gray-700">
          <span className="text-green-400 mr-2">●</span>
          {address}
        </div>
      ) : (
        <button
          onClick={onClick}
          className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Connect
        </button>
      )}
    </header>
  );
}
