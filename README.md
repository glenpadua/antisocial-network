# antisocial-network
A social network where people can vent and only vent about whatever they like or rather dislike.

## Requirements
* [MongoDB](https://docs.mongodb.org/v3.0/installation/)
* [NodeJS](https://nodejs.org/en/download/)

## Steps
1. Install [MongoDB](https://docs.mongodb.org/v3.0/installation/) for your platform.
2. Install [NodeJS](https://nodejs.org/en/download/) for your platform.
3. Install nodemon which will automatically restart the server when there are code changes

   `npm install -g nodemon`

4. In the project root run `npm install` to install all the node dependencies found in the package.json file.
5. Run `seed` in the project root to seed the database.
6. To start the server use `nodemon server.js`.
7. Now navigate to the application by entering `http:\\localhost:8080` in your browser.
8. Create a new user by clicking Register and login with that user.

Note: Commenting on a seeded post will not work as the comments and posts are not mapped. Create a new post and comment/like
to test the functionality. 

### Work in Progress
1. Like/Unlike and Comment in the Timeline, Profile views (Works for Individual Post View.)
2. Caching issues (Lingering user details that go away only after page refresh.)

P.S. This is just a hobby learning project using the MEAN Stack.
