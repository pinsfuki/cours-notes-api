import request from "supertest";
import app from "../app.js";

describe("API Notes Markdown", () => {

  test("GET / doit répondre 200", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });

  test("GET /notes doit répondre 200", async () => {
    const res = await request(app).get("/notes");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /notes/inconnue doit répondre 404", async () => {
    const res = await request(app).get("/notes/inconnue");
    expect(res.statusCode).toBe(404);
  });

});