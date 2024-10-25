# Recipe Blog - Using Node.js and MongoDB

## Installation
To run this project, install it locally using npm:

```
$ npm install
$ npm start
```
Then go to: http://localhost:5000/

# Event Planner Project - Summary & Tech Stack Overview

## Summary  
The Event Planner is a full-stack web application designed to help users plan and manage events efficiently. It follows the **MVC** (Model-View-Controller) pattern, using **Node.js**, **Express**, **MongoDB**, and **Mongoose** on the backend, and **EJS**, **Bootstrap**, and custom CSS on the frontend for a responsive, organized experience.

---

## Backend Technologies

**Node.js**  
- **File**: `app.js`  
- **Purpose**: Provides the server runtime, handling multiple requests concurrently.

---

**Express**  
- **Files**: `app.js`, `server/routes`  
- **Purpose**: Web framework that manages routing, enabling efficient request handling for event creation, updates, and listing.

---

**MongoDB**  
- **Files**: `app.js` (connection setup), `models/Event.js`, `models/User.js`  
- **Purpose**: A cloud-based NoSQL database used to store event and user data, allowing secure and scalable access to data.

---

**Mongoose**  
- **Files**: `models/Event.js`, `models/User.js`  
- **Purpose**: Schema-based modeling for MongoDB, facilitating CRUD operations with schema definitions for validation and structure.

---

## Frontend Technologies

**EJS (Embedded JavaScript)**  
- **Files**: `views/` folder (e.g., `index.ejs`, `event.ejs`)  
- **Purpose**: Templating engine for rendering dynamic views, displaying events and user details based on server-side data.

---

**Bootstrap**  
- **Files**: `views/layout.ejs`, various `.ejs` templates  
- **Purpose**: Responsive UI framework that provides consistent, mobile-friendly layouts across all views.

---

**Custom Stylesheet (styles.css)**  
- **Files**: `public/styles.css`  
- **Purpose**: Customizes the appearance of the app, complementing Bootstrap for unique styling and branding.

---

## MVC Structure

**Models**  
- **Files**: `models/Event.js`, `models/User.js`  
- **Purpose**: Define schemas for events and users, structuring data and providing validation for entries.

---

**Views**  
- **Files**: `views/` folder (e.g., `index.ejs`, `event.ejs`)  
- **Purpose**: Render dynamic HTML content based on user actions and data from the server.

---

**Controllers (Routes)**  
- **Files**: `server/routes/eventRoutes.js`, `server/routes/userRoutes.js`  
- **Purpose**: Handle logic for events and user requests, retrieving or modifying data in Models and passing it to Views for display.

---
