import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Sparkles,
  Store,
} from 'lucide-react';
import { Button } from '../../ui';
import './Navbar.css';

export interface NavbarProps {
  cartCount?: number;
  wishlistCount?: number;
  onSearchClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount = 2,
  wishlistCount = 1,
  onSearchClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="vizora-navbar">
      <div className="container vizora-navbar__container">
        {/* Brand Logo */}
        <Link to="/" className="vizora-navbar__brand" aria-label="Vizora Home">
          <div className="vizora-navbar__logo-icon">
            <Box size={20} />
          </div>
          <span>Vizora</span>
        </Link>

        {/* Primary Desktop Links */}
        <nav className="vizora-navbar__links" aria-label="Main Navigation">
          <Link
            to="/"
            className={`vizora-navbar__link ${
              isActive('/') ? 'vizora-navbar__link--active' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`vizora-navbar__link ${
              isActive('/products') ? 'vizora-navbar__link--active' : ''
            }`}
          >
            Explore
          </Link>
          <Link
            to="/studio"
            className={`vizora-navbar__link ${
              isActive('/studio') ? 'vizora-navbar__link--active' : ''
            }`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <Sparkles size={14} className="text-accent" />
            <span>3D Studio</span>
          </Link>
          <Link
            to="/seller"
            className={`vizora-navbar__link ${
              isActive('/seller') ? 'vizora-navbar__link--active' : ''
            }`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <Store size={14} />
            <span>Seller Portal</span>
          </Link>
        </nav>

        {/* Search trigger */}
        <div className="vizora-navbar__search-wrapper">
          <button
            type="button"
            className="vizora-navbar__search"
            onClick={onSearchClick}
            aria-label="Search catalog"
          >
            <Search size={15} />
            <span>Search 3D models & products...</span>
            <span className="vizora-navbar__search-kbd">⌘K</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="vizora-navbar__actions">
          <Link
            to="/wishlist"
            className="vizora-navbar__action-btn"
            aria-label={`Wishlist (${wishlistCount} items)`}
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="vizora-navbar__counter-badge">{wishlistCount}</span>
            )}
          </Link>

          <Link
            to="/cart"
            className="vizora-navbar__action-btn"
            aria-label={`Shopping Cart (${cartCount} items)`}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="vizora-navbar__counter-badge">{cartCount}</span>
            )}
          </Link>

          <Link
            to="/login"
            className="vizora-navbar__action-btn"
            aria-label="User Account"
          >
            <User size={20} />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="vizora-navbar__action-btn vizora-navbar__mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="vizora-navbar__mobile-menu vizora-navbar__mobile-menu--open">
          <Link
            to="/"
            className="vizora-navbar__link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="vizora-navbar__link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Explore Catalog
          </Link>
          <Link
            to="/studio"
            className="vizora-navbar__link"
            onClick={() => setMobileMenuOpen(false)}
          >
            3D Visualization Studio
          </Link>
          <Link
            to="/seller"
            className="vizora-navbar__link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Seller Portal
          </Link>
          <div style={{ paddingTop: '8px' }}>
            <Button
              variant="outline"
              size="sm"
              style={{ width: '100%' }}
              onClick={onSearchClick}
              leftIcon={<Search size={14} />}
            >
              Search Catalog
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
