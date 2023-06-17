const config = require("../../../config");
const { db } = require("../../modules/DBConnection");



// DELETE PROJECT
async function deleteProject(req, res, next) {
    const id = req.body.id
    db.query(`DELETE FROM projects WHERE idProject='${id}'`,
        (err, result, fields) => {
            if (err) throw err
            
        })

    res.json(200)
}

// DELETE PRODUCT

async function deleteProduct(req, res, next) {
    const id = req.body.id
    db.query(`DELETE FROM company_product WHERE product_id='${id}'`,
        (err, result, fields) => {
            if (err) throw err
            
        })

    res.json(200)
}

module.exports = {
    deleteProject,
    deleteProduct
  };
  