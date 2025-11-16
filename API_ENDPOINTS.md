# PG_WASTE Backend — Endpoints: Requests & Responses

This document lists each public HTTP endpoint in the backend with example requests, example responses and a short "how it works" note. Use JSON for bodies and responses. Replace placeholders like {id}, {token}, and sample values with real data.

---

## Auth

### POST /auth/login
- Auth: none
- Request
  - Headers: Content-Type: application/json
  - Body:
    ```json
    { "email": "user@example.com", "password": "P@ssw0rd" }
    ```
- Success Response (200)
  ```json
  {
    "user": {
      "userId": 1,
      "email": "user@example.com",
      "accessToken": "eyJhbGciOi...",
      "refreshToken": "rfrsh_eyJ..."
    }
  }
  ```
- Errors:
  - 400 invalid credentials
  - 422 validation error
- How it works: Local strategy validates credentials, AuthService generates JWT access + refresh tokens and returns them.

### POST /auth/signup
- Auth: none
- Request
  - Headers: Content-Type: application/json
  - Body (example CreateUserDto):
    ```json
    {
      "name": "New User",
      "email": "new@example.com",
      "password": "P@ssw0rd",
      "role": "USER"
    }
    ```
- Success Response (201)
  ```json
  {
    "user": {
      "userId": 2,
      "email": "new@example.com",
      "accessToken": "eyJhbGciOi...",
      "refreshToken": "rfrsh_eyJ..."
    }
  }
  ```
- Errors:
  - 409 email exists
  - 422 validation error
- How it works: Creates user, hashes password, saves refresh token, optionally sends welcome email.

### POST /auth/refresh
- Auth: refresh token required (sent via header or body depending on implementation)
- Request
  - Headers: Authorization: Bearer {refreshToken}
  - Body: (if configured to accept body)
    ```json
    { "refreshToken": "rfrsh_eyJ..." }
    ```
- Success Response (200)
  ```json
  {
    "userId": 1,
    "accessToken": "newAccessToken...",
    "refreshToken": "newRefreshToken..."
  }
  ```
- Errors:
  - 401 invalid/expired refresh token
- How it works: Guard validates refresh token, AuthService issues new tokens.

---

## User

All user endpoints that require authentication: include header Authorization: Bearer {accessToken}

### GET /user
- Auth: yes (JWT)
- Request
  - Headers: Authorization: Bearer {accessToken}
- Success Response (200)
  ```json
  [
    { "uId": 1, "email": "a@b.com", "name": "Admin", "role": "MANAGER" },
    { "uId": 2, "email": "u@b.com", "name": "User", "role": "USER" }
  ]
  ```
- Errors: 401 unauthorized
- How it works: UserService.findAll returns users (may exclude sensitive fields).

### GET /user/:id
- Auth: yes
- Request: GET /user/1
- Success Response (200)
  ```json
  { "uId": 1, "email": "a@b.com", "name": "Admin", "role": "MANAGER" }
  ```
- Errors: 404 not found, 401 unauthorized
- How it works: Finds user by id.

### PATCH /user/:id
- Auth: yes (roles may apply)
- Request
  - Headers: Authorization: Bearer {accessToken}, Content-Type: application/json
  - Body (UpdateUserDto example):
    ```json
    { "name": "Updated Name", "role": "MANAGER" }
    ```
- Success Response (200)
  ```json
  { "message": "User updated", "user": { "uId": 1, "name": "Updated Name" } }
  ```
- Errors: 400 validation, 403 forbidden
- How it works: Partial update via UserService.update.

### DELETE /user/:id
- Auth: yes (often admin)
- Request: DELETE /user/3
- Success Response (200)
  ```json
  { "message": "User removed" }
  ```
- Errors: 403 forbidden, 404 not found
- How it works: RolesGuard + JwtGuard protect route; UserService.remove deletes user.

---

## Meterials (note: spelled "meterials" in routes)

### POST /meterials/create
- Auth: yes
- Request
  - Headers: Authorization: Bearer {accessToken}, Content-Type: application/json
  - Body (CreateMeterialDto):
    ```json
    {
      "name": "Cowhide A",
      "availableArea": 20.5,
      "unit": "m2",
      "costPerUnit": 50.0,
      "leatherBatchId": 1
    }
    ```
- Success Response (201)
  ```json
  {
    "id": 10,
    "name": "Cowhide A",
    "availableArea": 20.5,
    "unit": "m2",
    "costPerUnit": 50.0,
    "leatherBatch": { "id": 1, "batchNumber": "B-001" },
    "createdBy": { "uId": 1, "email": "..." }
  }
  ```
- Errors: 400 validation, 401 unauthorized
- How it works: Saves material entity, links to leather batch and user.

### GET /meterials
- Auth: optional or yes depending on implementation
- Request: GET /meterials?sort=asc
- Success Response (200)
  ```json
  [
    { "id": 10, "name": "Cowhide A", "availableArea": 20.5 },
    { "id": 11, "name": "Cowhide B", "availableArea": 15.0 }
  ]
  ```
- How it works: Returns materials, supports sort/pagination.

### GET /meterials/:id
- Auth: optional or yes
- Request: GET /meterials/10
- Success Response (200)
  ```json
  { "id": 10, "name": "Cowhide A", "availableArea": 20.5, "costPerUnit": 50.0 }
  ```

### PATCH /meterials/:id
- Auth: yes
- Request body (partial):
  ```json
  { "availableArea": 18.5 }
  ```
- Success Response (200)
  ```json
  { "message": "Meterial updated", "meterial": { "id": 10, "availableArea": 18.5 } }
  ```
- How it works: Updates fields; updateMeterialsData helper adjusts available area when products are created.

### DELETE /meterials/:id
- Auth: yes
- Success Response (200)
  ```json
  { "message": "Meterial removed" }
  ```

---

## Other Meterial

### POST /other-meterial
- Auth: yes
- Request
  - Body (CreateOtherMeterialDto):
    ```json
    {
      "name": "Glue",
      "quantity": 10,
      "totalCost": 500.0,
      "typeId": 2
    }
    ```
- Success Response (201)
  ```json
  {
    "id": 5,
    "name": "Glue",
    "quantity": 10,
    "unitCost": 50.0,
    "type": { "id": 2, "name": "Adhesive" }
  }
  ```
- How it works: unit_cost = totalCost / quantity; links to TypesOtherMeterial.

### GET /other-meterial
- Success Response (200)
  ```json
  [{ "id": 5, "name": "Glue", "unitCost": 50.0 }]
  ```

### GET /other-meterial/:id, PATCH, DELETE
- Similar patterns to materials: retrieve, update or delete.

---

## Leather Batch

### POST /leather-batch
- Auth: yes
- Request
  - Body (CreateLeatherBatchDto):
    ```json
    {
      "batchNumber": "B-010",
      "receivedDate": "2025-11-01",
      "meterialIds": [10,11]
    }
    ```
- Success Response (201)
  ```json
  {
    "id": 1,
    "batchNumber": "B-010",
    "meterials": [{ "id": 10 }, { "id": 11 }]
  }
  ```
- How it works: Creates batch and attaches referenced materials.

### GET /leather-batch, GET /leather-batch/:id, PATCH, DELETE
- Standard CRUD responses. findAll typically includes linked materials.

---

## Product (Plan)

### POST /product
- Auth: yes
- Request
  - Body (CreateProductDto)
    ```json
    {
      "name": "Shoe Model X",
      "meterials": [
        { "meterialId": 10, "areaRequired": 1.5 }
      ],
      "otherMeterials": [
        { "otherMeterialId": 5, "quantity": 1 }
      ],
      "price": 250.0
    }
    ```
- Success Response (201)
  ```json
  {
    "id": 3,
    "name": "Shoe Model X",
    "meterialCost": 75.0,
    "otherMeterialCost": 50.0,
    "totalCost": 125.0
  }
  ```
- How it works: ProductService computes material cost by multiplying required area with material costPerUnit, sums other materials, saves plan.

### GET /product, GET /product/:id, PATCH, DELETE
- Standard CRUD responses; GET/:id returns plan with breakdown.

---

## Created Products

### POST /created-products
- Auth: yes
- Request
  - Body (CreateCreatedProductDto)
    ```json
    {
      "productId": 3,
      "quantity": 10,
      "producedById": 1,
      "notes": "Batch run A"
    }
    ```
- Success Response (201)
  ```json
  {
    "id": 7,
    "productId": 3,
    "quantity": 10,
    "totalAreaUsed": 15.0,
    "totalCost": 1250.0,
    "createdAt": "2025-11-16T08:00:00Z"
  }
  ```
- Errors:
  - 400 insufficient material area
- How it works: Service loads product plan, computes total material area & cost for quantity, updates each meterial.availableArea (MeterialsService.updateMeterialsData), persists created product record.

### GET /created-products, GET /created-products/:id, PATCH, DELETE
- Standard CRUD; GET returns created runs with links to product and user.

---

## Mail

### POST /mail/send
- Auth: yes (for internal testing)
- Request
  - Body:
    ```json
    { "to": "user@example.com", "subject": "Welcome", "templateData": { "name": "User" } }
    ```
- Success Response (200)
  ```json
  { "message": "Email sent" }
  ```
- How it works: MailService loads welcome.html template, renders data, and sends via configured mailer.

---

## Common HTTP Errors (summary)
- 200 OK: success (GET/PATCH/DELETE)
- 201 Created: resource created (POST)
- 400 Bad Request: validation or missing data
- 401 Unauthorized: missing/invalid JWT
- 403 Forbidden: insufficient role/permission
- 404 Not Found: resource not present
- 409 Conflict: duplicate resource (e.g., sign-up email)
- 422 Unprocessable Entity: DTO validation errors

---

Notes
- Replace route names and DTO fields with exact project DTOs if they differ.
- All protected endpoints expect Authorization: Bearer {accessToken}.
- For any endpoint that manipulates material area (created-products), expect atomic DB updates and validation to avoid negative availableArea.

If you want, I can:
- Generate an OpenAPI (Swagger) YAML for these endpoints.
- Expand any endpoint with full DTO field definitions pulled from the code.
```// filepath: c:\Users\dmaxx\Desktop\SE\PG_WASTE\pgbackend\API_ENDPOINTS.md
# PG_WASTE Backend — Endpoints: Requests & Responses

This document lists each public HTTP endpoint in the backend with example requests, example responses and a short "how it works" note. Use JSON for bodies and responses. Replace placeholders like {id}, {token}, and sample values with real data.

---

## Auth

### POST /auth/login
- Auth: none
- Request
  - Headers: Content-Type: application/json
  - Body:
    ```json
    { "email": "user@example.com", "password": "P@ssw0rd" }
    ```
- Success Response (200)
  ```json
  {
    "user": {
      "userId": 1,
      "email": "user@example.com",
      "accessToken": "eyJhbGciOi...",
      "refreshToken": "rfrsh_eyJ..."
    }
  }
  ```
- Errors:
  - 400 invalid credentials
  - 422 validation error
- How it works: Local strategy validates credentials, AuthService generates JWT access + refresh tokens and returns them.

### POST /auth/signup
- Auth: none
- Request
  - Headers: Content-Type: application/json
  - Body (example CreateUserDto):
    ```json
    {
      "name": "New User",
      "email": "new@example.com",
      "password": "P@ssw0rd",
      "role": "USER"
    }
    ```
- Success Response (201)
  ```json
  {
    "user": {
      "userId": 2,
      "email": "new@example.com",
      "accessToken": "eyJhbGciOi...",
      "refreshToken": "rfrsh_eyJ..."
    }
  }
  ```
- Errors:
  - 409 email exists
  - 422 validation error
- How it works: Creates user, hashes password, saves refresh token, optionally sends welcome email.

### POST /auth/refresh
- Auth: refresh token required (sent via header or body depending on implementation)
- Request
  - Headers: Authorization: Bearer {refreshToken}
  - Body: (if configured to accept body)
    ```json
    { "refreshToken": "rfrsh_eyJ..." }
    ```
- Success Response (200)
  ```json
  {
    "userId": 1,
    "accessToken": "newAccessToken...",
    "refreshToken": "newRefreshToken..."
  }
  ```
- Errors:
  - 401 invalid/expired refresh token
- How it works: Guard validates refresh token, AuthService issues new tokens.

---

## User

All user endpoints that require authentication: include header Authorization: Bearer {accessToken}

### GET /user
- Auth: yes (JWT)
- Request
  - Headers: Authorization: Bearer {accessToken}
- Success Response (200)
  ```json
  [
    { "uId": 1, "email": "a@b.com", "name": "Admin", "role": "MANAGER" },
    { "uId": 2, "email": "u@b.com", "name": "User", "role": "USER" }
  ]
  ```
- Errors: 401 unauthorized
- How it works: UserService.findAll returns users (may exclude sensitive fields).

### GET /user/:id
- Auth: yes
- Request: GET /user/1
- Success Response (200)
  ```json
  { "uId": 1, "email": "a@b.com", "name": "Admin", "role": "MANAGER" }
  ```
- Errors: 404 not found, 401 unauthorized
- How it works: Finds user by id.

### PATCH /user/:id
- Auth: yes (roles may apply)
- Request
  - Headers: Authorization: Bearer {accessToken}, Content-Type: application/json
  - Body (UpdateUserDto example):
    ```json
    { "name": "Updated Name", "role": "MANAGER" }
    ```
- Success Response (200)
  ```json
  { "message": "User updated", "user": { "uId": 1, "name": "Updated Name" } }
  ```
- Errors: 400 validation, 403 forbidden
- How it works: Partial update via UserService.update.

### DELETE /user/:id
- Auth: yes (often admin)
- Request: DELETE /user/3
- Success Response (200)
  ```json
  { "message": "User removed" }
  ```
- Errors: 403 forbidden, 404 not found
- How it works: RolesGuard + JwtGuard protect route; UserService.remove deletes user.

---

## Meterials (note: spelled "meterials" in routes)

### POST /meterials/create
- Auth: yes
- Request
  - Headers: Authorization: Bearer {accessToken}, Content-Type: application/json
  - Body (CreateMeterialDto):
    ```json
    {
      "name": "Cowhide A",
      "availableArea": 20.5,
      "unit": "m2",
      "costPerUnit": 50.0,
      "leatherBatchId": 1
    }
    ```
- Success Response (201)
  ```json
  {
    "id": 10,
    "name": "Cowhide A",
    "availableArea": 20.5,
    "unit": "m2",
    "costPerUnit": 50.0,
    "leatherBatch": { "id": 1, "batchNumber": "B-001" },
    "createdBy": { "uId": 1, "email": "..." }
  }
  ```
- Errors: 400 validation, 401 unauthorized
- How it works: Saves material entity, links to leather batch and user.

### GET /meterials
- Auth: optional or yes depending on implementation
- Request: GET /meterials?sort=asc
- Success Response (200)
  ```json
  [
    { "id": 10, "name": "Cowhide A", "availableArea": 20.5 },
    { "id": 11, "name": "Cowhide B", "availableArea": 15.0 }
  ]
  ```
- How it works: Returns materials, supports sort/pagination.

### GET /meterials/:id
- Auth: optional or yes
- Request: GET /meterials/10
- Success Response (200)
  ```json
  { "id": 10, "name": "Cowhide A", "availableArea": 20.5, "costPerUnit": 50.0 }
  ```

### PATCH /meterials/:id
- Auth: yes
- Request body (partial):
  ```json
  { "availableArea": 18.5 }
  ```
- Success Response (200)
  ```json
  { "message": "Meterial updated", "meterial": { "id": 10, "availableArea": 18.5 } }
  ```
- How it works: Updates fields; updateMeterialsData helper adjusts available area when products are created.

### DELETE /meterials/:id
- Auth: yes
- Success Response (200)
  ```json
  { "message": "Meterial removed" }
  ```

---

## Other Meterial

### POST /other-meterial
- Auth: yes
- Request
  - Body (CreateOtherMeterialDto):
    ```json
    {
      "name": "Glue",
      "quantity": 10,
      "totalCost": 500.0,
      "typeId": 2
    }
    ```
- Success Response (201)
  ```json
  {
    "id": 5,
    "name": "Glue",
    "quantity": 10,
    "unitCost": 50.0,
    "type": { "id": 2, "name": "Adhesive" }
  }
  ```
- How it works: unit_cost = totalCost / quantity; links to TypesOtherMeterial.

### GET /other-meterial
- Success Response (200)
  ```json
  [{ "id": 5, "name": "Glue", "unitCost": 50.0 }]
  ```

### GET /other-meterial/:id, PATCH, DELETE
- Similar patterns to materials: retrieve, update or delete.

---

## Leather Batch

### POST /leather-batch
- Auth: yes
- Request
  - Body (CreateLeatherBatchDto):
    ```json
    {
      "batchNumber": "B-010",
      "receivedDate": "2025-11-01",
      "meterialIds": [10,11]
    }
    ```
- Success Response (201)
  ```json
  {
    "id": 1,
    "batchNumber": "B-010",
    "meterials": [{ "id": 10 }, { "id": 11 }]
  }
  ```
- How it works: Creates batch and attaches referenced materials.

### GET /leather-batch, GET /leather-batch/:id, PATCH, DELETE
- Standard CRUD responses. findAll typically includes linked materials.

---

## Product (Plan)

### POST /product
- Auth: yes
- Request
  - Body (CreateProductDto)
    ```json
    {
      "name": "Shoe Model X",
      "meterials": [
        { "meterialId": 10, "areaRequired": 1.5 }
      ],
      "otherMeterials": [
        { "otherMeterialId": 5, "quantity": 1 }
      ],
      "price": 250.0
    }
    ```
- Success Response (201)
  ```json
  {
    "id": 3,
    "name": "Shoe Model X",
    "meterialCost": 75.0,
    "otherMeterialCost": 50.0,
    "totalCost": 125.0
  }
  ```
- How it works: ProductService computes material cost by multiplying required area with material costPerUnit, sums other materials, saves plan.

### GET /product, GET /product/:id, PATCH, DELETE
- Standard CRUD responses; GET/:id returns plan with breakdown.

---

## Created Products

### POST /created-products
- Auth: yes
- Request
  - Body (CreateCreatedProductDto)
    ```json
    {
      "productId": 3,
      "quantity": 10,
      "producedById": 1,
      "notes": "Batch run A"
    }
    ```
- Success Response (201)
  ```json
  {
    "id": 7,
    "productId": 3,
    "quantity": 10,
    "totalAreaUsed": 15.0,
    "totalCost": 1250.0,
    "createdAt": "2025-11-16T08:00:00Z"
  }
  ```
- Errors:
  - 400 insufficient material area
- How it works: Service loads product plan, computes total material area & cost for quantity, updates each meterial.availableArea (MeterialsService.updateMeterialsData), persists created product record.

### GET /created-products, GET /created-products/:id, PATCH, DELETE
- Standard CRUD; GET returns created runs with links to product and user.

---

## Mail

### POST /mail/send
- Auth: yes (for internal testing)
- Request
  - Body:
    ```json
    { "to": "user@example.com", "subject": "Welcome", "templateData": { "name": "User" } }
    ```
- Success Response (200)
  ```json
  { "message": "Email sent" }
  ```
- How it works: MailService