const validate = input => {
    let errors = {}

    if(!input.name) {
        errors.name = 'Nombre de actividad requerido'
    }
    else if (input.name.length < 4) {
        errors.name = 'El nombre debe tener al menos 4 letras'
    }

    if(!input.dificultad) {
        errors.dificultad = 'Debe de tener dificultad'
    }
    else if(input.dificultad > 5  || input.dificultad < 1) {
        errors.dificultad = 'La dificultad tiene que ser entre 1 y 5'
    }

    if(!input.duracion) {
        errors.duracion = 'Debe de tener una duracion en minutos'
    }
    else if(input.duracion < 10) {
        errors.duracion = 'La duracion debe de ser de al menos 10 minutos'
    }

    if(!input.season) {
        errors.season = 'Debe de tener una estacion'
    }

    if(input.country.length === 0) {
        errors.country = 'Debe de tener al menos un pais agregado'
    }
    return errors
}   

export default validate