const axios = require("axios");
const config = require("../../../config");
const { db } = require("../../modules/DBConnection");
const { fetchDBReport } = require("../report/report");

async function getUTC(req, res, next) {
  try {
    const response = await axios.get(
      `${config.pythonServer}/getUTC?lat=${req.query.lat}&lng=${req.query.lng}`
    );
    res.send({ utc: response.data });
  } catch (error) {
    res.send({ error });
  }
}
async function locationsearch(req, res, next) {
  try {
    const response = await axios.get(
      `${config.pythonServer}/locationsearch?location=${req.query.location}`
    );
    res.send(response.data);
  } catch (error) {
    res.send({ error });
  }
}

async function pythonClac(idProj, duration) {
  try {
    const response = await axios.post(`${config.pythonServer}/startcalc`, {
      idProj: idProj,
      duration: duration,
    });
    console.log(response.data, response.status);
    if (response.data == 200) {
      db.query(
        `UPDATE projects SET status='2' WHERE idProject = '${idProj}' `,
        async (err, result, fields) => {
          if (err) throw err;
          await fetchDBReport(idProj);
          return null;
        }
      );
    }
  } catch (error) {
    console.warn(error);
  }
}

async function syncWeather(uid) {
    try {
      const response = await axios.post(`${config.pythonServer}/forcesync`, {
        userID: uid
      });
      console.log(response.data, response.status);
      if (response.data == 200) {
        return null
      }
    } catch (error) {
      console.warn(error);
    }
  }
  



module.exports = {
  getUTC,
  locationsearch,
  pythonClac,
  syncWeather
};
