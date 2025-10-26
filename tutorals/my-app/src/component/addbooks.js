import React, { useState } from "react";
import axios from "axios";
import Librarianlayout from "./librarianlayout";

const AddBookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [numberOfCopies, setNumberOfCopies] = useState(1);
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const bookData = {
      title,
      author,
      number_of_copies: numberOfCopies,
    };

    axios
      .post("http://localhost:8000/library/library/addbooks/", bookData)
      .then((response) => {
        setMessage("Book added successfully!");
        setTitle("");
        setAuthor("");
        setNumberOfCopies(1);
      })
      .catch((error) => {
        setMessage("Failed to add book. Please try again.");
        console.error(error);
      });
  };

  return (
    <>
    <Librarianlayout>
    <div className="ml-5 mr-60 bg-teal-200 md:w-full w-96">
      <h2 className="ml-36 font-bold text-2xl">Add a New Book</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label className="mt-6 ml-5 font-bold  text-xl" htmlFor="title">Title:</label>
          <input className="mt-6 md:ml-36 ml-4 h-10 md:w-80 w-52 text-xl"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mt-6 md:ml-4 ml-2 font-bold text-xl" htmlFor="author">Author:</label>
          <input className="mt-6 md:ml-32  h-10 md:w-80 w-52 text-xl"
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mt-6 md:ml-5 font-bold text-xl" htmlFor="number_of_copies">Number:</label>
          <input className="mt-6 md:ml-28 h-10 md:w-80 w-52 border-2 text-xl"
            type="number"
            id="number_of_copies"
            value={numberOfCopies}
            onChange={(e) => setNumberOfCopies(e.target.value)}
            min="1"
            required
          />
        </div>
        <button className="mt-6 ml-32 mb-2 w-40 bg-blue-600 text-white h-10 text-xl" type="submit">Add Book</button>
      </form>
    </div>
    </Librarianlayout>
    </>
  );
};

export default AddBookForm;