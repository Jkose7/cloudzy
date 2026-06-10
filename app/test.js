const test = require('node:test');
const assert = require('node:assert');

const API_URL = process.env.API_URL || 'http://localhost:3000';

async function waitForAPI(url, retries = 15, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        console.log(`Connected to API at ${url}!`);
        return true;
      }
    } catch (err) {
      console.log(`Waiting for API at ${url}... (${i + 1}/${retries}) - Error: ${err.message}`);
    }
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  throw new Error(`API at ${url} did not become available in time.`);
}

test('API Integration Tests', async (t) => {
  await t.test('Wait for API to be ready', async () => {
    await waitForAPI(API_URL);
  });

  await t.test('GET / should return 200 and successful database connection', async () => {
    const res = await fetch(API_URL);
    assert.strictEqual(res.status, 200, 'API status code should be 200');
    
    const data = await res.json();
    console.log('API Response data:', data);

    assert.strictEqual(data.proyecto, 'Cloudzy', 'Project name should be Cloudzy');
    assert.strictEqual(data.estado_api, 'Online', 'API status should be Online');
    assert.strictEqual(data.estado_base_datos, 'Conexión Exitosa a PostgreSQL', 'Database connection should be successful');
  });
});
