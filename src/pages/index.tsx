import { useState } from "react";
import styles from "../../styles/home.module.scss";

type Players = "O" | "X";

export default function Home() {

  const [turn, setTurn] = useState<Players>("X");
  const [winner, setWinner] = useState<String | null>(null);
  const [draw, setDraw] = useState<boolean | null>(null)

 /* 
 marks: {
  "0": "X",
  "1": "O",
  "2": "X"
 } 
  Valor para armazenar quem jogou em cada posição, sendo a key a posição

 */

  const [marks, setMarks] = useState<{ [ key: string ]: Players }>({})

  const getSquares = () => {
    return new Array(9).fill(true);
  };

  const play = (index: number) => {

    if(marks[index]){
      return;
    }
      setMarks(prev => ({...prev, [index]: turn}))
      setTurn(prev => prev == "O" ? "X" : "O")
  }

  const getCellPlayer = (index: number) => {

    if(!marks[index]){
      return ""
    }

    return marks[index];

  }

  // Quando eu utilizo _ nos parametros de um método array, significa que eu quero ignorar o valor daquele elemento

  return (
    <div className={styles.container}>
        {/* <h1>Parabéns Nicks021, você ganhou</h1>
      <p>É a vez de nicks02</p> */}
      <div className={styles.board}>
        {getSquares().map((_, index) => (
          <div key={index} className={`${styles.square} ${getCellPlayer(index)}`} onClick={() => play(index)}>
            {marks[index]}
          </div>
        ))}
      </div>
      <div className={styles.button}>
          <button>Jogar novamente</button>
      </div>
    </div>
  );
}
