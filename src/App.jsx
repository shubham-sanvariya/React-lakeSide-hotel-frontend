import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import ExistingRooms from "./components/room/ExistingRooms.jsx"
import Home from "./components/home/Home.jsx"
import EditRoom from "./components/room/EditRoom.jsx"

function App() {

  return (
    <>
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
            <Route path="/edit-room/:roomId" element={<EditRoom />}/>
          <Route path="/existing-rooms" element={<ExistingRooms />}/>
        </Routes>
      </Router>
    </main>
    </>
  )
}

export default App
