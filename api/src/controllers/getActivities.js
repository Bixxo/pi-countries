const { response, request } = require('express')
const { dbActivities } = require('./functions')


const getActivities = async ( req = request, res = response) => {
    const db = await dbActivities();
    if (!db?.[0]) {
        return res.status(400).json({msg: 'No hay activiades creadas'})
    }
    else {
        return res.json(db)
    }
}

module.exports = {
    getActivities
}