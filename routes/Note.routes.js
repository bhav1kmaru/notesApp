const express = require('express')
const { NoteModel } = require('../model/Note.model')

const noteRouter=express.Router()


noteRouter.get('/',async(req,res)=>{
    const user=req.body.user
    const notes=await NoteModel.find({user})
    res.send(notes)
})

noteRouter.post('/create',async(req,res)=>{
    const payload=req.body
    const note =new NoteModel(payload)
    await note.save()
    res.send('note created')
})

noteRouter.delete('/:id',async(req,res)=>{
    const noteID=req.params.id
    await NoteModel.findByIdAndDelete({_id:noteID})
    res.send({message:`note with id ${noteID} has been deleted`})
})

module.exports ={noteRouter}