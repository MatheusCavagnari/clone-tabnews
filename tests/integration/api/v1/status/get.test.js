import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.update_at).toBeDefined();

  const parsedUpdateAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedUpdateAt);

  const dependencies = responseBody.dependencies;
  const database = dependencies.database;

  expect(database.opened_connections).toBeDefined();
  expect(database.opened_connections).toEqual(1);

  expect(database.max_connections).toBeDefined();
  expect(database.max_connections).toEqual(100);

  expect(database.version).toBeDefined();
  expect(database.version).toEqual("16.1");
});
