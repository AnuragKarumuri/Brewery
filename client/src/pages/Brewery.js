import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import Cookies from 'js-cookie';


const Brewery = () => {
    const { id } = useParams();
    const [brewery, setBrewery] = useState({});
    const [rating, setRating] = useState(0);
    const [desc, setDesc] = useState('');
    const [reviews, setReviews] = useState([]);

    const user = Cookies.get("username");


    const handleDesc = (e) => {
        setDesc(e.target.value);
    };

    const handleRating = (rate) => {
        setRating(rate);
    };

    const handleReview = async () => {
        try {
            const res = await axios.post(`http://localhost:5000/api/review/${id}/rating`, { rating, desc, user });
            console.log(res);
            // After submitting a review, refetch the reviews
            fetchReviews();
        } catch (err) {
            console.error(err);
        }
    };

    const fetchBrewery = async () => {
        try {
            const res = await axios.get(`https://api.openbrewerydb.org/v1/breweries/${id}`);
            setBrewery(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchReviews = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/review/fetchrating/${id}`);
            console.log(res.data);
            const { reviews, descriptions } = res.data;
            // Combine reviews and descriptions into an array of objects
            const combinedReviews = reviews.map((review, index) => ({
                rating: review,
                desc: descriptions[index]
            }));
            setReviews(combinedReviews);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBrewery();
        fetchReviews();
    }, [id]);

    return (
        <div>
            <h1>{brewery.name}</h1>
            <p>{brewery.city}, {brewery.state}</p>
            <p>{brewery.website_url && <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">Website</a>}</p>
            <p>
                {brewery.address_1 ? brewery.address_1 : ''}
                {brewery.address_2 ? `, ${brewery.address_2}` : ''}
                {brewery.address_3 ? `, ${brewery.address_3}` : ''}
            </p>
            <p>Phone Number {brewery.phone}</p>

            <Rating
                onClick={handleRating}
            />
            <br />
            <input onChange={handleDesc} type='textarea' />
            <button onClick={handleReview}>Submit Review</button>

            <h2>Reviews</h2>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }} key={index}>
                        <p>{review.desc}</p>
                        <p>Rating: {review.rating}</p>
                    </div>
                ))
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    );
};

export default Brewery;
