import React from "react";

import space_id from "../assets/space_id.png";
import unstoppable_domains from "../assets/unstoppable_domains.png";
import ens from "../assets/ens.png";
import near from "../assets/near_logo.png";
import pns from "../assets/pns.png";
import SearchSubmit from "../components/SearchSubmit";

export default function Home() {
  return (
    <div className="align-middle text-center text-banner -mt-12">
      <div className="h-screen flex ">
        <div className="grow space-y-12 self-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Discover your web3 identity
          </h1>
          <p class="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>

          <SearchSubmit home={true} />

          <h4 class="text-2xl font-bold dark:text-white pt-20 pb-8">
            Search for decentralized names with our verified integrations
          </h4>
          <div class="flex justify-evenly relative">
            <img class="h-12" src={pns} alt="image description" />
            <img
              class="h-11"
              src={unstoppable_domains}
              alt="image description"
            />
            <img class="h-7" src={space_id} alt="image description" />
            <img class="h-11 rounded-lg" src={ens} alt="image description" />
            <img class="h-10" src={near} alt="image description" />
          </div>
        </div>
      </div>
      <div className="flex bg-gray-900 text-white h-screen pt-20 pb-2">
        <div className="grow self-center">
          <h1 class="text-5xl font-extrabold dark:text-gray-900">
            Stress-free names, powered by denam
          </h1>
          <p class="mb-6 mt-6 text-lg font-extrabold  font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Put the power of denam behind your decentralized identity
          </p>
          <div class="flex justify-evenly m-20">
            <div className="p-8">
              <h3 class="text-3xl font-bold dark:text-white mb-2">
                Simplified Search
              </h3>
              <p class="mb-3 text-lg font-light text-gray-400 md:text-xl dark:text-gray-400">
                A Web3 domain uniquely represents your on-chain identity. We
                make it easy.
              </p>
            </div>
            <div class="p-8">
              <h3 class="text-3xl font-bold dark:text-white mb-2">
                Multichain Enabled
              </h3>
              <p class="mb-3 text-lg font-light text-gray-400 md:text-xl dark:text-gray-400">
                Whether that be Ethereum, Aptos, or Avalanche. We got your
                covered.
              </p>
            </div>
            <div class="p-8">
              <h3 class="text-3xl font-bold dark:text-white mb-2">
                Ecosystem Empowering
              </h3>
              <p class="mb-3 text-lg font-light text-gray-400 md:text-xl dark:text-gray-400">
                With 100+ of blockchains, join the ever-growing domain
                ecosystem.
              </p>
            </div>
          </div>
          <h3 class="text-3xl font-bold dark:text-white">
            Connecting your{" "}
            <mark class="px-1 text-gray-900 bg-white rounded dark:bg-gray-900 dark:text-white">
              web3 name
            </mark>
          </h3>
        </div>
      </div>
      {/* <div className="h-screen">
        <h2>No Token. No DAO. No Bullshit.</h2>
        <p>
          Searching for your new domain shouldn't incur additional charges. We
          believe in empowering users with their Web3 identitiy.
        </p>
      </div> */}
    </div>
  );
}
