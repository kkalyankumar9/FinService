import React from 'react';

const pricingData = [
  {
    title: 'Commissions',
    price: '₹0',
    description: 'On investing in Mutual Funds and IPOs'
  },
  {
    title: 'Account Maintenance',
    price: '₹20',
    description: 'To maintain your Demat Account*'
  },
  {
    title: 'Brokerage',
    price: '₹0',
    description: 'On Equity, F&O, Commodity and Currency orders'
  },
  {
    title: 'Account Opening',
    price: 'View Pricing',
    description: 'To open a Demat + Trading account'
  }
];

const  PricingSection=()=> {
  return (
    <div className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center lg:text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">Our Pricing</h2>
          <p className="mt-3 sm:mt-5 text-lg lg:text-xl max-w-xl mx-auto">Flat fees, no hidden charges.</p>
        </div>

        <div className="flex flex-col md:flex-row text-center justify-center gap-5 space-y-8 lg:space-y-12 py-10 md:py-14">
          {pricingData.map((item, index) => (
            <div 
              key={index} 
              className="w-full md:w-2/3 bg-white shadow-lg rounded-xl transition transform hover:scale-105"
            >
              <div className="px-6 lg:px-10 py-10 md:py-16">
                <p className="font-bold text-xl md:text-2xl mb-4">{item.title}</p>
                <p className="text-2xl md:text-3xl text-green-500 font-semibold">{item.price}</p>
                <p className="text-sm md:text-md text-gray-500 mt-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PricingSection;
