# WeLoveMovies Backend Application

WeLoveMovies is an application that allows users to view movie information such as theaters, reviews, and reviewer information.

For the frontend, please visit [this link.](https://github.com/Thinkful-Ed/starter-movie-front-end)

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine using `git clone https://github.com/cannonspears/welovemovies-backend.git`.
2. Navigate to the project directory using `cd welovemovies-backend`.
3. Install the required dependencies using `npm install`.
4. Start the development server using `npm run start:dev` or `npm start`.
5. Create a `.env` file and set `DATABASE_URL = ""` to your database url.
6. Run the knex migrations with `npm knex migrate:latest`
7. Seed your database with `npm run seed`

## Running Tests

This project includes a set of tests that can be run using the command line. To run the tests, use the command `npm test`.

## Project Takeaways

During the project, I gained several key takeaways, including:

- Creating and using common middleware packages
- Implementing error handlers for non-existent routes and incorrect requests
- Building an API following RESTful design principles
- Building and receiving requests through routes

## Author

This project was created by Cannon Spears in association with Thinkful.
