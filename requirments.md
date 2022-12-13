# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
- Show (args: product id)
- Create (args: Product)[token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]
- Show (args: id)[token required]
- Create (args: User)[token required]

#### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- # status of order (active or complete)

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


