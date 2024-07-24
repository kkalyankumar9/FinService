import React from "react";
import AdminNavbar from "./adminNabar";
import AddStocks from "./AdminCrud/addStock";
import StocksRender from "./AdminCrud/stocks";
import { useSelector } from "react-redux";

const AdminDashbord = () => {
  const adminStocks = useSelector((store) => store.StockReducer.adminStocks);
  console.log(adminStocks)
  return (
    <div>
      <AdminNavbar />
      <div className="flex ">
        <div>
          {" "}
          <AddStocks />
        </div>
        {adminStocks.length > 0 && 
          <div>
            <StocksRender />
          </div>
       }
      </div>
  
    </div>
  );
};

export default AdminDashbord;
