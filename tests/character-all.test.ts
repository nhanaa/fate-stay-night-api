import request from 'supertest';
import app from '../src/app';
import http from 'http'

interface Character {
  id: string,
  name: string,
  role: string
}

let server: http.Server;

beforeAll(() => {
  server = app.listen(process.env.PORT, () => {
    console.log("Listening on port", process.env.PORT);
  })
});

afterAll(() => {
  server.close();
});

describe("GET /api/characters", () => {
  it("should return the list of all characters", async () => {
    const response = await request(server).get("/api/characters");
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("GET /api/characters/id/:id", () => {
  it("should return a character", async () => {
    const response = await request(server).get("/api/characters/id/shirou-emiya");
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.name === "Shirou Emiya");
  });
});

describe("GET /api/characters/masters", () => {
  it("should return the list of characters who are masters ", async () => {
    const response = await request(server).get("/api/characters/masters");
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toBeInstanceOf(Array);

    const list:Array<Character> = Object.values(response.body);

    list.forEach((character: Character) => {
      expect(character.role).toBe("master");
    })
  });
});

describe("GET /api/characters/servants", () => {
  it("should return the list of characters who are servants ", async () => {
    const response = await request(server).get("/api/characters/servants");
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toBeInstanceOf(Array);

    const list:Array<Character> = Object.values(response.body);

    list.forEach((character: Character) => {
      expect(character.role).toBe("servant");
    })
  });
});

describe("GET /api/characters/non-participants", () => {
  it("should return the list of characters who are non-participants ", async () => {
    const response = await request(server).get("/api/characters/non-participants");
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toBeInstanceOf(Array);

    const list:Array<Character> = Object.values(response.body);

    list.forEach((character: Character) => {
      expect(character.role).toBe("non-participant");
    })
  });
});
