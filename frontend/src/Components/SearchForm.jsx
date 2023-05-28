import React from 'react'
import axios from 'axios';
import { useState } from 'react';
const SearchForm = ({ url, myImages, setMyImages }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const searchValue = React.useRef('');

    React.useEffect(() => {
        searchValue.current.focus();
    }, []);
    
    const getImagebySearchquery = async (searchQuery) => {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${url}/api/images/${searchQuery}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res);
        setMyImages(res.data.images);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        getImagebySearchquery(searchTerm);
    }
    return (
        <form className="search-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Search your images</label>
                <input type="text" id="name" ref={searchValue} onChange={() => {
                    setSearchTerm(searchValue.current.value);
                }} />
        </form>
    )
}

export default SearchForm
