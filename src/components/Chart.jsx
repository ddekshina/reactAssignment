import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ products }) => {
  // Extract categories and count products in each category
  const categories = {};
  products.forEach((product) => {
    categories[product.category] = (categories[product.category] || 0) + 1;
  });

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: 'Products by Category',
        data: Object.values(categories),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Product Categories Distribution',
      },
    },
  };

  return <Bar options={options} data={data} />;
};

export default Chart;