import { useEffect, useRef, useState } from 'react'

// Cat run: the offline-dinosaur game, with a cat. Same rules and scoring
// (score climbs with distance, speed ramps up, a bird shows up after 300,
// HI is remembered), drawn as ink on paper instead of pixels. Space, the
// up arrow, a click or a tap jumps; the down arrow ducks.

const W = 760, H = 190, GROUND = 150
const GRAVITY = 2400        // px/s^2
const JUMP = -720           // px/s
const START_SPEED = 330     // px/s
const MAX_SPEED = 720
const readHi = () => { try { return Number(localStorage.getItem('catrun.hi') || 0) } catch { return 0 } }
const writeHi = (n) => { try { localStorage.setItem('catrun.hi', String(n)) } catch { /* ignore */ } }
const pad = (n) => String(Math.floor(n)).padStart(5, '0')

export default function CatRun() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const [phase, setPhase] = useState('idle') // idle | running | over
  const [score, setScore] = useState(0)
  const [hi, setHi] = useState(readHi)
  const [flash, setFlash] = useState(false)
  const g = useRef(null)
  // refs mirrored from state so the loop can read them without re-subscribing
  const phaseRef = useRef(phase); phaseRef.current = phase
  const hiRef = useRef(hi); hiRef.current = hi
  const lastScoreRef = useRef(-1)

  const fresh = () => ({
    t: 0, speed: START_SPEED, dist: 0, score: 0,
    cat: { y: GROUND, vy: 0, duck: false, frame: 0 },
    obs: [], nextGap: 420, clouds: [{ x: 200, y: 40 }, { x: 560, y: 62 }], ticks: [],
    lastMilestone: 0, dead: false,
  })

  const start = () => {
    g.current = fresh()
    setScore(0)
    setPhase('running')
  }

  const jump = () => {
    const s = g.current
    if (!s || s.dead) return
    if (s.cat.y >= GROUND - 0.5) { s.cat.vy = JUMP; s.cat.duck = false }
  }

  const press = () => {
    if (phase === 'running') jump()
    else start()
  }

  useEffect(() => {
    const wrap = wrapRef.current
    const onKey = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); press() }
      else if (e.code === 'ArrowDown') { e.preventDefault(); if (g.current && phase === 'running') { g.current.cat.duck = true; if (g.current.cat.y < GROUND) g.current.cat.vy += 600 } }
    }
    const onUp = (e) => { if (e.code === 'ArrowDown' && g.current) g.current.cat.duck = false }
    wrap.addEventListener('keydown', onKey)
    wrap.addEventListener('keyup', onUp)
    return () => { wrap.removeEventListener('keydown', onKey); wrap.removeEventListener('keyup', onUp) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = W * dpr; canvas.height = H * dpr
    // The game keeps its own fixed palette in both themes: light paper so a
    // black cat always reads as a black cat.
    const ink = '#1a1714', paper = '#efe6d2', soft = '#a0937c', pen = '#2a4a99', black = '#0a0908'

    let raf = 0, last = performance.now()
    if (!g.current) g.current = fresh()

    const spawn = (s) => {
      const r = Math.random()
      if (s.score > 300 && r < 0.28) {
        const lane = [GROUND - 62, GROUND - 40, GROUND - 14][Math.floor(Math.random() * 3)]
        s.obs.push({ kind: 'bird', x: W + 40, y: lane, w: 34, h: 18, wing: 0 })
      } else {
        const n = r < 0.55 ? 1 : r < 0.85 ? 2 : 3
        const big = Math.random() < 0.4
        const w = (big ? 22 : 16) * n + (n - 1) * 4
        s.obs.push({ kind: 'cactus', x: W + 40, y: GROUND, w, h: big ? 44 : 32, n, big })
      }
      s.nextGap = 300 + Math.random() * 320 + s.speed * 0.35
    }

    const drawCat = (x, y, duck, frame, dead) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.fillStyle = black
      ctx.strokeStyle = black
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      const bodyH = duck ? 14 : 20
      const bodyW = duck ? 46 : 38
      // tail
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(-bodyW / 2 + 2, -bodyH + 4)
      ctx.quadraticCurveTo(-bodyW / 2 - 14, -bodyH - 4 + (frame % 2) * 3, -bodyW / 2 - 10, -bodyH - 20 + (duck ? 10 : 0))
      ctx.stroke()
      // legs (two-frame run)
      ctx.lineWidth = 4
      const legs = dead ? [[-10, 0], [10, 0]] : frame % 2 ? [[-12, 0], [8, -3]] : [[-8, -3], [12, 0]]
      for (const [lx, ly] of legs) {
        ctx.beginPath(); ctx.moveTo(lx, -bodyH + 8); ctx.lineTo(lx + ly, 0); ctx.stroke()
      }
      // body
      ctx.beginPath()
      ctx.ellipse(0, -bodyH + 4, bodyW / 2, bodyH / 2 + 2, 0, 0, Math.PI * 2)
      ctx.fill()
      // head
      const hx = bodyW / 2 + 2, hy = duck ? -bodyH - 2 : -bodyH - 8
      ctx.beginPath(); ctx.arc(hx, hy, 11, 0, Math.PI * 2); ctx.fill()
      // ears
      ctx.beginPath(); ctx.moveTo(hx - 9, hy - 6); ctx.lineTo(hx - 6, hy - 17); ctx.lineTo(hx - 1, hy - 9); ctx.closePath(); ctx.fill()
      ctx.beginPath(); ctx.moveTo(hx + 1, hy - 9); ctx.lineTo(hx + 6, hy - 17); ctx.lineTo(hx + 9, hy - 6); ctx.closePath(); ctx.fill()
      // eye
      ctx.fillStyle = paper
      if (dead) {
        ctx.strokeStyle = paper; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.moveTo(hx + 2, hy - 4); ctx.lineTo(hx + 6, hy); ctx.moveTo(hx + 6, hy - 4); ctx.lineTo(hx + 2, hy); ctx.stroke()
      } else {
        ctx.beginPath(); ctx.arc(hx + 4, hy - 2, 1.8, 0, Math.PI * 2); ctx.fill()
      }
      // collar, the one spot of colour
      ctx.strokeStyle = pen; ctx.lineWidth = 2
      ctx.beginPath(); ctx.arc(hx - 2, hy + 8, 7, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke()
      ctx.restore()
    }

    const drawCactus = (o) => {
      ctx.save()
      ctx.translate(o.x, o.y)
      ctx.fillStyle = ink
      ctx.strokeStyle = ink
      let cx = 0
      for (let i = 0; i < o.n; i++) {
        const w = o.big ? 22 : 16, h = o.h - (i % 2 ? 6 : 0)
        // pot
        ctx.beginPath()
        ctx.moveTo(cx + 2, -10); ctx.lineTo(cx + w - 2, -10); ctx.lineTo(cx + w - 4, 0); ctx.lineTo(cx + 4, 0); ctx.closePath(); ctx.fill()
        ctx.fillRect(cx, -13, w, 4)
        // plant: a stem and two arms, drawn as rounded strokes
        ctx.lineWidth = o.big ? 7 : 5; ctx.lineCap = 'round'
        const mid = cx + w / 2
        ctx.beginPath(); ctx.moveTo(mid, -13); ctx.lineTo(mid, -h); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(mid, -h + 14); ctx.lineTo(mid - w / 2 + 2, -h + 14); ctx.lineTo(mid - w / 2 + 2, -h + 4); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(mid, -h + 20); ctx.lineTo(mid + w / 2 - 2, -h + 20); ctx.lineTo(mid + w / 2 - 2, -h + 8); ctx.stroke()
        cx += w + 4
      }
      ctx.restore()
    }

    const drawBird = (o) => {
      ctx.save()
      ctx.translate(o.x, o.y)
      ctx.strokeStyle = ink; ctx.fillStyle = ink; ctx.lineWidth = 3; ctx.lineCap = 'round'
      const up = o.wing < 0.5
      ctx.beginPath()
      ctx.moveTo(-16, up ? -8 : 6); ctx.lineTo(-4, 0); ctx.lineTo(8, up ? -8 : 6)
      ctx.stroke()
      ctx.beginPath(); ctx.ellipse(-2, 1, 9, 4, 0, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.moveTo(7, 0); ctx.lineTo(13, -1); ctx.lineTo(7, 3); ctx.closePath(); ctx.fill()
      ctx.restore()
    }

    const hit = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y

    const loop = (now) => {
      raf = requestAnimationFrame(loop)
      const dt = Math.min(0.033, (now - last) / 1000); last = now
      const s = g.current
      const running = phaseRef.current === 'running' && !s.dead

      if (running) {
        s.t += dt
        s.speed = Math.min(MAX_SPEED, s.speed + dt * 9)
        const dx = s.speed * dt
        s.dist += dx
        s.score = s.dist / 36
        // cat physics
        const c = s.cat
        c.vy += GRAVITY * dt
        c.y = Math.min(GROUND, c.y + c.vy * dt)
        if (c.y >= GROUND) c.vy = 0
        c.frame = Math.floor(s.t * 10)
        // world
        for (const o of s.obs) { o.x -= dx; if (o.kind === 'bird') { o.x -= dt * 60; o.wing = (o.wing + dt * 4) % 1 } }
        s.obs = s.obs.filter((o) => o.x + o.w > -60)
        s.nextGap -= dx
        if (s.nextGap <= 0) spawn(s)
        for (const cl of s.clouds) { cl.x -= dx * 0.18; if (cl.x < -80) { cl.x = W + 60 + Math.random() * 120; cl.y = 24 + Math.random() * 50 } }
        s.ticks = s.ticks.filter((t) => t.x > -10).map((t) => ({ ...t, x: t.x - dx }))
        if (Math.random() < dt * 6) s.ticks.push({ x: W + 10, w: 3 + Math.random() * 10 })
        // collision (boxes inset a little, like the original)
        const box = c.duck ? { x: 90 - 20, y: c.y - 20, w: 46, h: 20 } : { x: 90 - 16, y: c.y - 36, w: 42, h: 36 }
        for (const o of s.obs) {
          const ob = o.kind === 'bird' ? { x: o.x - 12, y: o.y - 8, w: 26, h: 14 } : { x: o.x + 3, y: o.y - o.h + 4, w: o.w - 6, h: o.h - 4 }
          if (hit(box, ob)) {
            s.dead = true
            const final = Math.floor(s.score)
            if (final > hiRef.current) { hiRef.current = final; setHi(final); writeHi(final) }
            setPhase('over')
            break
          }
        }
        const sc = Math.floor(s.score)
        if (sc !== lastScoreRef.current) { lastScoreRef.current = sc; setScore(sc) }
        if (sc > 0 && sc % 100 === 0 && s.lastMilestone !== sc) { s.lastMilestone = sc; setFlash(true); setTimeout(() => setFlash(false), 500) }
      }

      // draw
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      // clouds: thin outlines
      ctx.strokeStyle = soft; ctx.lineWidth = 1; ctx.globalAlpha = 0.6
      for (const cl of s.clouds) {
        ctx.beginPath(); ctx.ellipse(cl.x, cl.y, 26, 7, 0, 0, Math.PI * 2); ctx.stroke()
        ctx.beginPath(); ctx.ellipse(cl.x + 14, cl.y - 6, 14, 6, 0, 0, Math.PI * 2); ctx.stroke()
      }
      ctx.globalAlpha = 1
      // ground
      ctx.strokeStyle = ink; ctx.lineWidth = 1.5
      ctx.beginPath(); ctx.moveTo(0, GROUND + 0.5); ctx.lineTo(W, GROUND + 0.5); ctx.stroke()
      ctx.strokeStyle = soft; ctx.lineWidth = 1
      for (const t of s.ticks) { ctx.beginPath(); ctx.moveTo(t.x, GROUND + 8); ctx.lineTo(t.x + t.w, GROUND + 8); ctx.stroke() }
      for (const o of s.obs) (o.kind === 'bird' ? drawBird : drawCactus)(o)
      drawCat(90, s.cat.y, s.cat.duck && s.cat.y >= GROUND, s.cat.y < GROUND ? 0 : s.cat.frame, s.dead)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={`catrun ${phase}`}
      ref={wrapRef}
      tabIndex={0}
      role="application"
      aria-label="Cat run game. Space or tap to jump, down arrow to duck."
      onPointerDown={(e) => { e.preventDefault(); wrapRef.current.focus(); press() }}
      data-cursor={phase === 'running' ? 'jump' : 'start'}
    >
      <div className="catrun-score" aria-live="off">
        {hi > 0 && <span className="hi">HI {pad(hi)}</span>}
        <span className={`now tnum ${flash ? 'flash' : ''}`}>{pad(score)}</span>
      </div>
      <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', display: 'block' }} aria-hidden="true" />
      {phase !== 'running' && (
        <div className="catrun-msg">
          {phase === 'over' ? (
            <>
              <b>Caught.</b>
              <span>space, or tap, to try again</span>
            </>
          ) : (
            <>
              <b>Cat run</b>
              <span>space or tap to jump · down arrow to duck</span>
            </>
          )}
        </div>
      )}
    </div>
  )
}
