# GeoNation : Explore the World

Welcome to GeoNation, a web application designed for exploring and accessing country information! This project allows users to view country details, including borders, population data over time, and flags. The application is built with Next.js, TypeScript, Node.js, Express, and styled with Tailwind CSS.

## Features

- View detailed information about countries, including borders and population data.
- Responsive design that adapts to various screen sizes.
- Interactive charts to visualize population data over time.
- Easy navigation between different country pages.

## :test_tube: Technologies Used:

### Backend:

- **Node.js:** JavaScript runtime for server-side execution.
- **Express:** Web framework for building RESTful APIs.
- **TypeScript:** Core language used for interactive features.
  
### Frontend:

- **Next.js:** React framework for building server-rendered applications.
- **TypeScript:** Superset of JavaScript that adds static types for better code quality.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Chart.js (or any charting library used):** Library for creating interactive charts and graphs.

## :computer: Prerequisites

- **Node.js:** Ensure you have Node.js installed on your machine.
- **Yarn or npm:** Package managers for installing dependencies.
- **Git:** Version control system for managing source code.

## :gear: Project Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Oliveira-Renato/GeoNation.git
   
2. **Install Backend Dependencies:**

   - Navigate to the server directory:
     ```bash
     cd GeoNation/backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the root of the project with the following content (if applicable):
     ```
     # Add any environment variables here
     PORT=3001
     ```
   - Start the server locally:
     ```bash
     npm run dev
     ```

3. **Install Frontend Dependencies:**

   - Navigate to the client directory:
     ```bash
     cd GeoNation/frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env.local` file in the root of the project with the following content:
     ```bash
     NEXT_PUBLIC_API_URL=http://localhost:3001 
     ```
     
   - Start the frontend locally:
     ```bash
     npm run dev
     ```

#### Congratulations, you can now explore countries and their information locally on your computer! 🎉

