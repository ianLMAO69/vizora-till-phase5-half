import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal,
  Box,
  Search,
  X,
  RotateCcw,
  PackageOpen,
} from 'lucide-react';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../../data/mockData';
import { ProductCard } from '../../components/product/ProductCard/ProductCard';
import { Breadcrumbs } from '../../components/common/Breadcrumbs/Breadcrumbs';
import { Button, Input } from '../../components/ui';
import type { Product } from '../../types';
import './CatalogPage.css';

export interface CatalogPageProps {
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  wishlistIds?: string[];
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial states from URL query
  const categoryFromUrl = searchParams.get('category') || 'all';
  const queryFromUrl = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl);
  const [searchQuery, setSearchQuery] = useState<string>(queryFromUrl);
  const [only3D, setOnly3D] = useState<boolean>(false);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  // Sync category change with URL params
  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    const newParams = new URLSearchParams(searchParams);
    if (slug === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', slug);
    }
    setSearchParams(newParams);
  };

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.sellerName.toLowerCase().includes(q)
      );
    }

    // 3D Ready filter
    if (only3D) {
      result = result.filter((p) => p.has3D);
    }

    // In Stock filter
    if (onlyInStock) {
      result = result.filter((p) => p.inStock);
    }

    // Max Price filter
    result = result.filter((p) => p.price <= maxPrice);

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, only3D, onlyInStock, maxPrice, sortBy]);

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery.trim() !== '' ||
    only3D ||
    onlyInStock ||
    maxPrice < 1000;

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setOnly3D(false);
    setOnlyInStock(false);
    setMaxPrice(1000);
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="container vizora-catalog">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Explore Catalog', path: '/products' },
          ...(selectedCategory !== 'all'
            ? [
                {
                  label:
                    MOCK_CATEGORIES.find((c) => c.slug === selectedCategory)?.name ||
                    selectedCategory,
                },
              ]
            : []),
        ]}
      />

      {/* Header */}
      <div className="vizora-catalog__header">
        <div className="vizora-catalog__title-row">
          <div>
            <h1 className="h2" style={{ margin: 0 }}>
              {selectedCategory === 'all'
                ? 'All Spatial Products'
                : MOCK_CATEGORIES.find((c) => c.slug === selectedCategory)?.name}
            </h1>
            <p className="text-sm text-muted" style={{ marginTop: '4px' }}>
              Explore certified 3D models with true-to-scale dimensions and photorealistic textures.
            </p>
          </div>
          <span className="vizora-catalog__count">
            Showing <strong>{filteredProducts.length}</strong> of {MOCK_PRODUCTS.length} listings
          </span>
        </div>
      </div>

      <div className="vizora-catalog__layout">
        {/* Sidebar Filters */}
        <aside
          className={`vizora-catalog__sidebar ${
            mobileFiltersOpen ? 'vizora-catalog__sidebar--mobile-open' : ''
          }`}
          aria-label="Product filters"
        >
          <div className="flex items-center justify-between">
            <span className="vizora-filter-title">
              <span className="flex items-center gap-2">
                <SlidersHorizontal size={16} />
                <span>Filters</span>
              </span>
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                className="text-xs text-accent"
                onClick={resetFilters}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Clear All
              </button>
            )}
          </div>

          {/* Category Filter Group */}
          <div className="vizora-filter-group">
            <span className="vizora-filter-title">Categories</span>
            <div className="vizora-filter-options">
              <label className="vizora-filter-label">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === 'all'}
                  onChange={() => handleCategoryChange('all')}
                  className="vizora-filter-checkbox"
                />
                <span>All Categories</span>
                <span className="vizora-filter-count">{MOCK_PRODUCTS.length}</span>
              </label>

              {MOCK_CATEGORIES.map((cat) => (
                <label key={cat.id} className="vizora-filter-label">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat.slug}
                    onChange={() => handleCategoryChange(cat.slug)}
                    className="vizora-filter-checkbox"
                  />
                  <span>{cat.name}</span>
                  <span className="vizora-filter-count">
                    {MOCK_PRODUCTS.filter((p) => p.category === cat.slug).length}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 3D Model Availability Filter */}
          <div className="vizora-filter-group">
            <span className="vizora-filter-title">3D Capability</span>
            <label className="vizora-filter-label">
              <input
                type="checkbox"
                checked={only3D}
                onChange={(e) => setOnly3D(e.target.checked)}
                className="vizora-filter-checkbox"
              />
              <span className="flex items-center gap-1">
                <Box size={14} className="text-accent" />
                <span>3D Ready Only</span>
              </span>
              <span className="vizora-filter-count">
                {MOCK_PRODUCTS.filter((p) => p.has3D).length}
              </span>
            </label>
          </div>

          {/* Availability / In-stock Filter */}
          <div className="vizora-filter-group">
            <span className="vizora-filter-title">Availability</span>
            <label className="vizora-filter-label">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="vizora-filter-checkbox"
              />
              <span>In Stock Only</span>
            </label>
          </div>

          {/* Price Range Filter */}
          <div className="vizora-filter-group">
            <div className="flex items-center justify-between">
              <span className="vizora-filter-title">Maximum Price</span>
              <span className="text-sm" style={{ fontWeight: 600 }}>${maxPrice}</span>
            </div>
            <input
              type="range"
              min={100}
              max={1000}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-accent)', cursor: 'pointer' }}
            />
            <div className="flex justify-between text-xs text-muted">
              <span>$100</span>
              <span>$1,000+</span>
            </div>
          </div>
        </aside>

        {/* Main Content: Toolbar & Products Grid */}
        <main className="vizora-catalog__content">
          {/* Top Toolbar */}
          <div className="vizora-catalog__toolbar">
            <Button
              variant="outline"
              size="sm"
              className="vizora-catalog__mobile-filter-btn"
              leftIcon={<SlidersHorizontal size={14} />}
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            </Button>

            <div className="vizora-catalog__search-box">
              <Input
                placeholder="Search this view..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search size={15} />}
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="catalog-sort" className="text-xs text-muted" style={{ whiteSpace: 'nowrap' }}>
                Sort by:
              </label>
              <select
                id="catalog-sort"
                className="vizora-catalog__sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="vizora-catalog__active-chips">
              {selectedCategory !== 'all' && (
                <span className="vizora-active-chip">
                  Category: {selectedCategory}
                  <button
                    type="button"
                    className="vizora-active-chip-remove"
                    onClick={() => handleCategoryChange('all')}
                    aria-label="Remove category filter"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {only3D && (
                <span className="vizora-active-chip">
                  3D Ready Only
                  <button
                    type="button"
                    className="vizora-active-chip-remove"
                    onClick={() => setOnly3D(false)}
                    aria-label="Remove 3D only filter"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {onlyInStock && (
                <span className="vizora-active-chip">
                  In Stock Only
                  <button
                    type="button"
                    className="vizora-active-chip-remove"
                    onClick={() => setOnlyInStock(false)}
                    aria-label="Remove in stock filter"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {searchQuery.trim() && (
                <span className="vizora-active-chip">
                  &ldquo;{searchQuery}&rdquo;
                  <button
                    type="button"
                    className="vizora-active-chip-remove"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search term"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {maxPrice < 1000 && (
                <span className="vizora-active-chip">
                  Under ${maxPrice}
                  <button
                    type="button"
                    className="vizora-active-chip-remove"
                    onClick={() => setMaxPrice(1000)}
                    aria-label="Reset max price"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Product Cards Grid */}
          {filteredProducts.length > 0 ? (
            <div className="vizora-catalog__grid">
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
          ) : (
            <div className="vizora-catalog__empty">
              <PackageOpen size={48} className="text-muted" />
              <h3 className="h3">No matching listings</h3>
              <p className="text-sm text-muted" style={{ maxWidth: '420px' }}>
                We couldn&apos;t find any items matching your selected criteria. Try resetting your
                filters or broadening your price threshold.
              </p>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<RotateCcw size={14} />}
                onClick={resetFilters}
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CatalogPage;
