import ProductList from "./components/ProductList";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 py-8 sm:py-12">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-3">Handle-Guiden</h1>
        <p className="text-lg text-gray-600">Se etter dagligvarer</p>
      </header>
      
      <main className="w-full max-w-6xl px-4">
        <ProductList />
      </main>
    </div>
  );
};

export default App;