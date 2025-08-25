import React from 'react'
import BenefitsSection from './benefits'
import PricingSection from './pricing'
import AssetClasses from './assestClasses'
import Footer from './footer'
import PosterComp from './posters'
import NaberCom from './navbar'




const LandingPageAllRender= () => {
  return (
    <>
    <NaberCom/>
    <PosterComp/>
    <BenefitsSection/>
    <PricingSection/>
    <AssetClasses/>
    <Footer/>

    </>
  )
}

export default LandingPageAllRender