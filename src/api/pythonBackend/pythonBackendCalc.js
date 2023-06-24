const axios = require('axios')
const config = require("../../../config");

async function getUTC(req, res, next){
try {
    const response = await axios.get(`${config.pythonServer}/getUTC?lat=${req.query.lat}&lng=${req.query.lng}`)
    res.send({utc:response.data})
} catch (error) {
    res.send({error})
}
    
   


}
async function locationsearch(req, res, next){
    try {
        const response = await axios.get(`${config.pythonServer}/locationsearch?location=${req.query.location}`)
        res.send(response.data)
    } catch (error) {
        res.send({error})
    }
}

module.exports = {
    getUTC,
    locationsearch
  };

