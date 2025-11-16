# Using Axios with PG_WASTE Backend

This file shows concise axios examples for common endpoints (login/signup/refresh + CRUD). Adjust field names/URLs to match your API.

Prerequisites:
- npm install axios
- For browser use the browser build; for Node, use axios normally.

## Setup: axios instance with auth and refresh
```js
// Create a reusable axios client and interceptor to attach access token and handle refresh
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // change if needed
  headers: { 'Content-Type': 'application/json' },
});

let accessToken = null;
let refreshToken = null;

// call after login/signup to set tokens
export function setTokens({ access, refresh }) {
  accessToken = access;
  refreshToken = refresh;
}

// attach access token
api.interceptors.request.use(config => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// response interceptor: if 401 try refresh once and retry original
let isRefreshing = false;
let refreshQueue = [];

function onRefreshed(token) {
  refreshQueue.forEach(cb => cb(token));
  refreshQueue = [];
}

api.interceptors.response.use(
  r => r,
  async err => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry && refreshToken) {
      original._retry = true;
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshQueue.push(token => {
            original.headers.Authorization = `Bearer ${token}`;
            resolve(api(original));
          });
        });
      }
      isRefreshing = true;
      try {
        const resp = await axios.post(`${api.defaults.baseURL}/auth/refresh`, {}, {
          headers: { Authorization: `Bearer ${refreshToken}` }
        });
        const newAccess = resp.data.accessToken || resp.data.access;
        const newRefresh = resp.data.refreshToken || resp.data.refresh;
        setTokens({ access: newAccess, refresh: newRefresh });
        onRefreshed(newAccess);
        original.headers.Authorization = `Bearer ${newAccess}`;
        return api(original);
      } catch (refreshErr) {
        // refresh failed -> clear tokens
        accessToken = null; refreshToken = null;
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  }
);

export default api;
```

## Auth examples

Login
```js
import api, { setTokens } from './api'; // path to the module above

async function login(email, password) {
  const res = await api.post('/auth/login', { email, password });
  // adjust based on response shape: { user: { accessToken, refreshToken } }
  const payload = res.data.user || res.data;
  const access = payload.accessToken || payload.access;
  const refresh = payload.refreshToken || payload.refresh;
  setTokens({ access, refresh });
  return payload;
}
```

Signup
```js
async function signup(dto) {
  const res = await api.post('/auth/signup', dto);
  const payload = res.data.user || res.data;
  setTokens({ access: payload.accessToken, refresh: payload.refreshToken });
  return payload;
}
```

Manual refresh (if needed)
```js
async function manualRefresh() {
  const res = await api.post('/auth/refresh', {}, { headers: { Authorization: `Bearer ${refreshToken}` }});
  setTokens({ access: res.data.accessToken, refresh: res.data.refreshToken });
  return res.data;
}
```

## User endpoints

Get all users
```js
async function fetchUsers() {
  const res = await api.get('/user');
  return res.data; // array
}
```

Get user by id
```js
async function fetchUser(id) {
  const res = await api.get(`/user/${id}`);
  return res.data; // single user
}
```

Update user
```js
async function updateUser(id, patch) {
  const res = await api.patch(`/user/${id}`, patch);
  return res.data;
}
```

Delete user
```js
async function deleteUser(id) {
  const res = await api.delete(`/user/${id}`);
  return res.data;
}
```

## Materials (meterials)

Create material
```js
async function createMeterial(dto) {
  const res = await api.post('/meterials/create', dto);
  return res.data;
}
```

List materials (with optional sort)
```js
async function listMeterials(sort = 'asc') {
  const res = await api.get(`/meterials?sort=${sort}`);
  return res.data;
}
```

Get / update / delete
```js
async function getMeterial(id) { return (await api.get(`/meterials/${id}`)).data; }
async function updateMeterial(id, patch) { return (await api.patch(`/meterials/${id}`, patch)).data; }
async function removeMeterial(id) { return (await api.delete(`/meterials/${id}`)).data; }
```

## Other material

Create other material
```js
async function createOther(dto) {
  return (await api.post('/other-meterial', dto)).data;
}
```

List / get / patch / delete follow the same pattern as materials.

## Leather batch

Create
```js
async function createBatch(dto) { return (await api.post('/leather-batch', dto)).data; }
```

List / get / patch / delete are the same patterns as above.

## Product (plan)

Create product plan
```js
async function createProduct(dto) { return (await api.post('/product', dto)).data; }
```

Get product list / single / update / delete follow same patterns.

## Created products (production run)

Create created product (consumes materials)
```js
async function createProduction(dto) {
  // dto: { productId, quantity, producedById, notes }
  return (await api.post('/created-products', dto)).data;
}
```

Note: API will fail with 400 if insufficient material area — wrap in try/catch and show friendly message.

## Mail (testing)

Send test email
```js
async function sendMail(to, subject, templateData) {
  return (await api.post('/mail/send', { to, subject, templateData })).data;
}
```

## Error handling snippet
```js
import axios from 'axios';

async function safeCall(fn) {
  try {
    return { data: await fn() };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return { error: e.response?.data || e.message, status: e.response?.status };
    }
    return { error: String(e) };
  }
}
```

## Tips
- Inspect exact JSON shapes in your controllers/DTOs and adapt field names above.
- Use the token setTokens function after login/signup.
- The interceptor retries one 401 after refreshing tokens; remove if refresh endpoint differs.
- For browser clients, store refresh token securely (httpOnly cookie preferred). Storing refresh tokens in localStorage is less secure.

End of document.