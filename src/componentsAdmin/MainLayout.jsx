import React from "react";
import NavAdmin from "./Navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <NavAdmin />
      <div className="p-4 sm:ml-64">
        <div className="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="flex items-center justify-center mb-4 rounded">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;

// NOTED INI PEMBUNGKUS KONTEN ADMIN
