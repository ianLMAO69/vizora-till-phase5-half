import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Box } from 'lucide-react';
import { MOCK_PRODUCTS } from '../../../data/mockData';
import { Badge } from '../../ui';
import './SearchModal.css';

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? MOCK_PRODUCTS.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.sellerName.toLowerCase().includes(query.toLowerCase())
      )
    : MOCK_PRODUCTS.slice(0, 4);

  return (
    <div
      className="vizora-search-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search catalog"
    >
      <div className="vizora-search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="vizora-search-header">
          <Search size={18} className="text-muted" />
          <input
            type="text"
            className="vizora-search-input"
            placeholder="Search spatial products, chairs, lighting, materials..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button
            type="button"
            className="vizora-search-close-btn"
            onClick={onClose}
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        <div className="vizora-search-results">
          <div style={{ padding: '4px 8px', fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            {query.trim() ? `Search Results (${results.length})` : 'Popular Suggestions'}
          </div>

          {results.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.slug}`}
              className="vizora-search-result-item"
              onClick={onClose}
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="vizora-search-result-thumb"
              />
              <div className="vizora-search-result-info">
                <span className="vizora-search-result-title">{product.title}</span>
                <span className="vizora-search-result-meta">
                  {product.category} &bull; {product.sellerName}
                </span>
              </div>
              {product.has3D && (
                <Badge variant="3d" size="sm" icon={<Box size={10} />}>
                  3D
                </Badge>
              )}
              <span className="vizora-search-result-price">${product.price}</span>
            </Link>
          ))}

          {results.length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              No products found matching &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
