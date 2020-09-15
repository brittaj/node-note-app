const fs = require('fs')
const chalk = require('chalk')
//const { title } = require('process')
const getNotes = ()=>{
    //return "Your notes."
    return fs.readFileSync('./notes.txt','utf8')
}
const addNotes = (title,body)=>{
        const notes = loadNotes() 

        const duplicateNotes = notes.filter((note)=>note.title === title)
      
        if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        
        saveNotes(notes)
        console.log("Notes added")
       }else{
           console.log("Notes already taken")
       }
        
} 
const saveNotes = (notes)=>{
    
    dataStr = JSON.stringify(notes)
   
    
    fs.writeFileSync('./notes-01.json',dataStr)
}
const loadNotes = ()=>{

    try{
        const dataBuffer = fs.readFileSync('./notes-01.json')
        const dataJson = dataBuffer.toString()
        const data = JSON.parse(dataJson)
        return data

    }catch(e){
        return []
    }
    
}
const removeNotes = (title)=>{
    console.log(title)
     const notes = loadNotes()
     
     let newNotes = notes.filter((note)=>note.title !== title)
    if(notes.length > newNotes.length){
        saveNotes(newNotes)
        console.log(chalk.green.inverse("Notes removed!"))
    }
    else{
        console.log(chalk.red.inverse("Notes not found!"))
    }
     
}
const listNotes = ()=>{
    const noteList = loadNotes();
    console.log(chalk.green.inverse("Your notes:"))
    noteList.forEach(element => {
        console.log(element.title+" "+element.body)
    });
}
const readNote = (title) => {console.log(title)
    const notesList = loadNotes();
    const note = notesList.find((note)=>note.title === title)
   if(note){
        console.log(chalk.green.inverse(note.title))
        console.log(note.body)
   }else{
        console.log(chalk.red.inverse("No note found"))
   }
   

}
module.exports = {
    removeNotes:removeNotes,
    getNotes:getNotes,
    addNotes:addNotes,
    listNotes:listNotes,
    readNote:readNote
}