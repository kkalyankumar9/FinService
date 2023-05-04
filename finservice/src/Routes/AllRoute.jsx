import { Route, Routes } from "react-router-dom"
import HomePage from "../LandingPage/Navbar"

function AllRoutes(){
  return <div>
<Routes>
  <Route path="/" element={<HomePage/>}/>
</Routes>
  </div>
}
export default AllRoutes