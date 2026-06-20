'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'drag' | 'view'>('default')

  // Core coordinates
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring configuration for trailing circle
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 }
  const trailingX = useSpring(mouseX, springConfig)
  const trailingY = useSpring(mouseY, springConfig)

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      // Determine cursor type based on hovered elements
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer')
      ) {
        setCursorType('pointer')
      } else if (
        target.closest('.draggable-skill') ||
        target.classList.contains('draggable-skill')
      ) {
        setCursorType('drag')
      } else if (
        target.closest('.project-card') ||
        target.classList.contains('project-card')
      ) {
        setCursorType('view')
      } else {
        setCursorType('default')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    // Append standard cursor hiding styling dynamically to body
    const style = document.createElement('style')
    style.innerHTML = `
      @media (pointer: fine) {
        body, a, button, [role="button"], select, input, textarea, .cursor-pointer {
          cursor: none !important;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.head.removeChild(style)
    }
  }, [mouseX, mouseY])

  if (!mounted) return null

  // Size and styling configs per state
  const outerVariants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      border: '1.5px solid rgba(255, 255, 255, 0.8)',
    },
    pointer: {
      width: 50,
      height: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      border: '1.5px solid rgba(255, 255, 255, 1)',
    },
    drag: {
      width: 60,
      height: 60,
      backgroundColor: 'rgba(245, 158, 11, 0.2)',
      border: '2px dashed rgba(245, 158, 11, 1)',
    },
    view: {
      width: 70,
      height: 70,
      backgroundColor: 'rgba(244, 63, 94, 0.15)',
      border: '1.5px solid rgba(244, 63, 94, 0.8)',
    },
  }

  return (
    <>
      {/* Outer Spring Circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          x: trailingX,
          y: trailingY,
        }}
        animate={cursorType}
        variants={outerVariants}
        transition={{ type: 'spring', damping: 30, stiffness: 250, mass: 0.5 }}
      >
        {cursorType === 'drag' && (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] text-amber-500 font-bold uppercase tracking-wider select-none">
            Drag
          </span>
        )}
        {cursorType === 'view' && (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] text-rose-500 font-bold uppercase tracking-wider select-none">
            View
          </span>
        )}
      </motion.div>

      {/* Inner Pinpoint Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />
    </>
  )
}
