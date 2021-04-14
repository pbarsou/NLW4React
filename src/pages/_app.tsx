/* Arquivo em que reaproveitamos uma estrutura prévia em nossa aplicação. Ou seja, aquela
estrutura que nunca muda entre as páginas */

import '../styles/global.css'; /* importamos aqui o 'global.css' para ser aplicado em toda 
a aplicação */

function MyApp({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  )
}

/* 'ChallengesProvider' é a função/componente que receberá quais itens terão acesso ao contexto */
/* 'ChallengesProvider' foi realocado para o 'index.tsx', pois agora estamos usando o 
'getServerSideProps' e as 'props' estão sendo repassadas direto para a 'Home' da nossa app */
/* Nosso contexto foi importado para o '_app.tsx', devido ao fato de querermos que toda a nossa 
aplicação, bem como todos os componentes, tenham acesso ao contexto de Desafios (Challenges). 
Dentro da função 'Provider' criada para ele, colocamos a tag/componente referente a nossa aplicação. */

export default MyApp
