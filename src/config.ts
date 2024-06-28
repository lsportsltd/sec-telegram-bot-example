const envSchema = {
  type: "object",
  required: ["BOT_TOKEN", "SEC_API_TOKEN", "WEBHOOK_DOMAIN", "FASTIFY_PORT"],
  properties: {
    FASTIFY_PORT: {
      type: "string",
    },
    BOT_TOKEN: {
      type: "string",
    },
    SEC_API_TOKEN: {
      type: "string",
    },
    WEBHOOK_DOMAIN: {
      type: "string",
    },
  },
};

export const envOptions = {
  confKey: "config", // optional, default: 'config'
  schema: envSchema,
  dotenv: true,
  data: process.env,
};
