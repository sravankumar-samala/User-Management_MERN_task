# User Management Dashboard

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Running the Application](#running-the-application)
5. [Usage](#usage)
6. [Code Structure](#code-structure)
7. [API Endpoints](#api-endpoints)
8. [Contributing](#contributing)
9. [License](#license)

## Introduction

The User Management Dashboard is a web application that allows users to manage a list of users, including creating, updating, and deleting user information. The application also features pagination and responsive design.

## Features

- Add new users
- Edit existing users
- Delete users
- View user details
- Pagination for easy navigation through users
- Responsive design for different screen sizes

## Installation

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

### Steps

1. **Clone the repository**

   ```sh
   git clone https://github.com/yourusername/user-management-dashboard.git
   cd user-management-dashboard

   ```

2. **Install dependecies**

   ```sh
   npm install

   ```

3. **Start the development server**
   ```sh
   npm start
   ```

## Running the Application

- To run the application in development mode, use:
  ```sh
  npm start
  ```
- This will start the application at `http://localhost:3000`.

- To create a production build, use:
  ```sh
  npm run build
  ```

## Usage

- **Add User**: Click on the "Add User" button and fill out the form.
- **Edit User**: Click on the pencil icon next to a user to edit their details.
- **Delete User**: Click on the trash icon next to a user to delete them.
- **Pagination**: Use the "Prev" and "Next" buttons to navigate through pages of users.

## Code Structure

### Key Files and Directories

- `src/components/Users.jsx`: Main component for displaying users and handling pagination.
- `src/components/Pagination.jsx`: Component for handling pagination controls.
- `src/components/LoadingView.jsx`: Component for displaying a loading spinner.

## API Endpoints

### GET/getAllUsers

Fetches a paginated list of users.

- \*\*Query Parameters:
  - `page`: The page number to fetch.
  - `limit`: The number of users per page.

### DELETE/deleteUsers/

Deletes a user by ID.

### PUT/updateUsers/

Updates user information by ID.

- **Body Parameters**:
  - `name`: User's name.
  - `email`: User's email.
  - `contact`: User's contact information.

### Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code is well-documented and follows the project's coding standards.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
