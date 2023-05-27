import React, { useEffect, useState } from 'react'
import axios from 'axios';

const GetMyImages = ({ url }) => {
    const [myImages, setMyImages] = useState([]);

    const getImage = async () => {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${url}/api/images`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res);
        setMyImages(res.data.images);
    }

    useEffect(() => {
      getImage();
    }, [])
    

    return (
        <div className='my-images'>
            {
                myImages.length===0&&<h2>No images to display</h2>
            }
            {
                myImages.map((myImage) => {
                    return <img src={myImage.myFile} key={myImage._id} />
                })
            }
        </div>
    )
}

export default GetMyImages;