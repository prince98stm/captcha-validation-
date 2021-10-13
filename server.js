let express = require('express')
var svgCaptcha = require('svg-captcha');
const cookieParser = require('cookie-parser');


let app = express()
app.use(cookieParser());

app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(express.static('Images'))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
let cap
let cookie
app.get('/', function(req,res){
     cap = svgCaptcha.create({
        size: 3,
        noise: 1,
        color: true
    });
     cookie = req.cookies.cookieName;
    res.cookie('capValue',cap.text,{ maxAge: 1000*60*15, httpOnly: true })
    
    res.render('captcha',{captcha: cap.data})
                        
                    
})

app.post('/captcha-validate', function(req,res){
    //console.log(req.cookies)
    if(req.body.textCompare==req.cookies.capValue){
        res.render('resume')
    }
    else {
        res.render('404')
    }
})

app.get('/captcha-validate' , function(req,res){
    res.render('4041')
})
app.listen(8080)