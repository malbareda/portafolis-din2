import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '../hooks.js'
import './Bitllet.css'

// El tiquet d'entrada com un bitllet de tren: tancat, mostra les dades del viatge;
// en clicar-hi, es trenca pel trepat i s'obre el contingut.

export default function Bitllet({ passatger, origen, desti, data, validesa, children }) {
  const [obert, setObert] = useState(false)
  const reduce = useReducedMotion()

  return (
    <div className="bitllet-escena">
      <motion.button
        className={`bitllet ${obert ? 'bitllet--obert' : ''}`}
        onClick={() => setObert((o) => !o)}
        aria-expanded={obert}
        aria-controls="bitllet-contingut"
        whileHover={reduce || obert ? undefined : { rotate: -1.2, y: -3 }}
        whileTap={reduce ? undefined : { scale: 0.99 }}
      >
        <span className="bitllet__cos">
          <span className="bitllet__capcalera">
            <span className="bitllet__marca">DIN2 · Tardor 2026</span>
            <span className="bitllet__classe">Anada</span>
          </span>
          <span className="bitllet__trajecte">
            <span className="bitllet__lloc">
              <small>Origen</small>
              {origen}
            </span>
            <svg className="bitllet__fletxa" viewBox="0 0 60 20" aria-hidden="true">
              <path d="M2 10h50m-8-7 8 7-8 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="bitllet__lloc">
              <small>Destinació</small>
              {desti}
            </span>
          </span>
          <span className="bitllet__dades">
            <span><small>Passatger</small>{passatger}</span>
            <span><small>Sortida</small>{data}</span>
            <span><small>Validesa</small>{validesa}</span>
          </span>
        </span>
        <span className="bitllet__trepat" aria-hidden="true" />
        <motion.span
          className="bitllet__resguard"
          animate={obert && !reduce ? { rotate: 8, x: 10, y: 6 } : { rotate: 0, x: 0, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 16 }}
        >
          <span className="bitllet__segell">{obert ? 'Validat' : 'Obre’m'}</span>
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {obert && (
          <motion.div
            id="bitllet-contingut"
            className="bitllet__contingut"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.35 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
