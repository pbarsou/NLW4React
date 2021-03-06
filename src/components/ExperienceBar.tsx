import styles from '../styles/components/ExperienceBar.module.css'; /* variável responsável
por receber o css module do componente // 'Css Module' é a forma que o 'Next.js' disponibiliza 
de utilizarmos css livremente na nossa aplicação e de que o css dos componentes não invadam um
ao outro */ 

export function ExperienceBar () {
  return (
    <header className={styles.experienceBar}> 
      <span>0 xp</span>
      <div>
        <div style={{ width: '50%' }} />
        <span className={styles.currentExperience} style={{ left: '50%'}}>
          300px
        </span> 
      </div>
      <span>600 xp</span>
    </header>
    
    // para se colocar código js dentro do html no 'React', usamos '{}'
    // para acessarmos o que criamos no css module, usamos '{styles.nomeDaClasse}'
      // o nome da classe n pode conter caracteres especiais como ' - '
    // poderíamos iniciar com uma '<div>', mas por questão de semântica, usamos o '<header>'
    // '<div />' é uma div vazia
    /* '{{width: '50%'}}' é referente ao tamanho da barra de experiência. Estamos definindo 
    localmente e em formato js, pois é um valor que irá variar ao longo da execução da app //
    usamos chave dentro de chave por estarmos utilizando código js */ 
    /* 'left: '50%' significa que vai andar da esquerda pra direita, 50% */
  )
}
