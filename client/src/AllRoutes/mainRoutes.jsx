import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../UserComponents/home'

const MainAllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/about'/>
        <Route path='/contact'/>
        {/* Admin Routes */}
        <Route path='/admin_auth'/>
        <Route path='/admin_register'/>
        <Route path='/admin_login'/>
        <Route path='/admin_crud'/>
        


        


        
          {/* User Routes */}
        <Route path='/user_auth'/>
   
    </Routes>
  )
}

export default MainAllRoutes