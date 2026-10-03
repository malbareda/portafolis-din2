import { motion } from 'framer-motion'
import { parades } from '../content/viatge.js'
import { useMediaQuery, useReducedMotion } from '../hooks.js'
import EstatParada from './EstatParada.jsx'
import './MapaViatge.css'

// El recorregut del curs: una parada per moment del portafolis.
// El tram encès del camí arriba fins a la darrera parada activa.

const PAS = 190 // separació vertical entre parades (px)
const MARGE = 70

function Icona({ parada }) {
  if (parada.tipus === 'tiquet') {
    return (
      <svg viewBox="0 0 40 40" aria-hidden="true" className="mapa__icona">
        <rect x="4" y="11" width="32" height="18" rx="4" fill="currentColor" />
        <path d="M26 13v14" stroke="#fff" strokeWidth="2" strokeDasharray="2 3" />
        <path d="M9 18h11M9 23h7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  }
  return <span className="mapa__codi">{parada.codi}</span>
}

export default function MapaViatge() {
  const estret = useMediaQuery('(max-width: 720px)')
  const reduce = useReducedMotion()

  const alt = MARGE * 2 + PAS * (parades.length - 1)
  const punts = parades.map((_, i) => ({
    x: estret ? 80 : i % 2 === 0 ? 220 : 780, // unitats del viewBox (0–1000)
    y: MARGE + i * PAS,
  }))

  const d = punts
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`
      const a = punts[i - 1]
      const mig = (p.y - a.y) / 2
      return `C ${a.x} ${a.y + mig}, ${p.x} ${p.y - mig}, ${p.x} ${p.y}`
    })
    .join(' ')

  const darreraActiva = parades.reduce((acc, p, i) => (p.estat !== 'properament' ? i : acc), 0)
  const progres = parades.length > 1 ? darreraActiva / (parades.length - 1) : 1

  return (
    <nav className={`mapa ${estret ? 'mapa--estret' : ''}`} aria-label="Recorregut del portafolis" style={{ height: alt }}>
      <svg className="mapa__cami" viewBox={`0 0 1000 ${alt}`} preserveAspectRatio="none" aria-hidden="true">
        <path d={d} className="mapa__cami-fons" vectorEffect="non-scaling-stroke" />
        <motion.path
          d={d}
          className="mapa__cami-fet"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: progres }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
          style={reduce ? { pathLength: progres } : undefined}
        />
      </svg>

      <ol className="mapa__parades">
        {parades.map((p, i) => {
          const activa = p.estat !== 'properament'
          const costat = estret ? 'dreta' : i % 2 === 0 ? 'dreta' : 'esquerra'
          const Contingut = activa ? 'a' : 'div'
          return (
            <li
              key={p.id}
              className={`mapa__parada mapa__parada--${p.estat} mapa__parada--${costat}`}
              style={{ top: punts[i].y, left: `${punts[i].x / 10}%`, '--c': p.color }}
            >
              <motion.span
                className="mapa__node"
                initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: reduce ? 0 : 0.15 * i, type: 'spring', stiffness: 260, damping: 18 }}
              >
                <Icona parada={p} />
              </motion.span>
              <Contingut className="mapa__targeta" {...(activa ? { href: `#/${p.id}` } : {})}>
                <span className="mapa__titol">{p.titol}</span>
                {p.subtitol && <span className="mapa__subtitol">{p.subtitol}</span>}
                {p.sessions && <span className="mapa__sessions">Sessions: {p.sessions}</span>}
                <EstatParada parada={p} />
              </Contingut>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
