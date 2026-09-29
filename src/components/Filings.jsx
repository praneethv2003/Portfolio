import { useEffect, useRef } from 'react'

// A field of short pencil marks behind the hero. Each mark is a compass
// needle: it turns to face the pointer, gets darker and longer as the pointer
// gets close, and when nobody is moving the mouse the whole field drifts
// through a slow wave so it never looks dead. Clicking drops a ripple.

export default function Filings({ hostRef }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const host = hostRef.current
    if (!canvas || !host) return
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches

    let w = 0, h = 0, dpr = 1
    let marks = []
    const GAP = 26
    let mx = -9999, my = -9999
    let target = { x: -9999, y: -9999 }
    let ripples = []
    let raf = 0
    let last = performance.now()
    let idle = 0

    const ink = () => getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#25211b'
    const pen = () => getComputedStyle(document.documentElement).getPropertyValue('--pen').trim() || '#24479c'

    const build = () => {
      const r = host.getBoundingClientRect()
      w = r.width; h = r.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      marks = []
      const cols = Math.ceil(w / GAP) + 1
      const rows = Math.ceil(h / GAP) + 1
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          // offset every other row so it reads as a field, not a grid
          const x = i * GAP + (j % 2 ? GAP / 2 : 0)
          const y = j * GAP
          marks.push({ x, y, a: Math.random() * Math.PI * 2, ta: 0, seed: Math.random() * 1000 })
        }
      }
    }
    build()
    const ro = new ResizeObserver(build)
    ro.observe(host)

    const onMove = (e) => {
      const r = host.getBoundingClientRect()
      target = { x: e.clientX - r.left, y: e.clientY - r.top }
      idle = 0
    }
    const onLeave = () => { target = { x: -9999, y: -9999 } }
    const onClick = (e) => {
      const r = host.getBoundingClientRect()
      ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() })
    }
    if (!coarse) {
      window.addEventListener('mousemove', onMove, { passive: true })
      host.addEventListener('mouseleave', onLeave)
    }
    host.addEventListener('pointerdown', onClick)

    const parse = (hex) => {
      const m = hex.replace('#', '')
      const n = parseInt(m.length === 3 ? m.split('').map((c) => c + c).join('') : m, 16)
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
    }

    let inkRGB = parse(ink()), penRGB = parse(pen())
    const mo = new MutationObserver(() => { inkRGB = parse(ink()); penRGB = parse(pen()) })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const drawStatic = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.lineCap = 'round'
      ctx.lineWidth = 1
      ctx.strokeStyle = `rgba(${inkRGB.join(',')},0.16)`
      for (const m of marks) {
        const a = Math.sin(m.x * 0.01) + Math.cos(m.y * 0.012)
        ctx.beginPath()
        ctx.moveTo(m.x - Math.cos(a) * 4, m.y - Math.sin(a) * 4)
        ctx.lineTo(m.x + Math.cos(a) * 4, m.y + Math.sin(a) * 4)
        ctx.stroke()
      }
    }
    if (reduce) { drawStatic(); return () => { ro.disconnect(); mo.disconnect() } }

    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(50, now - last); last = now
      idle += dt
      // pointer easing so the field feels heavy, like iron filings
      mx += (target.x - mx) * 0.14
      my += (target.y - my) * 0.14
      const t = now / 1000

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.lineCap = 'round'

      const hasPointer = target.x > -9000
      const R = 260 // influence radius

      ripples = ripples.filter((r) => now - r.t < 1400)

      for (const m of marks) {
        const dx = mx - m.x, dy = my - m.y
        const d = Math.hypot(dx, dy)
        let want
        let k = 0 // 0..1 closeness
        if (hasPointer && d < R) {
          want = Math.atan2(dy, dx)
          k = 1 - d / R
          k = k * k * (3 - 2 * k) // smoothstep
        } else {
          // slow drifting wave when far from the pointer
          want = Math.sin(m.x * 0.008 + t * 0.35) + Math.cos(m.y * 0.01 - t * 0.28) + m.seed * 0.001
        }
        // ripples nudge the angle outward as they pass
        let rk = 0
        for (const r of ripples) {
          const age = (now - r.t) / 1400
          const rr = age * 520
          const dd = Math.hypot(m.x - r.x, m.y - r.y)
          const band = 1 - Math.min(1, Math.abs(dd - rr) / 46)
          if (band > 0) {
            rk = Math.max(rk, band * (1 - age))
            want = Math.atan2(m.y - r.y, m.x - r.x)
          }
        }
        // shortest-path angle easing
        let diff = want - m.a
        diff = Math.atan2(Math.sin(diff), Math.cos(diff))
        m.a += diff * (0.08 + 0.2 * Math.max(k, rk))

        const len = 4 + 7 * k + 5 * rk
        const alpha = 0.14 + 0.62 * Math.max(k, rk)
        const c = k > 0.55 || rk > 0.3 ? penRGB : inkRGB
        ctx.strokeStyle = `rgba(${c.join(',')},${alpha})`
        ctx.lineWidth = 1 + 0.9 * k
        const cx = Math.cos(m.a) * len, cy = Math.sin(m.a) * len
        ctx.beginPath()
        ctx.moveTo(m.x - cx, m.y - cy)
        ctx.lineTo(m.x + cx, m.y + cy)
        ctx.stroke()
      }
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      mo.disconnect()
      window.removeEventListener('mousemove', onMove)
      host.removeEventListener('mouseleave', onLeave)
      host.removeEventListener('pointerdown', onClick)
    }
  }, [hostRef])

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />
}
