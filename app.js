
const validator = require('validator')
const chlk = require('chalk')
const notes = require('./notes.js')
const yargs = require('yargs')
const { string } = require('yargs')
const msg = notes.getNotes()
//console.log(chlk.red.bold(msg))
//console.log(process.argv[2]);
//console.log(validator.isURL('http:/example.com'))
yargs.version('1.0.0')
yargs.command({
    command:"list",
    describe:"List data",
    handler(){
        notes.listNotes()
    }

})
yargs.command({
    command:"add",
    describe:"Add notes",
    builder:{
        "title":{
            description:"Title of notes",
            demandOption: true,
            type: string,
        },
        "body":{
            description: "Body of the notes",
            demandOption: true,
            type: string
        }

    },
    handler(argv){
        //console.log('Title: '+argv.title)
        //console.log('Body: '+argv.body)
        notes.addNotes(argv.title,argv.body)
    }

})
yargs.command({
    command:"remove",
    describe:"remove notes",
   builder:{
       "title":{
           demandOption:true,
           type:string
       }
   },
    handler(argv){
        notes.removeNotes(argv.title)
    }

})
yargs.command({
    command:"read",
    describe:"read notes",
    builder:{
        "title":{
            demandOption:true,
            type:string
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }

})
//const fs = require('fs')
//write file
//fs.writeFileSync('notes.txt', 'My name is Britta and she is great!');
//append file
//fs.appendFileSync('notes.txt','\nAccepted the challenge.Praise the Lord!\nI can do everything through the lord who stengthens me!')
//const add = require('./utils.js') 
//function definition
//const sum = add(1,2)
//console.log(sum)

console.log(yargs.argv);
