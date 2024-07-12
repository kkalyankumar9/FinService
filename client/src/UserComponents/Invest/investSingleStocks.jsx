import React from 'react'
import { useParams } from 'react-router-dom'

const InvestSingleStocksMore = () => {
    const {id}=useParams()
    console.log(id)
  return (
    <div>InvestSingleStocksMore</div>
  )
}

export default InvestSingleStocksMore