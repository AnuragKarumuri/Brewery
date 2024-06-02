import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`https://api.openbrewerydb.org/v1/breweries?by_city=${query}`);
            setResults(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Search by city" value={query} onChange={(e) => setQuery(e.target.value)} required />
                <button type="submit">Search</button>
            </form>
            <ul>
                {results.map(brewery => (
                    <li key={brewery.id}>
                        <Link to={`/brewery/${brewery.id}`}>{brewery.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
