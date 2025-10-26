import React, { useState, useEffect } from "react";
import axios from "axios";
import Userlayout from '../component/userlayout';
import'./example.css';

const BookList = ({ userId }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/library/books/")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleBorrow = (bookId) => {
    //const token = localStorage.getItem("accessToken"); // Get the token
    //const userId = localStorage.getItem("userId"); // Retrieve the user ID
    // Log the token from localStorage to the console
  console.log("Token from localStorage:", localStorage.getItem("accessToken"));
    if (!userId) {
      alert("User ID is required to borrow a book.");
      return;
    }
    const token = localStorage.getItem("accessToken"); // Get the token
    axios
      .post("http://localhost:8000/library/borrow/", { book_id: bookId, user_id: userId },//, user_id: userId
        {
          headers: {
            Authorization:`Bearer ${localStorage.getItem("accessToken")}`, // Set Authorization header
          },
        }
      )
  
      .then((response) => {
        alert("Book borrowed successfully!");

        // Update book availability in the list
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.book_id === bookId
              ? { ...book, number_of_copies: book.number_of_copies - 1, is_available: book.number_of_copies - 1 > 0 }
              : book
          )
        );
      })
      .catch((err) => {
        alert(err.response?.data?.error || "Failed to borrow book.");
      });
  };

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Userlayout>
    <div className="bg-teal-200 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Book List</h2>
      <div className="grid grid-cols-3 gap-2">
        {books.map((book) => (
          <div
            key={book.book_id}
            className="bg-white p-4 rounded shadow-md border border-gray-200 text-center"
          >
            <p className="font-bold text-lg mb-2">{book.title}</p>
            <p className="text-gray-700 mb-2"><strong>Author:</strong> {book.author}</p>
            <p className="text-gray-700 mb-2">
              <strong>Availability:</strong>{" "}
              {book.is_available ? "Available" : "Not Available"} (
              {book.number_of_copies} copies left)
            </p>
            <button
              onClick={() => handleBorrow(book.book_id)}
              disabled={!book.is_available}
              className={`w-full py-2 px-4 rounded ${
                book.is_available
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {book.is_available ? "Borrow" : "Not Available"}
            </button>
          </div>
        ))}
      </div>
    </div>
    </Userlayout>
  );
};

export default BookList;