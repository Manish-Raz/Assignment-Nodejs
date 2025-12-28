const express = require("express");
const fs = require("fs");
const path = require("path");

//creating express application instance
const app= express();

//server running on port 3000
const PORT = 3000;

//defining file directory --which get absolute path like : c:\project\files
const filesDir = __dirname;


app.get("/files",(req,res)=>{
   

    //asynchronous way
    fs.readdir(filesDir, (err,file)=>{
        if(err){
            return res.status(500).json({erro: "Unable to read files directory"});

        }
        res.status(200).json(file);
    })
})

//handling get request for file/:filename  --to give all the content of the file

app.get("/files/:filename",(req,res)=>{
    const filename=req.params.filename;  //this will extract filename from URL
    const filePath= path.join(filesDir,filename);  //full path
    fs.readFile(filePath,"utf-8",(err,data)=>{
        if(err){
            return res.status(404).send("File not found");
        }
        else{
            return res.status(200).send(data);
        }
    })


})



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
