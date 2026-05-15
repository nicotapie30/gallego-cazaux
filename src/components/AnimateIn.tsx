'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimateInProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
}

export function AnimateIn({ children, className = '', delay = 0, direction = 'up' }: AnimateInProps) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: direction === 'up' ? 32 : 0,
        x: direction === 'left' ? -32 : direction === 'right' ? 32 : 0,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0, 0, 0.2, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  )
}
