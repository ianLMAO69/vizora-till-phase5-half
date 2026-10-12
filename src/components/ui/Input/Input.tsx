import React, { useId } from 'react';
import './Input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  id,
  disabled,
  className = '',
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={`vizora-input-wrapper ${className}`}>
      {label && (
        <label htmlFor={inputId} className="vizora-input-label">
          {label}
        </label>
      )}
      <div
        className={`vizora-input-control-container ${
          error ? 'vizora-input-control-container--error' : ''
        } ${disabled ? 'vizora-input-control-container--disabled' : ''}`}
      >
        {leftIcon && <span className="vizora-input-icon">{leftIcon}</span>}
        <input
          id={inputId}
          disabled={disabled}
          className="vizora-input-element"
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          {...props}
        />
        {rightIcon && <span className="vizora-input-icon">{rightIcon}</span>}
      </div>
      {error ? (
        <p id={`${inputId}-error`} className="vizora-input-error">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-helper`} className="vizora-input-helper">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

export default Input;
