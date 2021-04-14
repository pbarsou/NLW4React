// O 'index.tsx' é a nossa Home Page. É Página principal da nossa aplicação.

import Head from 'next/head'; /* importando o 'Head' em que podemos escrever normalmente 
em HTML*/

// importação de cada componente

import { CompletedChallenges } from "../components/CompletedChallenges"; 
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from '../context/CountdownContext';
import { ChallengesProvider } from '../context/ChallengesContext';

import styles from '../styles/pages/Home.module.css'; // importação do css module

import { GetServerSideProps } from 'next'; /* importação do 'GetServerSideProps' para informar o
tipo do 'getServerSideProps' e podermos usar o parâmetro 'ctx' que ele recebe */
 
interface HomeProps { // Typagem das propriedades de 'props'
  level: number; 
  currentExperience: number; 
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider 
      level={props.level} // 'level' que vem do 'getServerSideProps'
      currentExperience={props.currentExperience} // 'currentExperience' que vem do 'getServerSideProps'
      challengesCompleted={props.challengesCompleted} // 'challengesCompleted' que vem do 'getServerSideProps'
    >
      <div className={styles.container}>
  
      <Head>
        <title> Ínicio | move.it </title>
      </Head>
  
      <ExperienceBar />
  
      <CountdownProvider>
        <section>

          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
      
          <div>
            <ChallengeBox />
          </div>
    
        </section>
      </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
  
  /* 'ChallengesProvider' é a função/componente que receberá quais itens terão acesso ao contexto */
  /* '<ExperienceBar />' - Componentes no 'React' são formas de isolar pedaços de código e 
  reaproveitá-los. (imagine como os widgets do Flutter) // essa forma de se escrever como 
  uma tag HTML, chamamos de JSX, que é a forma de utilização de js ou typescript dentro do 
  html */
  /* dentro do '<Head />' podemos escrever normalmente em HTML por conta da importação que 
  fizemos */
  // '<section>' pois queremos elementos numa mesma linha (neste caso, 2 '<div>s')
}
 
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies; // const cookies = ctx.req.cookies;

  return {
    props: {
      level: Number(level), // conversão para número (já que os cookies armazenam Strins)
      currentExperience: Number(currentExperience), 
      challengesCompleted: Number(challengesCompleted)
    }
  }
}

/* Basicamente, quando um motor de busca busca os dados da nossa API, ele não espera a estrutura 
dos componentes ser construída (front-end (React)). Dessa forma ele não consegue acessar certos 
dados se eles não forem repassados de alguma forma para ele. O 'Next' tem uma funcionalidade, que 
é um método, chamado de 'getServerSideProps', que é 'async', e nele fica todas as informações que o 
motor precisa para construir a base da nossa aplicação. Dessa forma, também podemos repassar para a 
nossa aplicação através dele, esses dados. Por exemplo: os dados de um banco ficam nesse método, e ele 
repassa para a nossa aplicação para esses dados serem utilizados. (isso não é uma boa prática)

Vamos usar ele para pegar os dados dos nossos 'Cookies' e reaproveitá-los. */

/* 'ctx' (contexto) é um parâmetro que o 'getServerSideProps' pode receber. Ele nos ajuda a pegar 
de dentro do 'ctx.req' os nossos 'Cookis' */ 
/* estamos retornando essas propriedades dentro da 'Home', para que todo o app tenha acesso a elas.
Veja em 'export default function Home(props) { }' */