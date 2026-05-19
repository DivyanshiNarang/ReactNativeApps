import express from 'express';
import { ENV } from './config/env.js';

const app = express();
const PORT = ENV.PORT;

app.use(express.json());

app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true });
})

app.post('/api/favorites', async (req, res) => {
    try {
        const { userId, recipeId, title, image, cookTime, servings } = req.body;

        if (!userId || !recipeId || !title)
            return res.status(400).json({ error: "Missing required fields." });

        await db
    } catch (error) {

    }
})

app.listen(PORT, () => {
    console.log('Server listening at PORT:', PORT);
})