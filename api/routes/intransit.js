const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//------ Controllers
// const HeroesController = require ('../controllers/cloth');

const Transit = require('../models/transit');
const Food = require('../models/food');
const Cloth = require('../models/cloth');

//---------------------- GET
router.get('/',(req,res,next) => {
    Transit.find()
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'Error in DataBase'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.get('/byId/:id',(req,res,next) => {
    Transit.find({'_id': req.params.id})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'Error in DataBase'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.get('/byItemId/:id',(req,res,next) => {
    Transit.find({'itemId': req.params.id})
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
    Transit.find({'itemSize': req.params.size})
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
    Transit.find({'itemGender': req.params.gender})
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
    Transit.find({'itemQuantity': req.params.quantity})
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

router.get('/byZone/:zone',(req,res,next) => {
    Transit.find({'itemZone': req.params.zone})
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
    Transit.find({'itemQuantity': {$lt: filter }})
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
    Transit.find({'itemQuantity': {$gte: filter }})
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

//---------------------POST

router.post('/wardrobe',(req,res,next) => {
    res.status(200).json({ message:'En transito',body: req.body });
    Cloth.find({'_id':req.body.clothId})
        .exec()
        .then(doc => {
            if (doc){
                doc.itemQuantity -= req.body.clothQuantity;
                const transit = new Transit({
                    itemId: req.body.itemId,
                    itemName: req.body.itemName,
                    itemSize: req.body.itemSize,
                    itemGender: req.body.itemGender,
                    itemQuantity: req.body.itemQuantity,
                    itemZone: req.body.itemZone
                });
                doc.save()
                    .then(result => {
                        transit.save()
                            .then(result => {
                                res.status(200).json({ message:'En transito' });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                });
                            });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
                
            } else{
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.post('/warehouse',(req,res,next) => {
    console.log(req.body);
    Food.find({'_id':req.body.id})
        .exec()
        .then(doc => {
            if (doc){
                doc.quantity -= req.body.quantity;
                const transit = new Transit({
                    itemId: req.body.iditem,
                    itemName: req.body.name,
                    itemSize: req.body.size,
                    itemGender: req.body.gender,
                    itemQuantity: req.body.quantity,
                    itemZone: req.body.zone
                });
                transit.save()
                    .then(result => {
                        res.status(200).json({ message:'En transito' });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });;
            } else{
                res.status(404).json({message: 'No valid entry found'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.post('/deliver',(req,res,next) => {
    console.log(req.body);
    
});

module.exports = router;