const express = require('express');
const routes = express.Router();
const bcrypt=require('bcryptjs')
const restaurentController = require('../controller/restaurent');
const locationController=require('../controller/location')
const mealsController=require('../controller/meals');
const loginController=require('../controller/login');
const meanuitem=require('../controller/meanuitem')
const payment=require('../controller/payment')


routes.post('/register',loginController.postregister)
routes.post('/login',loginController.userlogin)



routes.get('/restaurent', restaurentController.getAllRestaurent);
routes.get('/location',locationController.getAllLocation) 
routes.get('/meals',mealsController.getAllMeals)
routes.get('/restaurent/:id', restaurentController.getAllRestaurentById);
routes.get('/location/:id', restaurentController.getAllRestaurentByLocation)
routes.post('/filter',restaurentController.filter)
routes.get('/meanuitem/:id',meanuitem.MeanuItem)

routes.post('/charge', payment.handlePayment)


module.exports = routes;
