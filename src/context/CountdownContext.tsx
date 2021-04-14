import { createContext, ReactNode, useContext, useEffect, useState } from 'react'; /* importação do 'createContext' necessário para a 
criação de contextos */
import { ChallengesContext } from './ChallengesContext';

interface ContdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void; // função não recebe parâmetro e tem retorno vazio
  resetCountdown: () => void;
}

interface CountdownProviderProps {  
  children: ReactNode; /* quando um children de um componente também é um componente React, 
  podemos utilizar o 'ReactNode', que aceita qualquer elemento como filho. */
}

export const CountdownContext = createContext({} as ContdownContextData);

let countdownTimeout: NodeJS.Timeout; /* variável global responsável por parar imediatamente o 
'setTimeout' // escrevemos ': NodeJS.Timeout' para conseguirmos saber qual o formato exato do 
'countdownTimeout' */

export function CountdownProvider({children}: CountdownProviderProps) {

    const { startNewChallenge } = useContext(ChallengesContext); /* estamos pegando uma função de 
    dentro do contexto */
  
    const [time, setTime] = useState(25 * 60); /* parâmetro do 'useState' é atribuído a 'time', 
    já que'useState' retorna um array de 2 posições, sendo a primeira o valor do parâmetro e a 
    segunda a função modificadora */
  
    const [isActive, setIsActive] = useState(false); // variável que verificará se o botão está ativo
    const [hasFinished, setHasFinished] = useState(false); /* variável que verificará se o tempo 
    finalizou */
    
    const minutes = Math.floor(time / 60); /* Math.floor' retorna apenas a parte inteira */
    const seconds = time % 60; /* resto da divisão*/

    function startCountdown () { // função responsável por startar o botão
      setIsActive(true); // alterando valor de 'isActive' pela função modificadora
    }
  
    function resetCountdown () { // função de resetar o Countdown
      clearTimeout(countdownTimeout); // cancela o 'setTimeout'
      setIsActive(false); // setando 'IsActive' como false para parar a execução do 'useEffect'
      setHasFinished(false); /* setando 'HasFinished' como false para botão de 'Iniciar um ciclo'
      seja ativado */
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
        startNewChallenge();
      }
    }, [isActive, time]); /* o primeiro parâmetro do 'useEffect' é sempre o que queremos executar, 
    ou seja, é sempre uma função // o segundo parâmetro, é quando queremos executar, que neste caso 
    é sempre que o valor de 'isActive' mudar (chamamos esse array de 'array de dependência do 
    'useEffect') // adicionamos ainda que queremos que execute quando o valor de 'time' mudar. 
    O valor de 'time' muda a cada execução do'useEffect', dessa forma, acabamos de criar uma estrutura 
    de repetição, de até que 'time' seja = 0 */

    return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}