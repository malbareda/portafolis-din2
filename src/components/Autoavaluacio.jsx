import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks.js'
import { blocs, companys, escala, items } from '../content/dades/autoavaluacio.js'
import './Autoavaluacio.css'

// Autoavaluació comunicativa: com em veig jo (barra) i com em veuen tres companys (punts).
// Quan la distància entre la meva nota i la mitjana dels altres és d'un punt o més, la fila es marca.
// Quan hi hagi dades de sortida, apareix la vista «setembre → novembre».

const pos = (v) => ((v - 0.5) / escala.length) * 100 // centre de la cel·la, en %

function mitjanaAltres(altres) {
  const nums = altres.filter((v) => typeof v === 'number')
  return nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : null
}

function nomValor(v) {
  if (v == null) return 'pendent'
  if (Array.isArray(v)) return `${escala[v[0] - 1].toLowerCase()} o ${escala[v[1] - 1].toLowerCase()}, depèn`
  if (v % 1) return `entre ${escala[Math.floor(v) - 1].toLowerCase()} i ${escala[Math.ceil(v) - 1].toLowerCase()}`
  return escala[v - 1].toLowerCase()
}

function Punts({ altres }) {
  return altres.flatMap((v, i) => {
    const vals = Array.isArray(v) ? v : [v]
    return vals.map((x, j) => (
      <span
        key={`${i}-${j}`}
        className={`auto__punt-company ${Array.isArray(v) ? 'auto__punt-company--dubte' : ''}`}
        style={{ left: `calc(${pos(x)}% + ${(i - 1) * 13}px)` }}
        title={`Company ${companys[i]}: ${nomValor(v)}`}
        aria-hidden="true"
      >
        {companys[i]}
      </span>
    ))
  })
}

function Fila({ item, vista, reduce }) {
  const m = mitjanaAltres(item.altres)
  const jo = vista === 'evolucio' ? item.jo.sortida : item.jo.entrada
  const dif = m != null && item.jo.entrada != null ? m - item.jo.entrada : 0
  const marca = vista !== 'evolucio' && Math.abs(dif) >= 1
  const mostraJo = vista !== 'altres'
  const mostraAltres = vista !== 'jo' && vista !== 'evolucio'

  return (
    <li className={`auto__item ${marca ? 'auto__item--marca' : ''}`}>
      <span className="auto__text">
        <span className="auto__num">{item.n}</span> {item.text}
        {marca && (
          <span className={`auto__diferencia ${dif > 0 ? 'auto__diferencia--mes' : 'auto__diferencia--menys'}`}>
            {dif > 0 ? 'els altres hi veuen més' : 'jo hi veig més'}
          </span>
        )}
        <span className="sr-only">
          {' '}Jo: {nomValor(item.jo.entrada)}.
          {companys.map((c, i) => ` Company ${c}: ${nomValor(item.altres[i])}.`).join('')}
        </span>
      </span>
      <span className="auto__pista" aria-hidden="true">
        {mostraJo && vista === 'evolucio' && item.jo.entrada != null && (
          <span className="auto__barra auto__barra--fantasma" style={{ width: `${pos(item.jo.entrada)}%` }} />
        )}
        {mostraJo && jo != null && (
          <motion.span
            className={`auto__barra ${vista === 'evolucio' ? 'auto__barra--sortida' : 'auto__barra--jo'}`}
            initial={reduce ? false : { width: 0 }}
            whileInView={{ width: `${pos(jo)}%` }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={reduce ? { width: `${pos(jo)}%` } : undefined}
          />
        )}
        {mostraJo && jo == null && <span className="auto__buit">pendent</span>}
        {mostraAltres && <Punts altres={item.altres} />}
        {mostraAltres && m != null && <span className="auto__mitjana" style={{ left: `${pos(m)}%` }} title="Mitjana dels companys" />}
      </span>
    </li>
  )
}

export default function Autoavaluacio() {
  const hiHaSortida = items.some((i) => i.jo.sortida != null)
  const vistes = [
    { id: 'jo', nom: 'Com em veig' },
    { id: 'altres', nom: 'Com em veuen' },
    { id: 'tots', nom: 'Tots dos' },
    ...(hiHaSortida ? [{ id: 'evolucio', nom: 'Setembre → novembre' }] : []),
  ]
  const [vista, setVista] = useState('tots')
  const [nomesDiferencies, setNomesDiferencies] = useState(false)
  const reduce = useReducedMotion()

  const passaFiltre = (item) => {
    if (!nomesDiferencies) return true
    const m = mitjanaAltres(item.altres)
    return m != null && Math.abs(m - item.jo.entrada) >= 1
  }

  return (
    <figure className="auto">
      <div className="auto__controls">
        <div className="auto__vistes" role="radiogroup" aria-label="Què vols veure">
          {vistes.map((v) => (
            <button key={v.id} role="radio" aria-checked={vista === v.id} className="auto__vista" onClick={() => setVista(v.id)}>
              {v.nom}
            </button>
          ))}
        </div>
        <label className="auto__filtre">
          <input type="checkbox" checked={nomesDiferencies} onChange={(e) => setNomesDiferencies(e.target.checked)} />
          Només on no coincidim
        </label>
      </div>

      <div className="auto__llegenda" aria-hidden="true">
        {vista !== 'altres' && vista !== 'evolucio' && <span><i className="auto__mostra auto__mostra--jo" /> jo</span>}
        {vista !== 'jo' && vista !== 'evolucio' && (
          <>
            <span><i className="auto__mostra auto__mostra--company">A</i> tres docents del centre</span>
            <span><i className="auto__mostra auto__mostra--mitjana" /> la seva mitjana</span>
          </>
        )}
        {vista === 'evolucio' && (
          <>
            <span><i className="auto__mostra auto__mostra--fantasma" /> setembre</span>
            <span><i className="auto__mostra auto__mostra--sortida" /> novembre</span>
          </>
        )}
      </div>

      <div className="auto__escala" aria-hidden="true">
        {escala.map((e) => <span key={e}>{e}</span>)}
      </div>

      {blocs.map((bloc) => {
        const visibles = bloc.items.map((n) => items.find((i) => i.n === n)).filter(passaFiltre)
        if (!visibles.length) return null
        return (
          <section key={bloc.id} className="auto__bloc">
            <h4 className="auto__nom-bloc">{bloc.nom}</h4>
            <ul className="auto__llista">
              {visibles.map((item) => <Fila key={item.n} item={item} vista={vista} reduce={reduce} />)}
            </ul>
          </section>
        )
      })}

      <figcaption className="auto__peu">
        Qüestionari d'autoavaluació d'habilitats comunicatives de M8 (18/09/2026). El vaig respondre jo i el vaig passar a tres
        docents del meu centre perquè el responguessin sobre mi. Es marquen les files on la meva nota i la mitjana dels altres es
        distancien un punt o més.
      </figcaption>
    </figure>
  )
}
