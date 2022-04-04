const express = require('express'); //initialize express
const app = express();
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controller/productController');  // require controller in this file
const router = express.Router();  // intialize router

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route('/products').get(isAuthenticatedUser, authorizeRoles("admin"), getAllProducts); //call method of controller through route
router.route('/newproduct').post(createProduct);
router.route('/product/:id').put(updateProduct);
router.route('/product/:id').delete(deleteProduct);
router.route('/product/:id').get(getProductDetails);
module.exports = router  // exporting it into another file