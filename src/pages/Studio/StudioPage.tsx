import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  Maximize2,
  Minimize2,
  Camera,
  Sidebar as SidebarIcon,
  Compass,
  Layers,
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../../data/mockData';
import {
  STUDIO_ENVIRONMENTS,
  type StudioEnvironmentDefinition,
} from '../../data/studioEnvironments';
import { StudioCanvas, type StudioCanvasHandle } from './StudioCanvas';
import { StudioSidebar } from './StudioSidebar';
import { ProductSelectorModal } from './ProductSelectorModal';
import type { Product } from '../../types';
import './StudioPage.css';

export interface StudioPageProps {
  onAddToCart?: (product: Product) => void;
}

export const StudioPage: React.FC<StudioPageProps> = ({ onAddToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const canvasRef = useRef<StudioCanvasHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Identify target 3D product
  const productIdFromQuery = searchParams.get('product');
  const initialProduct =
    MOCK_PRODUCTS.find((p) => p.id === productIdFromQuery && p.has3D && p.model3d?.modelUrl) ||
    MOCK_PRODUCTS.find((p) => p.has3D && p.model3d?.modelUrl) ||
    MOCK_PRODUCTS[0];

  const [activeProduct, setActiveProduct] = useState<Product>(initialProduct);
  const [activeEnv, setActiveEnv] = useState<StudioEnvironmentDefinition>(STUDIO_ENVIRONMENTS[0]);
  const [lightIntensity, setLightIntensity] = useState<number>(1.0);
  const [scale, setScale] = useState<number>(1.0);
  const [rotationY, setRotationY] = useState<number>(0);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState<boolean>(false);

  // Sync state if URL query changes
  useEffect(() => {
    if (productIdFromQuery && productIdFromQuery !== activeProduct.id) {
      const match = MOCK_PRODUCTS.find((p) => p.id === productIdFromQuery);
      if (match && match.has3D && match.model3d?.modelUrl) {
        setActiveProduct(match);
      }
    }
  }, [productIdFromQuery, activeProduct.id]);

  const handleSelectProduct = (product: Product) => {
    setActiveProduct(product);
    setSearchParams({ product: product.id });
    // Reset transforms for new model
    setScale(1.0);
    setRotationY(0);
    canvasRef.current?.resetControls();
  };

  const handleToggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {
          setIsFullscreen(true);
        });
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => { });
      }
      setIsFullscreen(false);
    }
  };

  const handleCaptureSnapshot = () => {
    const dataUrl = canvasRef.current?.captureScreenshot();
    if (dataUrl) {
      const link = document.createElement('a');
      link.download = `vizora-studio-${activeProduct.slug}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`vizora-studio-page ${isFullscreen ? 'vizora-studio-page--fullscreen' : ''
        }`}
    >
      {/* Central 3D Canvas Viewport */}
      <main className="vizora-studio-viewport" aria-label="3D Visualization Canvas">
        {/* Top Floating Action Bar */}
        <div className="vizora-studio-top-bar">
          <div className="vizora-studio-top-left">
            <div className="vizora-studio-badge">
              <Sparkles size={13} className="text-accent" />
              <span>Visualization Studio</span>
            </div>

            <button
              type="button"
              className="vizora-studio-action-pill"
              onClick={() => setIsSelectorOpen(true)}
              aria-label="Switch active product"
            >
              <Layers size={13} />
              <span>Model: {activeProduct.title}</span>
            </button>
          </div>

          <div className="vizora-studio-top-actions">
            {/* Snapshot Render button */}
            <button
              type="button"
              className="vizora-studio-action-pill"
              onClick={handleCaptureSnapshot}
              title="Download High-Res Snapshot"
              aria-label="Download snapshot"
            >
              <Camera size={14} />
              <span>Snapshot</span>
            </button>

            {/* Fullscreen button */}
            <button
              type="button"
              className="vizora-studio-action-pill"
              onClick={handleToggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>

            {/* Toggle Controls Drawer button */}
            <button
              type="button"
              className="vizora-studio-action-pill"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              title={isSidebarOpen ? 'Hide Controls' : 'Show Controls'}
              aria-label="Toggle sidebar controls"
            >
              <SidebarIcon size={14} />
              <span>{isSidebarOpen ? 'Hide Panel' : 'Controls'}</span>
            </button>
          </div>
        </div>

        {/* Real-time 3D Scene */}
        {activeProduct.model3d?.modelUrl ? (
          <StudioCanvas
            ref={canvasRef}
            modelUrl={activeProduct.model3d.modelUrl}
            environment={activeEnv}
            lightIntensity={lightIntensity}
            scale={scale}
            rotationY={rotationY}
            showGrid={showGrid}
            wireframe={wireframe}
            autoRotate={autoRotate}
          />
        ) : (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p>No 3D Model available for this item.</p>
          </div>
        )}

        {/* Bottom Floating Bar */}
        <div className="vizora-studio-bottom-bar">
          {/* Quick Environment Selector Chips */}
          <div
            className="vizora-studio-nav-chips"
            role="tablist"
            aria-label="Quick environment switcher"
          >
            {STUDIO_ENVIRONMENTS.map((env) => (
              <button
                key={env.id}
                type="button"
                role="tab"
                aria-selected={activeEnv.id === env.id}
                className={`vizora-studio-nav-chip ${activeEnv.id === env.id
                    ? 'vizora-studio-nav-chip--active'
                    : ''
                  }`}
                onClick={() => setActiveEnv(env)}
              >
                {env.name}
              </button>
            ))}
          </div>

          {/* Mouse Orbit Controls Hint */}
          <div className="vizora-studio-orbit-hint">
            <Compass size={13} />
            <span>Drag: Orbit &bull; Scroll: Zoom &bull; Right-Click: Pan</span>
          </div>
        </div>
      </main>

      {/* Right Customization Sidebar */}
      <StudioSidebar
        product={activeProduct}
        onSwitchProductClick={() => setIsSelectorOpen(true)}
        activeEnv={activeEnv}
        onSelectEnv={setActiveEnv}
        lightIntensity={lightIntensity}
        onChangeLightIntensity={setLightIntensity}
        scale={scale}
        onChangeScale={setScale}
        rotationY={rotationY}
        onChangeRotationY={setRotationY}
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid(!showGrid)}
        wireframe={wireframe}
        onToggleWireframe={() => setWireframe(!wireframe)}
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
        onSetCameraAngle={(angle) => canvasRef.current?.setCameraAngle(angle)}
        onResetCamera={() => canvasRef.current?.resetControls()}
        onAddToCart={onAddToCart}
        isCollapsed={!isSidebarOpen}
      />

      {/* Model Selection Modal */}
      <ProductSelectorModal
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        selectedProductId={activeProduct.id}
        onSelectProduct={handleSelectProduct}
      />
    </div>
  );
};

export default StudioPage;
