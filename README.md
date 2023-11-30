# Welcome to Ecommerce_server Assignment

Explore our backend project, leveraging Mongoose, TypeScript, Node.js, and Express.js for streamlined User CRUD operations. Uniquely identified by a numerical UserID and a system-wide unique username, our system prioritizes security with bcrypt-hashed passwords.

User profiles cover essential details like full name, age, email, and hobbies. Address details and multiple orders, each with product specifics, enhance the user experience. Our compact, efficient solution is perfect for user management and e-commerce, combining TypeScript's type safety with the power of Mongoose, Node.js, and Express.js. Welcome to a backend focused on security, flexibility, and efficiency in user data operations.



# 1. For Local host: 
1. At first clone the code.
2. Go to the terminal and: npm i
3. Add a .env file and give the information:
    1. NODE_ENV= development 
    2. PORT=5000
    3. DATBASE_URL=mongodb+srv://databaseName:password@************************
    4. BCRYPT_SALT_ROUND=12
4. npm run start
   
## Please follow the API instructions for the local host
## link: http://localhost:5000/
1. Endpoint: POST /api/users
2. Endpoint: GET /api/users
3. Endpoint: GET /api/users/:userId
4. Endpoint: PUT /api/users/:userId
5. Endpoint: DELETE /api/users/:userId
6. Endpoint: PUT /api/users/:userId/orders
7. Endpoint: GET /api/users/:userId/orders
8. Endpoint: GET /api/users/:userId/orders/total-price

# 2. Please follow the API instructions for live link
## Use this live link Cyclic: https://busy-tan-crab-veil.cyclic.app/
## It is alternative Vercel: https://ecommarce-assignment-2.vercel.app/
1. Endpoint: POST /api/users
2. Endpoint: GET /api/users
3. Endpoint: GET /api/users/:userId
4. Endpoint: PUT /api/users/:userId
5. Endpoint: DELETE /api/users/:userId
6. Endpoint: PUT /api/users/:userId/orders
7. Endpoint: GET /api/users/:userId/orders
8. Endpoint: GET /api/users/:userId/orders/total-price



## Thank you so much
