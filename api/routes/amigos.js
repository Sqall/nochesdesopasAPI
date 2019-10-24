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
                res.status(404).json({message: 'Hubo un error inesperado.'});
            }
        })
        .catch(err => {
            res.status(500).json({error: err});
        });
});

router.get('/primary/:id', (req,res,next)=> {
    Amigo.findById({'_id' : req.params.id})
        .select({name:1,age:1,location:1,ds_1:1})
        .exec()
        .then(doc =>{
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'No se encuentra el amigo con ese ID'});
            }
        });
});

router.get('/secondary/:id', (req,res,next)=> {
    Amigo.findById({'_id' : req.params.id})
        //.select({ds_2:1,dni:1,d_fam:1,t_st:1,d_work:1,d_gob:1,d_health:1,d_hostel:1,formalities:1,d_sizes:1,search:1,d_work:1,d_work:1})
        .select({name:0,age:0,location:0,ds_1:0})
        .exec()
        .then(doc =>{
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'No se encuentra el amigo con ese ID'});
            }
        });
});

router.get('/byId/:id',(req,res,next) => {
    Amigo.findById({'_id':req.params.id})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No se encuentra el amigo con ese ID'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});


router.get('/byName/:name',(req,res,next) => {
    Amigo.find({'name':req.params.name})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No se encuentra el amigo con ese nombre'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

router.get('/byEmail/:email',(req,res,next) => {
    Amigo.find({'email':req.params.email})
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc);
            } else{
                res.status(404).json({message: 'No se encuentra el amigo con ese email'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });
});

///-----------------------POST

router.post('/',(req,res,next) => {
    
    /*var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;*/
    
    const newAmigo = new Amigo({
        name: req.body.name || 'Sin Nombre',
        surname: req.body.surname || 'Sin Apellido',
        age: req.body.age || 0,
        location: req.body.location || 'Sin ubicacion',
        ds_1: req.body.ds_1 || 'Sin situacion',
        ds_2: req.body.ds_2 || 'Sin conocimiento de su situacion',
        dni: req.body.dni || 00000000,
        d_fam: req.body.d_fam || 'Sin datos de familia',
        t_st: req.body.t_st || 'Sin tiempo en calle',
        d_work: req.body.d_work || 'Sin trabajo',
        d_gob: req.body.d_gob || 'Sin ayuda del gobierno',
        d_health: req.body.d_health || 'Sin datos de salud',
        d_hostel: req.body.d_hostel || 'Sin datos de estadia',
        formalities: req.body.formalities || [],
        d_sizes: req.body.d_sizes || [],
        search: req.body.search || [],
        email: req.body.email || 'Sin Email',
        notes: req.body.notes || [],
        team: req.body.team || 0
    });

    newAmigo.save()
        .then(result => {
            res.status(200).json({
                message:'Amigo añadido',
                createdAmigo: result//CAN CREATE NEW OBJECT TO RETURN
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

///-----------------------DELETE

router.delete('/id/:id', (req,res,next) => {
    Amigo.findOneAndDelete({'id': req.params.id})
    .exec()
        .then(response => {
            if (response){
                res.status(200).json({message:'Amigo Eliminada'});
            } else{
                res.status(404).json({message: 'No existe el amigo con ese id'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });;
});


router.delete('/name/:name', (req,res,next) => {
    Amigo.findOneAndDelete({'name': req.params.name})
    .exec()
        .then(response => {
            if (response){
                res.status(200).json({message:'Amigo Eliminada'});
            } else{
                res.status(404).json({message: 'No existe el amigo con ese nombre'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });;
});

router.delete('/email/:email', (req,res,next) => {
    Amigo.findOneAndDelete({'emial': req.params.email})
    .exec()
        .then(response => {
            if (response){
                res.status(200).json({message:'Amigo Eliminada'});
            } else{
                res.status(404).json({message: 'No existe el amigo con ese email'});
            }
        })
        .catch(err => {
            res.status(500).json({error:err});
        });;
});

module.exports = router;

