import { Route, Routes } from "react-router-dom"
import HomePage from "../LandingPage/Navbar"
import Signup from "../LandingPage/Register"
import Login from "../LandingPage/Login"
import PageNotFound from "../LandingPage/Pagenotfound"
import PrivateRoute from "./PrivateRoute"
import InvestNow from "../AllProductPage/InvestNowpage"
import MoreDetails from "../Singleproductpage/SingleProduct"

function AllRoutes(){
  return <div>
<Routes>
  <Route path="/" element={<HomePage/>}/>
  <Route path="/signup" element={<Signup/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/invest" element={<PrivateRoute><InvestNow/></PrivateRoute>}/>
  <Route path="/invest/:id" element={<MoreDetails/>}/>


  <Route path="*" element={<PageNotFound/>}/>
</Routes>
  </div>
}
export default AllRoutes