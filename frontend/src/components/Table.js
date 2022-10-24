import React from "react";

const Table = () => {
  return (
    //   IF NO DOMAIN HAS BEEN SEARCHED //
    //   <div className="grow space-y-10 self-center">
    //   <p class="mb-3 font-light text-gray-500 dark:text-gray-400">
    //     Discover your new decentralized name
    //   </p>
    // </div>
    // IF DOMAIN HAS BEEN SEARCHED //
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg mx-60">
      <table class="w-full max-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 pl-6">
              Domain name
            </th>
            <th scope="col" class="py-3 pr-6">
              Network
            </th>
            <th scope="col" class="py-3 px-6">
              Price
            </th>
            <th scope="col" class="">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th
              scope="row"
              class="py-4 pl-6 text-gray-900 whitespace-nowrap dark:text-white"
            >
              <span className="font-medium">hello</span>.eth
            </th>
            <td class="py-4 pr-6">Ethereum</td>
            <td class="py-4 px-6">$29</td>
            <td class="">
              <a
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Buy
              </a>
            </td>
          </tr>
          <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              class="py-4 pl-6 text-gray-900 whitespace-nowrap dark:text-white"
            >
              <span className="font-medium">hello</span>.bnb
            </th>
            <td class="py-4 pr-6">Binance Smart Chain</td>
            <td class="py-4 px-6">$19</td>
            <td class="">
              <a
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Buy
              </a>
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th
              scope="row"
              class="py-4 pl-6 text-gray-900 whitespace-nowrap dark:text-white"
            >
              <span className="font-medium">hello</span>.near
            </th>
            <td class="py-4 pr-6">Near</td>
            <td class="py-4 px-6">Free</td>
            <td class="">
              <a
                href="#"
                class="font-medium text-gray-300 dark:text-white hover:cursor-not-allowed"
              >
                Unavailable
              </a>
            </td>
          </tr>
          <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              class="py-4 pl-6 text-gray-900 whitespace-nowrap dark:text-white"
            >
              <span className="font-medium">hello</span>.sol
            </th>
            <td class="py-4 pr-6">Solana</td>
            <td class="py-4 px-6">$79</td>
            <td class="">
              <a
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Buy
              </a>
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              class="py-4 pl-6 text-gray-900 whitespace-nowrap dark:text-white"
            >
              <span className="font-medium">hello</span>.dot
            </th>
            <td class="py-4 pr-6">Polkadot</td>
            <td class="py-4 px-6">$13</td>
            <td class="">
              <a
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Buy
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
