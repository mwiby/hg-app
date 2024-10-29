import ProductList from "./components/ProductList"

const App = () => {

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600">Products overview:</h1>
        <ProductList />
      </div>    
    </>
  )
}

export default App

