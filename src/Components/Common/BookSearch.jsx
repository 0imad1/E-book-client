import React, { useState, useEffect } from "react";
import { getAllBooks } from "../utils/ApiFunctions"; // Replace with the correct import if needed
import { useNavigate } from "react-router-dom";

const BookSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [clickCounts, setClickCounts] = useState({});
    const navigate = useNavigate();

    // Fetch all books on component mount
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const allBooks = await getAllBooks();
                setBooks(allBooks);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, []);

    // Filter books based on the search term
    useEffect(() => {
        if (searchTerm.length > 0) {
            const filtered = books.filter((book) =>
                book.bookName.toLowerCase().startsWith(searchTerm.toLowerCase())
            );
            setFilteredBooks(filtered);
        } else {
            setFilteredBooks([]); // Clear the list when input is empty
        }
    }, [searchTerm, books]);

    const handleBookClick = (id) => {
        setClickCounts(prevCounts => {
            const newCounts = { ...prevCounts };
            newCounts[id] = (newCounts[id] || 0) + 1;

            if (newCounts[id] === 1) {
                window.open("https://www.profitablecpmrate.com/ikexr802?key=5ee1b3e4b43a0a7eaf65cc5047e256ff", "_blank");
            } else {
                navigate(`/download-book/${id}`);
            }

            return newCounts;
        });
    };

    return (
        <div className="book-search-container">
            <input
                type="text"
                placeholder="Search for a book..."
                className="search-bar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {filteredBooks.length > 0 ? (
                <ul className="book-list">
                    {filteredBooks.map((book) => (
                        <li
                            key={book.id}
                            className="book-list-item"
                            onClick={() => handleBookClick(book.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img
                                src={`data:image/png;base64, ${book.image}`}
                                alt={book.bookName}
                                className="book-image"
                            />
                            <span className="book-name">{book.bookName}</span>
                        </li>
                    ))}
                </ul>
            ) : searchTerm.length > 0 ? (
                <p>No books found.</p>
            ) : (
                <p>Enter a book name to search.</p>
            )}
        </div>
    );
};

export default BookSearch;
