import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import ExistingRooms from "./components/room/ExistingRooms.jsx"
import Home from "./components/home/Home.jsx"
import EditRoom from "./components/room/EditRoom.jsx"
import AddRoom from "./components/room/AddRoom.jsx"
import NavBar from "./components/layout/NavBar.jsx"
import Footer from "./components/layout/Footer.jsx"

function App() {

  return (
    <>
      <main>
        <Router>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-room/:roomId" element={<EditRoom />} />
            <Route path="/existing-rooms" element={<ExistingRooms />} />
            <Route path="/add-room" element={<AddRoom />} />
          </Routes>
        </Router>
        <Footer/>
      </main>
    </>
  )
}

export default App
