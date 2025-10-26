
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Admin from './component/admin';
import Librarian from './component/Librarian';
import User from './component/User';
import Nav from './nav';
import UserList from './Allusers';
import UsersList from './component/viewusers';
import UserProfile from './component/profile';
import Adduser from './component/newregister';
import NLogin from './component/newlogin';
import Profile from './component/profile';
import Logout from './component/logout';
import UserManagement from './component/usermanagement';
import AddBookForm from './component/addbooks';
import BookList from './component/booklist';
import { jwtDecode } from 'jwt-decode';
import BorrowedBooks from './component/borrowedbook';
import MbookList from './component/modifybook';
import TransactionList from './component/transaction';


const ProtectedRoute = ({ component: Component, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !allowedRoles.includes(user.role)) {
      return <h1>Access Denied</h1>; // Customize this message or redirect to a specific page
  }

  return <Component />;
};
function App() {
    const token = localStorage.getItem("accessToken"); // Change the key if needed
  let userId = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.user_id; // Extract the user_id from the decoded token
    } catch (err) {
      console.error("Failed to decode token:", err);
    }
  }
  return (
    <>
       <Router>
            <Routes>
                <Route path="/" element={<NLogin />} />
                <Route path="/user" element={<User />} />
                <Route path="/librarian" element={<Librarian />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/newregister" element={<Adduser />} />
                <Route path="/usermanagement" element={<UserManagement />} />
                <Route path="/addbooks" element={<AddBookForm />} />
                <Route path="/borrowedbook" element={<BorrowedBooks /> } />
                <Route path="/modifybook" element={<MbookList />} />
                <Route path="/transaction" element={<TransactionList />} />
                <Route path="/booklist" element={<BookList userId={userId} />} />
                console.log("Decoded userId:", userId);
                <Route path="/profile" element={<Profile />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </Router>
      
    {/*<Logout />*/}
    {/*<UserList />*/}
    {/*<UserManagement />*/}
    {/*<UsersList />*/}
    {/*<NLogin />*/}
    {/*<AddBookForm />*/}
   {/* <BookList />*/}
    
    {/*8<Admin />*/}
    {/*<BorrowedBooks /> */}
    {/*<MbookList />*/}
    {/*<TransactionList />*/}
    
    </>
  );
}

export default App;
