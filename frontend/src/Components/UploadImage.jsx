import React, { useState } from 'react'
import axios from 'axios';

const UploadImage = ({ url }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [uploaded, setUploaded] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const uploadImage = async (newImage) => {
        try {
            const token = localStorage.getItem('token');
            const res=await axios.post(`${url}/api/images/upload`, newImage, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(res);
        } catch (error) {
            console.log(error)
            return;
        }
        setUploaded(true);
        setTimeout(() => {
            setUploaded(false);
        }, 2500);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('myFile', image);
        uploadImage(formData);
        setImage(null);
        setName('');
        console.log("Uploaded");
        e.target.reset();
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <div >
            <form onSubmit={handleSubmit} className='upload-image'>
                <h2>Image Upload</h2>
                <label htmlFor='img-name'>Name</label>
                <input
                    className='text-input'
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                />
                <br />
                <input
                    className='file-input'
                    type="file"
                    lable="Image"
                    name="myFile"
                    id='file-upload'
                    accept='.jpeg, .png, .jpg'
                    onChange={(e) => handleFileUpload(e)}
                />
                <br />
                <button type='submit'>Submit</button>
                {uploaded && <p>Image uploaded successfully</p>}
            </form>
        </div>
    )
}

export default UploadImage;