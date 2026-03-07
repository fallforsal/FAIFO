'use client'

import { cn } from '@/lib/cn'
import { ReactNode } from 'react'

interface VietnameseTextProps {
  children: ReactNode
  variant?: 'title' | 'heading' | 'subheading' | 'body' | 'caption'
  className?: string
}

const variantStyles = {
  title: 'font-serif text-4xl md:text-5xl font-bold leading-tight',
  heading: 'font-serif text-2xl md:text-3xl font-bold leading-snug',
  subheading: 'font-sans text-lg md:text-xl leading-relaxed',
  body: 'font-sans text-base md:text-lg leading-relaxed',
  caption: 'font-sans text-sm md:text-base leading-relaxed text-ceramic-dark/75',
}

export function VietnameseText({
  children,
  variant = 'body',
  className,
}: VietnameseTextProps) {
  return (
    <div className={cn(variantStyles[variant], className)}>
      {children}
    </div>
  )
}
