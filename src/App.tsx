import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar/Navbar';
import { Footer } from './components/layout/Footer/Footer';
import { HomePage } from './pages/Home/HomePage';
import { CatalogPage } from './pages/Catalog/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetail/ProductDetailPage';
import { StudioPage } from './pages/Studio/StudioPage';
import { SearchModal } from './components/common/SearchModal/SearchModal';
import { Toast } from './components/common/Toast/Toast';
import { Button, Badge, Card, Input } from './components/ui';
import type { Product } from './types';
import {
  Box,
  Layers,
  Sparkles,
  Search,
  CheckCircle2,
  ArrowRight,
  Palette,
  Type,
  Layout,
} from 'lucide-react';
import './App.css';

// Dedicated Design System Showcase Route (From Phase 1)
function DesignSystemPage() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [demoInputError, setDemoInputError] = useState('');

  const toggleLoading = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 1600);
  };

  return (
    <div className="showcase-main" style={{ padding: '40px 0 80px' }}>
      <div className="container">
        <section className="hero-section">
          <div className="hero-tag">
            <Layers size={14} />
            <span>Design System & Primitive Tokens</span>
          </div>
          <h1 className="hero-title">Vizora Design System</h1>
          <p className="hero-subtitle">
            Warm-neutral backgrounds, dark text, restrained cobalt accent, and accessible UI primitives.
          </p>
        </section>

        <div className="showcase-grid">
          {/* Colors */}
          <Card variant="default" padding="lg">
            <div className="flex items-center gap-2" style={{ marginBottom: '8px' }}>
              <Palette size={18} className="text-accent" />
              <h3 className="h3">Color Tokens</h3>
            </div>
            <div className="color-palette-grid">
              <div className="color-swatch">
                <div className="color-swatch__preview" style={{ backgroundColor: 'var(--color-bg-app)' }} />
                <div className="color-swatch__info">
                  <span className="color-swatch__name">Canvas BG</span>
                  <span className="color-swatch__hex">#fbfaf8</span>
                </div>
              </div>
              <div className="color-swatch">
                <div className="color-swatch__preview" style={{ backgroundColor: 'var(--color-bg-subtle)' }} />
                <div className="color-swatch__info">
                  <span className="color-swatch__name">Subtle BG</span>
                  <span className="color-swatch__hex">#f5f3ee</span>
                </div>
              </div>
              <div className="color-swatch">
                <div className="color-swatch__preview" style={{ backgroundColor: 'var(--color-text-primary)' }} />
                <div className="color-swatch__info">
                  <span className="color-swatch__name">Text Primary</span>
                  <span className="color-swatch__hex">#121316</span>
                </div>
              </div>
              <div className="color-swatch">
                <div className="color-swatch__preview" style={{ backgroundColor: 'var(--color-accent)' }} />
                <div className="color-swatch__info">
                  <span className="color-swatch__name">Accent Cobalt</span>
                  <span className="color-swatch__hex">#1d4ed8</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Typography */}
          <Card variant="default" padding="lg">
            <div className="flex items-center gap-2" style={{ marginBottom: '8px' }}>
              <Type size={18} className="text-accent" />
              <h3 className="h3">Typography Scale</h3>
            </div>
            <div className="component-spec-box">
              <p className="h3" style={{ margin: '0 0 4px' }}>Headline 3 — 24px Bold</p>
              <p className="h4" style={{ margin: '0 0 4px' }}>Headline 4 — 20px Semibold</p>
              <p className="text-base" style={{ margin: '0 0 4px' }}>Body Text — 16px Plus Jakarta Sans</p>
              <p className="text-sm text-muted">Secondary Label — 14px Medium</p>
            </div>
          </Card>

          {/* Buttons */}
          <Card variant="default" padding="lg">
            <div className="flex items-center gap-2" style={{ marginBottom: '8px' }}>
              <Layout size={18} className="text-accent" />
              <h3 className="h3">Button Primitives</h3>
            </div>
            <div className="interactive-demo-row">
              <Button variant="primary" size="md">Primary</Button>
              <Button variant="accent" size="md">Accent</Button>
              <Button variant="secondary" size="md">Secondary</Button>
              <Button variant="outline" size="md" onClick={toggleLoading} isLoading={btnLoading}>
                Test Loading
              </Button>
            </div>
          </Card>

          {/* Badges */}
          <Card variant="default" padding="lg">
            <div className="flex items-center gap-2" style={{ marginBottom: '8px' }}>
              <Sparkles size={18} className="text-accent" />
              <h3 className="h3">Badges & Statuses</h3>
            </div>
            <div className="status-badge-list" style={{ marginTop: '16px' }}>
              <Badge variant="3d" icon={<Box size={12} />}>3D Interactive</Badge>
              <Badge variant="accent">Featured</Badge>
              <Badge variant="success" icon={<CheckCircle2 size={12} />}>Reconstructed</Badge>
              <Badge variant="warning">Processing Video</Badge>
              <Badge variant="danger">Pipeline Error</Badge>
            </div>
          </Card>

          {/* Inputs */}
          <Card variant="default" padding="lg">
            <div className="flex items-center gap-2" style={{ marginBottom: '8px' }}>
              <Search size={18} className="text-accent" />
              <h3 className="h3">Input Controls</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Input
                label="Search Input"
                placeholder="Type to test input..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                leftIcon={<Search size={16} />}
              />
              <Input
                label="Error State Test"
                placeholder="Sample error field..."
                value=""
                onChange={() => { }}
                error={demoInputError || undefined}
                rightIcon={
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDemoInputError(demoInputError ? '' : 'Invalid model source format')}
                  >
                    Toggle Error
                  </Button>
                }
              />
            </div>
          </Card>

          {/* Elevation */}
          <Card variant="interactive" padding="lg">
            <div className="flex items-center gap-2" style={{ marginBottom: '8px' }}>
              <Box size={18} className="text-accent" />
              <h3 className="h3">Interactive Card</h3>
            </div>
            <p className="text-sm">Hover over this card to observe the calibrated elevation shadow.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Milestone Placeholder Route for upcoming phases
function MilestonePlaceholder({ title, milestone, description }: { title: string; milestone: string; description: string }) {
  return (
    <div className="container" style={{ padding: '80px 24px', textAlign: 'center', minHeight: '60vh' }}>
      <Badge variant="accent" style={{ marginBottom: '16px' }}>
        {milestone}
      </Badge>
      <h1 className="h1" style={{ marginBottom: '16px' }}>{title}</h1>
      <p className="text-lg text-muted" style={{ maxWidth: '600px', margin: '0 auto 32px' }}>
        {description}
      </p>
      <Link to="/">
        <Button variant="primary" leftIcon={<ArrowRight size={16} />}>
          Back to Homepage
        </Button>
      </Link>
    </div>
  );
}

export function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-01']);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const itemsToAdd = Array(quantity).fill(product);
      return [...prev, ...itemsToAdd];
    });
    showToast(
      quantity > 1
        ? `Added ${quantity} × "${product.title}" to cart`
        : `Added "${product.title}" to cart`
    );
  };

  const handleToggleWishlist = (productId: string) => {
    if (wishlistIds.includes(productId)) {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      showToast('Removed item from wishlist');
    } else {
      setWishlistIds((prev) => [...prev, productId]);
      showToast('Saved item to wishlist');
    }
  };

  return (
    <BrowserRouter>
      <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Navigation Bar */}
        <Navbar
          cartCount={cart.length}
          wishlistCount={wishlistIds.length}
          onSearchClick={() => setSearchOpen(true)}
        />

        {/* Global Search Modal */}
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

        {/* Global Toast */}
        <Toast message={toastMessage} />

        {/* Main Application Routes */}
        <div className="app-main">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  onToggleWishlist={handleToggleWishlist}
                  wishlistIds={wishlistIds}
                />
              }
            />
            <Route
              path="/products"
              element={
                <CatalogPage
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  onToggleWishlist={handleToggleWishlist}
                  wishlistIds={wishlistIds}
                />
              }
            />
            <Route
              path="/products/:slug"
              element={
                <ProductDetailPage
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  wishlistIds={wishlistIds}
                />
              }
            />
            <Route
              path="/studio"
              element={<StudioPage onAddToCart={(p) => handleAddToCart(p, 1)} />}
            />
            <Route
              path="/seller/*"
              element={
                <MilestonePlaceholder
                  title="Seller Studio & 3D Video Pipeline"
                  milestone="Phase 6 Scheduled"
                  description="Seller dashboard for product management, 360-degree video upload, frame extraction status monitor, and 3D model approval workflow will be composed in Phase 6."
                />
              }
            />
            <Route
              path="/cart"
              element={
                <MilestonePlaceholder
                  title="Shopping Cart & Checkout"
                  milestone="Phase 9 Scheduled"
                  description="Order summary, shipping address inputs, and payment simulation will be implemented in Phase 9."
                />
              }
            />
            <Route
              path="/wishlist"
              element={
                <MilestonePlaceholder
                  title="Saved Wishlist"
                  milestone="Phase 9 Scheduled"
                  description="Inspect and manage saved 3D models and items."
                />
              }
            />
            <Route
              path="/login"
              element={
                <MilestonePlaceholder
                  title="Customer & Seller Authentication"
                  milestone="Phase 7 Scheduled"
                  description="User registration, secure JWT authentication, and role-based permissions powered by FastAPI backend in Phase 7."
                />
              }
            />
            <Route path="/design-system" element={<DesignSystemPage />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
