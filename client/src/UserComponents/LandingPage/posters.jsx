import { Link } from "react-router-dom";
import React from "react";

const PosterComp = () => {
  return (
    <>
      {/* PART-1 */}
      <div className="flex flex-col md:flex-row justify-center text-center items-center m-auto p-5">
        <div className="p-8 rounded-md w-full md:w-1/2 mb-10 md:mb-0 bg-white ">
          <h2 className="text-2xl md:text-3xl mb-5 font-semibold">
            OPEN A FREE DEMAT ACCOUNT
          </h2>
          <h2 className="text-xl md:text-2xl mb-5">Invest Right, Invest Now</h2>
          <h2 className="mb-5">
            Open an account today and enjoy ZERO brokerage* for 30 days
          </h2>
          <h2 className="mb-5">Zero commission* on Mutual Funds and IPO</h2>
          <h2 className="mb-5">
            ₹20* per order on Equity, F&O, Commodity and Currency
          </h2>
          <h2 className="mb-5">Finance Service.pvt.lmt</h2>
          <button className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition">
            <Link to="/signup">Sign Up Now</Link>
          </button>
        </div>
        <div className="w-full md:w-1/2 flex-1">
          <img
            src="https://png.pngtree.com/template/20190905/ourmid/pngtree-return-of-investment-growth-investing-stock-market-golden-coin-dollar-and-image_301813.jpg"
            alt="Investment Growth"
            className="w-full rounded-md shadow-lg hover:border-teal-500 transition border-2 border-transparent"
          />
        </div>
      </div>
    </>
  );
};

export default PosterComp;
