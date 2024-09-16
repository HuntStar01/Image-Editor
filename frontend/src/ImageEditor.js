import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function ImageEditor({ imageUrl }) {
    const [brightness, setBrightness] = useState(100);
    const [hue, setHue] = useState(0);
    const [saturation, setSaturation] = useState(100);
    const [rotation, setRotation] = useState(0);
    const [processedImage, setProcessedImage] = useState(imageUrl);

    useEffect(() => {
        const fetchProcessedImage = async () => {
            try {
                const response = await axios.get('http://localhost:5000/process-image', {
                    params: {
                        imageUrl: imageUrl.split('/').pop(),
                        brightness,
                        hue,
                        saturation,
                        rotation
                    },
                    responseType: 'blob'
                });
                const imageBlob = URL.createObjectURL(response.data);
                setProcessedImage(imageBlob);
            } catch (error) {
                console.error('Error processing image:', error);
            }
        };

        fetchProcessedImage();
    }, [brightness, hue, saturation, rotation, imageUrl]);

    const handleBrightnessChange = (e) => setBrightness(Number(e.target.value));
    const handleHueChange = (e) => setHue(Number(e.target.value));
    const handleSaturationChange = (e) => setSaturation(Number(e.target.value));
    const handleRotationChange = (e) => setRotation(Number(e.target.value));

    // Store initial state
    const initialValues = {
        brightness: 100,
        hue: 0,
        saturation: 100,
        rotation: 0
    };

    // Reset function
    const handleReset = () => {
        setBrightness(initialValues.brightness);
        setHue(initialValues.hue);
        setSaturation(initialValues.saturation);
        setRotation(initialValues.rotation);
    };

    // Update image styles dynamically
    const imageStyle = {
        filter: `brightness(${brightness}%) hue-rotate(${hue}deg) saturate(${saturation}%)`,
        transform: `rotate(${rotation}deg)`
    };

    const handleDownload = async () => {
        try {
            const response = await axios.get('http://localhost:5000/process-image', {
                params: {
                    imageUrl: imageUrl.split('/').pop(),
                    brightness,
                    hue,
                    saturation,
                    rotation
                },
                responseType: 'blob' // Expect a binary response (the image)
            });
            const downloadUrl = URL.createObjectURL(response.data);

            // Create a temporary link to trigger the download
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'edited-image.png'; // Set the download file name
            link.click(); // Trigger the download
        } catch (error) {
            console.error('Error downloading the image:', error);
        }
    };

    return (
        <div className="image-editor">
            <div className="image-container">
                <img src={processedImage} alt="Processed Preview" style={imageStyle} />
            </div>

            <div className="controls">
                <div className="control-box">
                    <label htmlFor="brightness">Brightness:</label>
                    <input 
                        id="brightness"
                        type="range" 
                        min="0" 
                        max="200" 
                        value={brightness} 
                        onChange={handleBrightnessChange} 
                    />
                </div>

                <div className="control-box">
                    <label htmlFor="hue">Hue:</label>
                    <input 
                        id="hue"
                        type="range" 
                        min="0" 
                        max="360" 
                        value={hue} 
                        onChange={handleHueChange} 
                    />
                </div>

                <div className="control-box">
                    <label htmlFor="saturation">Saturation:</label>
                    <input 
                        id="saturation"
                        type="range" 
                        min="0" 
                        max="200" 
                        value={saturation} 
                        onChange={handleSaturationChange} 
                    />
                </div>

                <div className="control-box">
                    <label htmlFor="rotation">Rotation:</label>
                    <input 
                        id="rotation"
                        type="range" 
                        min="-180" 
                        max="180" 
                        value={rotation} 
                        onChange={handleRotationChange} 
                    />
                </div>

                <button className="reset-btn" onClick={handleReset}>Reset</button>
                <button className="download-btn" onClick={handleDownload}>Download</button>
            </div>
        </div>
    );
}

export default ImageEditor;
