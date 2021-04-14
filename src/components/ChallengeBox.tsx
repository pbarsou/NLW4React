import { useContext } from 'react'; // importação do 'useContext'
import { ChallengesContext } from '../context/ChallengesContext'; // importação do contexto
import { CountdownContext } from '../context/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {

  const { activeChallenge, resetChallenge, completedChallenge } = useContext(ChallengesContext); 
  /* estamos pegando uma variável e uma função de dentro do contexto (dentre as que ele retorna, 
  obviamente) // se 'activeChallenge' não for 'null', vai entrar no bloco de verdadeiro, se for 
  'null', entra no  bloco de falso */
  const { resetCountdown} = useContext(CountdownContext);

  function handleChallengesSucceeded () { // função para caso o usuário complete o desafio
    completedChallenge(); // chamamos a função de 'completedChallenge';
    resetCountdown(); // chamamos a função de 'resetCountdown';
  }

  function handleChallengesFailed () { // função para caso o usuário falhe o desafio
    resetChallenge(); // chamamos a função de 'resetChallenge';
    resetCountdown(); // chamamos a função de 'resetCountdown';
  }

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
              onClick={handleChallengesFailed}>
                Falhei
              </button>
              
              <button 
              type="button" 
              className={styles.challengeSucceededButton}
              onClick={handleChallengesSucceeded}>
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