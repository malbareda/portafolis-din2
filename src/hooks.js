import { useEffect, useState } from 'react'

export function useMediaQuery(query) {
  const [coincideix, setCoincideix] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const canvi = () => setCoincideix(mq.matches)
    mq.addEventListener('change', canvi)
    return () => mq.removeEventListener('change', canvi)
  }, [query])
  return coincideix
}

// Enrutament mínim per hash (#/m8): funciona a GitHub Pages sense configuració.
export function useRuta() {
  const llegeix = () => window.location.hash.replace(/^#\/?/, '') || ''
  const [ruta, setRuta] = useState(llegeix)
  useEffect(() => {
    const canvi = () => {
      setRuta(llegeix())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', canvi)
    return () => window.removeEventListener('hashchange', canvi)
  }, [])
  return ruta
}
