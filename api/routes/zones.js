const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Zone = require('../models/zone');

router.get('/',(req,res,next) => {
    Zone.find()
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

router.get('/names',(req,res,next) => {
    Zone.find({},{itemName:1})
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

//POSTS

router.post('/',(req,res,next) => {

    const newZone = new Zone({
        itemName: req.body.itemName,
        itemFriends: JSON.parse(req.body.itemFriends)
    });

    newZone.save()
        .then(result => {
            res.status(200).json({
                message:'Zone Created',
                createdCloth: result//CAN CREATE NEW OBJECT TO RETURN
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/name/:name', (req,res,next) => {

    Zone.findOneAndDelete({'itemName': req.params.name})
        .then(result => {
            res.status(200).json({
                message:'Zone Deleted'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
})


module.exports = router;