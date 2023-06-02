import { tokenDetails } from "@/utils/provider";
import { useEffect, useState } from "react";

export default function TokenInfo() {
  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [totalSupply, setTotalSupply] = useState("")
  
  useEffect(() => {
    async function loadTokenInfo() {
      const { name, symbol, totalSupply} = await tokenDetails()
      setName(name)
      setSymbol(symbol)
      setTotalSupply(String(totalSupply))
    }

    loadTokenInfo();
  }, []);

  return (
    <section className="bg-white border border-gray-200 rounded-lg shadow p-4 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col gap-4 text-center">
        <header className="flex font-bold">
          <div className="flex-1">Name</div>
          <div className="flex-1">Symbol</div>
          <div className="flex-1">Total Supply</div>
        </header>
        <div className="flex">
          <div className="flex-1">{name}</div>
          <div className="flex-1">{symbol}</div>
          <div className="flex-1">{totalSupply}</div>
        </div>
      </div>
    </section>
  );
}
