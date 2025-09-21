import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('API Automation with Playwright', () => {

  test('GET all posts', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts`);
    expect(response.ok()).toBeTruthy();



    const posts = await response.json();
    console.log(posts);

    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);
  });

  test('Create a new post', async ({ request }) => {
    const newPost = {
      id: "6",
      title: "New Post from Playwright",
      views: 100
    };

    const response = await request.post(`${BASE_URL}/posts`, {
      data: newPost
    });

    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    console.log(responseBody);

    expect(responseBody.title).toBe("New Post from Playwright");
  });

  test('PUT update the created post', async ({ request }) => {
    const updatedPost = {
      id: "6",   // same id as created post
      title: "Updated Post via Playwright",
      views: 800
    };

    const response = await request.put(`${BASE_URL}/posts/6`, {
      data: updatedPost
    });

    expect(response.status()).toBe(200); // JSON server usually returns 200
    const responseBody = await response.json();
    console.log(responseBody);

    expect(responseBody.title).toBe("Updated Post via Playwright");
  });

test('PATCH update the created post', async ({ request }) => {
  const updatedPatch = {
    title: "Updated PATCH via Playwright",
    views: 1000
  };

  const response = await request.patch(`${BASE_URL}/posts/6`, {
    data: updatedPatch
  });

  expect(response.status()).toBe(200); 
  const responseBody = await response.json();
  console.log(responseBody);

 
  expect(responseBody.title).toBe("Updated PATCH via Playwright");
});



  test('Delete the created post', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/posts/6`);
    expect(response.status()).toBe(200);

    const checkResponse = await request.get(`${BASE_URL}/posts/6`);
    expect(checkResponse.status()).toBe(404);
  });

});
