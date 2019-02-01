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

router.get('/byName/:name',(req,res,next) => {
    Cloth.find({'itemName':req.params.name})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.get('/byId/:id',(req,res,next) => {
    Cloth.find({'_id':req.params.id})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.get('/bySize/:size',(req,res,next) => {
    Cloth.find({'itemSize':req.params.size})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.get('/byGender/:gender',(req,res,next) => {
    Cloth.find({'itemGender':req.params.gender})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.get('/byQuantity/:quantity',(req,res,next) => {
    const filter = parseInt(req.params.quantity);
    Cloth.find({'itemQuantity': filter })
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.get('/byMax/:max',(req,res,next) => {
    const filter = parseInt(req.params.max);
    Cloth.find({'itemMax': filter })
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.get('/byMin/:min',(req,res,next) => {
    const filter = parseInt(req.params.min);
    Cloth.find({'itemMin': filter})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.get('/byLessThan/:nro',(req,res,next) => {
    const filter = parseInt(req.params.nro);
    Cloth.find({'itemQuantity': {$lt: filter }})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.get('/byMoreThan/:nro',(req,res,next) => {
    const filter = parseInt(req.params.nro);
    Cloth.find({'itemQuantity': {$gte: filter }})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});


//----------------- POSTS


router.post('/',(req,res,next) => {
    
    const cloth = new Cloth({
        itemName: req.body.name,
		itemSize: req.body.size,
		itemQuantity: req.body.quantity,
		itemMax: req.body.max,
		itemMin: req.body.min,
		itemGender: req.body.gender
    });
    cloth.save()
        .then(result => {
            res.status(200).json({
                message:'Cloth Created',
                createdCloth: result//CAN CREATE NEW OBJECT TO RETURN
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
