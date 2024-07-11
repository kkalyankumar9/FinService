import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../UserComponents/home'
import AdminRegistration from '../AdminComponents/AdminAuth/registration'
import AdminLogin from '../AdminComponents/AdminAuth/login'
import AdminDashbord from '../AdminComponents/adminDashbord'
import AdminPrivateRouter from './adminPrivateRoute'
import EditStocks from '../AdminComponents/AdminCrud/editStock'
import AdminForgotpassword from '../AdminComponents/AdminAuth/forgotpass'

const MainAllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/about'/>
        <Route path='/contact'/>
        {/* Admin Routes */}
        <Route path='/admin_dashboard' element={<AdminDashbord/>} />
        <Route path='/admin_register'element={<AdminRegistration/>}/>
        <Route path='/admin_login' element={<AdminLogin/>}/>
        <Route path='/admin_crud'/>
        <Route path='/admin_stock' element={<AdminLogin/>}/>
        <Route path='/admin_stock/:userId' element={<EditStocks/>}/>
        <Route path='/admin_forgotpassword' element={<AdminForgotpassword/>}/>
        


        


        
          {/* User Routes */}
        <Route path='/user_auth'/>
   
    </Routes>
  )
}

export default MainAllRoutes