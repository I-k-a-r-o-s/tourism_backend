# tourism — Backend(confirmed working by testing with Postman)

## Project Overview
This backend provides the API for **tourism** frontend.  
Users can register and log in, create/edit/listings (experiences), and delete listings. The API uses JWT authentication and stores data in MongoDB.

## Tech Stack
- **Node.js** (Express) — server and routing  
- **MongoDB** (Mongoose) — data storage and models  
- **JWT** — authentication tokens  
- **dotenv** — environment configuration
- **bcryptjs** - hashing passwords
- **cookie-parser** — read auth cookies (`token`)  
- **cors** — CORS handling for frontend requests  
- **dotenv** — environment variable management  
- **nodemon** — development auto-restarts

## Setup Instructions

### Prerequisites
- Node.js (created using v22.20.0)
- npm or yarn
- MongoDB instance (local or cloud/tested with cloud)

### Install
1. **Clone the repository**

```bash
git clone <repository-url >
cd <repo folder >
```

2. **Install dependencies**

```bash
npm i
```

3. **Create .env file** in the root directory with required environment variables (see below)

4. **Start the server**

```bash
npm run dev    # Development mode (nodemon)
npm start      # Production mode
```

## Environment Variables

Create `.env` file in the root directory with the following:

```env
# CORS origin
CORS_ORIGIN=cors_origin_url

# Port configuration
PORT=port_number

# MongoDB Connection
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# Node Environment
NODE_ENV=development or production:-depending on the mode

# JWT Secret Key
JWT_SECRET=
```
## Features Implemented

**User authentication**
- **Register (creates user + sets JWT cookie)**
- **Login (returns/sets JWT)**
- **Token-based auth (cookie)**

**Listings (Experiences)**
- **Create listing (title, location, image URL, short/full descriptions, price)**
- **Read single listing by id**
- **List/search listings with cursor pagination and optional text search**
- **Update listing (owner only)**
- **delete listing (owner only)**

**Data modelling**
- **Mongoose models for User and Listing**

**Basic validation & error handling**
- **Request body checks and status codes**
- **Standardized JSON responses(success,message etc.)**
