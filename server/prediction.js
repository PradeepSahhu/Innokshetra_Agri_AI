import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios'

export const getCropRecommendation = async (req, res, next) => {
    const userData = req.body;

    try {
        const response = await axios.post(process.env.MODEL_DEPLOYMENT_ENDPOINT, userData);

        req.recommendation = response.data.recommendation;

        next();
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to get crop recommendation' });
    }
};
