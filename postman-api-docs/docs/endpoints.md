# API Endpoints Documentation

## Overview
This document provides a comprehensive list of the API endpoints available in the backend API, including their methods, parameters, and expected responses.

## Endpoints

### 1. User Registration
- **Endpoint:** `/api/register`
- **Method:** `POST`
- **Description:** Registers a new user in the system.
- **Request Body:**
  - `username` (string, required): The desired username for the new user.
  - `password` (string, required): The password for the new user.
  - `email` (string, required): The email address of the new user.
- **Response:**
  - **201 Created**
    - Body: 
      ```json
      {
        "message": "User registered successfully.",
        "userId": "string"
      }
      ```
  - **400 Bad Request**
    - Body: 
      ```json
      {
        "error": "User already exists."
      }
      ```

### 2. User Login
- **Endpoint:** `/api/login`
- **Method:** `POST`
- **Description:** Authenticates a user and returns a token.
- **Request Body:**
  - `username` (string, required): The username of the user.
  - `password` (string, required): The password of the user.
- **Response:**
  - **200 OK**
    - Body: 
      ```json
      {
        "token": "string"
      }
      ```
  - **401 Unauthorized**
    - Body: 
      ```json
      {
        "error": "Invalid credentials."
      }
      ```

### 3. Get User Profile
- **Endpoint:** `/api/user/profile`
- **Method:** `GET`
- **Description:** Retrieves the profile information of the authenticated user.
- **Headers:**
  - `Authorization` (string, required): Bearer token obtained from login.
- **Response:**
  - **200 OK**
    - Body: 
      ```json
      {
        "username": "string",
        "email": "string",
        "createdAt": "string"
      }
      ```
  - **401 Unauthorized**
    - Body: 
      ```json
      {
        "error": "Unauthorized access."
      }
      ```

### 4. Update User Profile
- **Endpoint:** `/api/user/profile`
- **Method:** `PUT`
- **Description:** Updates the profile information of the authenticated user.
- **Headers:**
  - `Authorization` (string, required): Bearer token obtained from login.
- **Request Body:**
  - `email` (string, optional): The new email address of the user.
  - `password` (string, optional): The new password for the user.
- **Response:**
  - **200 OK**
    - Body: 
      ```json
      {
        "message": "Profile updated successfully."
      }
      ```
  - **400 Bad Request**
    - Body: 
      ```json
      {
        "error": "Invalid input."
      }
      ```

### 5. Delete User Account
- **Endpoint:** `/api/user/delete`
- **Method:** `DELETE`
- **Description:** Deletes the account of the authenticated user.
- **Headers:**
  - `Authorization` (string, required): Bearer token obtained from login.
- **Response:**
  - **204 No Content**
  - **401 Unauthorized**
    - Body: 
      ```json
      {
        "error": "Unauthorized access."
      }
      ```

## Conclusion
This document serves as a guide for developers to understand and utilize the backend API effectively. For further details, refer to the authentication and overview documents.