import { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengesContext';
import styles from '../styles/components/Profile.module.css'; /* variável responsável
por receber o css module do componente */

export function Profile() {

  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/pbarsou.png" alt="Murilo Messias" />
      <div>
        <strong>Pablo Barbosa</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          {level}
        </p>
      </div>
    </div>
  );
  // para acessarmos o que criamos no css module, usamos '{styles.nomeDaClasse}'
}
