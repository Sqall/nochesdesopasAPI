const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        //token comes in like "Bearer Xq2$..."
        //In header "Authorization"
        const token = req.body.authorization;
        // HACER ARCHIVO .env PARA TOMAR VALORES DE AHI, O HACER QUE EL USUARIO TENGA SU CLAVE SECRETA
        const decoded = jwt.verify(token,"secret");
        req.userData = decoded;
        next();
    } catch(error){
        return res.status(401).json({
            message: error
        })
    }
};