import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import ReadingListsPage from "./pages/ReadingLists/ReadingListsPage"
import ReadingListDetailsPage from "./pages/ReadingLists/ReadingListDetailsPage"

function App() {
  return (
      <Box minH={"100vh"}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path='/reading-lists' element={<ReadingListsPage />} />
          <Route path='/reading-lists/:id' element={<ReadingListDetailsPage />} />
        </Routes>
      </Box>
  )
}

export default App
