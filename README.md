# Build a Storefront Backend

## Overview

API a shopping application that provides a database support for web store application and covers all the data requirements for mapping of endpoints to expose for the frontend with a connection to a Postgres database from the provided Node application.

## project description

This project focuses on how to build an API that support a frontend store web app with the needed information within a database tables and columns connection through node.js with models that facilitate CRUD operations on these database tables.Testing is done for each model in Jasmine.
and all API endpoints. where in the handler file, RESTful endpoints for each model method are created with express.

## Project requirements

- Node.js
- Typescript
- Unit Test with Jasmine
- express
- cors
- body-parser
- bcrypt
- dotenv
- supertest
- pg postgres database on node.js
- db-migrate
- jsonwebtoken
- tsc-watch
- eslint
- prettier

## project packages installation

    - initialize project
    - install typescript and its type-definitions
    - install tsc-watch
    - install express and its types-definitions
    - Install Prettier
    - Install Eslint
    - Eslint + Prettier Integration
    - Install dotenv and configure environment variables
    - install cors
    - install body-parser
    - install pg and db-migrate for making required migrations
    - install bcrypt
    - install jsonwebtoken and its type-definitions
    - Install Jasmine and jasmine-spec-reporter
    - install supertest for testing the endpoints
    - Set up project structure
    - Configure middleware and dependencies
    - Create the API endpoints
    - Write tests
    - test, Debug, and Refactor

## A Storefront Backend project structure

project directory

- dist
- migrations
- node_modules
- spec
  - support
    - jasmine.json
- src
  - handlers
    - tests
      - dashboard_Spec.ts
      - orders_Spec.ts
      - products_Spec.ts
      - users_Spec.ts
    - dashboard.ts
    - orders.ts
    - products.ts
    - users.ts
  - helpers
    - reporter.ts
  - middleware
    - tests
      - verifyAuthToken_Spec.ts
    - verifyAuthToken.ts
  - models
    - tests
      - orders_Spec.ts
      - products_Spec.ts
      - users_Spec.ts
    - orders.ts
    - products.ts
    - users.ts
  - Services
    - dashboard.ts
  - tests
    - server_Spec.ts
  - database.ts
  - server.ts
- .env
- .eslintrc.js
- .gitignore
- prettierrc.json
- database.json
- package.json
- README.md
- requirement.md
- tsconfig.json

## project main jobs

- node js and express environment.
- express framework to build a server to run app locally.
- using express to make RESTfull routes to support frontend side.
- use middleware for different uses such as validation or to check requests or to do some logic between request form user and response form the server.
- using typescript to add a type definition to javascript code to develop and build errors free and strong code rather than week typed javascript code
- using jasmine framework to performed a unit tests to build an errors free and consistence code
- using dotenv library to build the api dev or test environment
- using cors secure our api from un secure and non trusted requests
- using cors secure our api from un secure and non trusted requests
- using body-parser
- using bcrypt library to encrypt the users passwords before storing it the database
- using pg to connect the database to perform CRUD operations with models that represent the database tables and write sql instructions that performed on database through pg.
- using express to build RESTfull routes that support client side and facilitate reaching endpoint through express routes
- using jasmine to implement unit testing for models methods and models handlers
- using tsc-watch with dev operations
- use prettier and eslint for formatting the code

## Environment variables

    adding environment variables which must be hide from outside for security reasons
    these variable include the databases names, port, host, user password, server port, pepper, salts_rounds and finally token secret for jwt tokens

## POSTGRES DATABASE NAMES

    - shopping database
    - shopping_test database

### DATABASE TABLES

#### Users table

    TABLE users (
        id: VARCHAR,
        username: VARCHAR,
        first_name: VARCHAR,
        last_name: VARCHAR,
        password_digest VARCHAR
        )

#### Products table

    TABLE products (
        id: VARCHAR,
        name VARCHAR,
        price VARCHAR
        )

#### Orders table

    TABLE orders (
        id: VARCHAR,
        status: VARCHAR,
        user_id: integer[foreign key to users table]
        )

#### Order_products table

    TABLE order_products (
        id: VARCHAR ,
        quantity integer,
        order_id: string[foreign key to orders table],
        product_id: string[foreign key to products table]
        )

# Models to represent the database tables in node.js

## user model

### user model data types

    - id: number
    - username: string
    - first_name: string
    - last_name: string
    - password?: string

### user model methods

    - getAllUsers
    - getOneUser(id: number)
    - createUser(u: User)
    - authenticate(username: string, password: string)

## product model

### products model data types

    - id: number
    - name: string
    - price: string

### product model methods

    - getAllProducts()
    - getOneProduct(id: string)
    - createProduct(p: Product)
    - updateProduct(p: Product)
    - deleteProduct(id: string)

## order model

### orders model data types

    - id: number
    - status: string
    - user_id: number

### order model methods

    - getCompletedUserOrders(id: number)
    - getCurrentUserOrder(id: number)
    - createOrder(o: Order)
    - deleteOrder(id: number)
    - addProduct(quantity, product_id, order_id)

# Model Handler to create RESTful routes for the required endpoints.

## users handler

### users handler functions

    - index
    - show
    - create
    - authenticate

### users RESTful routes for the required endpoints.

    - app.get('/users',verifyAuthToken, index)
    - app.get('/users/:id',verifyAuthToken, show)
    - app.post('/users', verifyAuthToken, create)
    - app.post('/users/authenticate', authenticate)

## products handler

### products handler functions

    - index
    - show
    - create

### users RESTful routes for the required endpoints.

    - app.get('/products', index);
    - app.get('/products/:id', show);
    - app.post('/products',verifyAuthToken, create);

## products handler

### products handler functions

    - index
    - show
    - create
    - addproduct

### orders RESTful routes for the required endpoints.

    get completed orders for a specific user (user.id)
    - app.get('/orders/users/:id', index);

    get an order for a specific user (user.id)
    - app.get('/orders/:id', show);//ToDo verifyAuthToken

    create an order for a specific user(user.id)
    - app.post('/orders', create);

    add product to an existing order
    -app.post('/orders/:id/products', addProduct);

## Dashboard that represent a non modeled database in node.js

### dashboard methods

    - productsInOrders
    - fiveMostPopularProducts

### dashboard RESTful routes for the required endpoints.

    - app.get('/products_in_orders', productsInOrders)
    - app.get('/popular_products', fiveMostPopularProducts)

## Project EndPoints

#### Endpoint's RESTfull route and HTTP verbs

#### Product

- index route: '/products' [GET]
- Show route: '/products/:id [GET]
- Create route: '/products': [POST]

#### Users

- Index route: '/users' [GET]
- Show route: '/users/:id' [GET]
- Create route: '/users' [POST]
- Authenticate route: '/users/authenticate' [POST]

#### Orders

- Current Order by user: '/orders/:id' [GET]
- Completed Orders by user: '/orders/users/:id' [GET]
- Create order by user: '/orders' [POST]
- Add product to an order: '/orders/:id/products' [POST]

## The scripts uses

- "watch": { "tsc-watch --esModuleInterop src/server.ts --outDir ./dist --onSuccess \"node ./dist/server.js\""}

- "test": {"tsc && set ENV=test&& db-migrate --env test up&& jasmine && db-migrate db:drop test"}

- "format": {"prettier --write src/\*_/_.ts"}

- "lint": {"eslint src/\*_/_.ts"}

- "lint:fix": {"eslint src/\*_/_.ts --fix"}

# main project functionalities

## creating database with postgres database with postgres user

    shopping
    shopping_test

## setup environment variables with dotenv library

    import dotenv from 'dotenv';

    dotenv.config();

    const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB,
    } = process.env;

## connect to database through node.js postgres library 'pg' with Pool method

    import { Pool } from 'pg'

    an instance of Pool method to use to connect database

    const Client = new Pool({
    POSTGRES_HOST,
    POSTGRES_DB: POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD
    });

## implement of database migrations to create the database tables by db-migrate library

    run : to create the database tables files
        - db-migrate create users-table --sql-file
        - db-migrate create products-table --sql-file
        - db-migrate create order-products-table --sql-file
    then: in the migrations folder and in each table file up we add a sql query that create the table like this:

        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(100),
            first_name VARCHAR(100),
            last_name VARCHAR(100),
            password_digest VARCHAR(255)
            );

        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            price VARCHAR(100) NOT NULL
            );

        CREATE TABLE orders (
            id SERIAL PRIMARY KEY,
            status VARCHAR(100),
            user_id bigint REFERENCES users(id)
            );
    then run:
        db-migrate up

## create the models that represent the database tables in node.js

    - adding model types
    - adding the model class that contain the the required methods that contain the sql queries
    and connect to the database to implement these queries
    - these queries includes the CRUD actions

## create the models handlers to build a RESfull routes for each endpoint

    - add a handler function to create express routes with each CRUD method
    - add endpoints for each CRUD action to rest HTTP requests

## implement passwords encryption by bcrypt library

    import bcrypt from 'bcrypt'

    const hash = bcrypt.hashSync(
        `${user.password}${pepper}`,
        parseInt(`${saltRounds}`)
      );

    where:
    pepper and saltRounds constants added to the .env file for the security

### implement Authentication of users

        bcrypt.compareSync(`${password}${pepper}`, user.password_digest)

## implement Authorization to users by josnwebtoken library with the verifyAuthToken method

        import jwt from 'jsonwebtoken';

        jwt.verify(token, process.env.TOKEN_SECRET as string);

        where token also add to the .env file

## adding Database relationships to implement another actions that are not provided by CRUD actions :

    - create endpoints for the many to many relationship to give the API cart functionality with the helpful of:
        - SQL commands for sorting data
        - SQL Joins
        - RESTful endpoints using with joins

## implement unit testing for each model method

    - define which database is used to perform tests in database.json file:
    - add test script:
    - "test": {"tsc && set ENV=test&& db-migrate --env test up&& jasmine && db-migrate db:drop test"}
    - check the method is existing
    - check the action of the method on the database which is an integration test

## implement unit testing for each endpoint

    testing RESTfull endpoint
