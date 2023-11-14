const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 1000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

 // Create File 

app.post('/create-file', (req, res) => {
    fs.writeFile('file.txt', 'Some text in this file.', (err) => { 
    
    if (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }
        res.send('File created successfully');
    });
});

// Show the File 

app.get('/read-file', (req, res) => {
    fs.readFile('file.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }
        res.send(data);
    });
});

    //Update File

app.put('/update-file',(req, res) => {
    const updatedContent = req.body.content;
    fs.appendFile('file.txt', updatedContent, function (err) {
        if (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }
    });
    console.log('File updated');
    res.send('File updated successfully');
});


    //Delete File

    app.delete('/delete-file', (req, res) => {
        fs.unlink('file.txt', (err) => {
            if (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }
        console.log('File deleted!');
        })
        
        console.log('File Successfuly deleted!')
        res.send('File deleted successfully');
    });




// Update a file
// app.put('/update/:filename', upload.single('file'), (req, res) => {
//     const { filename } = req.params;
//     const { file } = req;
  
//     if (!filename || !file) {
//       return res.status(400).send('Bad Request');
//     }
  
//     fs.renameSync(file.path, `uploads/${filename}`);
//     res.send('File updated successfully');
//   });
  
  // Delete a file
//   app.delete('/delete/:filename', (req, res) => {
//     const { filename } = req.params;
  
//     if (!filename) {
//       return res.status(400).send('Bad Request');
//     }
  
//     fs.unlinkSync(`uploads/${filename}`);
//     res.send('File deleted successfully');
//   });
  



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
