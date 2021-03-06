import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {

  const hasActiveChallenge = true;

  return (
    <div className={styles.challengeBoxContainer}>
      { hasActiveChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe 400 xp</header>
          <main>
            <img src='icons/body.svg' alt=""/>
            <strong>Exercite-se</strong>
            <p>É agora Pablinho!</p>
            <p>Caminhe por 3 minutos e estique suas pernas pra dar aquela relaxada.</p>
          </main>
          <footer>
              <button type="button" className={styles.challengeFailedButton}>
                Falhei
              </button>
              
              <button type="button" className={styles.challengeSucceededButton}>
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