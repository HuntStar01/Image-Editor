import React, { useState } from 'react';
import axios from 'axios';
import ImageEditor from './ImageEditor';
import Lottie from 'react-lottie';
import animationData from './logo.json';
import './App.css';

function App() {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                setImage(file);
                setErrorMessage('');
            } else {
                setErrorMessage('Please upload a valid image in JPEG or PNG format.');
                e.target.value = '';
                setTimeout(() => setErrorMessage(''), 3000);
            }
        }
    };

    const handleUpload = () => {
        if (!image) return;

        const formData = new FormData();
        formData.append('image', image);

        setImageUrl('');

        axios.post('http://localhost:5000/upload', formData)
            .then(response => {
                setImageUrl(response.data.imageUrl);
                setImage(null);
            })
            .catch(error => {
                console.error('Error uploading image:', error);
                setErrorMessage('Error uploading image. Please try again.');
                setTimeout(() => setErrorMessage(''), 3000);
            });
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="App">
            <div className="logo-container">
                <Lottie options={defaultOptions} height={150} width={150} />
            </div>

            <h1>Image Editor</h1>

            <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleImageChange}
            />
            <button onClick={handleUpload}>Upload Image</button>

            {imageUrl && <ImageEditor imageUrl={imageUrl} />}

            {errorMessage && (
                <div className="error-popup">
                    {errorMessage}
                </div>
            )}
        </div>
    );
}

export default App;
