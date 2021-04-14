import styles from '../styles/components/Countdown.module.css';

import { useState, useEffect, useContext } from 'react'; /* 'useState' é responsável por mudar o 
estado das coisas // 'useEffect': quando algo acontecer, dispara um efeito colateral, no nosso caso, 
executa uma função // 'useContext' é necessária para o uso de contextos no nosso componente */ 

import { ChallengesContext } from '../context/ChallengesContext'; // importação do contexto
import { CountdownContext } from '../context/CountdownContext';

export function Countdown () {

  const { 
    minutes, 
    seconds, 
    hasFinished, 
    isActive, 
    resetCountdown, 
    startCountdown 
  } = useContext(CountdownContext); // estamos pegando cada variável de dentro do contexto 

 
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); /* transformamos os 
  valores em String // 'padStart()' é para se acaso o valor não tiver 2 casas decimais, preencher à 
  esquerda com '0' // 'split()' separa a String retornando um array */
 
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
 
  return ( 
    <div>
 
      <div className={styles.countdownContainer}>
 
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
 
      </div>

      {hasFinished ? (
        <button 
        disabled 
        className={styles.countdownButton}
        >
          Ciclo Encerrado
        </button>
      ) : (<>

            {isActive ? (
              <button 
              type="button" 
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}>
                  Abandonar ciclo
              </button>
            ) : (
              <button 
              type="button" 
              className={styles.countdownButton}
              onClick={startCountdown}>
                  Iniciar um ciclo
              </button>
            )}    
      
          </>)}
 
    </div>
  );

  /* podemos criar blocos de códigos js dentro do código html, foi isso oq fizemos em 
  '{isActive ? : }' */

  /* '{isActive ? : }' é um Operador Ternário. É uma forma curta de escrever, se 'x' for verdadeiro, 
  'y', se não, 'z' // após a '?', vem o bloco de código de quando verdadeiro, e após o ':', o bloco 
  de código de quando for falso */

  /* `${styles.countdownButton} ${styles.countdownButtonActive}` o que fizemos aqui foi uma 
  concatenação de CSSs (interpolação) // dessa forma, o css colocado a frente, herda as 
  características do anterior, e sobrescreve as novas */

  /* quando vamos colocar bloco de cód. javascript dentro de outro bloco de cód. javascript (tentamos 
  colocar na parte de negação do térnario outro bloco código js), não é aceito, pois o React não
  suporta. Para driblar isso, usamos o 'fragment', '<> </>', que é uma tag sem nome, que funciona como 
  uma 'div', mas que não vai ser exibida no html. */
  
}

