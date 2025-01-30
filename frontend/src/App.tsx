import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import ListsPage from "./pages/ListsPage"

function App() {
  return (
      <Box minH={"100vh"}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path='/lists' element={<ListsPage />} />
        </Routes>
      </Box>
  )
}

export default App
