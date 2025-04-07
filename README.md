#  Course Hub – Online Learning Platform


**Course Hub** is a fully-featured online learning marketplace that delivers a seamless experience for discovering, enrolling in, and managing courses. Designed for both **students** and **admins/instructors**, it includes a robust set of tools to support learning and teaching. Built using modern web technologies, **Course Hub** showcases my skills in **full-stack development**, including frontend, backend, database integration, and third-party services.


---

##  Key Features

###  For Students

####  Course Discovery & Enrollment
- Browse courses by category, with sorting and search options.
- View detailed course descriptions.
- Enroll in courses or add them to a cart for later.
- Apply discount coupons during checkout.

####  Student Dashboard
- Track enrolled courses, completed lessons, and earned certificates.
- Manage cart items and complete purchases.
- View payment history and update personal details.

####  Email Notifications
- Get enrollment confirmation via email using **Nodemailer**.

####  Secure Payments
- Stripe integration for safe and secure transactions.

---

###  For Admins

####  Admin Dashboard
- View platform metrics: total courses, users, and revenue with a 7-day chart.

####  Course Management
- Add, edit, delete, search, and sort courses.

####  User Management
- View and manage student and instructor details.
- Remove users when necessary.

####  Order Management
- Access payment history and detailed order information.

---

##  Technologies Used

### Frontend
- **HTML, CSS, TailwindCSS** – for responsive and modern UI.
- **JavaScript, React.js** – for dynamic and interactive interfaces.
- **React Router** – for client-side routing.
- **TanStack Query (React Query)** – for efficient data fetching and state management.
- **Axios** – for handling API requests with interceptors.

### Backend
- **Node.js & Express** – for building scalable REST APIs.
- **MongoDB Atlas** – for cloud database management.
- **JWT (JSON Web Tokens)** – for authentication and securing APIs.
- **Nodemailer** – for sending automated email notifications.

### Authentication & Authorization
- **Firebase** – for user authentication (login/signup).
- **Role-Based Access Control (RBAC)** – to manage access for admins, instructors, and students.

### Payment Integration
- **Stripe** – for secure online payments.

---

##  Functionality Overview

###  Course Management
- Admins/instructors can manage (add/edit/delete) courses.
- Students can browse, search, and filter based on categories, price, and ratings.

###  Enrollment System
- Students enroll in courses; enrollment info is saved in the database.
- Automatic email sent upon successful enrollment.

###  User Dashboard
- Students track course progress and manage profile.
- Admins view key metrics and manage content and users.

###  Payment System
- Fully integrated Stripe payment gateway.
- Supports coupon codes for discounts.

###  Secure Routing & API Access
- JWT-based authentication secures all routes and endpoints.
- Role-based access ensures only authorized users access certain features.

