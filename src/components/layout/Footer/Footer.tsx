import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Sparkles, Shield, RefreshCw } from 'lucide-react';
import './Footer.css';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <footer className="vizora-footer">
      <div className="container">
        <div className="vizora-footer__grid">
          {/* Brand & Purpose */}
          <div className="vizora-footer__brand-block">
            <Link to="/" className="vizora-footer__brand">
              <div className="vizora-navbar__logo-icon" style={{ width: '28px', height: '28px' }}>
                <Box size={16} />
              </div>
              <span>Vizora</span>
            </Link>
            <p className="vizora-footer__desc">
              The 3D-powered spatial commerce platform. We empower sellers to convert video
              recordings into interactive, photorealistic 3D models and enable buyers to
              confidently explore objects in custom virtual environments.
            </p>
          </div>

          {/* Catalog & 3D */}
          <div className="vizora-footer__column">
            <h4 className="vizora-footer__heading">Explore Vizora</h4>
            <ul className="vizora-footer__list">
              <li>
                <Link to="/products" className="vizora-footer__link">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=furniture" className="vizora-footer__link">
                  Furniture & Seating
                </Link>
              </li>
              <li>
                <Link to="/products?category=lighting" className="vizora-footer__link">
                  Architectural Lighting
                </Link>
              </li>
              <li>
                <Link to="/studio" className="vizora-footer__link">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles size={12} className="text-accent" />
                    3D Environment Studio
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* For Sellers */}
          <div className="vizora-footer__column">
            <h4 className="vizora-footer__heading">For Creators & Sellers</h4>
            <ul className="vizora-footer__list">
              <li>
                <Link to="/seller" className="vizora-footer__link">
                  Seller Dashboard
                </Link>
              </li>
              <li>
                <Link to="/seller/products/new" className="vizora-footer__link">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <RefreshCw size={12} />
                    Video 3D Pipeline
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/seller/orders" className="vizora-footer__link">
                  Fulfillment & Orders
                </Link>
              </li>
              <li>
                <Link to="/seller" className="vizora-footer__link">
                  Model Approval Workflow
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Guarantee */}
          <div className="vizora-footer__column">
            <h4 className="vizora-footer__heading">Platform</h4>
            <ul className="vizora-footer__list">
              <li>
                <span className="vizora-footer__link" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Shield size={13} />
                  Verified GLTF / GLB
                </span>
              </li>
              <li>
                <span className="vizora-footer__link">Accurate Dimensions</span>
              </li>
              <li>
                <span className="vizora-footer__link">PBR Materials</span>
              </li>
              <li>
                <span className="vizora-footer__link">Privacy & Security</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="vizora-footer__bottom">
          <p>&copy; {CURRENT_YEAR} Vizora Technologies Inc. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
