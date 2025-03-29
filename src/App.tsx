import { Routes, Route } from "react-router-dom"
import { CompanyCards } from "@/components/CompanyCards"
import { CompanyDetails } from "@/components/CompanyDetails"

function App() {
  return (
    <div className="min-h-screen p-4">
      <header className="text-center mb-8 pt-24">
        <h1 className="text-4xl font-bold mb-2">AI Infrastructure Companies</h1>
        <p className="text-lg text-muted-foreground">
          Explore top companies in the AI infrastructure space
        </p>
      </header>

      <main className="w-full max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<CompanyCards />} />
          <Route path="/company/:id" element={<CompanyDetails />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
