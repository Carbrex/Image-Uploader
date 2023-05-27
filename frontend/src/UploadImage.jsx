import React, { useState } from 'react'
import axios from 'axios';

const UploadImage = ({ url }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState({ myFile: "" });

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const uploadImage = async (newImage) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${url}/api/images/upload`, newImage, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        uploadImage({ myFile: image.myFile, name });
        setImage({ myFile: "" });
        setName('');
        console.log("Uploaded");
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log(base64)
        setImage({ ...image, myFile: base64 })
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
            </form>
        </div>
    )
}

export default UploadImage;