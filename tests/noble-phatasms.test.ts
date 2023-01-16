import request from 'supertest';
import app from '../src/app';
import http from 'http';

let server: http.Server;

interface NoblePhantasm {
  id: string;
  name: string;
  rank: string;
  owner: string;
  type: string;
}

beforeAll(() => {
  server = app.listen(process.env.PORT, () => {
    console.log("Listening on port", process.env.PORT);
  })
});

afterAll(() => {
  server.close();
});

describe("GET /noble-phantasms", () => {
  it("should return all noble phantasms", async () => {
    const response = await request(server).get("/api/noble-phantasms");
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toBeInstanceOf(Array);
  })
})

describe("GET /noble-phantasms/?type=Anti-Unit", () => {
  it("should return noble phantasms with type Anti-Unit", async () => {
    const response = await request(server).get("/api/noble-phantasms").query({ type: "Anti-Unit"});
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toBeInstanceOf(Array);

    const list:Array<NoblePhantasm> = Object.values(response.body);

    list.forEach((np: NoblePhantasm) => {
      expect(np.type).toBe("Anti-Unit");
    })
  })
})

describe("GET /noble-phantasms/?owner=Medusa", () => {
  it("should return noble phantasms with owner Medusa", async () => {
    const response = await request(server).get("/api/noble-phantasms").query({ owner: "Medusa"});
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toBeInstanceOf(Array);

    const list:Array<NoblePhantasm> = Object.values(response.body);

    list.forEach((np: NoblePhantasm) => {
      expect(np.owner).toBe("Medusa");
    })
  })
})

describe("GET /noble-phantasms/?type=Anti-Unit?owner=Gilgamesh", () => {
  it("should return noble phantasms with owner Gilgamesh", async () => {
    const response = await request(server).get("/api/noble-phantasms").query({ type: "Anti-Unit", owner: "Gilgamesh"});
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toBeInstanceOf(Array);

    const list:Array<NoblePhantasm> = Object.values(response.body);

    list.forEach((np: NoblePhantasm) => {
      expect(np.type).toBe("Anti-Unit");
      expect(np.owner).toBe("Gilgamesh");
    })
  })
})

describe("GET /noble-phantasms/?type=Anti-Unit?owner=Gilgamesh", () => {
  it("should return noble phantasms with type Anti-Unit and owner Gilgamesh", async () => {
    const response = await request(server).get("/api/noble-phantasms").query({ type: "Anti-Unit", owner: "Gilgamesh"});
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toBeInstanceOf(Array);

    const list:Array<NoblePhantasm> = Object.values(response.body);

    list.forEach((np: NoblePhantasm) => {
      expect(np.type).toBe("Anti-Unit");
      expect(np.owner).toBe("Gilgamesh");
    })
  })
})

describe("GET /noble-phantasms/id/:id", () => {
  it.each(["ubw", "gob", "god-hand"]) ("when id is '%s", async (id) => {
    const response = await request(server).get(`/api/noble-phantasms/id/${id}/`);
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.id).toBe(id);
  })
})
