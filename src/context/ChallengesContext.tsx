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
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  levelUp: () => void; // função de retorno vazio
  startNewChallenge: () => void;
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

  return (
    <ChallengesContext.Provider value={{
      level, 
      currentExperience, 
      challengesCompleted,
      activeChallenge, 
      levelUp, 
      startNewChallenge}}>  
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