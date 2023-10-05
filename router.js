var express = require("express")
var router = express.Router();

const credential={
    email:"admin@gmail.com",
    password:"admin123"
}

// NO autMiddleware
const authMiddleware = (req,res,next) => {
    if (req.session.loggedIn) {
      next()
    } else {
        return res.render('base', {
           title:'Login page',
           logout: null
        })
    }
} 

router.get('/',authMiddleware,(req,res)=>{
    return res.redirect('/dashboard')
})

router.get('/login', (req,res)=> {
    return res.redirect('/dashboard')
})

router.post('/login',(req,res)=>{
    if(req.body.email== credential.email && req.body.password==credential.password){
       req.session.user = req.body.email;
       req.session.loggedIn = true
       res.redirect('/dashboard')
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