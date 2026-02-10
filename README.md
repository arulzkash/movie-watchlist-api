# 🎬 Movie Watchlist API

A robust Backend API for a movie watchlist application. This project allows users to authenticate, browse a movie database, and manage their personal watchlist (add, update status/rating, and remove movies).

Built with **Node.js**, **Express**, and **PostgreSQL** (hosted on **Neon**), featuring strict validation using **Zod** and secure authentication with **JWT**..

> **Note:** This project utilizes **Neon (Serverless Postgres)** for the database and **Prisma ORM** for type-safe database interactions.

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js (ES Modules)
* **Database:** PostgreSQL (hosted on Neon)
* **ORM:** Prisma
* **Validation:** Zod
* **Authentication:** JWT (JSON Web Token) & bcryptjs
* **Utilities:** Dotenv, Nodemon

## ✨ Key Features

* **🔐 User Authentication:** Secure Register, Login (httpOnly Cookie + Header support), and Logout.
* **📝 Watchlist Management:** Users can add movies to their watchlist, update rating/status/notes, and delete items.
* **🛡️ Request Validation:** All incoming requests are validated using Zod schemas to ensure data integrity.
* **🗄️ Database Seeding:** Script included to populate the database with initial movie data.
* **🔒 Ownership Checks:** Middleware ensures users can only modify their own watchlist items.

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

* Node.js (v18+ recommended)
* npm or yarn
* A PostgreSQL database URL (Local or Neon/Supabase)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/arulzkash/movie-watchlist-api.git
    cd movie-watchlist-api
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory. Copy your connection string from the Neon Dashboard:

    ```env
    # Database Connection (Neon / Prisma)
    # Ensure '?sslmode=require' is present for Neon connections
    DATABASE_URL="postgresql://user:password@ep-hostname-pooler.region.aws.neon.tech/neondb?sslmode=require"

    # JWT Configuration
    JWT_SECRET="your_super_secret_key_change_this"
    JWT_EXPIRES_IN="7d"

    # Server Configuration
    NODE_ENV="development"
    ```

4.  **Database Migration & Generation**
    Push the Prisma schema to your database:
    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Seed Database**
    Populate the `Movie` table with initial data:
    ```bash
    npm run seed:movies
    ```

6.  **Start the Server**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:5001`.

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/auth/register` | Register a new user | ❌ |
| `POST` | `/auth/login` | Login and receive JWT (Cookie/Header) | ❌ |
| `POST` | `/auth/logout` | Logout and clear auth cookie | ✅ |

### Watchlist
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/watchlist` | Add a movie to user's watchlist | ✅ |
| `PUT` | `/watchlist/:id` | Update watchlist item (rating, notes, status) | ✅ |
| `DELETE` | `/watchlist/:id` | Remove a movie from watchlist | ✅ |


## 🗄️ Database Schema

The database consists of three main models managed by Prisma:

1.  **User**: Stores authentication details (`name`, `email`, `password`).
2.  **Movie**: Stores static movie data (`title`, `overview`, `releaseYear`, `genres`, etc.).
3.  **WatchlistItem**: The pivot table linking Users and Movies.
    * Contains user-specific data: `status` (e.g., watched, plan_to_watch), `rating`, and `notes`.
    * **Constraint:** Unique compound key on `[userId, movieId]` to prevent duplicate entries.

## 📂 Project Structure

```text
├── src/
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Auth & Error handling
│   ├── routes/           # API Route definitions
│   ├── utils/            # Helper functions (Validators, etc.)
│   └── server.js         # App entry point
├── prisma/
│   ├── schema.prisma     # Database modeling
│   └── seed.js           # Seeding script
├── .env                  # Environment variables
└── package.json