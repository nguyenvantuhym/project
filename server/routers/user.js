
const database = require('../helpers/database');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const auth = require('./../helpers/auth');
const generateToken = require('../helpers/generateToken');

const Router = require('koa-router');

const router = new Router();
router.get('/api/checklogin',auth, async (ctx)=>{
    if(ctx.state.success === true){
        ctx.body = {success:true};
    }
    else{
        ctx.body = {success:false};
    }
});

router.post('/api/signup', database.newAccount,generateToken);

router.post('/api/signin',async (ctx,next)=>{

    let dataSignin = ctx.request.body;
    let {username} = dataSignin;
    let accountExist = await User.findOne({username});
    console.log(accountExist);
    if(accountExist)
    {
        let compa = await bcrypt.compare(dataSignin.password, accountExist.password);
        if(compa === true) 
        {
            ctx.state.user = accountExist;
            await next();
            
        }
        else{
            ctx.body = {
                success:false,
                message:"dang nhap khong thanh cong"
            };
        }
    }
    else
    {
        ctx.body = {
            success:false,
            message:"dang nhap khong thanh cong"
        };
    }
},generateToken);

router.get('/api/logout',async(ctx)=>
{
    ctx.cookies.set('token','');
    ctx.cookies.set('token.sig','');
    ctx.body={
        success:true
    }

});


module.exports = router;