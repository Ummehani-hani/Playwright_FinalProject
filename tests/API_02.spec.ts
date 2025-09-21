import { test, expect, APIRequestContext, request } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const BEARER_TOKEN = 'your_bearer_token_here'; // replace with real token

let apiContext: APIRequestContext;

test.beforeAll(async () => {
  apiContext = await request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
});

test.afterAll(async () => {
  await apiContext.dispose();
});

test('GET all posts (with Bearer token)', async () => {
  const response = await apiContext.get('/posts');
  expect(response.ok()).toBeTruthy();

  const posts = await response.json();
  console.log(posts);

  expect(Array.isArray(posts)).toBeTruthy();
});

test('Create a new post', async () => {
  const newPost = {
    id: "6",
    title: "New Post from Playwright",
    views: 100
  };

  const response = await apiContext.post('/posts', { data: newPost });
  expect(response.status()).toBe(201);

  const responseBody = await response.json();
  console.log(responseBody);

  expect(responseBody.title).toBe("New Post from Playwright");
});

test('PUT update the created post', async () => {
  const updatedPost = {
    id: "6",
    title: "Updated Post via Playwright",
    views: 800
  };

  const response = await apiContext.put('/posts/6', { data: updatedPost });
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);

  expect(responseBody.title).toBe("Updated Post via Playwright");
});

test('PATCH update the created post', async () => {
  const updatedPatch = {
    title: "Updated PATCH via Playwright",
    views: 1000
  };

  const response = await apiContext.patch('/posts/6', { data: updatedPatch });
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);

  expect(responseBody.title).toBe("Updated PATCH via Playwright");
});

test('Delete the created post', async () => {
  const response = await apiContext.delete('/posts/6');
  expect(response.status()).toBe(200);

  const checkResponse = await apiContext.get('/posts/6');
  expect(checkResponse.status()).toBe(404);
});
