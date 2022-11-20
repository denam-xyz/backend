import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchService from "../services/SearchService";

const SearchSubmit = ({ home, initialValue }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(initialValue);
  const [domainSearchData, setDomainSearchData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchClick = async () => {
    let data = await fetchSearchData();
    console.log(data, "What is data?");
    if (data) {
      navigate("/search", {
        state: { searchInput: searchInput, tableData: data },
      });
    }
  };
  const fetchSearchData = async () => {
    try {
      setLoading(true);
      let responseData = await SearchService.getSearch(searchInput, 0);
      setDomainSearchData(responseData.data);
      setLoading(false);
      return responseData.data;
    } catch (err) {
      console.log(err, "error occurred getting searchDomain()");
      return null;
    }
  };

  const handleSearchChange = async (e) => {
    setSearchInput(e.target.value);
  };

  const renderLoadingSpinner = () => {
    return (
      <svg
        aria-hidden="true"
        className="mr-2 w-8 h-8 animate-spin text-gray-300 fill-blue-600 absolute right-2.5 bottom-2.5 focus:outline-none font-medium rounded-lg text-sm"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    );
  };

  return (
    <div>
      <div className="flex justify-center mt-14">
        <label
          for="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >
          Domain
        </label>
        <div className="relative w-1/3">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
            id="search"
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Find your new domain"
            autocomplete="off"
            required
          />
          {loading ? (
            renderLoadingSpinner()
          ) : (
            <button
              onClick={() => handleSearchClick()}
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSubmit;
