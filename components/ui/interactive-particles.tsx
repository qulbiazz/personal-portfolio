'use client'

import { useEffect, useRef } from 'react'
import { usePortfolioContext } from '@/components/ui/portfolio-context'

export function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = usePortfolioContext()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string
    }> = []

    // Adjust particle density based on screen size
    const particleCount = Math.min(75, Math.floor((width * height) / 12000))
    const connectionDistance = 110
    const mouse = { x: -1000, y: -1000, radius: 140 }

    // Curated color palette (Amber, Orange, Rose) matching the site's accent gradients
    const colors = theme === 'dark' 
      ? [
          'rgba(245, 158, 11, 0.4)', // Amber
          'rgba(234, 88, 12, 0.4)',  // Orange
          'rgba(225, 29, 72, 0.35)',  // Rose
        ]
      : [
          'rgba(217, 119, 6, 0.65)',  // Amber (darker)
          'rgba(194, 65, 12, 0.65)',  // Orange (darker)
          'rgba(190, 24, 74, 0.6)',   // Rose (darker)
        ]

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener('resize', handleResize)
    
    // Track mouse moves relative to the hero section (which is canvas parent)
    const parent = canvas.parentElement
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove)
      parent.addEventListener('mouseleave', handleMouseLeave)
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        // Bounce on borders
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // Mouse physics (gentle push/repulsion)
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius
          p.x += (dx / dist) * force * 0.7
          p.y += (dy / dist) * force * 0.7
        }

        // Draw particle node
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      })

      // 2. Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]

        // Link node to mouse cursor
        const mouseDx = p1.x - mouse.x
        const mouseDy = p1.y - mouse.y
        const mouseDist = Math.hypot(mouseDx, mouseDy)
        if (mouseDist < mouse.radius) {
          const alpha = (1 - mouseDist / mouse.radius) * 0.25
          ctx.strokeStyle = theme === 'dark' 
            ? `rgba(234, 88, 12, ${alpha})`
            : `rgba(194, 65, 12, ${alpha * 1.5})`
          ctx.lineWidth = 0.7
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }

        // Link node to neighboring nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.hypot(dx, dy)

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.12
            ctx.strokeStyle = theme === 'dark'
              ? `rgba(255, 255, 255, ${alpha})`
              : `rgba(15, 23, 42, ${alpha * 1.5})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove)
        parent.removeEventListener('mouseleave', handleMouseLeave)
      }
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none opacity-40 transition-all duration-500 ${
        theme === 'dark' ? 'mix-blend-screen' : 'mix-blend-multiply'
      }`}
    />
  )
}

