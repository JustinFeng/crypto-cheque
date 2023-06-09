import { SyntheticEvent, useState } from "react";
import DepositChequeForm from "./depositChequeForm";
import SignChequeForm from "./signChequeForm";
import { depositCheque, signCheque } from "@/utils/provider";

export default function Cheques() {
  const [isSignTab, setIsSignTab] = useState(true);

  const [chequeId, setChequeId] = useState("");
  const [amount, setAmount] = useState("");
  const [expireAt, setExpireAt] = useState("");
  const [cryptoCheque, setCryptoCheque] = useState("");

  const onSign = async (e: SyntheticEvent) => {
    e.preventDefault();

    const expireAtTimestamp = new Date(expireAt).getTime() / 1000;
    const cryptoCheque = await signCheque(chequeId, amount, expireAtTimestamp);

    setCryptoCheque(JSON.stringify(cryptoCheque, null, 2));
  };

  const onDeposit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await depositCheque(JSON.parse(cryptoCheque));
  };

  const onSignTabClick = () => setIsSignTab(true);
  const onDepositTabClick = () => setIsSignTab(false);

  let form;
  if (isSignTab) {
    const props = {
      chequeId,
      amount,
      expireAt,
      cryptoCheque,
      setChequeId,
      setAmount,
      setExpireAt,
      onSign,
    };
    form = <SignChequeForm {...props} />;
  } else {
    const props = {
      cryptoCheque,
      setCryptoCheque,
      onDeposit,
    };
    form = <DepositChequeForm {...props} />;
  }

  return (
    <section className="flex flex-col gap-4 flex-1">
      <h2>Sign & Deposit</h2>

      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px justify-evenly">
            <li className="mr-2">
              <a
                onClick={onSignTabClick}
                className={`${
                  isSignTab
                    ? "active border-transparent text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                    : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 hover:border-b-2"
                } inline-block p-4 rounded-t-lg cursor-pointer`}
              >
                Sign Cheque
              </a>
            </li>
            <li className="mr-2">
              <a
                onClick={onDepositTabClick}
                className={`${
                  isSignTab
                    ? "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 hover:border-b-2"
                    : "active border-transparent text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                } inline-block p-4 rounded-t-lg cursor-pointer`}
              >
                Deposit Cheque
              </a>
            </li>
          </ul>
        </div>

        <div className="p-4">{form}</div>
      </div>
    </section>
  );
}
