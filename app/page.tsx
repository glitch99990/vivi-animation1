"use client"

import { useEffect, useRef } from "react"

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrame: number
    const startTime = performance.now()

    function animate(now: number) {
      const elapsed = (now - startTime) / 1000

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background
      ctx.fillStyle = "#d9c4e8"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Temporary animated test character
      const bounce = Math.sin(elapsed * 6) * 40

      ctx.fillStyle = "#8b5cf6"
      ctx.beginPath()
      ctx.arc(400, 250 + bounce, 80, 0, Math.PI * 2)
      ctx.fill()

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f4edf8",
      }}
    >
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        style={{
          width: "800px",
          maxWidth: "90vw",
          height: "auto",
          borderRadius: "12px",
        }}
      />
    </main>
  )
}