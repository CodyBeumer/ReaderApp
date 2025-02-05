import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import ReadingListsPage from "./pages/ReadingLists/ReadingListsPage"
import ReadingListDetailsPage from "./pages/ReadingLists/ReadingListDetailsPage"
import BookDetailsPage from "./pages/Books/BookDetailsPage"

function App() {
  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path='/reading-lists' element={<ReadingListsPage />} />
          <Route path='/reading-lists/:id' element={<ReadingListDetailsPage />} />
          <Route path='/book/:id' element={<BookDetailsPage />} />
        </Routes>
    </>

  )
}

export default App
