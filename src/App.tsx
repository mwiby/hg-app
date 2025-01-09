import { Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";
import ProductList from "./components/ProductList";
import StoreList from "./components/StoreList";

const App = () => {
  const [isHeaderVisible, setHeaderVisible] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      <nav className="bg-gradient-to-r from-blue-800 to-blue-700 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-1 6m10-6l1 6m-1-6H7"
                />
              </svg>
              <h1 className="text-4xl font-extrabold tracking-tight">
                Handle guide
              </h1>
            </div>
            <div className="flex space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium text-lg transition-all ${
                    isActive
                      ? "bg-white text-blue-800 shadow-md"
                      : "hover:bg-blue-600 hover:shadow-md hover:text-gray-100"
                  }`
                }
              >
                Produkter
              </NavLink>
              <NavLink
                to="/searchStore"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium text-lg transition-all ${
                    isActive
                      ? "bg-white text-blue-800 shadow-md"
                      : "hover:bg-blue-600 hover:shadow-md hover:text-gray-100"
                  }`
                }
              >
                Finn butikk
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {isHeaderVisible && (
        <header className="bg-white shadow-md relative">
          <div className="max-w-6xl mx-auto px-6 py-4 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Velkommen!
            </h2>
            <p className="text-gray-600 mt-2">
             Din venn for å finne de beste produktene og dine lokale butikker.
            </p>
            <button
              onClick={() => setHeaderVisible(false)}
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
              aria-label="Close header"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </header>
      )}
      <main className="flex-grow w-full max-w-6xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/searchStore" element={<StoreList />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
