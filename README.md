# To-do list API
This is a practice project I developed using Node.js, Express, and MongoDB. It serves as a simple to-do list API that allows users to create, read, update, and delete tasks. This API does not come with the user interface since it is not the part of my interests. The API has been tested using POSTMAN and the results are contained in the 'tests' directory.


### Features
- Authentication: User registration and login with JWT-based authentication.
- CRUD Operations: Create, read, update, and delete tasks.
- Password Hashing: Passwords are hashed and securely stored using Bcrypt.

### Tech stack
- Node.js for the runtime environment
- Express for building the REST API
- MongoDB with Mongoose for the database
- JWT (JSON Web Tokens) for authentication
- Bcrypt for password hashing

### Installation
1. Clone the repo:
```console
git clone https://github.com/SamardzicLuka/rest_todo_api
cd rest_todo_api
```
2. Install dependencies:
```console
npm install
```
3. Set up environment variables. Create a `.env` file in the root directory and format it in the following way:
```.env
PORT=<number_of_your_port>
SECRET_KEY=<secret_key_for_jwt>
```
4. Start the application
```console
npm start
```
 
