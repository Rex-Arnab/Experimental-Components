"use client";

import React from "react";
import Table from "./components/Table";

const Tablw = () => {
  const settings = {
    headers: [
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" }
    ],
    dataUrl: "https://jsonplaceholder.typicode.com/users",
    enableSorting: true,
    enablePagination: true,
    enableSearch: true,
    limitRecords: 5,
    customActions: [
      {
        label: "Edit",
        handler: (item) => console.log("Edit", item)
      },
      {
        label: "Delete",
        handler: (item) => console.log("Delete", item)
      }
    ]
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">User Table</h1>
      <Table settings={settings} />
    </div>
  );
};

export default Tablw;
