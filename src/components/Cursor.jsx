import { useEffect, useRef } from 'react'

// A ballpoint-pen cursor. Three parts:
//   1. a dot that sits exactly on the pointer
//   2. a ring that lags behind it and changes shape over links, buttons, text
//   3. a canvas trail that behaves like ink: a smooth stroke whose width
//      depends on speed (fast = thin, slow = thick) and fades over ~0.6s
// Only mounts on devices with a fine pointer (a mouse or trackpad).

export default function Cursor() {
  const canvasRef = useRef(null)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(pointer: coarse)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine) return
    document.body.classList.add('fine-pointer')

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current

    const pen = () => getComputedStyle(document.documentElement).getPropertyValue('--pen').trim() || '#24479c'

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(innerWidth * dpr)
      canvas.height = Math.floor(innerHeight * dpr)
      canvas.style.width = innerWidth + 'px'
      canvas.style.height = innerHeight + 'px'
    }
    resize()
    window.addEventListener('resize', resize)

    const pts = [] // {x, y, t, w}
    let mx = -100, my = -100, rx = -100, ry = -100
    let lastX = mx, lastY = my, lastT = performance.now()
    let visible = false
    let raf = 0

    const hoverSel = 'a, button, [data-cursor]'
    const textSel = 'p, li, h1, h2, h3, dd, dt, blockquote, .email'

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (!visible) { visible = true; document.body.classList.remove('cursor-hidden') }

      const now = performance.now()
      const dx = mx - lastX, dy = my - lastY, dt = Math.max(1, now - lastT)
      const speed = Math.hypot(dx, dy) / dt // px per ms
      // slow movement lays down more ink, like a pen you are pressing on
      const w = Math.max(0.6, Math.min(3.2, 3.2 - speed * 2.2))
      pts.push({ x: mx, y: my, t: now, w })
      if (pts.length > 140) pts.shift()
      lastX = mx; lastY = my; lastT = now

      const el = e.target instanceof Element ? e.target : null
      const hot = el && el.closest(hoverSel)
      if (hot) {
        ring.className = 'cursor-ring is-hover'
        const custom = hot.getAttribute('data-cursor')
        label.textContent = custom || (hot.tagName === 'A' ? (hot.getAttribute('target') === '_blank' ? 'open' : 'go') : 'press')
      } else if (el && el.closest(textSel)) {
        ring.className = 'cursor-ring is-text'
      } else {
        ring.className = 'cursor-ring'
      }
    }
    const onDown = () => ring.classList.add('is-down')
    const onUp = () => {
      ring.classList.remove('is-down')
      // whatever was under the pointer may have changed (a button that
      // disappeared, a panel that opened), so re-read the target
      setTimeout(() => {
        const el = document.elementFromPoint(mx, my)
        if (el) onMove({ clientX: mx, clientY: my, target: el })
      }, 60)
    }
    const onLeave = () => { visible = false; document.body.classList.add('cursor-hidden') }
    const onEnter = () => { visible = true; document.body.classList.remove('cursor-hidden') }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    const LIFE = 620 // ms an ink point stays visible

    const frame = () => {
      raf = requestAnimationFrame(frame)
      // ring eases toward the pointer; dot snaps
      rx += (mx - rx) * 0.22
      ry += (my - ry) * 0.22
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`

      if (reduce) return
      const now = performance.now()
      while (pts.length && now - pts[0].t > LIFE) pts.shift()

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, innerWidth, innerHeight)
      if (pts.length < 3) return

      const color = pen()
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.strokeStyle = color
      // draw as many short quadratic segments; each with its own width/alpha
      for (let i = 1; i < pts.length - 1; i++) {
        const a = pts[i - 1], b = pts[i], c = pts[i + 1]
        const age = (now - b.t) / LIFE
        const alpha = Math.max(0, 1 - age)
        ctx.globalAlpha = alpha * alpha * 0.9
        ctx.lineWidth = b.w * (0.35 + 0.65 * alpha)
        ctx.beginPath()
        ctx.moveTo((a.x + b.x) / 2, (a.y + b.y) / 2)
        ctx.quadraticCurveTo(b.x, b.y, (b.x + c.x) / 2, (b.y + c.y) / 2)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      document.body.classList.remove('fine-pointer')
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="cursor-canvas" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true"><span ref={labelRef} /></div>
    </>
  )
}
