import { useContext } from 'react'; // importação do 'useContext'
import { ChallengesContext } from '../context/ChallengesContext'; // importação do contexto
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {

  const { activeChallenge, resetChallenge, completedChallenge } = useContext(ChallengesContext); /* estamos pegando 
  uma variável e uma função de dentro do contexto (dentre as que ele retorna, obviamente) // se 
  'activeChallenge' não for 'null', vai entrar no bloco de verdadeiro, se for 'null', entra no 
  bloco de falso */

  return (
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
            <strong>Exercite-se</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
              <button 
              type="button" 
              className={styles.challengeFailedButton}
              onClick={resetChallenge}>
                Falhei
              </button>
              
              <button 
              type="button" 
              className={styles.challengeSucceededButton}
              onClick={completedChallenge}>
                Completei
              </button>
            </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
        <strong>Inicie um ciclo para receber desafios</strong>
        <p>
          <img src='icons/level-up.svg' alt="Level up" /> 
          Avance de level completando os desafios.
        </p>
      </div>
      ) }
    </div>
  );
}

/* '<img src={`icons/${activeChallenge.type}.svg`} alt=""/>' forma de colocarmos js dentro de um 
caminho */
/* a partir de agora, todas as informações do 'ChallengeBox' está vindo das propriedades presentes
no nosso 'Challenge', que fica no 'ChallengesContext' */