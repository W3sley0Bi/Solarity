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

async function userFolder(req, res, next) {
  try {

	db.query(`SELECT idProject, name, assigned_user_id, status, duration, start_date FROM projects WHERE assigned_user_id = '${req.params.Uid}' `, 
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

async function getProjectContent(req, res, next) {
//this is the list of the products
  try {
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

  try {
      db.query(
      `UPDATE projects SET name='${req.body.projectName}' duration='${req.body.projectDuration}'`,
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

// TO DO 
// async function addProjectContentElement(req, res, next){

// }

async function deleteProjectContentElement(req, res, next){

db.query(`DELETE FROM field_product WHERE project_id='${req.body.project_id}' AND field_product_id='${req.body.field_product_id}'`,
(err, result, fields) => {
    if (err) throw err
    
})

res.json({ status: 200, message: "Prrodotto removed from the project"})



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


module.exports = {
  workers,
  createProject,
  userFolder,
  getProjectContent,
  companyDash,
  createProduct,
<<<<<<< HEAD
  getAllProducts
=======
  updatedProject,
  deleteProjectContentElement,
>>>>>>> 1723179d1a8d69e767ef9acf0bd25415bcf1cee4
};
