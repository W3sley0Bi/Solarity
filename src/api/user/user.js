const config = require("../../../config");
const { db } = require("../../modules/DBConnection");

// super user //////////////////////////////////////////

//test user list api for super user
async function workers(req, res, next) {
  try {
    if (req.user[0].role_fk == 1) {
      db.query(
        `SELECT role_fk,idUser FROM user`,
        (err, result, fields) => {
         // console.log(result);
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

// basic //////////////////////////////////////////


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

//get project data
async function userFolder(req, res, next) {
  try {

	db.query(`SELECT * FROM projects WHERE assigned_user_id = '${req.params.Uid}' `, 
	(err, result, fields) =>{
		// console.log(result[0]);
	  if (err) throw err;
	  res.json(result)
	})
	
  } catch (err) {
    res.status(400).json({ message: err.message });
    next(err);
  }
}

async function userDateForUpdate(req, res, next) {
  try {
	db.query(`SELECT * FROM projects WHERE assigned_user_id = '${req.params.Uid}' AND idProject = '${req.params.Content}' `, 
	(err, result, fields) =>{
	  if (err) throw err;
	  res.json(result[0])
	})
	
  } catch (err) {
    res.status(400).json({ message: err.message });
    next(err);
  }
}

async function getProjectContent(req, res, next) {
//this is the list of the products
  try {
    console.log(req.params)
    db.query(`SELECT * FROM field_product WHERE project_id = '${req.params.Content}' `, 
    (err, result, fields) =>{
      if (err) throw err;
      console.log(result)
      res.status(200).json({result})
    })
  
    } catch (err) {
      res.status(400).json({ message: err.message });
      next(err);
    }


}

async function updatedProject(req, res, next) {
console.log(req.body.idProject)
  try {
      db.query(
      `UPDATE projects SET name='${req.body.projectName}', duration='${req.body.projectDuration}' WHERE idProject = '${req.body.idProject}' `,
      (err, result, fields) => {
        if (err) throw err
        res.status(200).json({message: "project Updated"})
      }
    );
  } catch (err) {
    res.status(400).json({ message: err.message });
    next(err);
  }
}

async function deleteProjectContentElement(req, res, next){

db.query(`DELETE FROM field_product WHERE project_id='${req.body.project_id}' AND field_product_id='${req.body.field_product_id}'`,
(err, result, fields) => {
    if (err) throw err
    
})

res.json({ status: 200, message: "Prrodotto removed from the project"})



}

// ADD PRODUCT TO PROJECT
async function addProduct(req, res, next){
  console.log(req.body)
  try {
    db.query(
      `INSERT INTO field_product (project_id, lon, lat, utc_offset, tilt, orientation, company_product_id) VALUES (?,?,?,?,?,?,?)`,
      [req.params.Content, req.body.lon, req.body.lat, req.body.utc_offset, req.body.tilt, req.body.orientation, req.body.company_product_id],
      (err, result, fields) => {
        if (err) throw err
        res.status(200).json({message: "Product Added"})
      }
    );
  } catch (err) {
    res.status(400).json({ message: err.message });
    next(err);
  }
}


// Company //////////////////////////////////////////

//READ PRODUCT LIST
async function companyDash(req, res, next){
  try {

    db.query(`SELECT * FROM company_product WHERE provider_id = '${req.params.Uid}'`, 
    (err, result, fields) =>{
      console.log(result);
      if (err) throw err;
      res.status(200).json(result)
    })
    
    } catch (err) {
      res.status(400).json({ message: err.message });
      next(err);
    }
}

//READ ALL PRODUCTS
async function getAllProducts(req, res, next){
  try {

    db.query(`SELECT name, product_id FROM company_product`, 
    (err, result, fields) =>{
      console.log(result);
      if (err) throw err;
      res.status(200).json(result)
    })
    
    } catch (err) {
      res.status(400).json({ message: err.message });
      next(err);
    }
}

// CREATE PRODUCT 
async function createProduct(req, res, next){
  console.log(req.body)
  try {
    db.query(
      `INSERT INTO company_product (name, peakpower, provider_id, temp_coff, system_loss, area, nominal_temp) VALUES (?,?,?,?,?,?,?)`,
      [req.body.productName, req.body.productPeakPower, req.body.uid, req.body.tempCoff, req.body.systemLoss, req.body.area, req.body.nomTemp],
      (err, result, fields) => {
        if (err) throw err
        res.status(200).json({message: "Product Created"})
      }
    );
  } catch (err) {
    res.status(400).json({ message: err.message });
    next(err);
  }
}

// TO DO 
// UPDATE PRODUCT


module.exports = {
  workers,
  createProject,
  userFolder,
  getProjectContent,
  companyDash,
  createProduct,
  getAllProducts,
  addProduct,
  deleteProjectContentElement,
  updatedProject,
  userDateForUpdate,
  addProduct,
};
