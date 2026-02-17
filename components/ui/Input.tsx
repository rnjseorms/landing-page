'use client'

import { InputHTMLAttributes, SelectHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-lg border border-gray-300
            focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10
            transition-all duration-200
            ${error ? 'border-error' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-lg border border-gray-300
            focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10
            transition-all duration-200 bg-white
            ${error ? 'border-error' : ''}
            ${className}
          `}
          {...props}
        >
          <option value="">선택해주세요</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-error">{error}</p>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            ref={ref}
            type="checkbox"
            className={`
              mt-1 w-5 h-5 rounded border-gray-300
              text-cyan-500 focus:ring-cyan-500
              ${className}
            `}
            {...props}
          />
          <span className="text-sm text-gray-600">{label}</span>
        </label>
        {error && (
          <p className="mt-1 text-sm text-error">{error}</p>
        )}
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'
