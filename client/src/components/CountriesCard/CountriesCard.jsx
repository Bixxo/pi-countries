import { Link } from 'react-router-dom'
import './CountriesCard.css'


const CountriesCard = props => {

    return(
        <Link to={`/home/${props.data.idd}`}>
        <div>
            <div className="card-front">
            <div className="front-blue">
            <img className='frontBandera' src={props.data.flagImage} alt="bandera" height='30px'/>
            </div>
            <div className="front-yellow"></div>
            <div className="front-pink"></div>
            <div className="front-dots"></div>
            <div className="front-personal-intro">
                <p>{props.data.name}</p>
                <p>{props.data.continent}</p>
            </div>
            </div>
        </div>
        /</Link>
    )
}

export default CountriesCard