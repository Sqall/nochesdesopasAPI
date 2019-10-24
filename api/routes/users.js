const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/signup', (req,res,next) => {
    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            //user no es null, es arreglo vacio, se pregunta por lenght
            if (user.length >= 1){
                return res.status(409).json({
                    message: 'Mail already exist'
                });
            } else {
                bcrypt.hash(req.body.password,10,(err,hash)=>{
                    if (err){
                        return res.status(500).json({
                            error: err
                        });
                    } else{
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            name: req.body.name,
                            password: hash
                        });
                        user
                        .save()
                        .then(result => {
                            res.status(201).json({
                                message: 'User Created'
                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: err
                            });
                        });
                    }    
                });
            }
        });    
});

router.post('/login',(req,res,next) => {
    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password,(err,result) => {
                if(err){
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if(result){
                    /// SIGN CON LOS DATOS NECESARIOS PARA RETORNAR EN EL PAYLOAD 
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id,
                            userType: 'Admin'
                        }, 'secret', { expiresIn: '1h' });                    
                    return res.status(200).json({
                        message: 'Auth Succesful',
                        token: token
                    })
                }
                return res.status(401).json({
                    message: 'Auth failed'
                });
            });

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


router.delete('/:userId',(req,res,next) => {
    User.remove({_id: req.params.id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User Deleted'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;

