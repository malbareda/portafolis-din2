import { useRuta } from './hooks.js'
import { parades } from './content/viatge.js'
import Inici from './pagines/Inici.jsx'
import Parada from './pagines/Parada.jsx'
import Capcalera from './components/Capcalera.jsx'

export default function App() {
  const ruta = useRuta()
  const parada = parades.find((p) => p.id === ruta)

  return (
    <>
      <Capcalera actual={parada?.id} />
      <main>{parada ? <Parada parada={parada} /> : <Inici />}</main>
      <footer className="peu container">
        Marc Albareda Sirvent · Portafolis de competències directives (DIN2) · Tardor 2026
      </footer>
    </>
  )
}
