// Documento que nos permite moldar parte do HTML da nossa app

/* O '_document.tsx' carrega uma única vez na nossa aplicação, logo oq colocamos aqui, são
coisas que precisarão ser carregadas uma única vez, que diferente do '_app.tsx', não podemos
colocar estruturas pois elas acabam por ser recalculadas quando há a mudança de página */

import Document, { Html, Head, Main, NextScript } from 'next/document'; /* estamos importando
Html, Head, Main e NextScript, de dentro do 'next/document', que o 'document' do 'Next.js' */
// temos que utilizá-las iniciando com letra maiúscula

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="favicon.png" type="image/png" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
  // '<Head>', utilizamos como o 'head' do HTML
  /* em 'shortcut icon', é onde fica o 'favicon', ícone que fica ao lado do 'title' da nossa 
  page */
  /* '<Main />' é onde nossa aplicação será mostrada // Tags sem conteúdo, usamos dessa 
  forma no react */
  // '<NextScript />', scripts que o próprio 'Next.js' coloca na app de forma automatizada
}
