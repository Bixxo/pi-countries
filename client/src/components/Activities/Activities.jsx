import './Activities.css'

const Actividades = props => {

    const { name, difficulty, duration, season } = props.data

    return (
        <div className='actCard'>
            <h1 className='actName'>{name}</h1>
            <p className='actDif'>Dificultad: {difficulty}</p>
            <p className='actDur'>Duracion: {duration} minutos</p>
            <p className='actEst'>Estacion: {season}</p>
        </div>
    )
}

export default Actividades;