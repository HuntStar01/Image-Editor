# Image Editor Web Application

This is a full-stack web application for editing images in real-time. Users can upload an image, adjust brightness, hue, saturation, rotation, crop, and then download the processed image.

## Features

- Upload an image in **JPEG** or **PNG** format.
- Adjust image **brightness**, **hue**, **saturation**, and **rotation**.
- **Download** the edited image.
- **Reset** functionality to restore the image to its original state.
- Crop functionality for user-selected portions of the image.
- Real-time image preview during editing.
- Responsive design with a modern UI.

## Technologies Used

### Frontend

- **React**: Frontend framework.
- **Axios**: For handling HTTP requests.
- **CSS**: For styling the components and UI.
- **JavaScript (ES6)**: Core logic for interactivity.

### Backend

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for Node.js.
- **Multer**: Middleware for handling file uploads.
- **Sharp**: Image processing library to manipulate images.
- **Cors**: Middleware to allow cross-origin requests.

## Installation and Setup

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (v12+).
- **npm**: Node package manager, which comes with Node.js.
- **Git**: For cloning the repository.

### Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/image-editor.git
   cd image-editor

2. **Install dependencies**:

    ## Install backend dependencies:
        cd backend
        npm install

    ## Install frontend dependencies:
        cd frontend
        npm install

3. **Start the Backend Server**:

    ## In the root of your project, run:
        cd backend
        node server.js


    The backend server will start at http://localhost:5000.

4. **Start the Frontend React App**:

    ## In the frontend folder, run:
        npm start


The frontend will run at http://localhost:3000.

## Running the Application
    Visit http://localhost:3000 in your browser.
    Use the upload button to upload an image in either JPEG or PNG format.
    Adjust the brightness, hue, saturation, and rotation of the image using the sliders.
    Use the Reset button to revert the image to its original state.
    Once you are happy with the result, click the Download button to save the edited image.




### API Endpoints ###

## Image Upload
    POST /upload
    Upload an image (JPEG or PNG) and store it on the server.
    Returns the URL of the uploaded image.

## Image Processing
    GET /process-image
    Apply adjustments to the uploaded image such as brightness, hue, saturation, and rotation.
    Returns the processed image blob.

### Error Handling ###
    If an invalid file format is uploaded (anything other than JPEG or PNG), an error message will pop up asking the user to upload a valid file.
    Errors while processing or downloading the image will be logged in the browser console.
    
### Future Enhancements ###
    Add more image manipulation features like contrast adjustment, cropping, and filters.
    Improve the cropping tool by allowing users to select custom regions.
    Add the ability to apply multiple layers of editing (e.g., adding text or sticker

