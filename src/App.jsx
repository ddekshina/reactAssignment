import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<DashboardPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;