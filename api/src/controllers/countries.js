const { response, request } = require('express')
const { dbCountries, loadCountriesdb, findByName } = require('./functions')

const getCountries = async ( req = request, res = response) => {

    const { name } =  req.query;
    if (name) {
        find = await findByName(name)
        if (find?.[0]) {
            return res.json(find)
        }
        else {
            return res.status(404).json({msg: `No se encontro pais con el nombre: ${name}`})
        }
    }
    try {
        let db = await dbCountries()
        // comproboar si hay datos en DB si hay datos los imprime (por el momento), si no hay datos se ejectua la funcion que carga los datos a la BD
        if (!db?.[0]) {
            const data = await loadCountriesdb();
            return res.json(data)
        }
        else {
            return res.json(db)
        }
        // return res.json({msg: 'OK'})
   } 
   catch (error) {
    console.log(error);
        res.status(400).json({msg: 'Error', error: error})
   }
}




// }

module.exports = {
    getCountries
}