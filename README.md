# 📚 Library Management System

## 🧾 Description
A **comprehensive Library Management System** built with **React (frontend)** and **Django (backend)**.  
This system helps users browse and borrow books, while librarians and admins can efficiently manage the entire library workflow.  

The platform includes **role-based access** for Users, Librarians, and Admins, ensuring that each user type can perform actions according to their role.

---

## ✨ Features

### 👤 User Features
- **User Login & Registration**: Secure authentication and profile access.  
- **Browse Books**: View all available books with search and filter options.  
- **Borrow Books**: Request and borrow books from the library.  
- **Profile Management**: Update personal details and view borrowing history.  
- **Order Management**:  
  - Track borrowed book status (e.g., Pending, Approved, Returned).  
  - Receive notifications or updates about transactions.

### 📘 Librarian Features
- **Librarian Login**: Role-based access for library staff.  
- **Book Management**: Add, update, or remove books.  
- **Transaction Management**:  
  - Approve or reject book borrow requests.  
  - Mark returned books and update borrowing status.  

### 🧑‍💼 Admin Features
- **Admin Login**: Access restricted to system administrators.  
- **User Management**:  
  - Register new users and librarians.  
  - Update or delete existing users.  

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React, TailwindCSS |
| Backend | Django, Django REST Framework |
| Database | SQLite |
| Authentication | JWT |
| Version Control | Git & GitHub |

---

## ⚙️ Installation & Setup Guide

### 🔹 Backend (Django)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Awokeatanaw/library-management-system.git
   cd library-management-system

2. **Navigate to the Django Project Directory**
    ```bash
   cd Library-managment
3. **Create and Activate the Virtual Environment**
    ```bash
   .\myenv\Scripts\activate

4. **Navigate to the Django Project subfolder**
     ```bash
   cd django_project
5. **Install Required Packages**
    ```bash
   pip install -r requirements.txt
6. **Set Up the Database**
    ```bash
   python manage.py migrate
7. **Run the Django Server**
     ```bash
    python manage.py runserver

### 🔹 Frontend (React)
1. **Navigate to the React Project Directory**
     ```bash
   cd ../tutorials/my-app
2. **Install Required Packages**
     ```bash
   npm install
3. **Start the React Application**
     ```bash
   npm start

## 🚀 Usage

Access the web app:
Visit http://localhost:3000

Login / Register:
Use valid credentials to log in as a user, librarian, or admin.

Borrow and Manage Books:
Browse books, borrow, manage transactions, and view your orders.

## 🤝 Contributing
Contributions are welcome! 🎉
To contribute:
1.Fork this repository.

2.Create a new branch for your feature (git checkout -b feature-name).

3.Commit your changes and push to your fork.

4.Submit a Pull Request with a clear description.


## 📄 License
This project is licensed under the MIT License.

## 📸 Screenshots
**Login page**

<img width="1020" height="589" alt="Screenshot 2025-10-26 022335" src="https://github.com/user-attachments/assets/0bfdd3fb-67dd-4874-a1d1-a3b8b8134b7a" />

**Admin page**
<img width="1279" height="592" alt="Screenshot 2025-10-26 035315" src="https://github.com/user-attachments/assets/d59e0786-69b4-49d1-abdb-dddb8807542a" />

## 🕓 Changelog
. v1.0: Initial release with basic user, librarian and admin functionalities.


