import React, { useState } from 'react';

/**
 * ProductCard - React component for displaying a single product
 * This component demonstrates React integration in the NutriScan app
 */
const ProductCard = ({ product, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!product) {
    return (
      <div className="product-card-empty">
        <p>No product data available</p>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 70) return '#22c55e'; // green
    if (score >= 40) return '#eab308'; // yellow
    return '#ef4444'; // red
  };

  return (
    <div
      className="react-product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect && onSelect(product)}
      style={{
        cursor: onSelect ? 'pointer' : 'default',
        transform: isHovered && onSelect ? 'translateY(-4px)' : 'none',
        boxShadow: isHovered && onSelect ? '0 10px 25px rgba(0,0,0,0.15)' : 'none',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="rpc-icon" style={{ background: getScoreColor(product.score) + '20' }}>
        <span className="rpc-icon-text">
          {product.name.substring(0, 2).toUpperCase()}
        </span>
      </div>

      <div className="rpc-content">
        <h3 className="rpc-name">{product.name}</h3>
        <p className="rpc-brand">{product.brand}</p>

        <div className="rpc-score">
          <span
            className="rpc-score-value"
            style={{ color: getScoreColor(product.score) }}
          >
            {product.score}
          </span>
          <span className="rpc-score-label">
            {product.score >= 70 ? 'Excellent' : product.score >= 40 ? 'Moderate' : 'Avoid'}
          </span>
        </div>

        {product.tags && (
          <div className="rpc-tags">
            {product.tags.split(' ').slice(0, 2).map((tag, idx) => (
              <span key={idx} className="rpc-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {isHovered && onSelect && (
        <div className="rpc-cta">
          <button className="rpc-button">View Details</button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
