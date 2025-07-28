
type ScoreProps ={

  score: number
  bestScore: number

}


const ScoreBoard = ({score, bestScore}: ScoreProps) => {

  return(
    <>
      <div className="score">
        <p>score: {score}</p>
        <p>best score: {bestScore}</p>
      </div>
    </>
  )
}


export default ScoreBoard;
