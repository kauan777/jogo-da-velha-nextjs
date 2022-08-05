import { Circle, X } from "phosphor-react";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

type Players = "O" | "X";

function Board() {

    const [turn, setTurn] = useState<Players>("X");
    const [winner, setWinner] = useState<Players | null>(null);
    const [draw, setDraw] = useState<boolean | null>(null);
    const [marks, setMarks] = useState<{ [key: string]: Players }>({});
    /* 
   marks: {
    "0": "X",
    "1": "O",
    "2": "X"
   } 
    Valor para armazenar quem jogou em cada posição, sendo a key a posição
  
    */
  
    const gameOver = !!winner || !!draw;
  
  
    useEffect(() => {
  
      const winner = getWinner();
  
      if(winner){
        setWinner(winner)
      } else{ 
        if(Object.keys(marks).length === 9){
          setDraw(true)
        }
      }
  
    }, [marks])
  
  
    const getSquares = () => {
      return new Array(9).fill(true);
    };
  
    const play = (index: number) => {
  
      if (marks[index] || gameOver) {
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
  
    const reset = () => {
      setTurn(marks[0] == "X" ? "O" : "X")
      setMarks({})
      setWinner(null)
      setDraw(null)
    }
  
      // Quando eu utilizo _ nos parametros de um método array, significa que eu quero ignorar o valor daquele elemento

  return (
         <>
    {winner && <h1>Parabéns {winner}, você ganhou</h1> }
    {draw && <h1 className={styles.draw}>Empate</h1> }
    {!gameOver && <p className={styles.turn}>É a vez de {turn}</p>}
    <div className={`${styles.board} ${gameOver && styles.gameOver}`}>
      {getSquares().map((_, index) => (
        <div
          key={index}
          className={`${styles.square} ${getCellPlayer(index)}`}
          onClick={() => play(index)}
        >
          {marks[index] == "X" && <X size={36} color="#fff" />}
          {marks[index] == "O" &&  <Circle size={36} color="#fff" />}
        </div>
      ))}
    </div>
    <div className={styles.button}>
      {gameOver &&( 
            <button 
              className={styles.playAgain} 
              onClick={reset}
               >
                Jogar novamente
            </button>)}
    </div>
    </>
  )
}

export default Board