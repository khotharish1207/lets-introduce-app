import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gray-900 border-b shadow">
      <div className="max-w-screen-xl px-4 py-3 mx-auto">
        <div className="flex items-center">
          <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
            <li>
              <Link
                to="/dashboard"
                className=" hover:underline block py-2 pl-3 pr-4 text-white bg-indigo-600 rounded"
                aria-current="page"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/editor"
                className="hover:underline block py-2 pl-3 pr-4 text-white bg-indigo-600 rounded"
              >
                Editor
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
