import React from "react";

const fetchHttpLink = (item) => {
  switch (item.protocol) {
    case "ens":
      return `https://app.ens.domains/name/${item.domain}/register`;
    case "ud":
      return `https://unstoppabledomains.com/search?searchTerm=${item.domain}&searchRef=home&tab=relevant`;
    case "sid":
      return `https://app.space.id/name/${item.domain}/register`;
    case "apt":
      return `https://www.aptosnames.com/name/${item.domain}`;
    case "stacks":
      return "https://stx.name/";
  }
};

const Table = ({ tableData }) => {
  const renderRows = () => {
    let rows = [];
    if (tableData && tableData.length > 0) {
      rows = tableData.map((item, index) => {
        let domainName = item.domain.split(".");
        return (
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th
              scope="row"
              className="py-6 pl-6 text-gray-900 whitespace-nowrap dark:text-white"
            >
              <span className="font-medium">{domainName[0]}</span>.
              {domainName[1]}
            </th>
            <td className="">Ethereum</td>
            <td className="text-right pr-6">
              {Object.keys(item.records).length > 0 ? (
                <button
                  type="button"
                  className="text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 "
                  disabled
                >
                  Unavailable
                </button>
              ) : (
                <a href={fetchHttpLink(item)} target="_blank" rel="noreferrer">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Buy now
                    <svg
                      aria-hidden="true"
                      className="ml-2 -mr-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
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
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mx-60">
      <table className="w-full max-w-full text-base text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 pl-6">
              Domain name
            </th>
            <th scope="col" className="py-3 pr-6">
              Network
            </th>
            <th scope="col" className="py-3 pr-8 text-right">
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
