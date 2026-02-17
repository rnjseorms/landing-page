'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'kakao'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  fullWidth?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-bold rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2'

  const variants = {
    primary: 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-600 hover:to-teal-600 hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5',
    secondary: 'bg-slate-700 text-white hover:bg-slate-600 hover:shadow-lg hover:-translate-y-0.5',
    outline: 'border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white',
    kakao: 'bg-[#FEE500] text-[#000000] hover:bg-[#FDD835] hover:shadow-lg hover:-translate-y-0.5',
  }

  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
  }

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
