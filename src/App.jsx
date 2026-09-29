import { useEffect, useState } from 'react'
import { navLinks, person } from './content.js'
import Cursor from './components/Cursor.jsx'
import { Hero, About, Experience, Projects, Toolbox, Game, CatGame, Contact, Footer } from './components/Sections.jsx'

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || '' } catch { return '' }
  })
  useEffect(() => {
    const root = document.documentElement
    if (theme) root.setAttribute('data-theme', theme)
    else root.removeAttribute('data-theme')
    try { theme ? localStorage.setItem('theme', theme) : localStorage.removeItem('theme') } catch { /* ignore */ }
  }, [theme])
  const isDark = theme ? theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  const toggle = () => setTheme(isDark ? 'light' : 'dark')
  return { isDark, toggle }
}

function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const ids = navLinks.map(([, id]) => id)
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.2, 0.5] },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}

function ThemeButton({ isDark, toggle }) {
  return (
    <button className="theme-btn" onClick={toggle} aria-label="Toggle colour theme" data-cursor={isDark ? 'light' : 'dark'}>
      <span className="theme-dot" aria-hidden="true" />
      {isDark ? 'Light' : 'Dark'}
    </button>
  )
}

export default function App() {
  const { isDark, toggle } = useTheme()
  const active = useActiveSection()

  return (
    <div className="frame">
      <Cursor />

      <nav className="rail" aria-label="Sections">
        <a href="#top" className="rail-mark" aria-label="Back to top" data-cursor="top">PV</a>
        <div className="rail-index">
          {navLinks.map(([label, id]) => (
            <a key={id} href={`#${id}`} data-label={label} aria-label={label} aria-current={active === id ? 'true' : undefined} data-cursor={label.toLowerCase()} />
          ))}
        </div>
        <div style={{ display: 'grid', gap: 18, justifyItems: 'center' }}>
          <button className="rail-head" onClick={toggle} data-cursor={isDark ? 'light' : 'dark'} aria-label="Toggle colour theme" style={{ cursor: 'inherit' }}>
            {isDark ? 'lights on' : 'lights off'}
          </button>
          <span className="rail-head">{person.location.split(',')[0]}, NJ · {person.updated}</span>
        </div>
      </nav>

      <div className="topbar">
        <a href="#top" className="topbar-name">Praneeth V.</a>
        <div className="topbar-links">
          <a href="#projects">Work</a>
          <a href="#oncall">Game</a>
          <a href="#contact">Contact</a>
          <ThemeButton isDark={isDark} toggle={toggle} />
        </div>
      </div>

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Toolbox />
        <Game />
        <CatGame />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}
