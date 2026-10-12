import React, { useMemo, useEffect } from 'react';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

export interface ModelMeshProps {
  url: string;
  wireframe?: boolean;
}

export const ModelMesh: React.FC<ModelMeshProps> = ({ url, wireframe = false }) => {
  const { scene } = useGLTF(url);

  // Clone scene so materials/properties don't leak between renders
  const copiedScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    copiedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((mat) => {
            if ('wireframe' in mat) {
              (mat as THREE.MeshStandardMaterial).wireframe = wireframe;
            }
          });
        }
      }
    });
  }, [copiedScene, wireframe]);

  return (
    <Center top>
      <primitive object={copiedScene} />
    </Center>
  );
};

export default ModelMesh;
