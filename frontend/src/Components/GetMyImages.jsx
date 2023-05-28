import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SearchForm from './SearchForm';

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
        <>
            <SearchForm url={url} myImages={myImages} setMyImages={setMyImages}/>
            <div className='my-images'>
                {
                    myImages.length === 0 && <h2>No images to display</h2>
                }
                {
                    myImages.map((myImage) => {
                        return <div  key={myImage._id} >
                            <img src={`${url}/assets/${myImage.myFile}`} key={myImage._id} />
                            <p>{myImage.name}</p>
                        </div>
                    })
                }
            </div >
        </>
    )
}

export default GetMyImages;