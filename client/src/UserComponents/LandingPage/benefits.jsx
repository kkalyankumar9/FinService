import React from 'react';
import  ipo from "../Assests/ipo.webp"
import  stocks from "../Assests/stock.webp"
import  mf from "../Assests/MF.webp"
const benefitsData = [
  {
    title: 'Quick Onboarding',
    description: 'Secure onboarding process. Set up a Demat account with just PAN, Aadhaar and eKYC.',
  },
  {
    title: 'Easy Accessibility',
    description: 'Login with biometrics or mobile number and buy/sell stocks from our web, Android or iOS platforms in one click.',
  },
  {
    title: 'Smooth Orders',
    description: 'With just a toggle switch, switch between intraday or delivery orders. Enjoy GTT and AMO on Stocks and F&O orders.',
  },
  {
    title: 'Informed Decisions',
    description: 'Search stocks easily using smart lists and smart filters. Get latest news, analyse charts and find in-depth company information to make informed decisions.',
  },
];

const  BenefitsSection=() =>{
  return (
    <div className="py-10 bg-gray-50">
      <div className="text-center lg:text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">BENEFITS</h2>
        <p className="mt-3 sm:mt-5 text-lg lg:text-xl max-w-xl mx-auto">#KhaataKholaKya - Single account for all your investing and trading needs</p>
      </div>

      <div className="flex justify-center items-center flex-wrap mt-6">
        <img 
          src={stocks} 
          alt="Benefit 1" 
          className="w-36 md:w-72 mb-5 md:mr-5 hover:scale-105 transition-transform"
        />
        <img 
          src={ipo} 
          alt="Benefit 2" 
          className="w-36 md:w-72 mb-5 md:mr-5 hover:scale-105 transition-transform"
        />
        <img 
          src={mf}
          alt="Benefit 3" 
          className="w-36 md:w-72 mb-5 md:mr-5 hover:scale-105 transition-transform"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 mt-6">
      {benefitsData.map((benefit, index) => (
        <div key={index} className="bg-white rounded-xl shadow-base overflow-hidden hover:shadow-lg transition-shadow">
          <div className="p-6">
            <p className="font-bold text-xl mb-2">{benefit.title}</p>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default BenefitsSection;
