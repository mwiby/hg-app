import { Routes, Route, NavLink } from "react-router-dom";
import ProductList from "./components/ProductList";
import StoreList from "./components/StoreList";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      <nav className="bg-blue-800 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Handle-guide
            </h1>
            <div className="flex space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600"
                      : "hover:bg-blue-700 hover:text-gray-200"
                  }`
                }
              >
                Produkter
              </NavLink>
              <NavLink
                to="/searchStore"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600"
                      : "hover:bg-blue-700 hover:text-gray-200"
                  }`
                }
              >
                Finn butikk
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
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
