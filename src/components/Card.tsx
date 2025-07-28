
import '../App.css'

type CardProps = {

  name: string
  image: string
  onClick: () => void
  
}



const Card = ({name, image, onClick}: CardProps) => {

  return(

    <div className="card" onClick={onClick}>

      <img src={image} alt={name}/>
      <p>{name}</p>

    </div>

  )
}


export default Card
