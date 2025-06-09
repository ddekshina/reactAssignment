import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Chart from '../components/Chart';
import { selectAllProducts } from '../features/products/productsSlice';

const Dashboard = () => {
  const products = useSelector(selectAllProducts);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>
      </div>
      <div className="chart-container">
        <Chart products={products} />
      </div>
    </div>
  );
};

export default Dashboard;