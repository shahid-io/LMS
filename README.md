# LMS Project Documentation

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Introduction

This project is a learning management system (LMS) built using Node.js and Express. It provides a RESTful API for managing users and courses, as well as a user interface for managing users and courses.

## Project Structure

The project is structured as follows:

- `src/`: Contains the source code for the LMS.
  - `config/`: Contains configuration files for the LMS.
  - `controllers/`: Contains controller files for handling HTTP requests.
  - `models/`: Contains model files for defining database schemas.
  - `repositories/`: Contains repository files for interacting with the database.
  - `routes/`: Contains route files for defining API endpoints.
    - `v1/`: Contains route files for the v1 API.
      - `UserRoutes.ts`: Handles all user-related API endpoints.
  - `services/`: Contains service files for handling business logic.
  - `utils/`: Contains utility files for common functions and middleware.
- `app.ts`, `server.ts`: The entry point of the LMS.

## Installation

To install the LMS, follow these steps:

1. Clone the repository: `git clone https://github.com/shahid-io/lms.git`
2. Navigate to the project directory: `cd lms`
3. Install dependencies: `npm install`
4. Set up the database: Create a database and update the connection details in the `src/config/databse.config.ts` file.

## Usage

To start the LMS, run the following command:

## API Endpoints

The following routes are available in the LMS:

- `/api/users`: Returns a list of all users.
- `/api/users/:id`: Returns a single user with the specified ID.
- `/api/users/:id/courses`: Returns a list of all courses associated with the user with the specified ID.
- `/api/courses`: Returns a list of all courses.
- `/api/courses/:id`: Returns a single course with the specified ID.
- `/api/courses/:id/users`: Returns a list of all users associated with the course with the specified ID.
