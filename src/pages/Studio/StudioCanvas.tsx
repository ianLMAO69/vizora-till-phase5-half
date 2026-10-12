import { Suspense, forwardRef, useImperativeHandle, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Grid,
} from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { ModelMesh } from '../../components/viewer3d/ModelViewer/ModelMesh';
import { ModelViewerLoader } from '../../components/viewer3d/ModelViewer/ModelViewerLoader';
import { ModelViewerErrorBoundary } from '../../components/viewer3d/ModelViewer/ModelViewerErrorBoundary';
import type { StudioEnvironmentDefinition } from '../../data/studioEnvironments';

export interface StudioCanvasHandle {
  setCameraAngle: (angle: 'hero' | 'front' | 'top' | 'side') => void;
  resetControls: () => void;
  captureScreenshot: () => string | null;
}

export interface StudioCanvasProps {
  modelUrl: string;
  environment: StudioEnvironmentDefinition;
  lightIntensity: number;
  scale: number;
  rotationY: number;
  showGrid: boolean;
  wireframe: boolean;
  autoRotate: boolean;
}

export const StudioCanvas = forwardRef<StudioCanvasHandle, StudioCanvasProps>(
  (
    {
      modelUrl,
      environment,
      lightIntensity,
      scale,
      rotationY,
      showGrid,
      wireframe,
      autoRotate,
    },
    ref
  ) => {
    const controlsRef = useRef<OrbitControlsImpl>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => ({
      setCameraAngle: (angle: 'hero' | 'front' | 'top' | 'side') => {
        if (!controlsRef.current) return;
        const camera = controlsRef.current.object as THREE.PerspectiveCamera;

        switch (angle) {
          case 'hero':
            camera.position.set(1.8, 1.4, 2.2);
            controlsRef.current.target.set(0, 0.4, 0);
            break;
          case 'front':
            camera.position.set(0, 0.7, 2.6);
            controlsRef.current.target.set(0, 0.4, 0);
            break;
          case 'top':
            camera.position.set(0, 3.2, 0.05);
            controlsRef.current.target.set(0, 0, 0);
            break;
          case 'side':
            camera.position.set(2.6, 0.7, 0);
            controlsRef.current.target.set(0, 0.4, 0);
            break;
        }
        controlsRef.current.update();
      },
      resetControls: () => {
        if (controlsRef.current) {
          controlsRef.current.reset();
        }
      },
      captureScreenshot: () => {
        if (canvasRef.current) {
          return canvasRef.current.toDataURL('image/png');
        }
        return null;
      },
    }));

    return (
      <div className="vizora-studio-canvas-wrapper" style={{ width: '100%', height: '100%', position: 'relative' }}>
        <ModelViewerErrorBoundary fallbackMessage="Unable to render product in this environment.">
          <Canvas
            ref={canvasRef}
            shadows
            camera={{ position: [1.8, 1.4, 2.2], fov: 42 }}
            gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
            style={{ backgroundColor: environment.backgroundColor }}
          >
            {/* Dynamic Ambient & Directional Lighting */}
            <ambientLight
              color={environment.ambientColor}
              intensity={0.6 * lightIntensity}
            />
            <directionalLight
              position={[6, 12, 6]}
              intensity={1.2 * lightIntensity}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-bias={-0.0001}
            />
            <directionalLight
              position={[-6, 6, -6]}
              intensity={0.4 * lightIntensity}
            />

            {/* HDR Environment Preset */}
            <Environment preset={environment.preset} />

            {/* Studio Floor Mesh */}
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -0.002, 0]}
              receiveShadow
            >
              <planeGeometry args={[50, 50]} />
              <meshStandardMaterial
                color={environment.floorColor}
                roughness={environment.floorRoughness}
                metalness={environment.floorMetalness}
              />
            </mesh>

            {/* Spatial Measurement Grid (0.5m grid tiles) */}
            {showGrid && (
              <Grid
                position={[0, 0.001, 0]}
                args={[12, 12]}
                cellSize={0.25}
                cellThickness={0.8}
                cellColor="#a0aec0"
                sectionSize={1}
                sectionThickness={1.2}
                sectionColor="#4a5568"
                fadeDistance={8}
                fadeStrength={1.5}
              />
            )}

            {/* Grounding Contact Shadows */}
            <ContactShadows
              position={[0, 0, 0]}
              opacity={0.65}
              scale={8}
              blur={1.8}
              far={3}
            />

            {/* Transformed Model */}
            <Suspense fallback={null}>
              <group
                rotation={[0, (rotationY * Math.PI) / 180, 0]}
                scale={[scale, scale, scale]}
              >
                <ModelMesh url={modelUrl} wireframe={wireframe} />
              </group>
            </Suspense>

            {/* Camera Orbit Controls */}
            <OrbitControls
              ref={controlsRef}
              autoRotate={autoRotate}
              autoRotateSpeed={1.0}
              enableDamping={true}
              dampingFactor={0.06}
              minDistance={0.8}
              maxDistance={7}
              maxPolarAngle={Math.PI / 2 - 0.02} // Prevent viewing beneath floor
            />
          </Canvas>
        </ModelViewerErrorBoundary>

        {/* Loading Progress */}
        <ModelViewerLoader />
      </div>
    );
  }
);

StudioCanvas.displayName = 'StudioCanvas';
export default StudioCanvas;
