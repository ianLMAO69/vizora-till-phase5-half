import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Heart, Star, ShoppingBag, Loader2 } from 'lucide-react';
import type { Product } from '../../../types';
import { Badge } from '../../ui';
import './ProductCard.css';

export interface ProductCardProps {
  product: Product;
  onToggleWishlist?: (productId: string) => void;
  isWishlisted?: boolean;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onToggleWishlist,
  isWishlisted = false,
  onAddToCart,
}) => {
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleWishlist?.(product.id);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  return (
    <article className="vizora-product-card">
      {/* Top Media Showcase */}
      <div className="vizora-product-card__image-container">
        <Link to={`/products/${product.slug}`} tabIndex={-1} aria-hidden="true">
          <img
            src={product.images[0]}
            alt={product.title}
            className="vizora-product-card__image"
            loading="lazy"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.title} alternate view`}
              className="vizora-product-card__image vizora-product-card__image--secondary"
              loading="lazy"
            />
          )}
        </Link>

        {/* Status Badges */}
        <div className="vizora-product-card__badges">
          {product.has3D && (
            <Badge variant="3d" size="sm" icon={<Box size={11} />}>
              3D Ready
            </Badge>
          )}
          {discountPercent && (
            <Badge variant="accent" size="sm">
              -{discountPercent}%
            </Badge>
          )}
          {product.model3d && !product.has3D && product.model3d.status === 'extracting_frames' && (
            <Badge variant="warning" size="sm" icon={<Loader2 size={11} className="vizora-button__spinner" />}>
              Processing
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          className={`vizora-product-card__wishlist-btn ${
            isWishlisted ? 'vizora-product-card__wishlist-btn--active' : ''
          }`}
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* 3D Model Quick Cue */}
        {product.has3D && (
          <Link
            to={`/products/${product.slug}#3d-viewer`}
            className="vizora-product-card__3d-pill"
            aria-label={`Interactive 3D model available for ${product.title}`}
          >
            <Box size={12} />
            <span>Interactive 3D</span>
          </Link>
        )}
      </div>

      {/* Information Content */}
      <div className="vizora-product-card__content">
        <span className="vizora-product-card__category">{product.category}</span>

        <h3 style={{ margin: 0 }}>
          <Link to={`/products/${product.slug}`} className="vizora-product-card__title">
            {product.title}
          </Link>
        </h3>

        {/* Rating */}
        <div className="vizora-product-card__rating">
          <Star size={13} className="vizora-product-card__star" fill="currentColor" />
          <span style={{ fontWeight: 600 }}>{product.rating}</span>
          <span className="text-muted">({product.reviewCount})</span>
          <span className="text-muted" style={{ marginLeft: 'auto' }}>
            {product.sellerName}
          </span>
        </div>

        {/* Price and Cart Action */}
        <div className="vizora-product-card__footer">
          <div className="vizora-product-card__price-box">
            <span className="vizora-product-card__price">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="vizora-product-card__original-price">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            type="button"
            className="vizora-product-card__cart-btn"
            onClick={handleAddToCartClick}
            aria-label={`Add ${product.title} to shopping cart`}
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
