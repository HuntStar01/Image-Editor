import React, { useState } from 'react';
import axios from 'axios';
import ImageEditor from './ImageEditor';
import './App.css';

function App() {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check for valid file type
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                setImage(file);
                setErrorMessage(''); // Clear error message
            } else {
                // Invalid file type error
                setErrorMessage('Please upload a valid image in JPEG or PNG format.');
                e.target.value = ''; // Clear the file input
                setTimeout(() => setErrorMessage(''), 3000); // Automatically clear error message after 3 seconds
            }
        }
    };

    const handleUpload = () => {
        if (!image) return; // Ensure an image is selected

        const formData = new FormData();
        formData.append('image', image);

        // Clear previous image URL before uploading
        setImageUrl('');

        axios.post('http://localhost:5000/upload', formData)
            .then(response => {
                setImageUrl(response.data.imageUrl); // Set the uploaded image URL for the editor
                setImage(null); // Clear the selected image after successful upload
            })
            .catch(error => {
                console.error('Error uploading image:', error);
                setErrorMessage('Error uploading image. Please try again.');
                setTimeout(() => setErrorMessage(''), 3000); // Clear error message after 3 seconds
            });
    };

    return (
        <div className="App">
            <h1>Image Editor</h1>
            
            <input
                type="file"
                accept="image/jpeg, image/png" 
                onChange={handleImageChange}
            />
            <button onClick={handleUpload}>Upload Image</button>

            {/* Display the ImageEditor component only when there's an imageUrl */}
            {imageUrl && <ImageEditor imageUrl={imageUrl} />}

            {/* Display error message if it exists */}
            {errorMessage && (
                <div className="error-popup">
                    {errorMessage}
                </div>
            )}
        </div>
    );
}

export default App;
