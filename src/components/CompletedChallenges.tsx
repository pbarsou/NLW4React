import { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges() {

  const { challengesCompleted } = useContext(ChallengesContext); /* estamos pegando a propriedade 
  de quantidade de desafios completos de dentro do contexto */

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
  // para acessarmos o que criamos no css module, usamos '{styles.nomeDaClasse}'
}
