
import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
});

export const getHeader = (contentType = "application/json") => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token is missing");
    }
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": contentType
    };
};

/* This function adds a new activity to the database */
export async function addBook(image, bookSize, bookType, bookDescription, bookName, bookLink, bookKeywords) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("bookSize", bookSize);
    formData.append("bookType", bookType);
    formData.append("bookDescription", bookDescription);
    formData.append("bookName", bookName);
    formData.append("bookLink", bookLink);
    formData.append("bookKeywords", bookKeywords);

    // Log form data to ensure it's correctly formed
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }

    try {
        const response = await api.post("/books/add-new-book", formData, {
            headers: getHeader("multipart/form-data")  // Use the correct content type for file uploads
        });
        if (response.status === 200) {  // Note: Response status for OK is 200, not 201
            return true;
        } else {
            console.error('Unexpected status code:', response.status);
            return false;
        }
    } catch (error) {
        console.error("Error submitting form:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function getBookTypes() {
    try {
        const response = await api.get("/books/all-book-types", {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching book types:", error.response ? error.response.data : error.message);
        throw new Error("Error fetching book types");
    }
}

export async function getAllBooks() {
    try {
        const result = await api.get("/books/all-books");
        return result.data;
    } catch (error) {
        throw new Error("Error fetching activities");
    }
}

export async function deleteBook(bookId) {
    try {
        const result = await api.delete(`/books/delete/${bookId}`, {
            headers: getHeader()
        });
        return result.data;
    } catch (error) {
        throw new Error(`Error deleting activity ${error.message}`);
    }
}

export async function updateBook(bookId, bookData) {
    const formData = new FormData();
    formData.append("bookType", bookData.bookType);
    formData.append("bookSize", bookData.bookSize);
    formData.append("image", bookData.image);
    formData.append("bookName", bookData.bookName);
    formData.append("bookDescription", bookData.bookDescription);
    formData.append("bookLink", bookData.bookLink);
    formData.append("bookKeywords", bookData.bookKeywords);

    const response = await api.put(`/books/update/${bookId}`, formData, {
        headers: getHeader("multipart/form-data")
    });
    return response;
}

export async function getBookById(bookId) {
    try {
        const result = await api.get(`/books/book/${bookId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching books ${error.message}`);
    }
}

export async function importBooks(file) {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const result = await api.post("/books/upload-book", formData, {
            headers: getHeader("multipart/form-data")
        });

        return result.data;
    } catch (error) {
        throw new Error(`Error importing books: ${error.message}`);
    }
}

export async function loginUser(login) {
    try {
        const response = await api.post("/auth/login", login);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getUserProfile(userId, token) {
    try {
        const response = await api.get(`users/profile/${userId}`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteUser(userId) {
    try {
        const response = await api.delete(`/users/delete/${userId}`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export async function getUser(userId, token) {
    try {
        const response = await api.get(`/users/${userId}`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function registerUser(registration) {
    try {
        const response = await api.post("/auth/register-user", registration);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error(`User registration error: ${error.message}`);
        }
    }
}
