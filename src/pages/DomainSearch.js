import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import { useLocation } from "react-router-dom";
import "../index.css";

import SearchSubmit from "../components/SearchSubmit";

export default function DomainSearch({ route }) {
  let location = useLocation();
  const { searchInput, tableData } = location.state;
  const [loading, setLoading] = useState();
  const [searchTextInput, setSearchTextInput] = useState();

  useEffect(() => {
    async function fetchData() {
      setSearchTextInput(searchInput);
    }
    fetchData();
  }, [searchInput]);

  return (
    <div className="align-middle text-center text-banner mb-24">
      <div className="h-screen flex ">
        <div className="grow space-y-10 self-start">
          <SearchSubmit initialValue={searchInput} />
          <Table tableData={tableData} />
        </div>
      </div>
    </div>
  );
}
