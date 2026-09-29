// Recull tots els .mdx de src/content i els agrupa per parada.
// Cada fitxer és una secció; s'ordenen pel camp `ordre` del frontmatter (o pel nom del fitxer).
const fitxers = import.meta.glob('./content/**/*.mdx', { eager: true })

const carpetaDe = (ruta) => {
  const m = ruta.match(/\.\/content\/(?:itinerari\/)?([^/]+)\//)
  return m ? m[1] : null
}

export function seccionsDe(idParada) {
  return Object.entries(fitxers)
    .filter(([ruta]) => carpetaDe(ruta) === idParada)
    .map(([ruta, mod]) => ({
      ruta,
      Component: mod.default,
      meta: mod.frontmatter ?? {},
    }))
    .sort((a, b) => (a.meta.ordre ?? 99) - (b.meta.ordre ?? 99) || a.ruta.localeCompare(b.ruta))
}

export function paginaSolta(nom) {
  const entrada = Object.entries(fitxers).find(([ruta]) => ruta === `./content/${nom}.mdx`)
  return entrada ? entrada[1].default : null
}
