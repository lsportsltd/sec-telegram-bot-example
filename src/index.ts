import app from "./app";
import { init as messageHandlerInit } from "./messaging/messageHandler";
import { init as secHandlerInit } from "./sports-expert-chat/secHandler";

const FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 3006;

const initialize = async () => {
  app.register(messageHandlerInit, { prefix: "/telegram" });
  await app.after();
  await app.ready();
  await app.listen({ port: FASTIFY_PORT });
  secHandlerInit();
};

initialize();

console.log(
  `🚀  Fastify server running on port http://localhost:${FASTIFY_PORT}`
);

console.log(`Route index: /`);
console.log(`Route init: /api/v1/init`);
