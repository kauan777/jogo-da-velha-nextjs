import { useEffect, useState } from "react";
import styles from "../../styles/home.module.scss";

type Players = "O" | "X";

export default function Home() {
  const [turn, setTurn] = useState<Players>("X");
  const [winner, setWinner] = useState<Players | null>(null);
  const [draw, setDraw] = useState<boolean | null>(null);

  /* 
 marks: {
  "0": "X",
  "1": "O",
  "2": "X"
 } 
  Valor para armazenar quem jogou em cada posição, sendo a key a posição

 */
  const [marks, setMarks] = useState<{ [key: string]: Players }>({});


  useEffect(() => {

    const winner = getWinner();

    if(winner){
      setWinner(winner)
    }

  }, [marks])


  const getSquares = () => {
    return new Array(9).fill(true);
  };

  const play = (index: number) => {
    if (marks[index]) {
      return;
    }
    setMarks((prev) => ({ ...prev, [index]: turn }));
    setTurn((prev) => (prev == "O" ? "X" : "O"));
  };

  const getCellPlayer = (index: number): String => {
    if (!marks[index]) {
      return "";
    }

    return marks[index];
  };

  const getWinner = () => {
    const victoryLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of victoryLines) {
      const [a, b, c] = line;

      if (marks[a] && marks[a] === marks[b] && marks[b] == marks[c]) {
        return marks[a]
      }
    }
  }

    // Quando eu utilizo _ nos parametros de um método array, significa que eu quero ignorar o valor daquele elemento

    return (
      <div className={styles.container}>
         
        {winner && <h1>Parabéns {winner}, você ganhou</h1> }
        <p>É a vez de {turn}</p>
        <div className={styles.board}>
          {getSquares().map((_, index) => (
            <div
              key={index}
              className={`${styles.square} ${getCellPlayer(index)}`}
              onClick={() => play(index)}
            >
              {marks[index]}
            </div>
          ))}
        </div>
        <div className={styles.button}>
          <button>Jogar novamente</button>
        </div>
      </div>
    );
  };
