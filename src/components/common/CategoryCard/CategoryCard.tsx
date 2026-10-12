import React from 'react';
import { Link } from 'react-router-dom';
import type { ProductCategory } from '../../../types';
import './CategoryCard.css';

export interface CategoryCardProps {
  category: ProductCategory;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/products?category=${category.slug}`} className="vizora-category-card">
      {category.imageUrl && (
        <img
          src={category.imageUrl}
          alt={category.name}
          className="vizora-category-card__image"
          loading="lazy"
        />
      )}
      <div className="vizora-category-card__gradient" />
      <div className="vizora-category-card__content">
        <h3 className="vizora-category-card__name">{category.name}</h3>
        {category.productCount !== undefined && (
          <p className="vizora-category-card__count">{category.productCount} models & designs</p>
        )}
      </div>
    </Link>
  );
};

export default CategoryCard;
