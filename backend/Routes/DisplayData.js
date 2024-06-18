const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/foodData', async (req, res) => {
    try {
        // Ensure the MongoDB connection is established before running queries
        if (!mongoose.connection.readyState) {
            await mongoose.connect(mongoUri);
        }

        const fetchedData = await mongoose.connection.db.collection('food_items').find({}).toArray();
        global.food_items = fetchedData;

        const foodCategory = await mongoose.connection.db.collection('foodCategory').find({}).toArray();
        global.foodCategory = foodCategory;

        res.json([global.food_items, global.foodCategory]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
