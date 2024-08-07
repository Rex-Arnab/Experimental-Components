import React, { useState, useEffect } from "react";
import axios from "axios";

const Table = ({ settings }) => {
  const {
    headers,
    dataUrl,
    enableSorting,
    enablePagination,
    enableSearch,
    customActions,
    limitRecords
  } = settings;

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(limitRecords);
  const [sortConfig, setSortConfig] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(dataUrl);
      setData(response.data);
    };
    fetchData();
  }, [dataUrl]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const filteredData = sortedData.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = enablePagination
    ? filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : filteredData;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="overflow-x-auto">
      {enableSearch && (
        <input
          type="text"
          placeholder="Search..."
          className="mb-4 p-2 border border-gray-300 rounded"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {headers.map((header) => (
              <th
                key={header.key}
                className="p-2 border-b border-gray-300 cursor-pointer"
                onClick={() => enableSorting && handleSort(header.key)}>
                {header.label}
                {enableSorting && sortConfig?.key === header.key && (
                  <span>
                    {sortConfig.direction === "ascending" ? " 🔼" : " 🔽"}
                  </span>
                )}
              </th>
            ))}
            {customActions && (
              <th className="p-2 border-b border-gray-300">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              {headers.map((header) => (
                <td key={header.key} className="p-2 border-b border-gray-300">
                  {item[header.key]}
                </td>
              ))}
              {customActions && (
                <td className="p-2 border-b border-gray-300">
                  {customActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => action.handler(item)}
                      className="mr-2 text-blue-500 hover:underline">
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {enablePagination && (
        <div className="mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="mr-2 p-2 bg-blue-500 text-white rounded">
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="ml-2 p-2 bg-blue-500 text-white rounded">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
