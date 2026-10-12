import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Image as ImageIcon,
  Heart,
  ShoppingBag,
  Star,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Loader2,
} from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../../data/mockData';
import { Breadcrumbs } from '../../components/common/Breadcrumbs/Breadcrumbs';
import { QuantitySelector } from '../../components/common/QuantitySelector/QuantitySelector';
import { ProductCard } from '../../components/product/ProductCard/ProductCard';
import { Button, Badge } from '../../components/ui';
import { ModelViewer } from '../../components/viewer3d';
import type { Product } from '../../types';
import './ProductDetailPage.css';

export interface ProductDetailPageProps {
  onAddToCart?: (product: Product, quantity: number) => void;
  onToggleWishlist?: (productId: string) => void;
  wishlistIds?: string[];
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  const [activeMediaMode, setActiveMediaMode] = useState<'photo' | '3d'>(
    product?.has3D ? '3d' : 'photo'
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | '3d-tech' | 'shipping'>('specs');

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <Box size={48} className="text-muted" style={{ margin: '0 auto 16px' }} />
        <h1 className="h2" style={{ marginBottom: '8px' }}>Product Not Found</h1>
        <p className="text-muted" style={{ marginBottom: '24px' }}>
          The product listing &ldquo;{slug}&rdquo; does not exist or may have been unlisted.
        </p>
        <Link to="/products">
          <Button variant="primary" leftIcon={<ArrowRight size={16} />}>
            Back to Catalog
          </Button>
        </Link>
      </div>
    );
  }

  const categoryObj = MOCK_CATEGORIES.find((c) => c.slug === product.category);
  const isWishlisted = wishlistIds.includes(product.id);
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 3);

  const handleAddToCart = () => {
    onAddToCart?.(product, quantity);
  };

  const handleBuyNow = () => {
    onAddToCart?.(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="container vizora-pdp">
      {/* Breadcrumbs Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Catalog', path: '/products' },
          {
            label: categoryObj?.name || product.category,
            path: `/products?category=${product.category}`,
          },
          { label: product.title },
        ]}
      />

      <div className="vizora-pdp__layout">
        {/* Left Column: Media Showcase */}
        <div className="vizora-pdp__media-col">
          {/* Mode Switcher */}
          <div className="vizora-pdp__mode-switcher">
            <button
              type="button"
              className={`vizora-pdp__mode-btn ${
                activeMediaMode === 'photo' ? 'vizora-pdp__mode-btn--active' : ''
              }`}
              onClick={() => setActiveMediaMode('photo')}
            >
              <ImageIcon size={14} />
              <span>Photos ({product.images.length})</span>
            </button>

            <button
              type="button"
              className={`vizora-pdp__mode-btn ${
                activeMediaMode === '3d'
                  ? 'vizora-pdp__mode-btn--3d-active'
                  : ''
              }`}
              onClick={() => setActiveMediaMode('3d')}
            >
              <Box size={14} />
              <span>3D Model {product.has3D ? '(Interactive)' : '(Status)'}</span>
            </button>
          </div>

          {/* Main Viewport Stage */}
          <div className="vizora-pdp__viewport" id="3d-viewer">
            {activeMediaMode === 'photo' ? (
              <img
                src={product.images[selectedImageIndex]}
                alt={`${product.title} - view ${selectedImageIndex + 1}`}
                className="vizora-pdp__main-image"
              />
            ) : product.has3D && product.model3d?.modelUrl ? (
              <ModelViewer
                modelUrl={product.model3d.modelUrl}
                title={product.title}
                polygonCount={product.model3d.polygonCount}
                format={product.model3d.format}
              />
            ) : (
              /* Missing or Pending 3D State (Demonstrating Media Resilience) */
              <div className="vizora-pdp__3d-notice">
                {product.model3d?.status === 'extracting_frames' ? (
                  <>
                    <Loader2 size={36} className="text-accent vizora-button__spinner" />
                    <h3 className="h4">Reconstruction In Progress</h3>
                    <p className="text-xs text-muted">
                      The seller uploaded 360-degree footage. Our asynchronous pipeline is currently
                      extracting video keyframes and generating the point cloud.
                    </p>
                    <Badge variant="warning">Listing active with high-res photos</Badge>
                  </>
                ) : (
                  <>
                    <AlertTriangle size={36} style={{ color: 'var(--color-warning)' }} />
                    <h3 className="h4">3D Model Not Available Yet</h3>
                    <p className="text-xs text-muted">
                      {product.model3d?.errorMessage ||
                        'This item has not yet undergone 360-degree reconstruction. High-resolution photography is active.'}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveMediaMode('photo')}
                    >
                      Return to Photos
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Thumbnail Selector Strip */}
          <div className="vizora-pdp__thumbnails">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                className={`vizora-pdp__thumb-btn ${
                  selectedImageIndex === idx && activeMediaMode === 'photo'
                    ? 'vizora-pdp__thumb-btn--active'
                    : ''
                }`}
                onClick={() => {
                  setSelectedImageIndex(idx);
                  setActiveMediaMode('photo');
                }}
                aria-label={`Show image ${idx + 1}`}
              >
                <img src={img} alt="" className="vizora-pdp__thumb-img" />
              </button>
            ))}

            {product.has3D && (
              <button
                type="button"
                className={`vizora-pdp__thumb-btn ${
                  activeMediaMode === '3d' ? 'vizora-pdp__thumb-btn--active' : ''
                }`}
                onClick={() => setActiveMediaMode('3d')}
                aria-label="Show 3D model viewer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '4px',
                  backgroundColor: 'var(--color-bg-subtle)',
                }}
              >
                <Box size={22} className="text-accent" />
                <span style={{ fontSize: '10px', fontWeight: 600 }}>3D Mesh</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="vizora-pdp__info-col">
          {/* Seller Atelier Attribution */}
          <div className="vizora-pdp__seller-tag">
            <span>Crafted by</span>
            <strong style={{ color: 'var(--color-text-primary)' }}>{product.sellerName}</strong>
            <ShieldCheck size={14} className="text-accent" />
            <span style={{ marginLeft: 'auto' }}>
              <Badge variant="default" size="sm">
                {product.category}
              </Badge>
            </span>
          </div>

          {/* Title */}
          <h1 className="vizora-pdp__title">{product.title}</h1>

          {/* Ratings & Reviews */}
          <div className="vizora-pdp__rating-row">
            <div className="vizora-pdp__stars">
              <Star size={16} fill="currentColor" />
              <strong style={{ marginLeft: '4px', color: 'var(--color-text-primary)' }}>
                {product.rating}
              </strong>
            </div>
            <span className="text-muted">&bull;</span>
            <span className="text-muted">{product.reviewCount} customer reviews</span>
            <span className="text-muted">&bull;</span>
            <span className="text-muted">SKU: {product.id}</span>
          </div>

          {/* Pricing & Availability Card */}
          <div className="vizora-pdp__price-card">
            <div className="vizora-pdp__price-main">
              <span className="vizora-pdp__price-current">
                ${product.price.toLocaleString()} {product.currency}
              </span>
              {product.originalPrice && (
                <span className="vizora-pdp__price-original">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
              {discountPercent && (
                <Badge variant="accent" size="sm">
                  Save {discountPercent}%
                </Badge>
              )}
            </div>

            <div className="vizora-pdp__stock-status">
              <span className="vizora-pdp__stock-dot" />
              <span>
                {product.inStock
                  ? `In Stock & Ready to Ship (${product.stockCount} units available)`
                  : 'Currently Out of Stock'}
              </span>
            </div>
          </div>

          {/* Architectural Description */}
          <p className="vizora-pdp__desc">{product.description}</p>

          {/* Physical Dimensions & 3D Spec Badges */}
          <div className="vizora-pdp__specs-grid">
            <div className="vizora-pdp__spec-box">
              <span className="vizora-pdp__spec-label">Dimensions (W &times; H &times; D)</span>
              <span className="vizora-pdp__spec-value">
                {product.model3d?.dimensions
                  ? `${product.model3d.dimensions.width}cm × ${product.model3d.dimensions.height}cm × ${product.model3d.dimensions.depth}cm`
                  : 'Standard Studio Scale'}
              </span>
            </div>

            <div className="vizora-pdp__spec-box">
              <span className="vizora-pdp__spec-label">3D Asset Verification</span>
              <span className="vizora-pdp__spec-value">
                {product.has3D ? 'GLTF Binary (PBR Materials)' : '2D High-Res Photos Only'}
              </span>
            </div>
          </div>

          {/* Action Row: Quantity + Add To Cart + Wishlist */}
          <div className="vizora-pdp__actions-bar">
            <div className="vizora-pdp__cta-row">
              <QuantitySelector
                quantity={quantity}
                onChange={setQuantity}
                max={product.stockCount}
                disabled={!product.inStock}
              />

              <Button
                variant="primary"
                size="lg"
                style={{ flex: 1 }}
                leftIcon={<ShoppingBag size={18} />}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                Add {quantity} to Cart &bull; ${(product.price * quantity).toLocaleString()}
              </Button>

              <button
                type="button"
                className={`vizora-pdp__wishlist-btn ${
                  isWishlisted ? 'vizora-pdp__wishlist-btn--active' : ''
                }`}
                onClick={() => onToggleWishlist?.(product.id)}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            <Button
              variant="accent"
              size="lg"
              style={{ width: '100%' }}
              onClick={handleBuyNow}
              disabled={!product.inStock}
            >
              Buy Now with Express Checkout
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Section: Specifications, 3D Mesh Integrity, Shipping */}
      <div className="vizora-pdp__tabs-container">
        <div className="vizora-pdp__tab-headers" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'specs'}
            className={`vizora-pdp__tab-btn ${
              activeTab === 'specs' ? 'vizora-pdp__tab-btn--active' : ''
            }`}
            onClick={() => setActiveTab('specs')}
          >
            Design & Materials
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === '3d-tech'}
            className={`vizora-pdp__tab-btn ${
              activeTab === '3d-tech' ? 'vizora-pdp__tab-btn--active' : ''
            }`}
            onClick={() => setActiveTab('3d-tech')}
          >
            3D Mesh & Spatial Specifications
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'shipping'}
            className={`vizora-pdp__tab-btn ${
              activeTab === 'shipping' ? 'vizora-pdp__tab-btn--active' : ''
            }`}
            onClick={() => setActiveTab('shipping')}
          >
            Delivery & Guarantee
          </button>
        </div>

        <div className="vizora-pdp__tab-content">
          {activeTab === 'specs' && (
            <div>
              <p style={{ marginBottom: '16px' }}>
                Each piece in the Vizora catalog is verified for authentic craftsmanship and
                structural durability. Produced in certified artisan studios using sustainably
                harvested hardwoods and metals.
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>&bull; <strong>Primary Materials:</strong> Hand-finished natural oak/walnut and top-grain leather</li>
                <li>&bull; <strong>Origin:</strong> Crafted in Copenhagen & Stockholm Studios</li>
                <li>&bull; <strong>Certifications:</strong> FSC-Certified Forest Products, Low-VOC Sealants</li>
              </ul>
            </div>
          )}

          {activeTab === '3d-tech' && (
            <div>
              <p style={{ marginBottom: '16px' }}>
                Spatial models on Vizora follow strict geometric and material guidelines to ensure
                instant rendering in standard WebGL/Three.js environments without browser latency.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div className="vizora-pdp__spec-box">
                  <span className="vizora-pdp__spec-label">Format</span>
                  <span className="vizora-pdp__spec-value">GLTF 2.0 Binary (.glb)</span>
                </div>
                <div className="vizora-pdp__spec-box">
                  <span className="vizora-pdp__spec-label">Texture Workflow</span>
                  <span className="vizora-pdp__spec-value">Metallic-Roughness PBR</span>
                </div>
                <div className="vizora-pdp__spec-box">
                  <span className="vizora-pdp__spec-label">Pipeline Engine</span>
                  <span className="vizora-pdp__spec-value">Vizora Asynchronous Mesh Reconstruction</span>
                </div>
                <div className="vizora-pdp__spec-box">
                  <span className="vizora-pdp__spec-label">Coordinate System</span>
                  <span className="vizora-pdp__spec-value">Right-handed Y-up (Standard Metric)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div>
              <p style={{ marginBottom: '12px' }}>
                We provide insured freight handling for all furniture and delicate architectural lighting:
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>&bull; <strong>Standard Dispatch:</strong> 2 to 4 business days with end-to-end tracking</li>
                <li>&bull; <strong>White Glove Delivery:</strong> Available at checkout for seating and large tables</li>
                <li>&bull; <strong>30-Day Return Guarantee:</strong> Enjoy risk-free returns in original protective packaging</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel/Grid */}
      {relatedProducts.length > 0 && (
        <section style={{ marginTop: '64px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
            <h2 className="h3" style={{ margin: 0 }}>
              More from {categoryObj?.name || 'this collection'}
            </h2>
            <Link to={`/products?category=${product.category}`}>
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={14} />}>
                View All
              </Button>
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {relatedProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
                isWishlisted={wishlistIds.includes(relProduct.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={(p) => onAddToCart?.(p, 1)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
