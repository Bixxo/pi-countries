const { response, request } = require('express')
const { Country, Activity } = require('../db');

const getCountryById = async ( req = request, res = response) => {
    const { id } = req.params
    if (id.length > 3) {
        return res.status(400).json({msg: 'El ID no es válido'})
    }
    const ID = id.toUpperCase();
    try {
        Country.findByPk(ID, {
            include: Activity
        })
        .then(country => {
            country ? res.json(country) : res.status(404).json({msg: `No se encontro pais con el id: ${id}`})
        })
        .catch(error => console.log(error))
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCountryById
}