import React from 'react';
import ReactApexChart from 'react-apexcharts';

const StockPieChart = ({ data }) => {
  const chartOptions = {
    chart: {
      type: 'pie',
      height: 350,
    },
    labels: ['P/E Ratio', 'High', 'Low'],
    colors: ['#6ab04c', '#2980b9', '#f39c12'],
    title: {
      text: 'P/E Ratio, High, and Low Prices',
      align: 'center',
      margin: 50,
      offsetY: 20,
      style: {
        fontSize: '20px',
        padding:"20px",
        margin:"30px",
        fontWeight: 'bold',
        color: '#333',
      
      },
    },
  };

  const series = [data.pe_ratio, data.high, data.low];

  return <ReactApexChart options={chartOptions} series={series} type="pie"  padding={"30px"} height={350} />;
};

export default StockPieChart;
