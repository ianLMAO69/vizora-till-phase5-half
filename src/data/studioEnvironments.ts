import type { StudioEnvironmentConfig } from '../types';

export interface StudioEnvironmentDefinition extends StudioEnvironmentConfig {
  floorMetalness: number;
  ambientColor: string;
  toneName: string;
}

export const STUDIO_ENVIRONMENTS: StudioEnvironmentDefinition[] = [
  {
    id: 'studio-clean',
    name: 'Clean Studio',
    description: 'Neutral museum lighting with soft diffused shadows and pure white ground.',
    preset: 'studio',
    backgroundColor: '#f8f8f9',
    lightIntensity: 1.0,
    floorColor: '#eef0f3',
    floorRoughness: 0.85,
    floorMetalness: 0.05,
    ambientColor: '#ffffff',
    toneName: 'Neutral 5500K',
  },
  {
    id: 'warm-living',
    name: 'Warm Living Room',
    description: 'Cozy residential ambiance with warm golden hour reflections and oak undertones.',
    preset: 'sunset',
    backgroundColor: '#faf6f0',
    lightIntensity: 1.25,
    floorColor: '#dfd7cc',
    floorRoughness: 0.65,
    floorMetalness: 0.1,
    ambientColor: '#ffedd5',
    toneName: 'Warm 3200K',
  },
  {
    id: 'nordic-minimal',
    name: 'Nordic Minimal',
    description: 'Crisp Scandinavian daylight through large windows with bleached stone textures.',
    preset: 'apartment',
    backgroundColor: '#f4f6f8',
    lightIntensity: 1.1,
    floorColor: '#e2e8f0',
    floorRoughness: 0.9,
    floorMetalness: 0.02,
    ambientColor: '#f8fafc',
    toneName: 'Cool Daylight 6200K',
  },
  {
    id: 'outdoor-terrace',
    name: 'Outdoor Terrace',
    description: 'Direct natural sunlight with high-contrast shadows and concrete paving.',
    preset: 'city',
    backgroundColor: '#eff6ff',
    lightIntensity: 1.4,
    floorColor: '#cbd5e1',
    floorRoughness: 0.95,
    floorMetalness: 0.05,
    ambientColor: '#dbeafe',
    toneName: 'Direct Sun 5800K',
  },
  {
    id: 'dark-gallery',
    name: 'Dark Exhibition Gallery',
    description: 'Dramatic architectural spotlighting on dark obsidian surfaces for luxury inspection.',
    preset: 'park',
    backgroundColor: '#121316',
    lightIntensity: 0.85,
    floorColor: '#1c1e24',
    floorRoughness: 0.5,
    floorMetalness: 0.25,
    ambientColor: '#334155',
    toneName: 'Spotlight Accent',
  },
];
