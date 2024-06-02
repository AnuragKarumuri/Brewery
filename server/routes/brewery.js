const express = require('express');
const Brewery = require('../models/Brewery');

const router = express.Router();




router.get('/fetchrating/:id', async (req, res) => {
    const bid = req.params.id;
    try {
        // Find all breweries with the given 'bid'
        const breweries = await Brewery.find({ bid: bid });
        if (!breweries || breweries.length === 0) {
            return res.status(404).json({ msg: 'Brewery not found' });
        }

        // Extract and combine all reviews from the found breweries
        const reviews = breweries.flatMap(brewery => brewery.rating);
        const descriptions = breweries.flatMap(brewery => brewery.desc);
        const users = breweries.flatMap(brewery => brewery.user);

        // Combine reviews and descriptions into an object
        const responseData = {
            reviews: reviews,
            descriptions: descriptions,
            users: users
        };
        console.log(responseData)

        // Return the combined reviews and descriptions
        res.json(responseData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



router.post('/:id/rating', async (req, res) => {
    const { rating, desc, user } = req.body;
    console.log(req.body)
    const bid = req.params.id;
    try {
        const newRating = new Brewery({ rating, desc, bid, user });
        await newRating.save();
        res.json(Brewery.reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
