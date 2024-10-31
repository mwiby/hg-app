import ProductList from "./components/ProductList"

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 to-blue-200 py-10">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-10 underline decoration-wavy decoration-blue-400">
        Products Overview
      </h1>
      <ProductList />
    </div>
  );
};

export default App;