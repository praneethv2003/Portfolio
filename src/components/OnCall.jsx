import { useEffect, useRef, useState } from 'react'
import { game } from '../content.js'

// On-call: pages arrive, you route each to the team that owns it before its
// fuse runs out. Routing applies to the oldest page on screen. A wrong team
// burns time off the fuse instead of ending the page, which is roughly how it
// goes in real life too.

const FUSE = { 1: 4200, 2: 5600, 3: 7200 }
const MAX_ACTIVE = 4

const readBest = () => { try { return Number(localStorage.getItem('oncall.best') || 0) } catch { return 0 } }
const writeBest = (n) => { try { localStorage.setItem('oncall.best', String(n)) } catch { /* private window etc. */ } }

function grade(s) {
  const acc = s.routed + s.wrong ? s.routed / (s.routed + s.wrong) : 0
  if (s.routed >= 20 && s.escalated <= 2 && acc >= 0.85) return ['Primary material', 'You can have my pager. I mean that as a compliment.']
  if (s.routed >= 13 && s.escalated <= 5 && acc >= 0.7) return ['Solid secondary', 'A couple got away, but nothing the postmortem will dwell on.']
  if (s.routed >= 8 && s.escalated <= 8) return ['Learning the runbook', 'Respectable. The cache team would like a word about the ones you sent them.']
  return ['Please update the runbook', 'Everyone has a first rotation. The CTO has been paged (they have not).']
}

export default function OnCall() {
  const [phase, setPhase] = useState('idle')
  const [, force] = useState(0)
  const [best, setBest] = useState(readBest)
  const [flash, setFlash] = useState(null) // {team, ok}
  const [log, setLog] = useState(null)

  const s = useRef({ pages: [], routed: 0, wrong: 0, escalated: 0, tta: 0, start: 0, nextSpawn: 0, deck: [], id: 0 })
  const rafRef = useRef(0)
  const stageRef = useRef(null)

  const shuffle = (arr) => {
    const a = arr.slice()
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
    return a
  }

  const spawn = (now) => {
    const st = s.current
    if (!st.deck.length) st.deck = shuffle(game.incidents)
    const inc = st.deck.pop()
    const r = Math.random()
    const sev = r < 0.28 ? 1 : r < 0.72 ? 2 : 3
    const elapsed = (now - st.start) / 1000
    const squeeze = Math.max(0.62, 1 - elapsed / 110) // fuses shorten as the round goes on
    st.pages.push({ id: ++st.id, inc, sev, born: now, fuse: FUSE[sev] * squeeze, burned: 0, out: null })
  }

  const start = () => {
    const now = performance.now()
    s.current = { pages: [], routed: 0, wrong: 0, escalated: 0, tta: 0, start: now, nextSpawn: now + 500, deck: shuffle(game.incidents), id: 0 }
    setLog(null)
    setPhase('playing')
  }

  useEffect(() => {
    if (phase !== 'playing') return
    const loop = (now) => {
      const st = s.current
      const elapsed = (now - st.start) / 1000
      if (elapsed >= game.duration) {
        setPhase('done')
        if (st.routed > best) { setBest(st.routed); writeBest(st.routed) }
        return
      }
      // spawn cadence tightens from ~1.9s to ~0.95s over the round
      const live = st.pages.filter((p) => !p.out).length
      if (now >= st.nextSpawn && live < MAX_ACTIVE) {
        spawn(now)
        const gap = 1900 - Math.min(950, elapsed * 24)
        st.nextSpawn = now + gap + Math.random() * 300
      }
      // burn fuses
      for (const p of st.pages) {
        if (p.out) continue
        if (now - p.born + p.burned >= p.fuse) {
          p.out = 'bad'; p.outAt = now
          st.escalated++
          setLog({ kind: 'bad', text: 'escalated' })
        }
      }
      st.pages = st.pages.filter((p) => !p.out || now - p.outAt < 260)
      force((n) => n + 1)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  const route = (teamId) => {
    if (phase !== 'playing') return
    const st = s.current
    const now = performance.now()
    const p = st.pages.find((x) => !x.out)
    if (!p) return
    if (p.inc.team === teamId) {
      p.out = 'ok'; p.outAt = now
      st.routed++
      st.tta += now - p.born
      setFlash({ team: teamId, ok: true })
      setLog({ kind: 'ok', text: `acked in ${((now - p.born) / 1000).toFixed(1)}s` })
    } else {
      st.wrong++
      p.burned += 1300
      setFlash({ team: teamId, ok: false })
      setLog({ kind: 'bad', text: 'wrong team, fuse shortened' })
    }
    setTimeout(() => setFlash(null), 220)
  }

  useEffect(() => {
    if (phase !== 'playing') return
    const onKey = (e) => {
      const t = game.teams.find((x) => x.key === e.key)
      if (t) { e.preventDefault(); route(t.id) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  const st = s.current
  const now = performance.now()
  const left = phase === 'playing' ? Math.max(0, game.duration - (now - st.start) / 1000) : phase === 'done' ? 0 : game.duration
  const mtta = st.routed ? st.tta / st.routed / 1000 : 0

  return (
    <div className="game" ref={stageRef} data-cursor={phase === 'playing' ? 'route' : undefined}>
      <div className="game-bar">
        <span className="stat"><b className="tnum">{left.toFixed(1)}s</b> left</span>
        <span className="stat"><b className="tnum">{st.routed}</b> routed</span>
        <span className="stat"><b className="tnum">{st.escalated}</b> escalated</span>
        <span className="stat"><b className="tnum">{mtta ? mtta.toFixed(1) + 's' : '–'}</b> mtta</span>
        {best > 0 && <span className="best">best {best}</span>}
      </div>

      {phase === 'idle' && (
        <div className="game-idle">
          <div style={{ display: 'grid', gap: 10 }}>
            <h3>You are primary.</h3>
            <p>{game.duration} seconds. Route the oldest page first. Severity is the colour on the left edge; red ones burn fastest.</p>
          </div>
          <button className="btn" onClick={start} data-cursor="start">Take the pager</button>
        </div>
      )}

      {phase === 'playing' && (
        <div className="game-stage" aria-live="polite">
          {st.pages.map((p) => {
            const frac = Math.max(0, 1 - (now - p.born + p.burned) / p.fuse)
            return (
              <div key={p.id} className={`page sev-${p.sev} ${p.out ? 'out-' + p.out : ''}`}>
                <div className="page-head">
                  <span>sev{p.sev} · #{String(p.id).padStart(3, '0')}</span>
                  <span className="tnum">{((now - p.born) / 1000).toFixed(1)}s</span>
                </div>
                <div className="page-text">{p.inc.text}</div>
                <div className="page-fuse"><i style={{ transform: `scaleX(${frac})` }} /></div>
              </div>
            )
          })}
          {log && <div className={`game-log ${log.kind}`}>{log.text}</div>}
        </div>
      )}

      {phase === 'done' && (() => {
        const [title, line] = grade(st)
        const acc = st.routed + st.wrong ? Math.round((100 * st.routed) / (st.routed + st.wrong)) : 0
        return (
          <div className="report">
            <div>
              <div className="mono">Incident report</div>
              <h3>{title}</h3>
            </div>
            <div className="report-grid">
              <div><b className="tnum">{st.routed}</b><span>routed</span></div>
              <div><b className="tnum">{st.escalated}</b><span>escalated</span></div>
              <div><b className="tnum">{acc}%</b><span>accuracy</span></div>
              <div><b className="tnum">{mtta ? mtta.toFixed(1) + 's' : '–'}</b><span>mean time to ack</span></div>
            </div>
            <p>{line}</p>
            <div className="report-actions">
              <button className="btn" onClick={start} data-cursor="again">Another rotation</button>
              <a className="btn ghost" href="#projects" data-cursor="read">Read about IncidentHub</a>
            </div>
          </div>
        )
      })()}

      <div className="teams" role="group" aria-label="Route to team">
        {game.teams.map((t) => (
          <button
            key={t.id}
            className={`team ${flash && flash.team === t.id ? (flash.ok ? 'flash-ok' : 'flash-bad') : ''}`}
            onClick={() => route(t.id)}
            disabled={phase !== 'playing'}
            data-cursor={t.name.toLowerCase()}
          >
            <kbd>{t.key}</kbd>
            {t.name}
          </button>
        ))}
      </div>
    </div>
  )
}
