import styles from "../../styles/home.module.scss";

export default function Home() {
  const getSquares = () => {
    return new Array(9).fill(true);
  };

  // Quando eu utilizo _ nos parametros de um método array, significa que eu quero ignorar o valor daquele elemento

  return (
    <div className={styles.container}>
        <h1>Parabéns Nicks021, você ganhou</h1>
      <p>É a vez de nicks02</p>
      <div className={styles.board}>
        {getSquares().map((_, index) => (
          <div key={index} className={styles.square}>
            X
          </div>
        ))}
      </div>
      <div className={styles.button}>
          <button>Jogar novamente</button>
      </div>
    </div>
  );
}
