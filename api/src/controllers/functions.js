const { Country, Activity } = require('../db');
const axios = require('axios');
const { Sequelize } = require('sequelize');


//Traer los datos de la base de datos
const dbCountries = async () => {
    const paises = await Country.findAll({
        include: Activity
    });
    return paises;
  };

const dbActivities = async () => {
    const actividades = await Activity.findAll()
    return actividades
}

//Cargar todos los datos a la base de datos
const loadCountriesdb = async () => {

    let data = [];
    let paises = []
    await axios.get('https://restcountries.com/v3/all')
    .then(res => data = res.data);

    try {
        data.forEach(el => {
            if(!el.capital?.[0]) {
                el.capital = 'S/C'
            }

            paises.push({
                idd: el.cca3,
                name: el.name.common,
                official: el.name.official,
                flagImage: el.flags[1],
                continent: el.region,
                subregion: el.continents[0],
                capital: el.capital[0],
                area: parseInt(el.area),
                population: parseInt(el.population),
                car: el.car.side
            })

            Country.create({
                idd: el.cca3,
                name: el.name.common,
                official: el.name.official,
                flagImage: el.flags[1],
                continent: el.region,
                subregion: el.continents[0],
                capital: el.capital[0],
                area: parseInt(el.area),
                population: parseInt(el.population),
                car: el.car.side
            }).catch(error => {
                console.log(error);
            })
        })    
    } 
    catch (error) {
        console.log(error);
    }
    return paises
};

//Buscar en la base de datos una coincidencia en el nombre del pais
const findByName = async (name) => {
    Name = capitalizeWords(name)
    let filtro = await Country.findAll({
        where: {
            name: {
                [Sequelize.Op.iLike]: `%${Name}%`
            }
        }
    })
    return filtro;
}

//Funcion para hacer la primera letra maysucula
const capitalizeWords = (str) => {
    return str.toLowerCase().replace(/(^|\s)\S/g, (l) => l.toUpperCase());
  };

  

module.exports = {
    dbCountries,
    loadCountriesdb,
    findByName,
    capitalizeWords,
    dbActivities
}

