'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { CSSProperties, ReactNode } from 'react'

/* Square-style scroll reveal: each block fades in and rises once, the first
   time it scrolls into view. Children cascade via the delay prop. */
export default function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
  style,
}: {
  children: ReactNode
  delay?: number
  /* set 0 for fade-only (safe around position: sticky) */
  y?: number
  className?: string
  style?: CSSProperties
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: reduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -70px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
