import { createContext, ReactNode, useState } from 'react'; /* importação do 'createContext' 
necessário para a criação de contextos e do 'useState' para o gerenciamento de estado */

import challenges from '../../challenges.json'; // importação do arquivo json dos desafios

// ________________________________________________________________________________________________

/* Uma boa prática é fazermos uma tipagem do 'children', é informar qual o tipo dele. 
Quando usamos o typescript é interessante fazermos isso */

interface ChallengesProviderProps {  
  children: ReactNode; /* quando um children de um componente, também um componente React, 
  podemos utilizar o 'ReactNode', que aceita qualquer elemento como filho. */
}

interface Challenge { // typagem do Challenge (propriedades do 'challenges.json')
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

/* Outra é facilitarmos o acesso as informações de dentro do contexto, especificando o tipo de 
cada uma delas (tipagem) */

interface ChallengesContextData {
  level: number;
  currentExperience: number; // experiência do usuário
  experienceToNextLevel: number; // experiência para o próximo nível
  challengesCompleted: number; // número de desafios completos
  activeChallenge: Challenge; // se existe um desafio ativo ou não
  levelUp: () => void; // função de retorno vazio
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completedChallenge: () => void;
}
/* dessa forma, devemos informar que nosso contexto será do tipo 'ChallengesContextData' e quando 
formos usá-lo no restante dos componentes, eles terão acesso facilmente a cada uma dessas 
propriedades */

// ________________________________________________________________________________________________

export const ChallengesContext = createContext({} as ChallengesContextData); /* exportação do nosso 
contexto, sendo este do tipo 'ChallengesContextData', que foi o que criamos acima */

export function ChallengesProvider ({ children } : ChallengesProviderProps) { /* parâmetro que 
queremos receber e o seu tipo */

  const [level, setLevel] = useState(1); // criamos um estado que irá ser responsável pelo level
  const [currentExperience, setCurrentExperience] = useState(0); // estado responsável pela experiência
  const [challengesCompleted, setChallengesCompleted] = useState(0); /* estado responsável pelos 
  desafios completos */
  const [activeChallenge, setActiveChallenge] = useState(null); /* estado responsável pelo challenge
  atual */

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2); /* calculo que os rpgs usam para 
  calcular a experiência do usuário para o próximo nível // o 4 é o fator de dificuldade e o 2 é 
  a potência */

  function levelUp () { // função de atribuir +1 level
    setLevel(level +1);
  }

  function startNewChallenge () {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length); /* 'randomChallengeIndex'
    é o que recebe o número gerado randomicamente. 'Math.floor' arredonda pra baixo, enquanto 
    'Math.random' vai de 0 a 1. Se quisermos que vá de 0 até outra coisa, precisamos multiplicar 
    essa outra coisa, e neste caso, a quantidade de desafios. */
    const challenge = challenges[randomChallengeIndex]; // desafio referente ao index

    setActiveChallenge(challenge); // desafio setado ao 'activeChallenge'
  }
  
  function resetChallenge () { // função responsável por resetar o challenge para null 
    setActiveChallenge(null); // seta o challenge como null
  }

  function completedChallenge () { // função responsável por avisar que o desafio foi completo

    if (!activeChallenge) { // se 'activeChallenge' for null // validação 
      return; // retorna nada
    }

    const { amount } = activeChallenge; // pegando 'amount' de 'activeChallenge', q é o challenge atual

    let finalExperience = currentExperience + amount; /* finalExperience é a experiência final do 
    usuário // é o mesmo que 'currentExperience', porém criamos essa para poder alterar o valor */

    if (finalExperience >= experienceToNextLevel) { /* cálculo para caso a experiência para o próximo 
    nível for ultrapassada */
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp(); // aumenta de level
    }

    setCurrentExperience(finalExperience); // 'finalExperience' como novo valor de 'currentExperience'
    setActiveChallenge(null); // desafio atual passa a ser 'null'
    setChallengesCompleted(challengesCompleted + 1); // aumenta +1 em desafios completos

  }

  return (
    <ChallengesContext.Provider value={{
      level, 
      currentExperience,
      experienceToNextLevel, 
      challengesCompleted,
      activeChallenge, 
      levelUp, 
      startNewChallenge,
      resetChallenge,
      completedChallenge}}>  
    {children}
  </ChallengesContext.Provider>
  )
}

/* O '.Provider' faz com que todos os elementos presentes entre suas tags, possam acessar o contexto 
indicado. */
// 'children' são os componentes que poderão ter acesso ao nosso contexto. Nesse caso, é toda a app.
// 'value' são o valor/valores que o nosso contexto retorna.
/* '{{level, setLevel}}' primeira chave informando que o que virá faz parte do js, e segunda, 
porque estamos retornando um objeto */