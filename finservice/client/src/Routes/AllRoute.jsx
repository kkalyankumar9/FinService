import { Route, Routes } from "react-router-dom"
import HomePage from "../LandingPage/Navbar"
import Signup from "../LandingPage/Register"
import Login from "../LandingPage/Login"
import PageNotFound from "../LandingPage/Pagenotfound"
import PrivateRoute from "./PrivateRoute"
import InvestNow from "../AllProductPage/InvestNowpage"
import MoreDetails from "../Singleproductpage/SingleProduct"
import Iposdata from "../AllProductPage/Ipos"
import MutualFounds from "../AllProductPage/Mutualfounds"
import Orders from "../AllProductPage/Orderspage"
import AboutPage from "../Aboutpage/About"
import ContactDetails from "../Aboutpage/Contact"
import Orderstock from "../AllProductPage/Orderstock"
import Ordersipo from "../AllProductPage/Odersipo"

function AllRoutes(){
  return <div>
<Routes>
  <Route path="/" element={<HomePage/>}/>
  <Route path="/signup" element={<Signup/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/invest" element={<PrivateRoute><InvestNow/></PrivateRoute>}/>
  <Route path="/invest/:id" element={<PrivateRoute><MoreDetails/></PrivateRoute>}/>
  <Route path="/ipos" element={<PrivateRoute><Iposdata/></PrivateRoute>}/>
  <Route path="/mutualfound" element={<PrivateRoute><MutualFounds/></PrivateRoute>}/>
  <Route path="/order" element={<PrivateRoute><Orders/></PrivateRoute>}/>
  <Route path="/about" element={<AboutPage/>}/>
  <Route path="/contact" element={<ContactDetails/>}/>
  <Route path="/stoksorder" element={<Orderstock/>}/>
  <Route path="/iposorder" element={<Ordersipo/>}/>

  <Route path="*" element={<PageNotFound/>}/>
</Routes>
  </div>
}
export default AllRoutes