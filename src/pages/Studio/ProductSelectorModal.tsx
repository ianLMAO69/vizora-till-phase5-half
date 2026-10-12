import React from 'react';
import { X, Box, Check } from 'lucide-react';
import { MOCK_PRODUCTS } from '../../data/mockData';
import { Badge } from '../../components/ui';
import type { Product } from '../../types';

export interface ProductSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProductId: string;
  onSelectProduct: (product: Product) => void;
}

export const ProductSelectorModal: React.FC<ProductSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedProductId,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  // Filter products that have valid 3D models ready for the studio
  const availableProducts = MOCK_PRODUCTS.filter((p) => p.has3D && p.model3d?.modelUrl);

  return (
    <div
      className="vizora-search-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Select 3D Product"
    >
      <div
        className="vizora-search-modal"
        style={{ maxWidth: '600px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="vizora-search-header">
          <Box size={18} className="text-accent" />
          <h3 className="h4" style={{ flex: 1, margin: 0 }}>
            Select 3D Asset for Studio
          </h3>
          <button
            type="button"
            className="vizora-search-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="vizora-search-results" style={{ padding: '16px' }}>
          <p className="text-xs text-muted" style={{ marginBottom: '12px' }}>
            Choose any verified 3D asset to test inside our real-time environment studio:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {availableProducts.map((p) => {
              const isSelected = p.id === selectedProductId;
              return (
                <div
                  key={p.id}
                  className="vizora-search-result-item"
                  style={{
                    cursor: 'pointer',
                    border: isSelected
                      ? '1px solid var(--color-accent)'
                      : '1px solid var(--color-border-subtle)',
                    backgroundColor: isSelected
                      ? 'var(--color-accent-subtle)'
                      : 'var(--color-bg-surface)',
                  }}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                >
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="vizora-search-result-thumb"
                  />
                  <div className="vizora-search-result-info">
                    <span className="vizora-search-result-title">{p.title}</span>
                    <span className="vizora-search-result-meta">
                      {p.category} &bull; {p.sellerName}
                    </span>
                  </div>
                  <Badge variant="3d" size="sm">
                    {p.model3d?.format.toUpperCase()}
                  </Badge>
                  <span className="vizora-search-result-price">${p.price}</span>
                  {isSelected && <Check size={18} className="text-accent" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSelectorModal;
