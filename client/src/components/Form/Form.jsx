import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCountries, crearActividad } from '../../redux/actions/index';
import validate from "./Errors"
import "./Form.css";

const Form = props => {

    const { getAllCountries, countries, crearActividad } = props

    useEffect(() => {
        getAllCountries()
    },[])

    const [input, setInput] = useState({
        name: '',
        dificultad: '3',
        duracion: '',
        season: '',
        country: [],
    });

    const [ errors, setErrors ] = useState({})

    const handleCange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    
    const handleCangeCountry = e => {
        if (input.country.includes(e.target.value)) {
            alert(`El pais: ${e.target.value} ya se encuentra en la lista`)
        }
        else {
            input.country.push(e.target.value)
            setInput({
            ...input,
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        }
    }

    const deleteCountry = e => {
        input.country.splice(input.country.indexOf((e.target.innerHTML), 1))
        setInput({
            ...input,
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const reset = () => {
        setInput({
            name: '',
            dificultad: '3',
            duracion: '',
            season: '',
            country: [],
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        await crearActividad(input)
        reset()
        let season = document.getElementById('season')
        let country = document.getElementById('country')
        season.value = 'default'
        country.value = 'default'
    }

    return (
        <div className="mainForm">
            <h1>Crear Actividad!</h1>
            <div>
                <form className="form" onSubmit={handleSubmit}>
                    <input className="inputForm" placeholder="Nombre de Actividad" name="name" type="text" value={input.name} onChange={handleCange}/>
                    <label className="error">{errors.name}</label>
                    <label className="labelForm">Dificultad: </label>
                    <input className="inputForm" type="range" min="1" max="5" value={input.dificultad} onChange={handleCange} name='dificultad'/>
                    <label className="labelForm"> {input.dificultad}</label>
                    <label className="error">{errors.dificultad}</label>
                    <input className="inputForm" placeholder="Duracion en minutos" name="duracion" type="number" value={input.duracion} onChange={handleCange}/>
                    <label className="error">{errors.duracion}</label>
                    <select id="season" className="selectForm" name="season" defaultValue="default" onChange={handleCange}>
                        <option disabled value="default" >--Temporada--</option>
                        <option value="Primavera">Primavera</option>
                        <option value="Verano">Verano</option>
                        <option value="Otoño">Otoño</option>
                        <option value="Invierno">Invierno</option>
                    </select>
                    <label className="error">{errors.season}</label>
                    <select id="country" className="selectForm" name="country" defaultValue="default" onChange={handleCangeCountry}>
                        <option disabled value="default" >--Paises--</option>
                        {Array.isArray(countries) ? countries.map(el => <option key={el.name} value={el.name}>{el.name}</option>) : <option disabled>Sin Paises</option>}
                    </select>
                    <label className="error">{errors.country}</label>
                    <label className="labelForm">Paises Seleccionados: </label>
                    <ul className="ulForm">
                        {input.country.length > 0 ? input.country.map(el => <li className="liForm" onClick={deleteCountry} key={el}>{el}</li>) : null}
                    </ul>
                    <button className="buttomForm" disabled={Object.entries(errors).length !== 0 ? true : false || input.name === "" ?true : false} type="submit">Crear</button>
                </form>
                <Link to="/home"> <button>Back</button> </Link>
            </div>
        </div>
    )
};

export const mapStateToProps = state => {
    return {
        countries: state.countries,
    }
}

export default connect(mapStateToProps, {getAllCountries, crearActividad})(Form);