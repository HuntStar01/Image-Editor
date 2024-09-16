const express = require('express');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

// Set up storage for uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Serve uploaded images statically
app.use('/uploads', express.static('uploads'));

// Basic route to test server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Image upload endpoint
app.post('/upload', upload.single('image'), (req, res) => {
    // Use backticks for string interpolation
    res.json({ imageUrl: `http://localhost:5000/uploads/${req.file.filename}` });
});

// Image processing endpoint
app.get('/process-image', (req, res) => {
    const { imageUrl, brightness, hue, saturation, rotation } = req.query;

    // Use backticks for string interpolation
    const imagePath = `./uploads/${imageUrl}`;

    sharp(imagePath)
        .modulate({
            brightness: brightness / 100,
            saturation: saturation / 100,
            hue: Number(hue) // Ensure hue is a number
        })
        .rotate(Number(rotation)) // Apply rotation
        .toBuffer((err, data, info) => {
            if (err) {
                return res.status(500).send('Error processing image');
            }
            res.type(info.format); // Set the response type (e.g., png, jpeg)
            res.send(data); // Send the processed image as response
        });
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
