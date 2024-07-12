import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../UserComponents/home'
import AdminRegistration from '../AdminComponents/AdminAuth/registration'
import AdminLogin from '../AdminComponents/AdminAuth/login'
import AdminDashbord from '../AdminComponents/adminDashbord'
import AdminPrivateRouter from './adminPrivateRoute'
import EditStocks from '../AdminComponents/AdminCrud/editStock'
import AdminForgotpassword from '../AdminComponents/AdminAuth/forgotpass'
import UserRegistration from '../UserComponents/UserAuth/registration'
import { UserCircleIcon } from '@heroicons/react/outline'
import UserLogin from '../UserComponents/UserAuth/login'
import UserForgotpassword from '../UserComponents/UserAuth/forgotpass'
import InvestStocksCom from '../UserComponents/Invest/investStocks'
import UserPrivateRouter from './userPrivateRoute'
import InvestSingleStocksMore from '../UserComponents/Invest/investSingleStocks'

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
        <Route path='/admin_stock/:userId' element={<AdminPrivateRouter><EditStocks/></AdminPrivateRouter>}/>
        <Route path='/admin_forgotpassword' element={<AdminForgotpassword/>}/>
        {/* User */}
        <Route path='/user_register'element={<UserRegistration/>}/>
        <Route path='/user_login' element={<UserLogin/>}/>
        <Route path='/user_forgotpassword' element={<UserForgotpassword/>}/>
        <Route path='/user_invest' element={<UserPrivateRouter><InvestStocksCom/></UserPrivateRouter>}/>
        <Route path='/user_invest/:id' element={<UserPrivateRouter><InvestSingleStocksMore/></UserPrivateRouter>}/>

        
          {/* User Routes */}
        <Route path='/user_auth'/>
   
    </Routes>
  )
}

export default MainAllRoutes