/**
 * Vizora — Core TypeScript Domain Types & Interfaces
 */

export type UserRole = 'customer' | 'seller' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  storeName?: string;
  createdAt: string;
}

export type ProcessingStatus =
  | 'idle'
  | 'validating'
  | 'extracting_frames'
  | 'reconstructing'
  | 'optimizing'
  | 'ready'
  | 'failed';

export interface Model3DMetadata {
  id: string;
  productId: string;
  modelUrl: string;
  format: 'glb' | 'gltf';
  status: ProcessingStatus;
  fileSizeBytes?: number;
  polygonCount?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  defaultEnvironment?: string;
  processedAt?: string;
  errorMessage?: string;
}

export interface ReconstructionJob {
  jobId: string;
  productId: string;
  videoUrl: string;
  status: ProcessingStatus;
  progressPercentage: number;
  currentStepMessage: string;
  startedAt: string;
  completedAt?: string;
  errorMessage?: string;
  outputModelUrl?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName?: string;
  imageUrl?: string;
  productCount?: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  videoUrl?: string;
  model3d?: Model3DMetadata;
  has3D: boolean;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  sellerId: string;
  sellerName: string;
  tags: string[];
  isPublished: boolean;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type StudioEnvironment =
  | 'studio-clean'
  | 'warm-living'
  | 'nordic-minimal'
  | 'outdoor-terrace'
  | 'dark-gallery';

export interface StudioEnvironmentConfig {
  id: StudioEnvironment;
  name: string;
  description: string;
  preset: 'city' | 'studio' | 'sunset' | 'apartment' | 'lobby' | 'park';
  backgroundColor: string;
  lightIntensity: number;
  floorColor: string;
  floorRoughness: number;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  addedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  currency: string;
  quantity: number;
  imageUrl: string;
  has3D: boolean;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
  status: OrderStatus;
  createdAt: string;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}
