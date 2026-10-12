import React, { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  ContactShadows,
} from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import {
  RotateCw,
  Maximize2,
  Minimize2,
  Grid,
  Compass,
  Sparkles,
  RefreshCw,
  Box,
} from 'lucide-react';
import { Badge } from '../../ui';
import { ModelMesh } from './ModelMesh';
import { ModelViewerLoader } from './ModelViewerLoader';
import { ModelViewerErrorBoundary } from './ModelViewerErrorBoundary';
import './ModelViewer.css';

export type EnvironmentPreset = 'studio' | 'apartment' | 'sunset' | 'city' | 'park';

export interface ModelViewerProps {
  modelUrl: string;
  title?: string;
  polygonCount?: number;
  format?: string;
  defaultEnvironment?: EnvironmentPreset;
  className?: string;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({
  modelUrl,
  title = 'Product 3D Model',
  polygonCount,
  format = 'GLB',
  defaultEnvironment = 'studio',
  className = '',
}) => {
  const [environment, setEnvironment] = useState<EnvironmentPreset>(defaultEnvironment);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [retryKey, setRetryKey] = useState<number>(0);

  const controlsRef = useRef<OrbitControlsImpl>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
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
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`vizora-viewer3d ${
        isFullscreen ? 'vizora-viewer3d--fullscreen' : ''
      } ${className}`}
      aria-label={`Interactive 3D model viewer for ${title}`}
    >
      {/* Top Floating Action Bar */}
      <div className="vizora-viewer3d__top-bar">
        <div className="vizora-viewer3d__top-left">
          <Badge variant="3d" size="sm" icon={<Box size={11} />}>
            {format.toUpperCase()} Mesh
          </Badge>
          {polygonCount && (
            <Badge variant="default" size="sm">
              {polygonCount.toLocaleString()} Polys
            </Badge>
          )}
        </div>

        <div className="vizora-viewer3d__top-actions">
          {/* Auto-rotate toggle */}
          <button
            type="button"
            className={`vizora-viewer3d__tool-btn ${
              autoRotate ? 'vizora-viewer3d__tool-btn--active' : ''
            }`}
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? 'Disable 360° Auto-Rotate' : 'Enable 360° Auto-Rotate'}
            aria-label="Toggle auto rotate"
          >
            <RotateCw size={15} />
          </button>

          {/* Wireframe toggle */}
          <button
            type="button"
            className={`vizora-viewer3d__tool-btn ${
              wireframe ? 'vizora-viewer3d__tool-btn--active' : ''
            }`}
            onClick={() => setWireframe(!wireframe)}
            title={wireframe ? 'Show Textured Surfaces' : 'Inspect Polygon Wireframe'}
            aria-label="Toggle wireframe inspection mode"
          >
            <Grid size={15} />
          </button>

          {/* Reset Camera button */}
          <button
            type="button"
            className="vizora-viewer3d__tool-btn"
            onClick={handleResetCamera}
            title="Reset Camera Angle"
            aria-label="Reset camera"
          >
            <RefreshCw size={15} />
          </button>

          {/* Fullscreen button */}
          <button
            type="button"
            className="vizora-viewer3d__tool-btn"
            onClick={handleToggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Layer */}
      <div className="vizora-viewer3d__canvas-container">
        <ModelViewerErrorBoundary key={retryKey} onRetry={() => setRetryKey((k) => k + 1)}>
          <Canvas
            shadows
            camera={{ position: [0, 1.2, 2.5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
          >
            {/* Ambient & Directional Lighting */}
            <ambientLight intensity={0.7} />
            <directionalLight
              position={[5, 10, 5]}
              intensity={1.2}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-bias={-0.0001}
            />
            <directionalLight position={[-5, 5, -5]} intensity={0.4} />

            {/* HDR Environment Preset */}
            <Environment preset={environment} />

            {/* Suspended Model Mesh */}
            <Suspense fallback={null}>
              <ModelMesh url={modelUrl} wireframe={wireframe} />
              {/* Realistic Floor Contact Shadows */}
              <ContactShadows
                position={[0, 0, 0]}
                opacity={0.55}
                scale={8}
                blur={1.6}
                far={3}
              />
            </Suspense>

            {/* Camera Orbit Controls */}
            <OrbitControls
              ref={controlsRef}
              autoRotate={autoRotate}
              autoRotateSpeed={1.5}
              enablePan={true}
              enableZoom={true}
              minDistance={0.8}
              maxDistance={7}
              maxPolarAngle={Math.PI / 2 + 0.1} // Prevent going completely below ground
            />
          </Canvas>
        </ModelViewerErrorBoundary>

        {/* Loading Progress Overlay */}
        <ModelViewerLoader />
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="vizora-viewer3d__bottom-bar">
        {/* Interaction Guidance Hint */}
        <div className="vizora-viewer3d__hint">
          <Compass size={13} />
          <span>Drag to rotate &bull; Scroll to zoom &bull; Right-click to pan</span>
        </div>

        {/* Environment Preset Switcher */}
        <div className="vizora-viewer3d__env-selector" role="group" aria-label="Environment lighting presets">
          <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', paddingLeft: '6px', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Sparkles size={11} />
            <span>Light:</span>
          </span>
          {(['studio', 'apartment', 'sunset', 'city'] as EnvironmentPreset[]).map((env) => (
            <button
              key={env}
              type="button"
              className={`vizora-viewer3d__env-chip ${
                environment === env ? 'vizora-viewer3d__env-chip--active' : ''
              }`}
              onClick={() => setEnvironment(env)}
              aria-pressed={environment === env}
            >
              {env.charAt(0).toUpperCase() + env.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelViewer;
