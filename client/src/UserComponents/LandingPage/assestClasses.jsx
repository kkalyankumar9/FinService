import React from 'react';
import { Link } from 'react-router-dom';

const assetData = [
    {
      title: 'Stocks',
      imageSrc: 'https://upstox.com/open-demat-account/assets/images/grow-stock.png',
      description: 'Invest in shares of companies and earn returns based on their performance.',
    },
    {
      title: 'IPOs',
      imageSrc: 'https://upstox.com/open-demat-account/assets/images/grow-IPOs.png',
      description: 'Get in on the ground floor of a company before it goes public and potentially see huge returns.',
    },
    {
      title: 'Mutual Funds',
      imageSrc: 'https://upstox.com/open-demat-account/assets/images/grow-mutual-fund.png',
      description: 'Pool your money with other investors and invest in a variety of securities.',
    },
  ];



const  AssetClasses=()=> {
  return (
    <div>
         <div className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center lg:text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">Asset Classes</h2>
            <p className="mt-3 sm:mt-5 text-lg lg:text-xl max-w-xl mx-auto">Diversify your portfolio by investing in different asset classes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
            {assetData.map((data) => (
              <div key={data.title} className="bg-white rounded-xl shadow-base overflow-hidden hover:shadow-lg transition-shadow hover:border-teal-500 border-2 border-transparent">
                <div className="py-8 bg-gray-100 flex justify-center">
                  <img src={data.imageSrc} alt={data.title} className="w-24 h-24 object-contain"/>
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-4">{data.title}</h2>
                  <p className="text-lg text-gray-600">{data.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PART-5 */}
      <div className="py-6 bg-gray-50 text-center">
        <button className="bg-violet-500 text-white py-2 px-4 text-2xl mb-6 hover:bg-[#4a446e] transition">
          <Link to="/invest">Start Investing</Link>
        </button>
        <p className="text-lg">Open an account today and enjoy ZERO brokerage* for 30 days</p>
        <p className="text-lg">Zero commission* on Mutual Funds and IPO</p>
        <p className="text-lg">₹20* per order on Equity, F&O, Commodity and Currency</p>
      </div> 
    </div>
  );
}

export default AssetClasses;
