const express = require('express');
const db = require('./projectModel.js');
const router = express();


router.get('/', (req, res) => {
   
    db.get()
        .then(data => {
            res.status(200).json(data);
        })
        .catch( err => {
            res.status(500).json({errorMessage: "there was a problem retrieving project data from server!"})
        })
});


router.post('/', (req, res) => {
    const body = req.body;
   
   

    if((body.name == null )|| (body.name == "")){
         res.status(400).json({errorMessage: "please provide name field are require!"});    
    }
    if((body.description == null) || (body.description == "")){
         res.status(400).json({errorMessage: "please provide description field are require!"});

    }
    if((body.completed == null )|| (body.completed == "")){
        res.status(400).json({errorMessage: "please provide completed field are require!"});

    }

    db.insert(body)
        .then( data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json({errorMessage: "there was a problem posting to database!"})
        })
});

router.delete('/:id', (req,res) =>{
    const id = req.params.id;
   
    db.remove(id)
        .then( deleted => {
            if(deleted){
                res.status(201).json({message: `the project with id ${id} has been deleted`});
            } else {
                res.status(404).json({message: `project with ${id} does not exist`});
            }
        })
        .catch( err => {
            res.status(500).json({errorMessage: 'there was a problem deleting from the database'})
        })
})

router.put('/:id', (req, res) =>{
    const id = req.params.id;
    const body = req.body;
    console.log(id,body);
   if(!id){
       res.status(404).json({message: 'must provide an id to update to database!'})
   }
   
   if((body.name == null )|| (body.name == "")){
        res.status(400).json({errorMessage: "please provide name field are require!"});    
    }
    if((body.description == null) || (body.description == "")){
        res.status(400).json({errorMessage: "please provide description field are require!"});

    }
    if((body.completed == null )|| (body.completed == "")){
        res.status(400).json({errorMessage: "please provide completed field are require!"});

    }
  
    db.update(id, body)
        .then( updated => {
            if(updated){
                res.status(200).json(body);
            }else {
                res.status(404).json({message: "The project with the specified ID does not exist."});
            }
        })
        .catch( err => {
            res.status(500).json({errorMessage: "there was a problem updating to the database!"});
        })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    if(!id){
        res.status(404).json({message: "must provide an id"});
    }
    db.getProjectActions(id)
        .then( data => {
            if(data.length > 0){
                res.status(201).json(data);
            }else {
                res.status(404).json({message: "specified ID does not exist."});
            }
        })
        .catch( err => {
            res.status(500).json({errorMessage: 'there was a problem retrieving from the database'})
        })

})

module.exports = router;