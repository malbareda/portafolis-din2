// Autoavaluació d'habilitats comunicatives (qüestionari de M8, 18/09/2026).
// Escala: 1 = Gens · 2 = Poc · 3 = Bastant · 4 = Molt
//
// `jo.entrada`: com em vaig valorar el setembre de 2026.
// `jo.sortida`: com em valoraré en acabar el curs (novembre 2026). null fins aleshores.
// `altres`: com em van valorar tres docents del meu centre (A, B, C), el mateix dia.
//   Un valor pot ser:
//     - un número (1–4)
//     - un número acabat en .5 quan la resposta va ser entremig (p. ex. «poc en calent, bastant en fred»)
//     - [1, 4] quan la resposta va ser «o l'un o l'altre» (p. ex. «gens o molt, depèn»)
// Noms dels companys: MAI a la web. Només A, B, C.

export const escala = ['Gens', 'Poc', 'Bastant', 'Molt']

export const companys = ['A', 'B', 'C']

export const blocs = [
  { id: 'escolta', nom: 'Escoltar', items: [1, 2, 3, 4, 5, 6] },
  { id: 'comprendre', nom: 'Comprendre el context', items: [7, 8] },
  { id: 'conversa', nom: 'Obrir, portar i tancar converses', items: [9, 10, 11, 12, 13, 14] },
]

export const items = [
  { n: 1, text: 'Miro amb atenció el meu interlocutor quan parla', jo: { entrada: 2, sortida: null }, altres: [1, 4, 2] },
  { n: 2, text: "Mostro una postura d'acceptació i interès vers l'altre", jo: { entrada: 3, sortida: null }, altres: [1, 4, 3] },
  { n: 3, text: "Reforço amb llenguatge no verbal la comunicació de l'altre", jo: { entrada: 3, sortida: null }, altres: [3, 4, 4] },
  { n: 4, text: 'Ofereixo paraules de comprensió («ho entenc», «sí», «sembla clar»)', jo: { entrada: 4, sortida: null }, altres: [2, 4, 3] },
  { n: 5, text: 'Resumeixo els punts importants per verificar que he entès el missatge', jo: { entrada: 4, sortida: null }, altres: [4, 4, 3] },
  { n: 6, text: "Dono temps a l'altre i no avanço conclusions", jo: { entrada: 1, sortida: null }, altres: [2, 3, 2] },
  { n: 7, text: "Observo la situació global de l'emissor (context, necessitats, estat emocional)", jo: { entrada: 4, sortida: null }, altres: [2.5, 4, 4] },
  { n: 8, text: 'Contrasto el missatge des de diferents punts de vista', jo: { entrada: 4, sortida: null }, altres: [3, 4, 4] },
  { n: 9, text: 'Em situo a una distància i posició adequades', jo: { entrada: 4, sortida: null }, altres: [[1, 4], 4, 4] },
  { n: 10, text: 'Escullo el moment i el lloc adients per a la conversa', jo: { entrada: 4, sortida: null }, altres: [2, 4, 3] },
  { n: 11, text: 'Faig servir el llenguatge no verbal per iniciar una conversa', jo: { entrada: 1, sortida: null }, altres: [3, 3, 4] },
  { n: 12, text: "Conec i faig servir fórmules diferents d'iniciar converses", jo: { entrada: 4, sortida: null }, altres: [4, 4, 3] },
  { n: 13, text: 'Faig preguntes obertes per obtenir informació i mantenir la conversa', jo: { entrada: 4, sortida: null }, altres: [2, 4, 3] },
  { n: 14, text: "Tanco la conversa amb un comentari positiu i un avís d'acabament", jo: { entrada: 3, sortida: null }, altres: [3, 3, 2] },
]
