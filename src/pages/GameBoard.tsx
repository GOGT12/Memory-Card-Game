import { useState, useEffect, useRef } from "react"
import ScoreBoard from "../components/Scoreboard";
import Card from "../components/Card";

type Pokemon = {

  name: string
  image: string

}

type PokemonSummary = {

  name: string
  url: string

}

const GameBoard = () => {

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const [score, setScore] = useState(0)

  const [bestScore, setBestScore] = useState(0)


  const selectedPokes = useRef<Set<string>>(new Set());

  const handleScore = (name: string) => {

    if (selectedPokes.current.has(name)) {

      if(bestScore > score){
        setBestScore(bestScore)
      } else{
        setBestScore(score)
      }

      setScore(0)
      selectedPokes.current.clear()
      setPokemons(pokemons.sort(()=> Math.random() -0.5))
    } else{

      selectedPokes.current.add(name)
      let x = score
      setScore( x += 1)
      setPokemons(pokemons.sort(()=> Math.random() -0.5))
    }

  }


  useEffect(() => {

    async function fetchPokemons() {

      try {

        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12')
        const data = await res.json()
        const detailed = await Promise.all(
          data.results.map(async(poke: PokemonSummary) => {
            const res = await fetch(poke.url)
            const detail = await res.json()

            return {
              name: poke.name,
              image: detail.sprites.other['official-artwork'].front_default,
            }

          })
        )

        setPokemons(detailed)

      } catch (error) {
        console.log('Error al cargar los Pokemon:', error)
      }
    }

    fetchPokemons();
  }, [])


  return(
    <>

      <ScoreBoard
        score = {score}
        bestScore={bestScore}
      />

      {score === 12 ? (
        <p className="winner">🎊 Congratulations 🎉 You did it, Trainer!</p>
      ): (

        <div className="gameboard">
          {pokemons.map((pokemon, index) => (
            <Card
              key={index}
              name={pokemon.name}
              image={pokemon.image}
              onClick={() => handleScore(pokemon.name)}
            />
          ))}
        </div>


      )}


    </>
  )
}

export default GameBoard;
