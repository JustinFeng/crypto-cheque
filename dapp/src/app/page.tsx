'use client';

import Balances from "@/components/balances";
import Cheques from "@/components/cheques";
import Header from "@/components/header";
import TokenInfo from "@/components/tokenInfo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-10 gap-4">
      <Header />
      <TokenInfo />
      <div className="flex gap-4">
        <Balances />
        <Cheques />
      </div>
    </main>
  );
}
