import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import PrivateRouter from "./components/PrivateRouter"
import Enrollments from "./pages/Enrollments"
import Courses from "./pages/Courses"
import Navbar from "./components/Navbar"

function App() {
  

  return (
     <>
     <Navbar />
     <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/enrollments" element={
        //deixando a rota privada 
        <PrivateRouter>
          <Enrollments />
        </PrivateRouter>
      } />
      <Route path="/courses" element={
        <PrivateRouter>
          <Courses />
        </PrivateRouter>
      }></Route>
     </Routes>
     
    </>
  )
}

export default App
