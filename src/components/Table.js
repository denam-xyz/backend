import React from "react";

const Table = ({ tableData }) => {
  console.log(tableData, "what is tabledata+");
  const renderRows = () => {
    let rows = [];
    if (tableData && tableData.length > 0) {
      rows = tableData.map((item, index) => {
        console.log(item.domain.split("."), "ITEM.DOMAIN");
        let domainName = item.domain.split(".");
        return (
          <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th
              scope="row"
              class="py-4 pl-6 text-gray-900 whitespace-nowrap dark:text-white"
            >
              <span className="font-medium">{domainName[0]}</span>.
              {domainName[1]}
            </th>
            <td class="py-4 pr-6">Ethereum</td>
            <td class="py-4 px-6">
              {Object.keys(item.records).length > 0 ? "NO" : "YES"}
            </td>
            <td class="">
              {Object.keys(item.records).length > 0 ? (
                <td class="py-4 pr-6">NOT AVAILABLE</td>
              ) : (
                <a
                  href={`https://unstoppabledomains.com/search?searchTerm=${item.domain}&searchRef=home&tab=relevant`}
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  BUY
                </a>
              )}
            </td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td colSpan="3">No data available</td>
        </tr>
      );
    }
    return rows;
  };

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
              Available
            </th>
            <th scope="col" class="">
              Action
            </th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default Table;
