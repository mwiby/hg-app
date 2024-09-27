import HarborList from "./components/HarborList"

const App = () => {

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600">Velkommen til HavneGuiden</h1>
        <HarborList />
      </div>    
    </>
  )
}

export default App
