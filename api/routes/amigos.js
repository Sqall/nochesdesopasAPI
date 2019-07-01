const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Amigo = require('../models/amigo');

router.get('/',(req,res,next) => {
    Amigo.find()
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});


module.exports = router;

