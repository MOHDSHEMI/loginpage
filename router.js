var express = require("express")
var router = express.Router();

const credential={
    email:"admin@gmail.com",
    password:"admin123"
}

// NO autMiddleware
const authMiddleware = (req,res,next) => {
    if (req.session.user) {
      next()
    } else {
        return res.render('login', {
           title:'Login page',
           error:null,
           authorized:false 
        })
    }
} 

router.get('/',authMiddleware,(req,res)=>{
    return res.redirect('/dashboard')
})

router.post('/login',(req,res)=>{
    if(req.body.email== credential.email&&req.body.password==credential.password){
       req.session.user = req.body.email;
       res.redirect('/route/dashboard')
    // res.end("login success")
    }else{
        res.end("invalid username")
    }
})


router.get('/dashboard',authMiddleware,(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.send("Unauthorize User")
    }
})

router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
      res.end("unuthorize user")
    }
})

router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("ERROR")
        }else{
            res.render('base',{title:"Express",logout:"Logout Successfully...!"})
        }
    })
})



module.exports = router