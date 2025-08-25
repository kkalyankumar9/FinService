import React from 'react';
import ReactApexChart from 'react-apexcharts';

const StockLineChart = ({ data }) => {
  const chartOptions = {
    chart: {
      type: 'line',
      height: 350,
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    xaxis: {
      categories: ['P/E Ratio', 'High', 'Low'],
    },
    yaxis: {
      title: {
        text: 'Value'
      }
    },
    tooltip: {
      y: {
        formatter: (val) => `₹${val}`
      }
    }
  };

  const series = [{
    name: 'Value',
    data: [data.pe_ratio, data.high, data.low]
  }];

  return <ReactApexChart options={chartOptions} series={series} type="line"  height={350} />;
};

export default StockLineChart;
