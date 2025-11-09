# Authentication Methods for Backend API

## Overview
The backend API uses token-based authentication to secure access to its endpoints. Clients must obtain a valid token to interact with the API.

## Authentication Process

1. **User Login**
   - To obtain a token, users must log in by sending a POST request to the `/login` endpoint with their credentials.
   - **Request Body:**
     ```json
     {
       "username": "user@example.com",
       "password": "yourpassword"
     }
     ```

2. **Token Response**
   - Upon successful authentication, the server responds with a JSON object containing the access token.
   - **Response Example:**
     ```json
     {
       "token": "your_access_token_here",
       "expires_in": 3600
     }
     ```

3. **Using the Token**
   - The token must be included in the Authorization header of subsequent requests to protected endpoints.
   - **Header Format:**
     ```
     Authorization: Bearer your_access_token_here
     ```

## Token Expiration
Tokens are valid for a limited time (e.g., 1 hour). After expiration, users must log in again to obtain a new token.

## Error Handling
- If authentication fails, the API will return a 401 Unauthorized status with an appropriate error message.
- **Error Response Example:**
  ```json
  {
    "error": "Invalid credentials"
  }
  ```

## Conclusion
Ensure to handle token storage securely on the client side and refresh tokens as needed to maintain access to the API.