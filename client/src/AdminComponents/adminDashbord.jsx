import React from "react";
import AdminNavbar from "./adminNabar";
import AddStocks from "./AdminCrud/addStock";
import StocksRender from "./AdminCrud/stocks";
import { useSelector } from "react-redux";

const AdminDashbord = () => {
  const adminStocks = useSelector((store) => store.StockReducer.adminStocks);

  return (
    <div>
      <AdminNavbar />
      <div className="flex ">
        <div>
          {" "}
          <AddStocks />
        </div>
        {adminStocks.length > 0 ? (
          <div>
            <StocksRender />
          </div>
        ) : (
          <p className="text-center text-3xl font-bold  text-violet-700 m-auto mt-44 scrolling-text">
            No stocks added yet.
            <br /> Add one now!
          </p>
        )}
      </div>
  
    </div>
  );
};

export default AdminDashbord;
