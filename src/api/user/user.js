const config = require("../../../config");
const { db } = require("../../modules/DBConnection");

//test user list api for super user
async function workers(req, res, next) {
  try {
    if (req.user[0].role_fk == 1) {
      db.query(
        `SELECT role_fk,idUser FROM user`,
        (err, result, fields) => {
          console.log(result);
          if (result.length === 0) return res.status(401).json({ message: `No token found` });
          return res.status(200).json(result);
        }
      );
    } else {
      return res.status(403).json({ message: "Access Denied" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
    next(err);
  }
}

async function createProject(req, res, next) {

  try {
    db.query(
      `INSERT INTO projects (name, duration, assigned_user_id) VALUES (?,?,?)`,
      [req.body.projectName, req.body.projectDuration, req.body.uid],
      (err, result, fields) => {
        if (err) throw err
        res.status(200).json({message: "project Created"})
      }
    );
  } catch (err) {
    res.status(400).json({ message: err.message });
    next(err);
  }
}

async function userFolder(req, res, next) {
  try {

	db.query(`SELECT idProject, name, assigned_user_id, status, duration, start_date FROM projects WHERE assigned_user_id = '${req.params.Uid}' `, 
	(err, result, fields) =>{
		console.log(result[0]);
	  if (err) throw err;
	  res.json(result)
	})
	
  } catch (err) {
    res.status(400).json({ message: err.message });
    next(err);
  }
}

async function getProjectContent(req, res, next) {

  try {
    db.query(`SELECT idProject, name, assigned_user_id, status, duration, start_date FROM projects WHERE assigned_user_id = '${req.params.Uid}' `, 
    (err, result, fields) =>{
      console.log(result[0]);
      if (err) throw err;
      res.json(result)
    })
    
    } catch (err) {
      res.status(400).json({ message: err.message });
      next(err);
    }


}

module.exports = {
  workers,
  createProject,
  userFolder,
  getProjectContent,
};
