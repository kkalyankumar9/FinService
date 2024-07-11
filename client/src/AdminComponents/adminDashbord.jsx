import React from 'react'
import AdminNavbar from './adminNabar'
import AddStocks from './AdminCrud/addStock'
import StocksRender from './AdminCrud/stocks'


const AdminDashbord = () => {
 
  return (
    <div>
        <AdminNavbar/>
        <div className='flex'>
          <div>        <AddStocks/></div>
          <div><StocksRender/></div>

        </div>

        
    </div>
  )
}

export default AdminDashbord