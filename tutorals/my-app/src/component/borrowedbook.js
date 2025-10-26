import React, { useState, useEffect } from "react";
import axios from "axios";
import Librarianlayout from "./librarianlayout";

const BorrowedBooks = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/library/transactions/");
        setTransactions(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch transactions.");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleReturnBook = async (transactionId) => {
    try {
      const response = await axios.post(`http://localhost:8000/library/return/${transactionId}/`);
      alert("Book returned successfully!");
      // Refresh the transaction list after returning the book
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.transaction_id === transactionId
            ? { ...transaction, return_date: response.data.return_date }
            : transaction
        )
      );
    } catch (err) {
      alert("Failed to return book: " + (err.response?.data?.error || err.message));
    }
  };

  if (loading) return <div>Loading transactions...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Librarianlayout>
    <div className="container mx-auto p-4 bg-teal-200">
      <h2 className="text-2xl font-bold text-center mb-4">Borrowed Books</h2>
      {transactions.length > 0 ? (
        <table className="md:min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 md:px-4 py-2">Transaction ID</th>
              {/*<th className="border border-gray-300 px-4 py-2"></th>*/}
              <th className="border border-gray-300 px-4 py-2">Borrow Date</th>
              <th className="border border-gray-300 px-5 py-2">Due Date</th>
              <th className="border border-gray-300 px-4 py-2">Return Date</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transaction_id} className="text-center">
                <td className="border border-gray-300 md:px-4  py-2">{transaction.transaction_id}</td>
                
                <td className="border border-gray-300 md:px-4 py-2">{transaction.borrow_date}</td>
                <td className="border border-gray-300 md:px-4 py-2">{transaction.due_date}</td>
                <td className="border border-gray-300 md:px-4 py-2">
                  {transaction.return_date ? transaction.return_date : "Not Returned"}
                </td>
                <td className="border border-gray-300 md:px-4 py-2">
                  {!transaction.return_date && (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => handleReturnBook(transaction.transaction_id)}
                    >
                      Return Book
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
    </Librarianlayout>
  );
};

export default BorrowedBooks;