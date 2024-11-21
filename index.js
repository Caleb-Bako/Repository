import User from './models/User.js';
import Staff from './models/Staff.js';
import File from './models/File.js';
import Folder from './models/Share.js';
import SingleShare from './models/SingleShare.js';

import express from 'express';
import { S3Client, PutObjectCommand,GetObjectCommand, ListObjectsCommand, DeleteObjectsCommand, DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import multerS3 from 'multer-s3';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import moment from 'moment';
import archiver from 'archiver';

dotenv.config();

const app = express();
const bcryptSalt= bcrypt.genSaltSync(10);
const jwtSecret = 'GoddidGoddidGoddidGoddid';
const mongourl = 'mongodb+srv://calebjrbako1231:'+process.env.MONGO_URL+'@repo.63afe5w.mongodb.net/'

app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


app.use(express.json());
const allowedOrigins = [
    'http://localhost:5173', // for local development
    'https://file-barn.onrender.com', // deployed frontend
  ];
  
  // Enable CORS
  app.use(cors({
    origin: function (origin, callback) {
      // Check if the origin is allowed
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow credentials
  }))
console.log("sever connected");
mongoose.connect(mongourl);

app.get('/test',(req,res) => {
    res.json('test ok boy');
});

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

//Register
app.post('/register', async(req,res) => {
    const{name,surname,email,location,pass,stats,role,view}=req.body;
    try{
        const userDoc = await User.create({
            name,
            surname,
            email,
            location,
            pass:bcrypt.hashSync(pass,bcryptSalt),
            stats,
            role,
            view
        })
        res.json({userDoc});
    }catch(e){
        res.status(422).json(e);
    }

});

//Login
app.post('/login', async(req,res)=>{
    const{email,pass} = req.body;
    const userDoc = await User.findOne({email});
    const viewDoc = userDoc.view;

    if(viewDoc === "active"){
        if(userDoc){
            const verDoc = userDoc.stats;
            if(verDoc === "verified") {
                const passOk = bcrypt.compareSync(pass, userDoc.pass);
                if(passOk){
                    jwt.sign({email:userDoc.email, 
                        id:userDoc._id, 
                        }, 
                        jwtSecret, 
                        {}, 
                        (err, token)=>{
                        if(err) throw err;
                        res.cookie('token', token).json(userDoc);
                    });
                }
                else{
                    res.status(422).json('pass not ok')
                    } 
            } else {
                res.status(422).json('not verified')
                } 
            } else{
                res.status(422).json('not found');
            }
    }else{
        res.status(422).json('deleted');
    }
});

//Getting user data
app.get('/profile', (req,res) =>{
    const {token} = req.cookies;
    if(token){
       jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
        if(err) throw err;
        const {name,email,_id} = await User.findById(userData.id);
        res.json({name,email,_id});
       }); 
    }else{
        res.json(null);
    }
});


//Getting list of admins
app.get('/admins',(req,res) =>{
    const {token} = req.cookies;
    if(token){
       jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
        if(err) throw err;
        res.json(await User.findById(userData.id));
       }); 
    }else{
        res.json(null);
    }
});

//Logout
app.post('/logout', (req,res)=>{
    res.cookie('token', '').json(true);
})

//Contents from Staffs
app.post('/staff', (req,res)=>{
    const {token} = req.cookies;
    const {name,files,form} = req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
         if(err) throw err;
        const UserDoc =  await User.findById(userData.id);
        if(UserDoc){
            const staffDoc = await Staff.create({
                owner:userData.id,
                name,
                files,
                form,
                location: UserDoc.location, 
                time:moment().format('MMMM Do YYYY, h:mm:ss a')
            }); 
            res.json(staffDoc);
        }
    });
});

// Multer configuration
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Upload endpoint
app.post('/upload', upload.array('file', 100), async (req, res) => {
    const folderName = req.body.folderName; // Get the folder name from the request body
    const uploadedFiles = [];

    for (const file of req.files) {
        // Define the S3 key as the folder name and file name
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${folderName}/${file.originalname}`, // Creates a folder structure
            Body: file.buffer,
        };

        try {
            const command = new PutObjectCommand(params);
            await s3.send(command);
            uploadedFiles.push(file.originalname); // Store uploaded filenames
        } catch (error) {
            console.error("Error uploading file:", error);
            return res.status(500).json({ error: "Error uploading file" });
        }
    }

    res.json(uploadedFiles); // Send back the uploaded filenames
});
//Displaying Items In StaffForm on Staff Page(User Page)
app.get('/staff', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
        const {id} = userData;
        res.json(await Staff.find({owner:id}) );
    });
});


//Getting contents from previously created forms
app.get('/staff/:id', async (req,res) =>{
    const{id} = req.params;
    res.json(await Staff.findById(id))
});


//Updating previously created forms
app.put('/staff', async(req,res) =>{
    const {token} = req.cookies;
    const {id,name,files} = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
        if(err) throw err;
        const staffDoc = await Staff.findById(id);
        if(userData.id===staffDoc.owner.toString()){
            staffDoc.set({
                name,
                files
            });
            await staffDoc.save();
            res.json('ok');
        }
    });
});

//delete single-file
app.delete('/delete-file/:id', async (req, res) => {
    const { id } = req.params; // Get the document ID from the URL
    const fileName = req.query.fileName; // Get the file name from the query string

    try {
        const updatedStaff = await Staff.findByIdAndUpdate(
            id,
            { $pull: { files: fileName } }, // Pull the file from the files array
            { new: true } // Return the updated document
        );

        if (!updatedStaff) {
            return res.status(404).json({ error: "Staff member not found" });
        }

        res.status(200).json({ message: "File deleted successfully", updatedStaff });
    } catch (error) {
        console.error("Error deleting file:", error);
        res.status(500).json({ error: "Error deleting file" });
    }
});

//Deleteing folders
app.delete('/folderdel/:id', async(req,res) =>{
    const {id} = req.params;
    const convertedObjectId = new ObjectId(id);
        await Staff.deleteOne({_id: convertedObjectId });
            res.json('successfully deleted');   
});

//'Deleting' User
app.put('/deletephase1', async(req,res) =>{
    const {id,view} = req.body;
        const staffDoc = await User.findById(id);
            staffDoc.set({
               view
            });
            await staffDoc.save();
            res.json('ok');   
});
app.delete('/deletephase2/:id', async(req,res) =>{
    const {id} = req.params;
    const convertedObjectId = new ObjectId(id);
        await User.deleteOne({_id: convertedObjectId });
            res.json('successfully deleted');   
});

//Display all files
app.get('/services', async(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
        if(err) throw err;
        const UserDoc =  await User.findById(userData.id);
        if(UserDoc){
            res.json(await Staff.find({$and:[{form:'Public'},{location:UserDoc.location}]}));
        }
    });
})
app.get('/foldees', async(req,res)=>{
    res.json(await Staff.find())
})
app.get('/users', async(req,res)=>{
    res.json(await User.find())
})
app.get('/viewsingleshare', async(req,res)=>{
    res.json(await SingleShare.find())
})
app.get('/requests', async(req,res)=>{
    res.json(await User.find({view:'delete'}))
})
app.get('/adminshared', async(req,res)=>{
    res.json(await Folder.find().populate('folder'))
})

//Accessing
app.put('/staffac', async(req,res) =>{
    const {id,role} = req.body;
        const staffDoc = await User.findById(id);
            staffDoc.set({
               role
            });
            await staffDoc.save();
            res.json('ok');   
});

app.get('/download-file/:folderName/:key', async (req, res) => {
    const fileKey = req.params.key;
    const folderName = req.params.folderName;

    const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${folderName}/${fileKey}`,
    });

    try {
        const url = await getSignedUrl(s3, command, { expiresIn: 60 });
        res.json({ url });
    } catch (error) {
        console.error("Error generating pre-signed URL:", error.message);
        res.status(500).json({ error: "Could not generate download URL", details: error.message });
    }
});

// Route to download all files in a folder as a zip
app.get('/download-folder/:folderName', async (req, res) => {
    const folderName = req.params.folderName;

    try {
        // Step 1: List all files in the folder
        const listCommand = new ListObjectsCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Prefix: `${folderName}/`
        });
        const files = await s3.send(listCommand);

        if (!files.Contents || files.Contents.length === 0) {
            return res.status(404).json({ message: "Folder is empty or not found" });
        }

        // Step 2: Create a zip archive
        res.attachment(`${folderName}.zip`);
        const archive = archiver('zip', { zlib: { level: 9 } });
        archive.pipe(res);

        // Step 3: Loop through each file, fetch it, and add it to the zip
        for (const file of files.Contents) {
            const getObjectCommand = new GetObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: file.Key,
            });

            // Fetch the file stream from S3
            const fileStream = await s3.send(getObjectCommand);
            archive.append(fileStream.Body, { name: file.Key.replace(`${folderName}/`, '') });
        }

        // Step 4: Finalize the archive
        await archive.finalize();

    } catch (error) {
        console.error("Error creating zip:", error);
        res.status(500).json({ error: "Failed to create zip" });
    }
});

// Endpoint to download a single file
// app.get('/download/:filename', (req, res) => {
//     const { filename } = req.params;
//     const filePath = path.join(__dirname, 'uploads', filename);

//     // Check if the file exists
//     if (fs.existsSync(filePath)) {
//         res.download(filePath, filename, (err) => {
//             if (err) {
//                 console.error("Error downloading file:", err);
//                 res.status(500).send("Could not download file.");
//             }
//         });
//     } else {
//         res.status(404).send("File not found.");
//     }
// });

// Endpoint to download all files in the uploads folder as a ZIP
// app.get('/download-all', (req, res) => {
//     const archive = archiver('zip', { zlib: { level: 9 } });

//     // Set response headers to download the file as a ZIP
//     res.setHeader('Content-Disposition', 'attachment; filename=uploads.zip');
//     res.setHeader('Content-Type', 'application/zip');

//     // Pipe the ZIP archive to the response
//     archive.pipe(res);
//     archive.directory(path.join(__dirname, 'uploads'), false);
//     archive.finalize();
// });


//Folder_Share 
app.post("/shares",async(req,res) => {
    const {token} = req.cookies;
    const {receiver,folder} = req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
            if(err) throw err;
            await Folder.create({
                sender:userData.id,
                receiver,folder
            });
            res.json('success');
        });
});
app.get('/shared', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
        const {id} = userData;
        const convertedObjectId = new ObjectId(id);
        res.json(await Folder.find({$or:[{sender:convertedObjectId},{receiver:convertedObjectId}]}).populate('folder') );
    });
});

//Single_Share 
app.post("/singleshared",async(req,res) => {
    const {token} = req.cookies;
    const {receivee,file} = req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
            if(err) throw err;
            await SingleShare.create({
                sender:userData.id,
                receivee,file
            });
            res.json('success');
        });
});

//Fetching User location from user data
app.get('/userlocate', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
        const {id} = userData;
        const convertedObjectId = new ObjectId(id);
        res.json(await User.find({_id: convertedObjectId}));
    });
});

// Delete Single File
app.delete('/delete-file/:folderName/:fileName', async (req, res) => {
    const { folderName, fileName } = req.params;
    const s3Key = `${folderName}/${fileName}`;

    const command = new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: s3Key,
    });

    try {
        await s3.send(command);
        res.status(200).json({ message: "File deleted successfully!"});
    } catch (error) {
        console.error("Error deleting file:", error);
        res.status(500).json({ error: "Error deleting file" });
    }
});

// Delete whole folder
app.delete('/delete-folder/:folderName', async (req, res) => {
    const { folderName } = req.params;
    try {
        // List all objects in the folder
        const listCommand = new ListObjectsV2Command({
            Bucket: process.env.S3_BUCKET_NAME,
            Prefix: `${folderName}/`,
        });
        const listResponse = await s3.send(listCommand);
        const keysToDelete = listResponse.Contents.map(obj => ({ Key: obj.Key }));

        // Delete all objects in the folder
        const deleteCommand = new DeleteObjectsCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Delete: { Objects: keysToDelete },
        });
        await s3.send(deleteCommand);
        
        res.status(200).json({ message: "Folder deleted successfully!" });
    } catch (error) {
        console.error("Error deleting folder:", error);
        res.status(500).json({ error: "Error deleting folder" });
    }
});

app.put('/updatefile', async(req,res) =>{
    const {filenam,check} = req.body;
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData)=>{
        const {id} = userData;
        const convertedObjectId = new ObjectId(id);

        const fileDoc = await File.findOne({owner:convertedObjectId});
        fileDoc.set({
            filenam,check
        });
        await fileDoc.save();
        res.json('ok');  
   });
})




app.listen(4000);