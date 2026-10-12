import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './Breadcrumbs.css';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="vizora-breadcrumbs" aria-label="Breadcrumbs">
      <ol className="vizora-breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="vizora-breadcrumbs__item">
              {item.path && !isLast ? (
                <Link to={item.path} className="vizora-breadcrumbs__link">
                  {item.label}
                </Link>
              ) : (
                <span className="vizora-breadcrumbs__current" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className="vizora-breadcrumbs__separator" aria-hidden="true">
                  <ChevronRight size={12} />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
