import React, { useState, useEffect } from "react";
import axios from "axios";
import Librarianlayout from "./librarianlayout";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all transactions
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

  if (loading) return <div>Loading transactions...</div>;
  if (error) return <div>Error: {error}</div>;

  return (

    <Librarianlayout>
    <div className="transaction-list bg-teal-200">
      <h1 className="text-center text-2xl font-bold mb-4">Transaction History</h1>
      {transactions.length > 0 ? (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 md:px-4 py-2">Transaction ID</th>
              <th className="border border-gray-300 md:px-4 py-2">Book ID</th>
              <th className="border border-gray-300 md:px-4 py-2">User ID</th>
              <th className="border border-gray-300 md:px-4 py-2">Borrow Date</th>
              <th className="border border-gray-300 md:px-4 py-2">Due Date</th>
              <th className="border border-gray-300 md:px-4 py-2">Return Date</th>
              <th className="border border-gray-300 md:px-4 py-2">Fine</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transaction_id} className="text-center ">
                <td className="border border-gray-300 px-4 py-2">{transaction.transaction_id}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.book}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.user}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.borrow_date}</td>
                <td className="border border-gray-300 px-4 py-2">{transaction.due_date}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {transaction.return_date || "Not Returned"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {transaction.fine > 0 ? `$${transaction.fine}` : "No Fine"}
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

export default TransactionList;