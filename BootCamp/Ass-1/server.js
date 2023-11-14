const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 2020;  

// Serve static files
app.use(express.static(path.join(__dirname, 'pyublic'))); //Adressing the folder means conecting with folder
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); //adressing file in the folder specifically
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

app.delete('/delete-file', (req, res) => {
    fs.unlink('file.txt', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to delete the file');
        }
        // console.log("Deleted!");
        res.send('File deleted successfully');
        // res.alert("file deleted")
    });
});
app.put('/update-file',(req,res) => {
    const updatedContent = req.body.content;
    fs.appendFile('file.txt',updatedContent ,'utf8', function(err){
            if(err){
                console.log('Error Occured');
                return res.status(500).send('Failed to update the file');
            } 
            console.log("updated")
            
        })
        console.log("File Updated");
        res.send('File updated successfully');
})
// app.put('/update-file', (req, res) => {
//     // Assuming you receive the updated content in the request body
//     const updatedContent = req.body.content;

//     fs.writeFile('file.txt', updatedContent, 'utf8', (err) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Failed to update the file');
//         }
//         console.log("File Updated");
//         res.send('File updated successfully');
//     });
// });


app.listen(PORT,() => {
    console.log("Server running on http://localhost:"+PORT)
})

// const express = require('express');
// const fs = require('fs');
// const app = express();
// const port = 8080;

// // app.use(express.json());
//  app.use(express.static(path.join(__dirname, 'pyublic'))); //Adressing the folder means conecting with folder

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html')); //adressing file in the folder specifically
// });

// app.get('/get-file-content','Hello world', (req, res) => {
//     fs.readFile('data.txt', 'utf8', (err, data) => {
//         if (err) {
//             res.status(500).json({ error: 'Failed to read the file.' });
//         } else {
//             res.json({ content: data });
//         }
//     });
// });

// app.get('/update-file-content', (req, res) => {
//     const newData = req.body.content;
//     fs.writeFile('data.txt', InputEvent(Data), 'utf8', (err) => {
//         if (err) {
//             res.status(500).json({ error: 'Failed to update the file.' });
//         } else {
//             res.json({ message: 'File updated successfully' });
//         }
//     });
// });

// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });
