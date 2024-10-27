const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')
const { body , validationResult} = require('express-validator');

//Route 1 : Fetch all the notes of the user through GET /fetchallnotes :Login Required
router.get('/fetchallnotes' ,fetchuser, async (req,res)=>
{
    let success = false;
    try {
        
        const notes = await Notes.find({user : req.user.id})
        res.json(notes);
    } catch (error) {
        console.error(error);
    res.status(500).send({success : success , error:'Internal server error occurred'});
    }
})


// Route 2 : Add Notes through POST /addnote Login required 
router.post('/addnote' ,fetchuser, [
    body('title' , "Please give a valid title").isLength({min : 3}),
    body('description' , "Description must atleast 5 characters").isLength({min : 5})
],async (req,res)=>
{

    try {  
   const errors = validationResult(req);
   if(!errors.isEmpty())
    {
        res.status(400).json({errors : errors.array()});
    } 
    const { title,description,tag} = req.body;

    const note = new Notes(
        { title,description,tag , user:req.user.id}
    )
    const savedNote = await note.save();

    res.json(savedNote);

} catch (error) {
    console.error(error);
    res.status(500).send('Internal server error occurred');
}

})

//Route 3 Update an existing note using PUT  /updatenote Login Required
router.put('/updatenote/:id' , fetchuser , [
    body('title' , "Please give a valid title").isLength({min : 3}),
    body('description' , "Description must atleast 5 characters").isLength({min : 5})
], async (req,res) => {


    try {
        
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            res.status(400).json({errors : errors.array()});
        }

        //Destructuring the request body
        const { title , description , tag} = req.body;

        //Creating a New Note Object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //Find the note to be updated and update it

        let note = await Notes.findById(req.params.id);

        if(!note){return res.status(401).send("Not Found")};

        //Checking if the found note belong to the logged in user

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id , {$set : newNote} , {new:true});

        res.json(note);
    } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error occurred');
    }
})

//Route 4 : Delete an existing note using DELETE /deletenote

router.delete('/deletenote/:id' , fetchuser , async (req,res) => {


    try {

         //Find the note to be deleted 

         let note = await Notes.findById(req.params.id);

         if(!note){return res.status(401).send("Not Found")};
 
         //Checking if the found note belong to the logged in user to be deleted

         note = await Notes.findByIdAndDelete(req.params.id);
         res.json({ "Success" : "Successfuly deleted this note" , Note : note});

        
    } catch (error) {
        
    }
})




module.exports = router