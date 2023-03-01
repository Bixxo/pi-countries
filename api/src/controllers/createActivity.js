const { Activity, Country } = require('../db');
const { response, request } = require('express')
const { capitalizeWords } = require('./functions')

const createActivity = async ( req = request, res = response) => {
    const { name, dificultad, duracion, season, country } = req.body
    

    if (!name || !dificultad || !season || !country) {
        return res.status(400).json({msg: 'Faltan parametros'})
    }
    if (dificultad > 5 || dificultad < 1) {
        return res.status(400).json({msg: 'La dificultad tiene que estar entre 1 y 5'})
    }

    const estacion = capitalizeWords(season);
    
    if (!['Verano', 'Otoño', 'Invierno', 'Primavera'].includes(estacion)) {
        return res.status(400).json({msg: 'La estacion no es valdia'})
    }

    const difficulty = parseInt(dificultad)
    const duration = parseInt(duracion)
    
    try {
        // res.json({msg: 'OK'})
        
        const newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season
        })
        
        const paisesEncontrados = await Country.findAll({ where: { name: country } });
        
        for (const pais of paisesEncontrados) {
            await newActivity.addCountry(pais);
        }
        
        res.status(201).json({msg: 'Actividad creada con exito'})
    } 
    catch (error) {
        console.log(error)
        res.status(400).json({msg: 'Error', error})
    }
      
    
}

module.exports = {
    createActivity
}