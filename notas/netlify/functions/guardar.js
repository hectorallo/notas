import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
  try {
    const payload = await req.json();
    await redis.set("datos-padres", JSON.stringify(payload));
    return Response.json({ ok: true, mensaje: "Datos guardados", generado: payload.generado || null });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
};

export const config = { path: "/api/guardar" };
