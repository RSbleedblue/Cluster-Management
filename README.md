# Cluster Management Application

This is a full-stack application that provides performance metrics (IOPS) for clusters, displaying them in an interactive dashboard. The frontend is built with **React**, and the backend with **Node.js**, using a MySQL database to store the cluster metrics.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the Backend](#running-the-backend)
- [Frontend Setup](#frontend-setup)
  - [Installing Dependencies](#installing-dependencies)
  - [Running the Frontend](#running-the-frontend)

---

## Prerequisites

Before running the application, ensure you have the following installed on your machine:

- **Node.js** (v18+)
- **MySQL** (v8.0+)
- **npm** or **yarn**
- **Git** (optional, for version control)

---

## Backend Setup

### 1. Clone the Repository

First, clone the backend repository:

```bash
git clone https://github.com/RSbleedblue/Cluster-Management.git
cd backend
```

### 2. Environment Variables

Create a `.env` file in the root directory of the backend with the following environment variables:

```env
TZ=UTC
PORT=3333
HOST=localhost
LOG_LEVEL=info
APP_KEY=fOj8oh3TGHtHd-Vc5VdDHUmlM-52D9DN
NODE_ENV=development
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourPassword
DB_DATABASE=cluster_management
```

### 3. Database Setup

Ensure that MySQL is running locally or remotely. Then follow these steps to set up the database:

- **Login to MySQL:**

```bash
mysql -u root -p
```

- **Create a new database:**

```sql
CREATE DATABASE cluster_management;
```

- **Migrate the database schema:**

Your backend includes migration scripts to create the necessary tables for storing cluster metrics. Run the following command to execute the migrations and set up your database schema:

```bash
node ace migration:run
```

This will create the necessary tables in your MySQL database for storing cluster metrics.

### 4. Running the Backend

Once the environment variables and database are set up, install dependencies and run the backend server:

```bash
npm install
npm run dev
```

The backend server should now be running on `http://localhost:3333`.

---

## Frontend Setup

### 1. Clone the Repository

Now, clone the frontend repository:

```bash
git clone https://github.com/RSBleedBlue/cluster-management.git
cd frontend
```

### 2. Installing Dependencies

To install the necessary dependencies, run:

```bash
npm install
```
Make sure you are running Node 18.0.0 +

### 3. Running the Frontend

To start the frontend development server, use the following command:

```bash
npm start
```

The frontend will be available at `http://localhost:3000` by default.

---

## Application Flow

1. **Frontend (React)**:
    - Displays performance metrics (IOPS) in a chart.
    - Fetches data from the backend using REST API calls.
    - Allows users to select time ranges (last 7 days ) to view metrics.

2. **Backend (Node.js/Express)**:
    - Provides APIs to retrieve cluster performance metrics from a MySQL database.
    - The environment variables set up earlier configure the database connection.

---

## Features

- **Frontend**:
  - Responsive UI with charts for Read/Write IOPS.
  - Dynamic time range selection for metrics.

- **Backend**:
  - RESTful API to provide cluster metrics.
  - MySQL database integration for storing and retrieving data.

---

## License

This project is licensed under the MIT License.

---

## Notes

- Ensure your MySQL server is running and properly configured before running the backend.
- You can adjust the environment variables based on your deployment environment (e.g., production vs development).
