'use client'

import { useState, ReactNode } from 'react'

interface AccordionItemProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left hover:text-cyan-600 transition-colors"
      >
        <span className="font-semibold text-gray-800 pr-4">{title}</span>
        <span
          className={`
            flex-shrink-0 w-6 h-6 flex items-center justify-center
            transition-transform duration-300
            ${isOpen ? 'rotate-180' : ''}
          `}
        >
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-out
          ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}
        `}
      >
        <div className="text-gray-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

interface AccordionProps {
  children: ReactNode
  className?: string
}

export default function Accordion({ children, className = '' }: AccordionProps) {
  return (
    <div className={`divide-y divide-gray-200 ${className}`}>
      {children}
    </div>
  )
}
