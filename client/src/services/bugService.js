const API_URL = 'http://localhost:5000/api/bugs';

export const bugService = {
    async getAllBugs() {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch bugs');
        return response.json();
    },

    async createBug(bugData) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bugData)
        });
        if (!response.ok) throw new Error('Failed to create bug');
        return response.json();
    },

    async updateBug(id, bugData) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bugData)
        });
        if (!response.ok) throw new Error('Failed to update bug');
        return response.json();
    },

    async deleteBug(id) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete bug');
        return response.json();
    }
};