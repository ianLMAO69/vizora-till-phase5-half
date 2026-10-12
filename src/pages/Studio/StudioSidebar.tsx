import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sliders,
  Sun,
  Maximize,
  Compass,
  Grid,
  ShoppingBag,
  ExternalLink,
  RotateCw,
  RefreshCcw,
} from 'lucide-react';
import { Button, Badge } from '../../components/ui';
import {
  STUDIO_ENVIRONMENTS,
  type StudioEnvironmentDefinition,
} from '../../data/studioEnvironments';
import type { Product } from '../../types';
import './StudioSidebar.css';

export interface StudioSidebarProps {
  product: Product;
  onSwitchProductClick: () => void;
  activeEnv: StudioEnvironmentDefinition;
  onSelectEnv: (env: StudioEnvironmentDefinition) => void;
  lightIntensity: number;
  onChangeLightIntensity: (val: number) => void;
  scale: number;
  onChangeScale: (val: number) => void;
  rotationY: number;
  onChangeRotationY: (val: number) => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  wireframe: boolean;
  onToggleWireframe: () => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  onSetCameraAngle: (angle: 'hero' | 'front' | 'top' | 'side') => void;
  onResetCamera: () => void;
  onAddToCart?: (product: Product) => void;
  isCollapsed?: boolean;
}

export const StudioSidebar: React.FC<StudioSidebarProps> = ({
  product,
  onSwitchProductClick,
  activeEnv,
  onSelectEnv,
  lightIntensity,
  onChangeLightIntensity,
  scale,
  onChangeScale,
  rotationY,
  onChangeRotationY,
  showGrid,
  onToggleGrid,
  wireframe,
  onToggleWireframe,
  autoRotate,
  onToggleAutoRotate,
  onSetCameraAngle,
  onResetCamera,
  onAddToCart,
  isCollapsed = false,
}) => {
  return (
    <aside
      className={`vizora-studio-sidebar ${isCollapsed ? 'vizora-studio-sidebar--collapsed' : ''
        }`}
      aria-label="Studio customization controls"
    >
      <div className="vizora-studio-sidebar__header">
        <h2 className="vizora-studio-sidebar__title">
          <Sliders size={18} className="text-accent" />
          <span>Studio Controls</span>
        </h2>
        <Badge variant="3d" size="sm">
          WebGL Live
        </Badge>
      </div>

      <div className="vizora-studio-sidebar__content">
        {/* Active Product Info Box */}
        <div className="vizora-studio-product-card">
          <div className="vizora-studio-product-card__row">
            <img
              src={product.images[0]}
              alt={product.title}
              className="vizora-studio-product-card__thumb"
            />
            <div className="vizora-studio-product-card__info">
              <span className="vizora-studio-product-card__title">
                {product.title}
              </span>
              <span className="vizora-studio-product-card__price">
                ${product.price.toLocaleString()} {product.currency}
              </span>
              <span className="text-xs text-muted">by {product.sellerName}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              style={{ flex: 1 }}
              onClick={onSwitchProductClick}
              leftIcon={<RotateCw size={13} />}
            >
              Switch Model
            </Button>
            <Link to={`/products/${product.slug}`} target="_blank">
              <Button
                variant="ghost"
                size="sm"
                title="Open Product Details"
                aria-label="Open Product Details"
              >
                <ExternalLink size={14} />
              </Button>
            </Link>
          </div>
        </div>

        {/* 1. Environment Presets Selection */}
        <div className="vizora-studio-section">
          <div className="vizora-studio-section__label">
            <span>Room & Lighting Environment</span>
            <span style={{ fontSize: '11px', color: 'var(--color-accent)' }}>
              {activeEnv.toneName}
            </span>
          </div>

          <div className="vizora-studio-env-list" role="radiogroup" aria-label="Environment presets">
            {STUDIO_ENVIRONMENTS.map((env) => {
              const isSelected = activeEnv.id === env.id;
              return (
                <button
                  key={env.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`vizora-studio-env-item ${isSelected ? 'vizora-studio-env-item--active' : ''
                    }`}
                  onClick={() => onSelectEnv(env)}
                >
                  <div
                    className="vizora-studio-env-preview-circle"
                    style={{
                      background: `linear-gradient(135deg, ${env.backgroundColor} 40%, ${env.floorColor} 100%)`,
                    }}
                  />
                  <div className="vizora-studio-env-info">
                    <span className="vizora-studio-env-name">{env.name}</span>
                    <span className="vizora-studio-env-desc">{env.description}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Light & Ambience Slider */}
        <div className="vizora-studio-section">
          <div className="vizora-studio-section__label">
            <span className="flex items-center gap-1">
              <Sun size={13} />
              <span>Illumination Strength</span>
            </span>
            <span>{Math.round(lightIntensity * 100)}%</span>
          </div>

          <div className="vizora-studio-slider-row">
            <input
              type="range"
              min={0.4}
              max={2.2}
              step={0.1}
              value={lightIntensity}
              onChange={(e) => onChangeLightIntensity(Number(e.target.value))}
              className="vizora-studio-slider-input"
              aria-label="Illumination Strength"
            />
          </div>
        </div>

        {/* 3. Scale & Spatial Adjustments */}
        <div className="vizora-studio-section">
          <div className="vizora-studio-section__label">
            <span className="flex items-center gap-1">
              <Maximize size={13} />
              <span>Scale & Dimensions</span>
            </span>
            <button
              type="button"
              className="text-xs text-accent"
              onClick={() => onChangeScale(1.0)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Reset 100%
            </button>
          </div>

          <div className="vizora-studio-slider-row">
            <div className="vizora-studio-slider-header">
              <span>Display Scale</span>
              <span>{Math.round(scale * 100)}%</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={1.5}
              step={0.05}
              value={scale}
              onChange={(e) => onChangeScale(Number(e.target.value))}
              className="vizora-studio-slider-input"
              aria-label="Display Scale"
            />
          </div>

          <div className="vizora-studio-slider-row" style={{ marginTop: '6px' }}>
            <div className="vizora-studio-slider-header">
              <span>Y-Axis Rotation</span>
              <span>{Math.round(rotationY)}°</span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              step={5}
              value={rotationY}
              onChange={(e) => onChangeRotationY(Number(e.target.value))}
              className="vizora-studio-slider-input"
              aria-label="Y-Axis Rotation"
            />
          </div>
        </div>

        {/* 4. Camera Angle Presets */}
        <div className="vizora-studio-section">
          <div className="vizora-studio-section__label">
            <span className="flex items-center gap-1">
              <Compass size={13} />
              <span>Camera Perspective</span>
            </span>
            <button
              type="button"
              className="text-xs text-muted"
              onClick={onResetCamera}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Reset
            </button>
          </div>

          <div className="vizora-studio-camera-grid">
            <button
              type="button"
              className="vizora-studio-cam-btn"
              onClick={() => onSetCameraAngle('hero')}
            >
              Hero 45°
            </button>
            <button
              type="button"
              className="vizora-studio-cam-btn"
              onClick={() => onSetCameraAngle('front')}
            >
              Front View
            </button>
            <button
              type="button"
              className="vizora-studio-cam-btn"
              onClick={() => onSetCameraAngle('top')}
            >
              Top Plan
            </button>
            <button
              type="button"
              className="vizora-studio-cam-btn"
              onClick={() => onSetCameraAngle('side')}
            >
              Side Profile
            </button>
          </div>
        </div>

        {/* 5. Toggles: Metric Grid, Wireframe, Auto-rotate */}
        <div className="vizora-studio-section">
          <div className="vizora-studio-section__label">
            <span>Viewport Helpers</span>
          </div>

          <label className="vizora-studio-toggle-row">
            <span className="flex items-center gap-2">
              <Grid size={14} className="text-muted" />
              <span>Floor Metric Grid (0.5m)</span>
            </span>
            <input
              type="checkbox"
              checked={showGrid}
              onChange={onToggleGrid}
              className="vizora-studio-checkbox"
            />
          </label>

          <label className="vizora-studio-toggle-row">
            <span className="flex items-center gap-2">
              <RefreshCcw size={14} className="text-muted" />
              <span>360° Auto Rotation</span>
            </span>
            <input
              type="checkbox"
              checked={autoRotate}
              onChange={onToggleAutoRotate}
              className="vizora-studio-checkbox"
            />
          </label>

          <label className="vizora-studio-toggle-row">
            <span className="flex items-center gap-2">
              <Grid size={14} className="text-muted" />
              <span>Polygon Wireframe</span>
            </span>
            <input
              type="checkbox"
              checked={wireframe}
              onChange={onToggleWireframe}
              className="vizora-studio-checkbox"
            />
          </label>
        </div>

        {/* Bottom Cart Action */}
        <div className="vizora-studio-footer-actions">
          <Button
            variant="primary"
            size="lg"
            style={{ width: '100%' }}
            leftIcon={<ShoppingBag size={17} />}
            onClick={() => onAddToCart?.(product)}
          >
            Add to Cart &bull; ${product.price.toLocaleString()}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default StudioSidebar;
