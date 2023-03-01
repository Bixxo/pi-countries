import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import './CountryDitails.css'
import { getCountryDetails } from '../../redux/actions/index'
import Actividades from '../Activities/Activities'

const CountryDitails = props => {

    const { getCountryDetails } = props
    const { id } = props.match.params

    useEffect(() => {
        getCountryDetails(id)
    },[])

    const { name, idd, flagImage, continent, capital, subregion, area, population, car, Activities } = props.countryDitails

    console.log(Activities);

    return(
        <div>
            <div className="card back">
                <div className="yellow"></div>
                    <div className="top-dots"></div>
                        <div className="personal-info">
                            <p className='nombre'>Nombre: {name}</p>
                            <p className='ID'>{idd}</p>
                            <img className='bandera' src={flagImage} alt={`bandera de: ${name}`} height='130px'/>
                            <p>Continente: {continent}</p>
                            <p>Capital: {capital}</p>
                            <p>Subregion: {subregion}</p>
                            <p>Area: {area}</p>
                            <p>Poblacion: {population}</p>
                        </div>
                        <div className="bottom-dots"></div>
                    <div className="pink"></div>
                </div>
                <div className='container'>
                    {Array.isArray(Activities) ? Activities.map(el => <Actividades className="item" key={el.id} data={el}/>) : null}
                </div>
                <Link to='/home'>
                    <button className='backBtn'>Back</button>
                </Link>
        </div>

    )
}

export const mapStateToProps = state => {
    return {
        countryDitails: state.countryDetail
    }
}

export default connect(mapStateToProps, { getCountryDetails })(CountryDitails)