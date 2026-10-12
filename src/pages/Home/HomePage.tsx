import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCw,
  Video,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../../data/mockData';
import { ProductCard } from '../../components/product/ProductCard/ProductCard';
import { CategoryPills } from '../../components/common/CategoryPills/CategoryPills';
import { CategoryCard } from '../../components/common/CategoryCard/CategoryCard';
import { Button, Badge } from '../../components/ui';
import type { Product } from '../../types';
import './HomePage.css';

export interface HomePageProps {
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  wishlistIds?: string[];
}

export const HomePage: React.FC<HomePageProps> = ({
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [only3D, setOnly3D] = useState<boolean>(false);

  // Filter products based on selected category and 3D flag
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matches3D = only3D ? product.has3D : true;
    return matchesCategory && matches3D;
  });

  // Hero product highlight
  const heroProduct = MOCK_PRODUCTS[0];

  return (
    <div className="vizora-home">
      {/* 1. Hero Section */}
      <section className="vizora-home__hero">
        <div className="container">
          <div className="vizora-home__hero-grid">
            <div className="vizora-home__hero-content">
              <div className="vizora-home__hero-badge">
                <Sparkles size={14} />
                <span>Next-Generation Spatial Commerce</span>
              </div>

              <h1 className="vizora-home__hero-title">
                Inspect before you buy in <span>real 3D space</span>.
              </h1>

              <p className="vizora-home__hero-desc">
                Vizora transforms physical products into interactive, dimensionally
                accurate 3D models. Rotate, inspect fine materials, and visualize how items
                fit inside realistic environments before ordering.
              </p>

              <div className="vizora-home__hero-actions">
                <Link to="/products">
                  <Button variant="accent" size="lg" rightIcon={<ArrowRight size={16} />}>
                    Explore Collection
                  </Button>
                </Link>
                <Link to="/studio">
                  <Button
                    variant="outline"
                    size="lg"
                    leftIcon={<Box size={16} className="text-accent" />}
                  >
                    Open 3D Studio
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Visual Spotlight */}
            <div className="vizora-home__hero-visual">
              <div className="vizora-home__hero-card">
                <div className="vizora-home__hero-image-box">
                  <img
                    src={heroProduct.images[0]}
                    alt={heroProduct.title}
                    className="vizora-home__hero-image"
                  />
                  <div className="vizora-home__hero-overlay-tag">
                    <Badge variant="3d" icon={<Box size={12} />}>
                      3D Interactive Model
                    </Badge>
                  </div>
                  <div className="vizora-home__hero-3d-hint">
                    <RotateCw size={14} className="vizora-button__spinner" />
                    <span>360° Mesh Verified</span>
                  </div>
                </div>

                <div className="vizora-home__hero-card-info">
                  <div>
                    <h3 className="h4" style={{ margin: 0 }}>
                      {heroProduct.title}
                    </h3>
                    <p className="text-sm text-muted">
                      {heroProduct.sellerName} &bull; ${heroProduct.price} USD
                    </p>
                  </div>
                  <Link to={`/products/${heroProduct.slug}`}>
                    <Button variant="primary" size="sm" rightIcon={<ArrowRight size={14} />}>
                      View 3D
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Platform Value Pillars */}
      <section className="container">
        <div className="vizora-home__pillars">
          <div className="vizora-home__pillar-item">
            <div className="vizora-home__pillar-icon">
              <Box size={20} />
            </div>
            <div>
              <h4 className="vizora-home__pillar-title">Real GLTF / GLB 3D Assets</h4>
              <p className="vizora-home__pillar-desc">
                Interactive Three.js orbit controls with real polygon meshes, never fake static panoramas.
              </p>
            </div>
          </div>

          <div className="vizora-home__pillar-item">
            <div className="vizora-home__pillar-icon">
              <Sliders size={20} />
            </div>
            <div>
              <h4 className="vizora-home__pillar-title">Custom Environment Studio</h4>
              <p className="vizora-home__pillar-desc">
                Switch between clean studio, Nordic apartment, and outdoor lighting presets in real-time.
              </p>
            </div>
          </div>

          <div className="vizora-home__pillar-item">
            <div className="vizora-home__pillar-icon">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="vizora-home__pillar-title">Independent Media Resilience</h4>
              <p className="vizora-home__pillar-desc">
                Products remain immediately publishable with high-res photos even during 3D reconstruction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Categories */}
      <section className="container">
        <div className="vizora-home__section-header">
          <div className="vizora-home__section-title-wrap">
            <span className="vizora-home__section-kicker">Curated Spaces</span>
            <h2 className="vizora-home__section-title">Explore by Category</h2>
            <p className="vizora-home__section-subtitle">
              Browse products specifically sculpted for spatial examination and modern living.
            </p>
          </div>
          <Link to="/products">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={14} />}>
              View All Categories
            </Button>
          </Link>
        </div>

        <div className="vizora-home__categories-grid">
          {MOCK_CATEGORIES.slice(0, 4).map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 4. Products Catalog Grid with Interactive Filtering */}
      <section className="container">
        <div className="vizora-home__section-header">
          <div className="vizora-home__section-title-wrap">
            <span className="vizora-home__section-kicker">Featured Listings</span>
            <h2 className="vizora-home__section-title">Spatial Catalog</h2>
            <p className="vizora-home__section-subtitle">
              Explore items with real-time 3D asset previews, customer reviews, and immediate shipping.
            </p>
          </div>
        </div>

        {/* Filter Bar: Category Pills + 3D Toggle */}
        <div className="vizora-home__filter-row">
          <CategoryPills
            categories={MOCK_CATEGORIES}
            selectedCategorySlug={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <button
            type="button"
            className={`vizora-home__3d-toggle ${
              only3D ? 'vizora-home__3d-toggle--active' : ''
            }`}
            onClick={() => setOnly3D(!only3D)}
            aria-pressed={only3D}
          >
            <Box size={14} />
            <span>3D Ready Only</span>
            {only3D && <CheckCircle2 size={13} />}
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="vizora-home__products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div
            style={{
              padding: '64px 24px',
              textAlign: 'center',
              backgroundColor: 'var(--color-bg-subtle)',
              borderRadius: 'var(--radius-lg)',
              marginTop: '24px',
            }}
          >
            <Box size={36} className="text-muted" style={{ margin: '0 auto 12px' }} />
            <h3 className="h4">No matching products found</h3>
            <p className="text-sm text-muted" style={{ marginBottom: '16px' }}>
              Try adjusting your category filter or disable the 3D-only toggle.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory('all');
                setOnly3D(false);
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </section>

      {/* 5. 3D Reconstruction Pipeline Showcase for Sellers */}
      <section className="container">
        <div className="vizora-home__pipeline-banner">
          <div className="vizora-home__pipeline-left">
            <Badge variant="accent" icon={<Video size={12} />}>
              Asynchronous 3D Pipeline
            </Badge>
            <h2 className="vizora-home__pipeline-title">
              Turn normal product videos into interactive 3D assets.
            </h2>
            <p className="vizora-home__pipeline-desc">
              Sellers can simply film a 360-degree rotation of their physical product on their phone.
              Our asynchronous pipeline validates footage, extracts frames, generates high-fidelity
              GLTF meshes, and provides approval controls.
            </p>
            <div>
              <Link to="/seller">
                <Button variant="accent" size="md" rightIcon={<ArrowRight size={14} />}>
                  Access Seller Studio
                </Button>
              </Link>
            </div>
          </div>

          <div className="vizora-home__pipeline-steps">
            <div className="vizora-home__step-card">
              <span className="vizora-home__step-number">STEP 01</span>
              <h4 className="vizora-home__step-title">Upload Video</h4>
              <p className="vizora-home__step-desc">
                Upload 360-degree MP4 or MOV footage. Pre-checks validate lighting and focal distance.
              </p>
            </div>

            <div className="vizora-home__step-card">
              <span className="vizora-home__step-number">STEP 02</span>
              <h4 className="vizora-home__step-title">Async Processing</h4>
              <p className="vizora-home__step-desc">
                Frame extraction, dense point cloud construction, and GLB surface optimization run asynchronously.
              </p>
            </div>

            <div className="vizora-home__step-card">
              <span className="vizora-home__step-number">STEP 03</span>
              <h4 className="vizora-home__step-title">Preview & Publish</h4>
              <p className="vizora-home__step-desc">
                Sellers inspect geometry and materials before publishing. Listings stay active with photos anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
