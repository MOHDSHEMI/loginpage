const express = require("express")
const path = require("path")
const bodyparser = require("body-parser")
const session = require("express-session")
const {v4:uuidv4} = require("uuid")
const nocache = require("nocache")

const router = require('./router')



const app = express()


const PORT = process.env.PORT||4000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine','ejs')

app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))



// middleware to handle urlencoded data
app.use(express.urlencoded({extended: true}))
// middleware to handle json
app.use(express.json())

app.use(nocache())

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:false
}))


app.use('/route',router);

app.get('/',(req,res)=>{
    res.render('base',{title:"Login System"});
})


app.listen(PORT,()=>{console.log(`Losening to the server on http://localhost:${PORT}`)})