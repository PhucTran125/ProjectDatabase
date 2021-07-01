**ProjectDatabase**
How to run this project
1. Install npm package
2. Run: npm install --save-dev nodemon
// Nodemone:
// - Nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
// - About Nodemon: https://www.npmjs.com/package/nodemon
3. Install package: npm install namePackage
// - List of names of package needed: express, axios, bcryptjs, body-parser, cookie-parser, dotenv, ejs, express-session, mysql2
4. Create file .env then copy the below code to .env file and save:
ACCESS_TOKEN_SECRET = 5947e4e029d1e8817e09730a88f2ee217e51b5b47e1cf7dcef704bffa92a2b0e021eff6907b5809e48411217b6522659b932e8f80e47147a0c4b268ed74a42a0
REFRESH_TOKEN_SECRET = 5947e4e029d1e8817e09730a88f2ee217e51b5b47e1cf7dcef704bffa92a2b0e021eff6907b5809e48411217b6522659b932e8f80e47147a0c4b268ed74a42a0
SESS_NAME = 'semail'
SESS_SECRET = process.env.ACCESS_TOKEN_SECRET
SESS_LIFETIME = 3600000
5. Open MySql WorkBench and execute file FinalQuery to initialize database.
6. Run the project by command: npm run devStart
