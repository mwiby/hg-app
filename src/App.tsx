import { Routes, Route, NavLink } from "react-router-dom";
import ProductList from "./components/ProductList";
import StoreList from "./components/StoreList";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      <nav className="bg-blue-700 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold">Handle-Guiden</h1>
            <div className="space-x-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg ${isActive ? "bg-blue-500" : "hover:bg-blue-600"}`
                }
              >
                Produkter
              </NavLink>
              <NavLink
                to="/searchStore"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg ${isActive ? "bg-blue-500" : "hover:bg-blue-600"}`
                }
              >
                Finn butikk
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/searchStore" element={<StoreList />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;