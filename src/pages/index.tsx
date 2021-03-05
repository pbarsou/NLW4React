// O 'index.tsx' é a nossa Home Page. É Página principal da nossa aplicação.

// importação de cada componente

import { CompletedChallenges } from "../components/CompletedChallenges"; 
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { Countdown } from "../components/Countdown";
import styles from '../styles/pages/Home.module.css';
import Head from 'next/head'; /* importando o 'Head' em que podemos escrever normalmente 
em HTML*/
 
export default function Home() {
  return (
    <div className={styles.container}>
 
    <Head>
      <title> Ínicio | move.it </title>
    </Head>
 
    <ExperienceBar />
 
    <section>
 
      <div>
        <Profile />
        <CompletedChallenges />
        <Countdown />
      </div>
 
      <div>
 
      </div>
 
    </section>
    
    </div>
  )
  
  /* '<ExperienceBar />' - Componentes no 'React' são formas de isolar pedaços de código e 
  reaproveitá-los. (imagine como os widgets do Flutter) // essa forma de se escrever como 
  uma tag HTML, chamamos de JSX, que é a forma de utilização de js ou typescript dentro do 
  html */
  /* dentro do '<Head />' podemos escrever normalmente em HTML por conta da importação que 
  fizemos */
  // '<section>' pois queremos elementos numa mesma linha (neste caso, 2 '<div>s')
}
 
