const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./../models/user');


const saltRounds = 10;

class Database {
    constructor()
    {
        this._connect();
        //console.log("hello");
        //this.newAccount();

    }

    async _connect()
    {
        const URL = `mongodb+srv://admin:admin@cluster0-kwozd.mongodb.net/training?retryWrites=true&w=majority`;
        await  mongoose.connect(URL,{ useNewUrlParser: true })
        .then((err,client)=>{

                console.log('Database connection successful');
            })
        .catch((err)=>console.log('Database connection error!!' + err));

    }



    async newAccount(ctx,next)
    {
        let dataSignup = ctx.request.body;
        let {username} = dataSignup;
        let accountExist = await User.findOne({username});
        if(accountExist)
        {

            ctx.body ={
                success:false,
                message:"tai khoan da ton tai"
            };// dinh nghia object {success :bool, data: object, message :string}
            return;

        }



        let hash = await bcrypt.hash(dataSignup.password, saltRounds);

        if(hash) {

            let newUser = User({...dataSignup, password:hash, roles:'user',author:ctx.state.username});

            newUser.save();
            ctx.state.user = newUser;
            await next();
            ctx.body = {
                success:true,
                data:newUser
            };


        }

    }
    async updateuser(ctx,next)
    {
      if(ctx.state.roles === 'boss')
      {
        let data = ctx.request.body;
        console.log(ctx.request.body);
        let result = await User.updateOne({ _id : data._id },
          {
            $set: {
              username: data.username,
              email: data.email,
              localtion: data.localtion
            }
          }
        );
          console.log(result);
        if(result)
        {
          //console.log("vao day true");
          ctx.state.db = {success:true};
        }
        else{

          ctx.state.db = {success:false};
        }
      }
      else {

        ctx.state.db = {success:false};
      }

    }

    async getalluser(ctx,next)
    {
        if(ctx.state.roles ==='boss')
        {
            console.log(ctx.state.username);
            ctx.state.data = await User.find({author:ctx.state.username});
        }
    }

}

module.exports = new Database();
