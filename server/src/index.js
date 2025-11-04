import express from 'express';
import fetch from 'node-fetch';
import NodeCache from 'node-cache';
import cors from 'cors';

const app = express();
const cache = new NodeCache({ stdTTL: 600 }); // cache 10 phút
app.use(cors());

app.get('/api/search', async (req, res) => {
    const keyword = req.query.keyword?.trim();
    if (!keyword) return res.json([]);

    const cacheKey = `search-${keyword}`;
    if (cache.has(cacheKey)) {
        console.log('✅ cache hit', keyword);
        return res.json(cache.get(cacheKey));
    }

    try {
        const url = `https://phimapi.com/v1/api/tim-kiem?keyword=${encodeURIComponent(keyword)}`;
        const response = await fetch(url);
        const data = await response.json();

        cache.set(cacheKey, data);
        res.json(data);
    } catch (err) {
        console.error('Proxy error:', err);
        res.status(500).json({ error: 'Fetch failed' });
    }
});

app.listen(5000, () => console.log('Proxy running on http://localhost:5000'));
