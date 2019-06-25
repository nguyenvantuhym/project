
const database = require('../helpers/database');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const auth = require('./../helpers/auth');
const generateToken = require('../helpers/generateToken');

const Router = require('koa-router');

const router = new Router();



module.exports = router;
