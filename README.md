# E-commerce Back End 

## Description

This project provides a backend for an e-commerce website, utilizing the latest technologies to ensure high performance, scalability, and ease of use. Built with Express.js and Sequelize, this application interfaces with a MySQL database to provide a robust solution for internet retail businesses.

## Features

- Easy configuration through environment variables for database connection
- Sequelize ORM for efficient database operations
- Schema and seed commands for initializing and populating the database
- Restful API routes for categories, products, and tags
- Support for CRUD operations through API endpoints

## Installation

1. **Clone the repository:**
   ```bash
   git clone [git@github.com:J-Ross01/E-Commerce.git]
   cd [https://github.com/J-Ross01/E-Commerce]
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory of your project.
   - Add the following configurations:
     ```
     DB_NAME='ecommerce_db'
     DB_USER='[root]'
     DB_PASSWORD='[password123]'
     ```

## Database Setup

1. **Log into the MySQL shell:**
   ```bash
   mysql -u root -p
   ```

2. **Create the database:**
   ```sql
   CREATE DATABASE ecommerce_db;
   ```

4. **Run the schema and seed commands:**
   - To create tables:
     ```bash
     npm run migrate
     ```
   - To seed the database:
     ```bash
     npm run seed
     ```

## Usage

1. **Start the server:**
   ```bash
   npm start
   ```
   - Note there is no frontend so test the functionality of the application in Insomnia. 

3. **Testing API Routes:**
   - Use an API client like Insomnia Core to test the API route properties.
   - Ensure your server is running while testing.
   - Make sure the test package your using is "Jest"

## Contributing
Contributions to this project are welcome: https://github.com/J-Ross01/E-Commerce

## Sources
- Source used to help with creating Route properties besides Module 13 from: https://www.geeksforgeeks.org/express-js-req-route-property/
- Insomnia Core tutorial video: https://www.youtube.com/watch?v=p9AjteEwFy0

## License
LICENSE.md
