import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async () => {
  try {
    const data = await redis.get("datos-padres");
    if (!data) {
      return Response.json({ error: "No hay datos publicados" }, { status: 404 });
    }
    const payload = typeof data === "string" ? JSON.parse(data) : data;
    return Response.json(payload);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
};

export const config = { path: "/api/leer" };