import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import UnstoppableDomainService from "../services/UnstoppableDomainService";
import Table from "./Table";

const SearchSubmit = ({ home, initialValue }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(initialValue);
  const [domainSearchData, setDomainSearchData] = useState([]);

  console.log(home, "wats props in Search Submit?");

  const handleSearchClick = async () => {
    let data = await fetchSearchData();
    if (home) {
      navigate("/domain-search", {
        state: { searchInput: searchInput, tableData: data },
      });
    } else {
      if (searchInput) {
        fetchSearchData();
      } else {
        //TODO: set error text
        console.log("You need to search a domain");
      }
    }
  };

  const fetchSearchData = async () => {
    try {
      let responseData = await UnstoppableDomainService.searchUnstoppableDomain(
        searchInput,
        0
      );
      setDomainSearchData(responseData.data);

      return responseData.data;
    } catch (err) {
      console.log(err, "error occurred getting searchDomain()");
      return null;
    }
  };

  const handleSearchChange = async (e) => {
    setSearchInput(e.target.value);
    //checkIfENSIsOwned(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-center pt-14">
        <label
          for="search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >
          Domain
        </label>
        <div class="relative w-1/3">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>

          <input
            value={searchInput}
            onChange={(e) => handleSearchChange(e)}
            type="search"
            id="search"
            class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Find your new domain"
            required
          />
          <button
            onClick={() => handleSearchClick()}
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>
      {home ? null : <Table />}
    </div>
  );
};

export default SearchSubmit;
