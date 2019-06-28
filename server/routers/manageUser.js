
const database = require('../helpers/database');
const User = require('../models/user');
const auth = require('./../helpers/auth');
const Router = require('koa-router');

const router = new Router();

router.post('/updateuser',auth,async ( ctx,next )=>{
  if(ctx.state.success === true)
  {

    await next();
    console.log(ctx.state.db.success);

    if(ctx.state.db.success === true)
    {

      ctx.body = {success :true}
      return;
    }
  }
  //ctx.body = {success :false};

},database.updateuser);


module.exports = router;
