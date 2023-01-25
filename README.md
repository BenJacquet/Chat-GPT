# Chat-GPT Clone

Welcome to my Chat-GPT clone, a fullstack application using React for the frontend Node.js + Express for the backend API and PostgreSQL as database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Database](#database)
- [Testing](#testing)
- [Deployment](#deployment)
- [Built With](#built-with)
- [Contributing](#contributing)
- [Author](#author)

## Installation

1. Install [Docker](https://www.docker.com/) on your machine
2. Clone the repository: `git clone https://github.com/BenJacquet/Chat-GPT.git`
3. Navigate to the project directory: `cd Chat-GPT`
4. Create a .env file containing the variables for the database: 
    1. `touch .env`
    2. add these fields and modify their value as you want :
        ```
        DB_HOST = ${DB_HOST}
        DB_USER = ${DB_USER}
        DB_PASSWORD = ${DB_PASSWORD}
        DB_NAME = ${DB_NAME}
        DB_PORT = ${DB_PORT}
        ```
5. Build the Docker containers: `docker-compose build`
6. Start the application: `docker-compose up`

## Usage

Once the application is running, you can access the frontend at `http://localhost:3000` and the backend API at `http://localhost:5000`.

## Development

To start the development environment, run `docker-compose up` and then run the following command in a new terminal window:

## Deployment

WIP

## Built With
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to your branch
5. Create a new pull request

## Author
- **Benjamin Jacquet** - [BenJacquet @ GitHub](https://github.com/BenJacquet)