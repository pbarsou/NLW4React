/* Arquivo em que reaproveitamos uma estrutura prévia em nossa aplicação. Ou seja, aquela
estrutura que nunca muda entre as páginas */

import '../styles/global.css'; /* importamos aqui o 'global.css' para ser aplicado em toda 
a aplicação */

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
