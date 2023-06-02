import {useEffect, useState} from "react";

export default function SignChequeForm() {
  const [chequeId, setChequeId] = useState('');
  const [amount, setAmount] = useState('');
  const [expireAt, setExpireAt] = useState('');
  const [cryptoCheque, setCryptoCheque] = useState('');

  useEffect(() => {
    setCryptoCheque(JSON.stringify({
      chequeId,
      amount,
      expireAt: (new Date(expireAt)).getTime() / 1000,
    }, null, 2));
  }, [chequeId, amount, expireAt])

  return (
    <form>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="chequeId"
          id="chequeId"
          value={chequeId}
          onChange={e => {
            setChequeId(e.target.value);
          }}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="chequeId"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Cheque ID
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="number"
          name="amount"
          id="amount"
          value={amount}
          onChange={e => {
            setAmount(e.target.value);
          }}
          min="1"
          step="1"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="amount"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Amount
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="date"
          name="expireAt"
          id="expireAt"
          value={expireAt}
          onChange={e => {
            setExpireAt(e.target.value);
          }}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="expireAt"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Expiry Date
        </label>
      </div>
      <button
        type="submit"
        className="mb-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Sign
      </button>
      <div className="relative z-0 w-full mb-6 group">
        <label
          htmlFor="cryptoCheque"
          className="text-sm text-gray-500 dark:text-gray-400 -z-10 origin-[0]"
        >
          Crypto Cheque
        </label>
        <textarea
          name="cryptoCheque"
          id="cryptoCheque"
          value={cryptoCheque}
          onChange={e => {
            setCryptoCheque(e.target.value);
          }}
          rows={8}
          readOnly
          className="mt-2 block p-4 w-full text-sm text-gray-900 bg-transparent border-gray-300 dark:text-white dark:border-gray-600 border rounded-lg shadow dark:bg-gray-800"
          placeholder=" "
        />
      </div>
    </form>
  );
}
