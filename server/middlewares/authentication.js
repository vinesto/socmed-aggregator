const jwt = require('jsonwebtoken')

const authentication = (req,res,next)=>{
    let token = req.headers.token
    if(token){
        // let decode = jwt.verify(token,'secretkey')
        // console.log(decode);
        next()
    }else{
        res.status(401).json({msg:"you must login first"})
    }
}

module.exports = authentication