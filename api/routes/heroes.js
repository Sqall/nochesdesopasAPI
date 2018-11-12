const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const HeroesController = require ('../controllers/heroes');

const Hero = require('../models/heroe');

router.get('/', HeroesController.heroes_get_all);

//checkAuth revisa por json y bodyparser del App.js. Se puede cambiar de lugar en el encabezado REST
router.post('/',(req,res,next) => {
    const hero = new Hero({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        location: req.body.location,
        needs: req.body.needs
    });

    hero
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message:'Hero Created',
                createdHero: result//CAN CREATE NEW OBJECT TO RETURN
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
            console.log(err);
        });
    
    
});

router.get('/:heroId',(req,res,next) => {
    const id = req.params.heroId;
    Hero.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc){
                res.status(200).json({doc});
            } else{
                res.status(404).json({message: 'No valid entry found for provided ID'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.patch('/:heroId',(req,res,next) => {
    const id = req.params.heroId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }    
    Hero.update({_id: id},{$set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:heroId',(req,res,next) => {
    const id = req.params.heroId;
    Hero.remove({_id: id})
        .exec()
        .then(result => {
            res.statu(200).json(result);
        })
        .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            }
        );
});
   

module.exports = router;