import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct, searchProducts } from '../store/productsSlice';
import Navigation from '../components/Navigation';
import ProductModal from '../components/ProductModal';

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { products, loading, error, total } = useSelector((state) => state.products);
  
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchProducts(searchQuery));
    } else {
      dispatch(fetchProducts());
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      dispatch(updateProduct({ id: editingProduct.id, productData }));
    } else {
      dispatch(addProduct(productData));
    }
    setShowModal(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Navigation />
      
      <div style={{ padding: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{ color: '#333', margin: 0 }}>Products Management</h1>
          <button
            onClick={handleAddProduct}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Add New Product
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '2rem' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                dispatch(fetchProducts());
              }}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Clear
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            color: '#dc3545',
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '2rem'
          }}>
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            fontSize: '18px',
            color: '#666'
          }}>
            Loading products...
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <>
            <div style={{ 
              marginBottom: '1rem',
              color: '#666',
              fontSize: '16px'
            }}>
              Showing {products.length} of {total} products
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {products.map((product) => (
                <div
                  key={product.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
                >
                  <div style={{ 
                    height: '200px', 
                    backgroundColor: '#f8f9fa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    {product.thumbnail ? (
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <div style={{ 
                        color: '#999', 
                        fontSize: '48px' 
                      }}>
                        📦
                      </div>
                    )}
                  </div>
                  
                  <div style={{ padding: '1rem' }}>
                    <h3 style={{ 
                      margin: '0 0 0.5rem 0',
                      fontSize: '18px',
                      color: '#333',
                      height: '2.5rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {product.title}
                    </h3>
                    
                    <p style={{ 
                      margin: '0 0 1rem 0',
                      color: '#666',
                      fontSize: '14px',
                      height: '3rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {product.description}
                    </p>
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem'
                    }}>
                      <span style={{ 
                        fontSize: '20px', 
                        fontWeight: 'bold', 
                        color: '#007bff' 
                      }}>
                        ${product.price}
                      </span>
                      <span style={{ 
                        backgroundColor: '#e9ecef',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        fontSize: '12px',
                        color: '#495057'
                      }}>
                        {product.category}
                      </span>
                    </div>
                    
                    <div style={{ 
                      display: 'flex', 
                      gap: '0.5rem' 
                    }}>
                      <button
                        onClick={() => handleEditProduct(product)}
                        style={{
                          flex: 1,
                          backgroundColor: '#ffc107',
                          color: '#212529',
                          border: 'none',
                          padding: '0.5rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        style={{
                          flex: 1,
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* No Products Found */}
        {!loading && products.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#666'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '1rem' }}>📦</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or add a new product.</p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {showModal && (
        <ProductModal
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}