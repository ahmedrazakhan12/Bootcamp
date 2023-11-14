const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;  

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); //Adressing the folder means conecting with folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); //adressing file in the folder specifically
});

app.post('/create-file', (req, res) => {
    fs.writeFile('demo.txt', 'Hello, this is me Ahmed.', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }
        res.send('File Created Successfully.');
    });
});

// Show the File 

app.get('/read-file',(req,res) => {
    fs.readFile('demo.txt', 'utf8' , (err,data) => {
        if(err){
            console.error(err);
            return res.status(500).send('2nd Error in server-side');
        }
        res.send(data);
    })
})

app.put('/update-file',(req,res) => {
    const fileContent = req.body.content;
    fs.appendFile('demo.txt',fileContent,'utf8',function(err){
        if(err){
            console.log('Error Occured',err)
            return res.status(500).send('Failed to update')
        }
    })
    console.log('Updated');
    res.send('File Updated Succesfully.')
})


app.delete('/delete-file',(req,res)=>{
    fs.unlink('demo.txt', (err) => {
        if(err){
            console.log('Error',err)
            return res.status(500).send('FAiled to delete')
        }
        console.log('deleted file')

    })
    console.log("File Successfully deleted")
    res.send('File deleted')
})







app.listen(PORT,() => {
    console.log("Server running on http://localhost:"+PORT)
})