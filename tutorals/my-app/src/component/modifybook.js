import React, { useState, useEffect } from "react";
import axios from "axios";
import Librarianlayout from "./librarianlayout";

const MbookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all books
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/library/books/");
        setBooks(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch books.");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleDeleteBook = async (bookId) => {
    try {
      // Send delete request to the server
      await axios.delete(`http://localhost:8000/library/books/${bookId}/`);
      alert("Book deleted successfully!");

      // Remove the deleted book from the local state
      setBooks((prevBooks) => prevBooks.filter((book) => book.book_id !== bookId));
    } catch (err) {
      alert("Failed to delete book: " + (err.response?.data?.error || err.message));
    }
  };

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Librarianlayout>
    <div className="container mx-auto p-4 bg-teal-200 md:w-full w-full mr-3">
      <h2 className="text-2xl font-bold md:text-center mb-4 ml-20">All Books</h2>
      {books.length > 0 ? (
        <table className="md:min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="">
              <th className="border border-gray-300 md:px-14 px-5 py-2">Book ID</th>
              <th className="border border-gray-300 md:px-14 px-5 py-2">Title</th>
              <th className="border border-gray-300 md:px-14 px-5 py-2">Author</th>
              <th className="border border-gray-300 md:px-14 px-5 py-2">Availability</th>
              <th className="border border-gray-300 md:px-14 px-5 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.book_id} className="text-center">
                <td className="border border-gray-300 md:px-14 px-5 py-2">{book.book_id}</td>
                <td className="border border-gray-300 md:px-14 px-5 py-2">{book.title}</td>
                <td className="border border-gray-300 md:px-14 px-5 py-2">{book.author}</td>
                <td className="border border-gray-300 md:px-14 px-5 py-2">
                  {book.is_available ? "Available" : "Not Available"}
                </td>
                <td className="border border-gray-300 md:px-14 px-5 py-2">
                  <button
                    className="bg-red-500 text-white md:px-14 py-2 rounded"
                    onClick={() => handleDeleteBook(book.book_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books available.</p>
      )}
    </div>
    </Librarianlayout>
  );
};

export default MbookList;