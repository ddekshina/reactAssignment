import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Navigation from '../components/Navigation';

export default function DashboardPage() {
  const { user } = useSelector((state) => state.auth);
  const [salesData, setSalesData] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    // Generate mock data for charts
    const mockSalesData = [
      { month: 'Jan', sales: 4000, revenue: 2400 },
      { month: 'Feb', sales: 3000, revenue: 1398 },
      { month: 'Mar', sales: 2000, revenue: 9800 },
      { month: 'Apr', sales: 2780, revenue: 3908 },
      { month: 'May', sales: 1890, revenue: 4800 },
      { month: 'Jun', sales: 2390, revenue: 3800 },
    ];

    const mockCategoryData = [
      { name: 'Electronics', value: 400, color: '#0088FE' },
      { name: 'Clothing', value: 300, color: '#00C49F' },
      { name: 'Books', value: 200, color: '#FFBB28' },
      { name: 'Home & Garden', value: 100, color: '#FF8042' },
    ];

    const mockRevenueData = [
      { quarter: 'Q1', revenue: 15000 },
      { quarter: 'Q2', revenue: 25000 },
      { quarter: 'Q3', revenue: 35000 },
      { quarter: 'Q4', revenue: 45000 },
    ];

    setSalesData(mockSalesData);
    setProductCategories(mockCategoryData);
    setRevenueData(mockRevenueData);
  }, []);

  const dashboardStats = [
    { label: 'Total Sales', value: '15,847', color: '#007bff' },
    { label: 'Revenue', value: '$125,000', color: '#28a745' },
    { label: 'Customers', value: '1,234', color: '#ffc107' },
    { label: 'Products', value: '567', color: '#dc3545' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Navigation />
      
      <div style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ color: '#333', marginBottom: '0.5rem' }}>
            Welcome back, {user?.firstName || 'User'}!
          </h1>
          <p style={{ color: '#666', fontSize: '18px' }}>
            Here's what's happening with your business today.
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {dashboardStats.map((stat, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              borderLeft: `4px solid ${stat.color}`
            }}>
              <h3 style={{ 
                margin: '0 0 0.5rem 0', 
                fontSize: '24px', 
                fontWeight: 'bold',
                color: stat.color
              }}>
                {stat.value}
              </h3>
              <p style={{ margin: 0, color: '#666', fontSize: '16px' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Sales Trend Chart */}
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>Sales Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#007bff" strokeWidth={2} />
                <Line type="monotone" dataKey="revenue" stroke="#28a745" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue by Quarter */}
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>Quarterly Revenue</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#007bff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Categories Pie Chart */}
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#333', textAlign: 'center' }}>
            Product Categories Distribution
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={productCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {productCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginTop: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>Recent Activity</h3>
          <div style={{ color: '#666' }}>
            <div style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>
              📦 New order #1234 received - $299.99
            </div>
            <div style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>
              👤 Customer John Doe registered
            </div>
            <div style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>
              📊 Monthly report generated
            </div>
            <div style={{ padding: '0.75rem' }}>
              🎯 Sales target 85% achieved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}