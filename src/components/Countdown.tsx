import styles from '../styles/components/Countdown.module.css';

import { useState, useEffect } from 'react'; // 'useState' é responsável por mudar o estado das coisas 
// 'useEffect': quando algo acontecer, dispara um efeito colateral, no nosso caso, executa uma função 
 
let countdownTimeout: NodeJS.Timeout; /* variável global responsável por parar imediatamente o 
'setTimeout' // escrevemos ': NodeJS.Timeout' para conseguirmos saber qual o formato exato do 
'countdownTimeout' */
 
export function Countdown () {
 
  const [time, setTime] = useState(25 * 60); /* parâmetro do 'useState' é atribuído a 'time', já que
  'useState' retorna um array de 2 posições, sendo a primeira o valor do parâmetro e a segunda a função
  modificadora */
 
  const [isActive, setIsActive] = useState(false); // variável que verificará se o botão está ativo
  const [hasFinished, setHasFinished] = useState(false); // variável que verificará se o tempo finalizou
  
  const minutes = Math.floor(time / 60); /* Math.floor' retorna apenas a parte inteira */
  const seconds = time % 60; /* resto da divisão*/
 
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); /* transformamos os 
  valores em String // 'padStart()' é para se acaso o valor não tiver 2 casas decimais, preencher à 
  esquerda com '0' // 'split()' separa a String retornando um array */
 
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
 
  function startCountdown() { // função responsável por startar o botão
    setIsActive(true); // alterando valor de 'isActive' pela função modificadora
  }
 
  function resetCountdown () { // função de resetar o Countdown
    clearTimeout(countdownTimeout); // cancela o 'setTimeout'
    setIsActive(false); // setando 'IsActive' como false para parar a execução do 'useEffect'
    setTime(25*60); // reiniciando o tempo
  }
 
  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => { /* o retorno de 'setTimeout', atribuímos a 
      'countdownTimeout' */
        setTime(time - 1); // alterando valor de 'time' pela função modificadora
      }, 1000) // espera 1000ms para executar
    }
    else if (isActive && time === 0) { // para verificar igualdade no js, usamos '==='
      setHasFinished(true);
      setIsActive(false);
    }
  }, [isActive, time]); /* o primeiro parâmetro do 'useEffect' é sempre o que queremos executar, ou seja, 
  é sempre uma função // o segundo parâmetro, é quando queremos executar, que neste caso é sempre que o 
  valor de 'isActive' mudar (chamamos esse array de 'array de dependência do 'useEffect') */
  /* adicionamos ainda que queremos que execute quando o valor de 'time' mudar. O valor de 'time' muda 
  a cada execução do'useEffect', dessa forma, acabamos de criar uma estrutura de repetição, de até que 
  'time' seja = 0 */
 
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

