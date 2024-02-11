const API_BASE_URL = 'http://localhost:4000/api';

export const fetchPosts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const fetchPostsByUserId = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching posts for user ${userId}:`, error);
        throw error;
    }
};

export const fetchUsers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

export const fetchTags = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/tags`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching tags:', error);
        throw error;
    }
}