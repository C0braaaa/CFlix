// src/services/searchService.js
import * as request from '../utils/httpRequest';

export const search = async (keyword) => {
    try {
        const res = await request.get('v1/api/tim-kiem', {
            params: { keyword },
        });
        return res?.data?.items || [];
    } catch (error) {
        console.error('Search API error:', error);
        return [];
    }
};
