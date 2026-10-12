import React from 'react';
import type { ProductCategory } from '../../../types';
import './CategoryPills.css';

export interface CategoryPillsProps {
  categories: ProductCategory[];
  selectedCategorySlug: string;
  onSelectCategory: (slug: string) => void;
  showAllOption?: boolean;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  categories,
  selectedCategorySlug,
  onSelectCategory,
  showAllOption = true,
}) => {
  return (
    <div className="vizora-category-pills" role="tablist" aria-label="Product categories">
      {showAllOption && (
        <button
          type="button"
          role="tab"
          aria-selected={selectedCategorySlug === 'all'}
          className={`vizora-category-pill ${
            selectedCategorySlug === 'all' ? 'vizora-category-pill--active' : ''
          }`}
          onClick={() => onSelectCategory('all')}
        >
          All Items
        </button>
      )}

      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          role="tab"
          aria-selected={selectedCategorySlug === cat.slug}
          className={`vizora-category-pill ${
            selectedCategorySlug === cat.slug ? 'vizora-category-pill--active' : ''
          }`}
          onClick={() => onSelectCategory(cat.slug)}
        >
          {cat.name}
          {cat.productCount !== undefined && (
            <span style={{ opacity: 0.65, fontSize: '11px' }}>({cat.productCount})</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default CategoryPills;
