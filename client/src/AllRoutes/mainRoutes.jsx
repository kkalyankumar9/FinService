import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../UserComponents/home'
import AdminRegistration from '../AdminComponents/AdminAuth/registration'
import AdminLogin from '../AdminComponents/AdminAuth/login'
import AdminDashbord from '../AdminComponents/adminDashbord'
import AdminPrivateRouter from './adminPrivateRoute'

const MainAllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/about'/>
        <Route path='/contact'/>
        {/* Admin Routes */}
        <Route path='/admin_dashboard' element={<AdminPrivateRouter><AdminDashbord/></AdminPrivateRouter>} />
        <Route path='/admin_register'element={<AdminRegistration/>}/>
        <Route path='/admin_login' element={<AdminLogin/>}/>
        <Route path='/admin_crud'/>
        


        


        
          {/* User Routes */}
        <Route path='/user_auth'/>
   
    </Routes>
  )
}

export default MainAllRoutes