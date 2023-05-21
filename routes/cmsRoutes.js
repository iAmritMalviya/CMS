
const cmsController = require('../controllers/index').cms;
const Router = require("express").Router();

Router.get('/', cmsController.get)
Router.post('/', cmsController.create)

module.exports = Router
