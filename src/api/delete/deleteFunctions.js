const config = require("../../../config");
const { db } = require("../../modules/DBConnection");




async function deleteProject(req, res, next) {
    const idProject = req.body.idProject
    db.query(`DELETE FROM projects WHERE idProject='${idProject}'`,
        (err, result, fields) => {
            if (err) throw err
            
        })

    res.json(200)
}



module.exports = {
    deleteProject,
  };
  