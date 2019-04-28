var db = require("../config/mongoDBuri");


exports.getUser = function(req, res, next){
    db.users.find(function(err, users){
            if(err){
                res.send(err);
            }else{
                //res.send("users Works Fine");
                res.json(users);
            }
    });
}
// Login a user
exports.loginUser = async(req, res)=>{
const { email, password} = req.body;

  await db.users.findOne({ email }, (err, doc)=>{
        try{
            if(doc){
                if(err){
                    res.send("An Error occured while logging " + err);
                }else{
                if(doc.password === password){
                    return res.send(doc);
                }else{
                    return res.send(`password does not match email ${email}`);
                }
                    }
            }else{
         return res.send(`this email ${email} does not exist`);
            }
       
        }catch(err){
            res.status(500).send(err)
        }
  });
 
}

// create a new user
exports.createUser =  async(req, res)=>{
    try{
        const {firstName, lastName, phoneNumber, email, password} = req.body; 
        const users = {firstName, lastName, phoneNumber, email, password}; 
        
        await db.users.findOne({email}, (err, emailFromDB)=>{
            if(emailFromDB){
                res.send(`This email ${email} exist`);
            }else{
                db.users.save(users, (err, savedUser)=>{
                    if (err){
                        res.send(err)
                    }else{
                     return  res.json(savedUser);
                    }
                }); 
            }
        });
      
    }catch(err){
        res.status(500).send(err);
    }
}