"use client";

import Transfers from "@/components/transfers";
import Banner from "@/components/banner";
import Cheques from "@/components/cheques";
import Header from "@/components/header";
import dynamic from "next/dynamic";
import TokenInfo from "@/components/tokenInfo";
import {
  isRightNetwork,
  hasMetaMask,
  switchNetwork,
  listenToChainChanged,
} from "@/utils/provider";
import { useEffect } from "react";

function Home() {
  let mainContent;

  useEffect(() => {
    listenToChainChanged(() => {
      window.location.reload();
    });
  });

  if (!hasMetaMask()) {
    mainContent = (
      <Banner
        message="You need to have MetaMask to play with Crypto Cheque"
        linkText="MetaMask"
        linkHref="https://metamask.io/download/"
      ></Banner>
    );
  } else if (!isRightNetwork()) {
    const onClick = async () => {
      await switchNetwork();
      window.location.reload();
    };

    mainContent = (
      <Banner
        message="You need to switch to Sepolia test network to play with Crypto Cheque"
        linkText="Switch network"
        onClick={onClick}
      />
    );
  } else {
    mainContent = (
      <>
        <Header />
        <TokenInfo />
        <div className="flex gap-4">
          <Transfers />
          <Cheques />
        </div>
      </>
    );
  }

  return (
    <main className="flex min-h-screen flex-col p-10 gap-4">{mainContent}</main>
  );
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
