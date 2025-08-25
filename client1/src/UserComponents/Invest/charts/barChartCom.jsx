import React from 'react';
import ReactApexChart from 'react-apexcharts';

const StockBarChart = ({ data }) => {
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 150,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['P/E Ratio', 'High', 'Low'],
    },
    yaxis: {
      title: {
        text: 'Value'
      }
    },
    fill: {
      opacity: 1
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

  return <ReactApexChart options={chartOptions} series={series} type="bar"  height={350} />;
};

export default StockBarChart;
