import React from 'react';
import { Minus, Plus } from 'lucide-react';
import './QuantitySelector.css';

export interface QuantitySelectorProps {
  quantity: number;
  min?: number;
  max?: number;
  onChange: (qty: number) => void;
  disabled?: boolean;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  min = 1,
  max = 99,
  onChange,
  disabled = false,
}) => {
  const handleDecrement = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className="vizora-qty-selector">
      <button
        type="button"
        className="vizora-qty-btn"
        onClick={handleDecrement}
        disabled={disabled || quantity <= min}
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>

      <span className="vizora-qty-value" aria-live="polite">
        {quantity}
      </span>

      <button
        type="button"
        className="vizora-qty-btn"
        onClick={handleIncrement}
        disabled={disabled || quantity >= max}
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  );
};

export default QuantitySelector;
