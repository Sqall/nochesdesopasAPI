const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//------ Controllers
// const HeroesController = require ('../controllers/cloth');

const Cloth = require('../models/cloth');

router.get('/',(req,res,next) => {
    Cloth.find()
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

router.post('/',(req,res,next) => {
    
    const cloth = new Cloth({
        name:req.body.name,
		size: req.body.size,
		quantity: req.body.quantity,
		max: req.body.max,
		min: req.body.min,
		gender: req.body.gender,
		age: req.body.age,
		intransit: req.body.intransit
    });
    cloth.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message:'Cloth Created',
                createdCloth: result//CAN CREATE NEW OBJECT TO RETURN
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
            console.log(err);
        });
});

module.exports = router;
