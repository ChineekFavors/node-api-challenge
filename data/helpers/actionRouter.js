const express = require('express');
const db = require('./actionModel.js');
const router = express();

router.get('/', (req, res) => {
    db.get()
        .then( data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({errorMessage: "there was a problem retrieving action data from the server!"});
        })

});


router.post('/', (req, res) => {
    const body = req.body;

    if((body.project_id == null )|| (body.project_id == "")){
        res.status(400).json({errorMessage: "please provide project_id field are require!"});    
    }
   if((body.description == null) || (body.description == "")){
        res.status(400).json({errorMessage: "please provide description field are require!"});

    }
    if((body.notes == null )|| (body.notes == "")){
        res.status(400).json({errorMessage: "please provide notes field are require!"});
    }
   if((body.completed == null )|| (body.completed == "")){
       res.status(400).json({errorMessage: "please provide completed field are require!"});
    }
    db.insert(body)
        .then( data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json({errorMessage: "there was a problem posting an action to database!"})
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id,body);
    db.update(id, body)
    .then( updated =>{
        if(updated){
            res.status(201).json(body);
        } else {
            res.status(404).json({message: "The action with the specified ID does not exist."});
        }
    })
    .catch( err => {
        res.status(500).json({errorMessage: "there was a problem updating to the database!"});
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
    .then( deleted => {
        if(deleted){
            res.status(201).json({message: `the action with id ${id} has been deleted`});
        } else {
            res.status(404).json({message: `action with ${id} does not exist`});
        }
    })
    .catch( err => {
        res.status(500).json({errorMessage: 'there was a problem deleting from the database'})
    })
})


module.exports = router; 