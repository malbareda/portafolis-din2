import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks.js'
import MapaViatge from '../components/MapaViatge.jsx'
import { paginaSolta } from '../contingut.js'
import './Pagines.css'

export default function Inici() {
  const reduce = useReducedMotion()
  const Presentacio = paginaSolta('inici')

  return (
    <div className="container">
      <section className="portada">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="portada__avantitol">Portafolis de competències directives · DIN2 · Tardor 2026</p>
          <h1 className="portada__titol">
            De Cap d'Estudis <span className="portada__fletxa" aria-hidden="true">→</span> a director
            <span className="portada__sub">un viatge en quatre parades</span>
          </h1>
          <p className="portada__autor">Marc Albareda Sirvent · Institut Sabadell</p>
        </motion.div>
        {Presentacio && (
          <div className="prosa portada__text">
            <Presentacio />
          </div>
        )}
      </section>

      <h2 className="seccio-titol">El recorregut</h2>
      <p className="seccio-intro">
        Cada parada s'encén quan hi arribo. Clica una parada activa per entrar-hi.
      </p>
      <MapaViatge />
    </div>
  )
}
