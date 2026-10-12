import React from 'react';
import { useProgress } from '@react-three/drei';
import { Loader2 } from 'lucide-react';

export const ModelViewerLoader: React.FC = () => {
  const { progress, active } = useProgress();

  if (!active && progress === 100) return null;

  return (
    <div className="vizora-viewer3d__loader" aria-live="polite">
      <Loader2 size={32} className="text-accent vizora-button__spinner" />
      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
        Loading 3D Geometry ({Math.round(progress)}%)
      </span>
      <div className="vizora-viewer3d__progress-track">
        <div
          className="vizora-viewer3d__progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-xs text-muted">Parsing GLTF Binary & PBR Textures</span>
    </div>
  );
};

export default ModelViewerLoader;
