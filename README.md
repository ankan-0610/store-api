# MERN Store Management API

This repository contains a MERN (MongoDB, Express, React, Node.js) stack application for managing products, stores, and orders. 
The project provides a set of HTTP APIs for creating, searching, and deleting products, stores, and orders. Additionally, it includes unit tests and integration tests to ensure the correctness of the API functionality.

## Getting Started

To get started with this project, you need to have Node.js and MongoDB installed on your machine.

1. Clone the repository
```
  git clone https://github.com/ankan-0610/store-api
  cd store-api
```

2. Install dependencies
```
  npm install
```

3. Set up environment variables:
Create a .env file in the root directory and add the following environment variables:
```
  MONGO_URI=YOUR_MONGODB_CLUSTER_CONNECTION_URI
  PORT=5000
```

4. Start the server
```
  npm start
```

The server will start on http://localhost:5000.

## Usage

You can use Postman or any other API client to interact with the API endpoints. Below is a detailed description of each endpoint and its usage.

## API Endpoints
## Product Routes

1. ### Create Product

- Endpoint: POST /api/products
- Description: Create a new product in a specified store.
- Request Body:
```json
  {
    "name": "Product1",
    "price": 10,
    "storeName": "Store1"
  }
```

2. ### Search Products

- Endpoint: GET /api/products/search
- Description: Search for products by name within a specific store.
- Request Body:
```json
  {
    "storeName": "Store1",
    "productName": "Product"
  }
```
- Example query:
```
GET /api/products/search?storeName=Store1&productName=Product
```

3. ### Delete Product

- Endpoint: DELETE /api/products/:productId
- Description: Delete a product by its ID.
- URL Parameter:
```json
{
  "productId": "60c72b2f9b1d8c1a4c8a4c8b"
}
```

## Store Routes

1. ### Create Store

- Endpoint: POST /api/stores
- Description: Create a new store.
- Request Body:
```json
{
  "name": "Store1",
  "location": "Location1"
}
```

2. ### Delete Store

- Endpoint: DELETE /api/stores/:storeId
- Description: Delete a store by its ID.
- URL Parameter:
```json
{
  "storeId": "60c72b2f9b1d8c1a4c8a4c8a"
}
```

## Order Routes

1. ### Create Order

- Endpoint: POST /api/orders
- Description: Create a new order with specified products.
- Request Body:
```json
{
  "productIds": [
    "60c72b2f9b1d8c1a4c8a4c8b",
    "60c72b2f9b1d8c1a4c8a4c8c"
  ]
}
```

2. ### Delete Order

- Endpoint: DELETE /api/orders/:orderId
- Description: Delete an order by its ID.
- URL Parameter:
```json
{
  "orderId": "60c72b2f9b1d8c1a4c8a4c8b"
}
```

## Testing
The project includes both unit tests and integration tests to ensure the correctness of the API endpoints.

## Unit Tests
Unit tests are written using Jest to test individual components and functions of the application. These tests ensure that each function behaves as expected in isolation.

To run unit tests, use the following command:
```
npm test
```

## Integration Tests
Integration tests are written to test the interaction between different components of the application, such as database operations and HTTP requests. These tests ensure that the API endpoints work correctly with the underlying data models and database.

To run integration tests, use the following command:
```
npm run test:integration
```

# Contributing
Contributions are welcome! Please follow these steps to contribute:

- Fork the repository.
- Create a new branch (git checkout -b feature/your-feature).
- Make your changes and commit them (git commit -m 'Add new feature').
- Push to the branch (git push origin feature/your-feature).
- Create a new Pull Request.
